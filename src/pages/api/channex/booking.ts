import type { APIRoute } from 'astro';
import { createBooking } from '../../../services/channex';

export const prerender = false;

/**
 * POST /api/channex/booking
 * Creates a new booking in pending state
 */
export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { roomId, checkIn, checkOut, guests, guestName, guestEmail, guestPhone, airportPickup, flightTime } = body;

    // Validation
    if (!roomId || !checkIn || !checkOut || !guestName || !guestEmail || !guestPhone) {
      return new Response(JSON.stringify({ error: 'Missing required booking fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const booking = await createBooking({
      roomId,
      checkIn,
      checkOut,
      guests: Number(guests) || 2,
      guestName,
      guestEmail,
      guestPhone,
      airportPickup: Boolean(airportPickup),
      flightTime: flightTime || '',
    });

    return new Response(JSON.stringify(booking), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('[API Booking Create] Error:', error);
    return new Response(JSON.stringify({ error: error.message || 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
