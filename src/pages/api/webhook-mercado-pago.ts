import type { APIRoute } from 'astro';
import { confirmBooking } from '../../services/channex';

export const prerender = false;

/**
 * POST /api/webhook-mercado-pago
 * Webhook for Mercado Pago payment notifications.
 * Must respond 200 OK immediately, then process in background.
 */
export const POST: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    
    // Support mock or explicit bookingId in body or query param
    let bookingId = url.searchParams.get('bookingId');
    let paymentStatus = 'approved';

    const contentType = request.headers.get('content-type') || '';
    let body: any = {};
    if (contentType.includes('application/json')) {
      body = await request.json();
      if (body.bookingId) bookingId = body.bookingId;
      if (body.status) paymentStatus = body.status;
    }

    console.log('[MercadoPago Webhook] Received webhook notification:', { bookingId, status: paymentStatus });

    // Handle Mock trigger (direct from mock payment simulator)
    if (bookingId) {
      if (paymentStatus === 'approved') {
        const success = await confirmBooking(bookingId);
        return new Response(JSON.stringify({ success, message: 'Booking confirmed via mock payment' }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      } else {
        return new Response(JSON.stringify({ success: false, message: 'Payment status not approved in mock' }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    // Handle real Mercado Pago webhook format
    const paymentId = body.data?.id || url.searchParams.get('id');
    const topic = body.type || url.searchParams.get('topic');

    if (paymentId && (topic === 'payment' || body.action?.startsWith('payment.'))) {
      const MP_ACCESS_TOKEN = import.meta.env.MERCADO_PAGO_ACCESS_TOKEN;
      if (MP_ACCESS_TOKEN) {
        // Fetch payment details from Mercado Pago API
        const payRes = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
          headers: {
            'Authorization': `Bearer ${MP_ACCESS_TOKEN}`,
          }
        });
        if (payRes.ok) {
          const payData = await payRes.json();
          const extRef = payData.external_reference; // This is our bookingId
          const status = payData.status;

          if (extRef && status === 'approved') {
            await confirmBooking(extRef);
            console.log(`[MercadoPago Webhook] Real booking confirmed via MP API: ${extRef}`);
          } else {
            console.log(`[MercadoPago Webhook] Payment not approved or no external reference:`, { extRef, status });
          }
        } else {
          console.error('[MercadoPago Webhook] Failed to fetch payment details from MP API');
        }
      }
    }

    // Always return 200 OK to prevent Mercado Pago retries
    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('[MercadoPago Webhook] Error processing webhook:', error);
    // Still return 200 to prevent retry storms
    return new Response(JSON.stringify({ received: true, error: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
