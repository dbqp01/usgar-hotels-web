// src/services/api.ts

export const BACKEND_URL = import.meta.env.PUBLIC_BACKEND_URL || 'http://localhost:8000';

export const ROOM_SLUG_TO_ID: Record<string, number> = {
  'matrimonial': 1,
  'doble-superior': 2,
  'triple-standar': 3,
  'familiar-superior': 4,
  'quadruple-superior': 5, // Fallback mapping
};

export const ROOM_ID_TO_SLUG: Record<number, string> = {
  1: 'matrimonial',
  2: 'doble-superior',
  3: 'triple-standar',
  4: 'familiar-superior',
  5: 'quadruple-superior',
};

export interface BookingPayload {
  id_hotel?: number;
  id_room_type: number;
  checkIn: string;
  checkOut: string;
  guestName: string;
  guestEmail: string;
  guestPhone?: string;
}

export interface BookingResponse {
  success: boolean;
  cart_id: string;
  preference_id: string;
  init_point: string;
  sandbox_init_point: string;
  price: number;
  expires_at: string;
}

export interface BookingStatusResponse {
  success: boolean;
  cart_id: string;
  status: 'pending' | 'paid' | 'failed' | 'expired';
  checkin: string;
  checkout: string;
  id_room_type: number;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  room_name: string;
  price_per_night: number;
  nights: number;
  price: number;
}

/**
 * Consulta la disponibilidad de habitaciones en tiempo real en el backend en PHP.
 */
export async function getBackendAvailability(checkIn: string, checkOut: string, hotelId = 1) {
  try {
    const url = new URL(`${BACKEND_URL}/api/rooms`);
    url.searchParams.append('checkIn', checkIn);
    url.searchParams.append('checkOut', checkOut);
    url.searchParams.append('id_hotel', hotelId.toString());

    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('[API Service] Error fetching room availability:', error);
    throw error;
  }
}

/**
 * Envía la petición de reserva para crear el hold temporal y la preferencia de pago en Mercado Pago.
 */
export async function createBackendBooking(payload: BookingPayload): Promise<BookingResponse> {
  try {
    const response = await fetch(`${BACKEND_URL}/api/booking`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_hotel: payload.id_hotel ?? 1,
        id_room_type: payload.id_room_type,
        checkIn: payload.checkIn,
        checkOut: payload.checkOut,
        guestName: payload.guestName,
        guestEmail: payload.guestEmail,
        guestPhone: payload.guestPhone ?? '',
      }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error || 'Failed to create booking on backend');
    }

    return await response.json();
  } catch (error) {
    console.error('[API Service] Error creating booking:', error);
    throw error;
  }
}

/**
 * Obtiene el estado actual de la reserva por su ID de carrito.
 */
export async function getBackendBookingStatus(cartId: string): Promise<BookingStatusResponse> {
  try {
    const response = await fetch(`${BACKEND_URL}/api/booking-status?cart_id=${cartId}`);
    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error || 'Failed to fetch booking status');
    }
    return await response.json();
  } catch (error) {
    console.error('[API Service] Error getting booking status:', error);
    throw error;
  }
}
