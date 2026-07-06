---
name: "channex-integration"
description: "Integrar API de Channex para disponibilidad de habitaciones, tarifas, crear reservas en USGAR Hotels. Incluye modo mock cuando no hay API key en .env. Channel manager para sincronizar con Booking y TripAdvisor"
---

# Integración Channex — USGAR Hotels

## Arquitectura

```
Cliente (Browser)
  → POST/GET /api/channex/*
    → src/pages/api/channex/*.ts (API Route de Astro)
      → src/services/channex.ts (lógica + mock detection)
        → Channex API real (si hay CHANNEX_API_KEY)
        → Mock data (si no hay CHANNEX_API_KEY)
```

## Archivo: `src/services/channex.ts`

### Detección automática de modo

```typescript
const CHANNEX_API_KEY = import.meta.env.CHANNEX_API_KEY;
const IS_MOCK = !CHANNEX_API_KEY;

if (IS_MOCK) {
  console.log('[Channex] Modo mock activado — sin API key');
}
```

### Funciones principales

1. **`getAvailability(checkIn, checkOut, roomType?)`** — Retorna disponibilidad
2. **`getRoomTypes()`** — Retorna los 5 tipos de habitación con precios
3. **`createBooking(bookingData)`** — Crea una reserva
4. **`getBooking(bookingId)`** — Consulta estado de reserva

### Datos Mock (realistas)

Usar datos reales del hotel:

```typescript
const MOCK_ROOMS = [
  {
    id: 'doble-superior',
    name: { en: 'Double Superior Room', es: 'Habitación Doble Superior' },
    slug: 'doble-superior',
    maxGuests: 2,
    beds: '2 single beds',
    pricePerNight: 45, // USD
    amenities: ['wifi', 'breakfast', 'hot-water', 'heating', 'tv'],
    photoCount: 16,
    hasVideoTour: true,
  },
  {
    id: 'matrimonial',
    name: { en: 'Matrimonial Room', es: 'Habitación Matrimonial' },
    slug: 'matrimonial',
    maxGuests: 2,
    beds: '1 king bed',
    pricePerNight: 50,
    amenities: ['wifi', 'breakfast', 'hot-water', 'heating', 'tv'],
    photoCount: 12,
    hasVideoTour: true,
  },
  {
    id: 'familiar-superior',
    name: { en: 'Family Superior Room', es: 'Habitación Familiar Superior' },
    slug: 'familiar-superior',
    maxGuests: 4,
    beds: '1 king + 2 single beds',
    pricePerNight: 75,
    amenities: ['wifi', 'breakfast', 'hot-water', 'heating', 'tv'],
    photoCount: 0, // placeholder
    hasVideoTour: false,
  },
  {
    id: 'quadruple-superior',
    name: { en: 'Quadruple Superior Room', es: 'Habitación Cuádruple Superior' },
    slug: 'quadruple-superior',
    maxGuests: 4,
    beds: '4 single beds',
    pricePerNight: 65,
    amenities: ['wifi', 'breakfast', 'hot-water', 'heating', 'tv'],
    photoCount: 10,
    hasVideoTour: true,
  },
  {
    id: 'triple-standar',
    name: { en: 'Triple Standard Room', es: 'Habitación Triple Estándar' },
    slug: 'triple-standar',
    maxGuests: 3,
    beds: '3 single beds',
    pricePerNight: 55,
    amenities: ['wifi', 'breakfast', 'hot-water', 'heating', 'tv'],
    photoCount: 0, // placeholder
    hasVideoTour: false,
  },
];
```

### Mock de disponibilidad

En modo mock, siempre retornar disponible con precio base:

```typescript
function mockGetAvailability(checkIn: string, checkOut: string) {
  const nights = daysBetween(checkIn, checkOut);
  return MOCK_ROOMS.map(room => ({
    ...room,
    available: true,
    totalPrice: room.pricePerNight * nights,
    nights,
  }));
}
```

### Mock de reserva

```typescript
function mockCreateBooking(data: BookingRequest) {
  return {
    id: 'MOCK-' + Date.now(),
    status: 'confirmed',
    confirmationCode: 'USG-' + Math.random().toString(36).substr(2, 8).toUpperCase(),
    ...data,
  };
}
```

## API Routes

### GET `/api/channex/availability`
Query params: `checkIn`, `checkOut`, `guests`
Returns: Array de habitaciones disponibles con precios

### POST `/api/channex/booking`
Body: `{ roomId, checkIn, checkOut, guests, guestName, guestEmail, guestPhone }`
Returns: `{ bookingId, confirmationCode, status }`

### GET `/api/channex/booking/[id]`
Returns: Estado de la reserva

## Seguridad

- NUNCA exponer `CHANNEX_API_KEY` al cliente
- Validar todos los inputs en el servidor
- Rate limiting en las API routes
