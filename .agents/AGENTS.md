# USGAR Hotels — San Pedro, Cusco, Perú

> Web transaccional para un hotel real con ventas activas en Booking y TripAdvisor.
> Referencia visual: https://hotelmonasteriosanpedro.com (pero mejorado en rendimiento y diseño).

## Hotel

- **Nombre:** USGAR Hotels (un solo hotel activo en San Pedro, Cusco)
- **Tipo:** Hotel boutique con 5 tipos de habitación
- **Público:** Turistas internacionales que visitan Cusco/Machu Picchu
- **Idiomas:** Inglés (principal) y Español

## Tech Stack

1. **Framework:** Astro v5 (`output: 'static'`) con `@astrojs/node`. Usar `export const prerender = false` en rutas API.
2. **Estilos:** Tailwind CSS v4 para maquetación, animaciones y tema dual (claro/oscuro).
3. **Imágenes:** Usar `<Image />` de `astro:assets` para comprimir fotos profesionales (~30MB → ~300KB WebP) en build time.
4. **Transiciones:** Usar `ClientRouter` de `astro:transitions` (NO ViewTransitions, fue renombrado en v5).
5. **Mapa:** OpenStreetMap con Leaflet (NO Google Maps).
6. **Deploy:** GitHub → Vercel → dominio personalizado.

## Integraciones y Seguridad

1. **Capa Segura:** Toda llamada a Channex o Mercado Pago va por API Routes de Astro (`src/pages/api/`) para no exponer claves al cliente.
2. **Modo Mock:** Si `CHANNEX_API_KEY` o `MERCADO_PAGO_ACCESS_TOKEN` no están en `.env`, usar implementaciones mock en `src/services/channex.ts` y `src/services/mercadopago.ts`.
3. **Webhook:** `/api/webhook-mercado-pago` responde `200 OK` rápido y procesa en segundo plano.

## Diseño y Estética

### Tema
- Dual: claro y oscuro con detección automática del sistema operativo
- Toggle manual en navbar
- Modo oscuro por defecto si no hay preferencia

### Paleta (del logo)
- **Morado** `#9B6CB5` — acento primario, CTAs
- **Dorado** `#F5B731` — acento secundario, highlights
- **Cian** `#2DB5A0` — acento terciario, iconos
- **Fondos** — blanco puro / negro profundo según tema

### Tipografía
- **Títulos:** Playfair Display (Serif elegante)
- **Cuerpo:** Outfit (legible, moderna)

### Animaciones
- Scroll: fade-in y slide-up suaves al aparecer elementos
- Navegación: View Transitions entre páginas (deslizamiento elegante)
- Hover: micro-animaciones en cards, botones, galería
- Filosofía: "Ligero y suave" — nunca brusco ni exagerado

## Estructura de Páginas

### Home (/)
1. Hero con video de fondo (muteado, audio activable por usuario)
2. Booking Widget flotante superpuesto sobre el hero
3. Sección de habitaciones con cards → link a página individual
4. Grid de servicios (11 servicios confirmados)
5. Reseñas/testimonios de huéspedes
6. Sección "Explora Cusco" (atracciones cercanas, SEO)
7. Footer con contacto, redes, mapa OpenStreetMap

### Habitación Individual (/rooms/[slug])
- Galería inmersiva fullscreen (lightbox con swipe)
- Video tour embebido (muteado por defecto)
- Descripción, amenidades, precio
- CTA de reserva

### Reservas/Checkout (/book)
- Resumen de selección
- Formulario de datos del huésped
- Integración Mercado Pago (mock)

### Explora Cusco (/explore)
- Atracciones cercanas con distancias
- Fotos y descripciones
- SEO optimizado

## Habitaciones

| Habitación | Fotos | Videos | Estado |
|---|---|---|---|
| Doble Superior Room | 16 | 4 | ✅ Completo |
| Matrimonial Room | 12 | 4 | ✅ Completo |
| Familiar Superior Room | 0 | 0 | ⚠️ Usar fotos genéricas |
| Quadruple Superior Room | 10 | 4 | ✅ Completo |
| Triple Standar Room | 0 | 0 | ⚠️ Usar fotos genéricas |

## Servicios Confirmados

Wi-Fi gratuito, desayuno incluido, agua caliente 24h, calefacción, TV cable, lavandería, traslado aeropuerto/estación, tours a Machu Picchu, restaurante/cafetería, spa/masajes, estacionamiento.

## UI Components

- **Navbar:** Transparente sobre hero → sólida con glassmorphism al scroll. Logo izquierda, menú + idioma + dark/light toggle + botón "Reservar".
- **Booking Widget:** Barra flotante sobre hero. Check-in, check-out, huéspedes, tipo habitación, botón buscar.
- **Room Cards:** Foto con overlay, nombre, precio desde X/noche, hover zoom suave.
- **Galería:** Fullscreen inmersivo (lightbox + swipe entre fotos) con video tour integrado.
- **WhatsApp:** Botón flotante esquina inferior derecha con pulso sutil.
- **Mapa:** OpenStreetMap/Leaflet con marcador personalizado del hotel.

## Audio/Video

- Videos se reproducen muteados por defecto
- Audio solo se activa si el usuario lo enciende
- NO usar soundtracks como música de fondo
- Video del hero: usar videos de la carpeta FOTOS/

## Rendimiento (Prioridad Alta)

- Objetivo: Lighthouse > 90 en todas las categorías
- Astro `<Image />` para compresión automática
- Lazy loading para imágenes y videos
- HTML estático donde sea posible

## SEO (Prioridad Alta)

- Schema.org structured data para Hotel
- Meta tags por página, sitemap XML
- URLs descriptivas (`/rooms/doble-superior`)
- Hreflang para ES/EN
- Sección "Explora Cusco" para keywords turísticos

## Assets (Rutas en el proyecto)

- Logos: `USGAR LOGO/` (7 variantes PNG)
- Fotos generales: `FOTOS/` (8 fotos + 3 videos)
- Fotos por habitación: carpetas raíz (ej: `Doble Superior Room/`)
- Videos: carpetas de habitación + `VIDEOS youtube/`
- Render logo animado: `VIDEOS youtube/Render logo.mp4`

## Pipeline de Desarrollo

Antes de trabajar, verifica el estado actual del proyecto:

1. **Scaffolding** ✅ si existe `astro.config.mjs`
2. **UI Components** ✅ si existen componentes en `src/components/`
3. **Integraciones** ✅ si existen `src/services/` y `src/pages/api/`
4. **Testing** ✅ si `npm run build` pasa sin errores
5. **Deploy** ✅ si hay commits en el repo

Siempre verifica qué etapas ya están completas antes de continuar.
