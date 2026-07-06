import type { APIRoute } from 'astro';
import { getAvailability } from '../../../services/channex';

export const prerender = false;

/**
 * GET /api/channex/availability
 * Checks room availability for a date range
 */
export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const checkin = url.searchParams.get('checkin') || url.searchParams.get('checkIn');
    const checkout = url.searchParams.get('checkout') || url.searchParams.get('checkOut');
    const roomType = url.searchParams.get('roomType') || url.searchParams.get('room_type');

    if (!checkin || !checkout) {
      return new Response(JSON.stringify({ error: 'Missing checkin or checkout date' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const availableRooms = await getAvailability(checkin, checkout, roomType || undefined);

    return new Response(JSON.stringify({
      available: true,
      checkIn: checkin,
      checkOut: checkout,
      rooms: availableRooms,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('[API Availability] Error:', error);
    return new Response(JSON.stringify({ error: error.message || 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
