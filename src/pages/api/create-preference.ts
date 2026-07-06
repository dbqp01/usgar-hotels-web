import type { APIRoute } from 'astro';
import { createPreference } from '../../services/mercadopago';
import { rooms } from '../../data/rooms';
import { daysBetween } from '../../services/channex';

export const prerender = false;

/**
 * POST /api/create-preference
 * Creates a Mercado Pago payment preference for a booking
 */
export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { bookingId, roomId, checkIn, checkOut, guests, guestName, guestEmail, guestPhone } = body;

    if (!bookingId || !roomId || !checkIn || !checkOut || !guestName || !guestEmail) {
      return new Response(JSON.stringify({ error: 'Missing required preference parameters' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const room = rooms.find(r => r.slug === roomId);
    if (!room) {
      return new Response(JSON.stringify({ error: 'Invalid room type' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const nights = daysBetween(checkIn, checkOut);
    const totalPrice = room.pricePerNight * nights;

    // Create preference
    const preference = await createPreference({
      bookingId,
      roomName: room.name.en, // Or dynamically select based on locale
      checkIn,
      checkOut,
      nights,
      totalPrice,
      guestName,
      guestEmail,
      guestPhone: guestPhone || '',
    });

    return new Response(JSON.stringify(preference), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('[API Create Preference] Error:', error);
    return new Response(JSON.stringify({ error: error.message || 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
