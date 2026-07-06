import { rooms, type Room } from '../data/rooms';

const CHANNEX_API_KEY = import.meta.env.CHANNEX_API_KEY;
const IS_MOCK = !CHANNEX_API_KEY;

if (IS_MOCK) {
  console.log('[Channex] Mock mode — no API key found in .env');
}

export { IS_MOCK };

export interface BookingRequest {
  roomId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
}

export interface Booking extends BookingRequest {
  id: string;
  status: 'pending_payment' | 'confirmed' | 'failed';
  confirmationCode: string;
  totalPrice: number;
  nights: number;
  createdAt: string;
}

// In-memory persistent storage for development/mock mode
const globalBookings = globalThis as any;
if (!globalBookings.bookings) {
  globalBookings.bookings = new Map<string, Booking>();
}

const bookingsStore: Map<string, Booking> = globalBookings.bookings;

export function daysBetween(date1: string, date2: string): number {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return isNaN(diffDays) ? 1 : diffDays;
}

/**
 * Returns available rooms with pricing for the specified dates
 */
export async function getAvailability(checkIn: string, checkOut: string, roomType?: string) {
  const nights = daysBetween(checkIn, checkOut);
  
  if (IS_MOCK) {
    let filteredRooms = rooms;
    if (roomType && roomType !== 'any' && roomType !== '') {
      filteredRooms = rooms.filter(r => r.slug === roomType);
    }
    return filteredRooms.map(room => ({
      ...room,
      available: true,
      totalPrice: room.pricePerNight * nights,
      nights,
    }));
  }

  // Production implementation placeholder
  try {
    const response = await fetch('https://api.channex.io/api/v1/room_types', {
      headers: {
        'Authorization': `Bearer ${CHANNEX_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) throw new Error('Channex API failed');
    const data = await response.json();
    // In production, map Channex data to our Room structure.
    // For demo/fallback, we use mock if data lacks expected formats.
    return rooms.map(room => ({
      ...room,
      available: true,
      totalPrice: room.pricePerNight * nights,
      nights,
    }));
  } catch (error) {
    console.error('[Channex] Error fetching real availability, falling back to mock:', error);
    return rooms.map(room => ({
      ...room,
      available: true,
      totalPrice: room.pricePerNight * nights,
      nights,
    }));
  }
}

/**
 * Creates a new booking in the system (pending payment)
 */
export async function createBooking(data: BookingRequest): Promise<Booking> {
  const nights = daysBetween(data.checkIn, data.checkOut);
  const room = rooms.find(r => r.slug === data.roomId);
  const pricePerNight = room ? room.pricePerNight : 50;
  const totalPrice = pricePerNight * nights;

  if (IS_MOCK) {
    const bookingId = 'BK-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
    const confirmationCode = 'USG-' + Math.random().toString(36).substring(2, 10).toUpperCase();
    
    const newBooking: Booking = {
      id: bookingId,
      status: 'pending_payment',
      confirmationCode,
      totalPrice,
      nights,
      createdAt: new Date().toISOString(),
      ...data,
    };

    bookingsStore.set(bookingId, newBooking);
    console.log(`[Channex] Mock booking created: ${bookingId} (Status: pending_payment)`);
    return newBooking;
  }

  // Production implementation placeholder
  // In production, we'd make a POST to Channex API to block the room
  // returning a similar structure.
  const bookingId = 'BK-CHANNEX-' + Date.now();
  const confirmationCode = 'USG-CHANNEX-' + Math.random().toString(36).substring(2, 8).toUpperCase();
  const newBooking: Booking = {
    id: bookingId,
    status: 'pending_payment',
    confirmationCode,
    totalPrice,
    nights,
    createdAt: new Date().toISOString(),
    ...data,
  };
  bookingsStore.set(bookingId, newBooking);
  return newBooking;
}

/**
 * Retrieves booking details by ID
 */
export async function getBooking(bookingId: string): Promise<Booking | undefined> {
  return bookingsStore.get(bookingId);
}

/**
 * Confirms a booking (typically called on payment success webhook)
 */
export async function confirmBooking(bookingId: string): Promise<boolean> {
  const booking = bookingsStore.get(bookingId);
  if (booking) {
    booking.status = 'confirmed';
    bookingsStore.set(bookingId, booking);
    console.log(`[Channex] Booking ${bookingId} status updated to CONFIRMED`);
    return true;
  }
  console.warn(`[Channex] Booking ${bookingId} not found for confirmation`);
  return false;
}
