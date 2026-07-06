---
name: "mercadopago-checkout"
description: "Implementar checkout con Mercado Pago para reservas del hotel USGAR. Crear preferencias de pago, manejar webhooks de confirmación, modo mock sin access token. Pasarela de pagos para reservas directas"
---

# Checkout con Mercado Pago — USGAR Hotels

## Flujo Completo de Pago

```
1. Cliente selecciona habitación y fechas
2. Click "Reservar" → POST /api/create-preference
3. Backend crea preferencia de pago en MP
4. Redirect a Mercado Pago (o mock)
5. Cliente paga
6. MP envía webhook POST /api/webhook-mercado-pago
7. Webhook responde 200 OK inmediatamente
8. Backend valida pago → registra reserva en Channex
9. Redirect a /book/success con confirmación
```

## Archivo: `src/services/mercadopago.ts`

### Detección de modo

```typescript
const MP_ACCESS_TOKEN = import.meta.env.MERCADO_PAGO_ACCESS_TOKEN;
const IS_MOCK = !MP_ACCESS_TOKEN;
```

### Crear preferencia de pago

```typescript
interface PaymentPreference {
  roomName: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  totalPrice: number;
  guestName: string;
  guestEmail: string;
}

async function createPreference(data: PaymentPreference) {
  if (IS_MOCK) {
    return {
      id: 'MOCK-PREF-' + Date.now(),
      init_point: '/book/mock-payment?amount=' + data.totalPrice,
      sandbox_init_point: '/book/mock-payment?amount=' + data.totalPrice,
    };
  }

  // Producción: llamar a la API real de Mercado Pago
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
        currency_id: 'USD',
      }],
      back_urls: {
        success: `${import.meta.env.SITE_URL}/book/success`,
        failure: `${import.meta.env.SITE_URL}/book/failure`,
        pending: `${import.meta.env.SITE_URL}/book/pending`,
      },
      auto_return: 'approved',
      notification_url: `${import.meta.env.SITE_URL}/api/webhook-mercado-pago`,
    }),
  });

  return response.json();
}
```

## API Routes

### POST `/api/create-preference`
- Recibe datos de la reserva
- Crea preferencia en MP
- Retorna URL de pago (o mock URL)

### POST `/api/webhook-mercado-pago`
- Responde 200 OK inmediatamente (requisito de MP)
- Valida la firma del webhook
- Consulta el estado del pago
- Si aprobado: registra la reserva en Channex
- Log de la transacción

### Página `/book/mock-payment`
- Solo existe en modo mock
- Simula la interfaz de pago de Mercado Pago
- Botones: "Simular Pago Exitoso" / "Simular Pago Rechazado"
- Redirect a /book/success o /book/failure

### Página `/book/success`
- Muestra confirmación de reserva
- Código de confirmación
- Resumen de la reserva
- Botón para descargar comprobante (PDF o pantalla)

## Variables de entorno (.env)

```env
# Mercado Pago
MERCADO_PAGO_ACCESS_TOKEN=     # Dejar vacío para modo mock
MERCADO_PAGO_PUBLIC_KEY=       # Para el SDK del cliente (si se usa)

# General
SITE_URL=http://localhost:4321  # Cambiar en producción
```

## Seguridad

- NUNCA exponer `MERCADO_PAGO_ACCESS_TOKEN` al cliente
- Validar webhook signatures en producción
- Webhook responde 200 OK antes de procesar (evitar timeout)
- Sanitizar todos los inputs del formulario de reserva
