const MP_ACCESS_TOKEN = import.meta.env.MERCADO_PAGO_ACCESS_TOKEN;
const IS_MOCK = !MP_ACCESS_TOKEN;

if (IS_MOCK) {
  console.log('[MercadoPago] Mock mode — no access token found in .env');
}

export { IS_MOCK };

export interface PaymentPreference {
  bookingId: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  totalPrice: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
}

/**
 * Creates a payment preference in Mercado Pago
 * If in mock mode, returns a local redirect URL to `/book/mock-payment`
 */
export async function createPreference(data: PaymentPreference) {
  if (IS_MOCK) {
    const params = new URLSearchParams({
      bookingId: data.bookingId,
      roomName: data.roomName,
      amount: data.totalPrice.toString(),
      checkIn: data.checkIn,
      checkOut: data.checkOut,
      guestName: data.guestName,
      guestEmail: data.guestEmail,
    });

    const initPoint = `/book/mock-payment?${params.toString()}`;
    
    return {
      id: 'MOCK-PREF-' + Date.now(),
      init_point: initPoint,
      sandbox_init_point: initPoint,
      _mock: true,
    };
  }

  // Production: Call real Mercado Pago API
  const siteUrl = import.meta.env.SITE_URL || 'http://localhost:4321';
  try {
    const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${MP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: [{
          title: `USGAR Hotels — ${data.roomName}`,
          description: `${data.nights} noches (${data.checkIn} → ${data.checkOut})`,
          quantity: 1,
          unit_price: data.totalPrice,
          currency_id: 'USD', // O 'PEN' según corresponda
        }],
        external_reference: data.bookingId,
        back_urls: {
          success: `${siteUrl}/book/success?bookingId=${data.bookingId}`,
          failure: `${siteUrl}/book?error=payment_failed&bookingId=${data.bookingId}`,
          pending: `${siteUrl}/book/success?status=pending&bookingId=${data.bookingId}`,
        },
        auto_return: 'approved',
        notification_url: `${siteUrl}/api/webhook-mercado-pago`,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Mercado Pago API error: ${response.status} ${errText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('[MercadoPago] Error creating preference, falling back to mock:', error);
    // Safe fallback for UI/demo purposes
    const params = new URLSearchParams({
      bookingId: data.bookingId,
      roomName: data.roomName,
      amount: data.totalPrice.toString(),
      checkIn: data.checkIn,
      checkOut: data.checkOut,
      guestName: data.guestName,
      guestEmail: data.guestEmail,
    });
    const initPoint = `/book/mock-payment?${params.toString()}`;
    return {
      id: 'MOCK-PREF-FALLBACK-' + Date.now(),
      init_point: initPoint,
      sandbox_init_point: initPoint,
      _mock: true,
    };
  }
}
