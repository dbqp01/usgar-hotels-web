---
name: "hotel-ui-designer"
description: "Diseñar componentes UI premium para el hotel USGAR: hero con video, galería de habitaciones, booking widget, navbar con glassmorphism, footer, room cards, servicios, reseñas, mapa, WhatsApp flotante. Usar Playfair Display para títulos, Outfit para cuerpo, paleta morado/dorado/cian, tema dual claro/oscuro, animaciones suaves fade-in slide-up, View Transitions entre páginas"
---

# Diseño UI Premium — USGAR Hotels San Pedro

## Principios de Diseño

1. **Elegancia andina**: Combinar modernidad con calidez cultural cusqueña
2. **Fotografía protagonista**: Las fotos profesionales deben ser el centro visual
3. **Ligero y suave**: Animaciones que fluyan, nunca bruscas
4. **Premium sin pretensión**: Alta gama pero accesible, no intimidante
5. **Rendimiento primero**: Nunca sacrificar velocidad por estética

## Paleta de Colores

```css
/* Modo Claro */
--color-bg: #FAFAF9;
--color-surface: #FFFFFF;
--color-text: #1C1917;
--color-text-secondary: #57534E;

/* Modo Oscuro */
--color-bg: #0C0A09;
--color-surface: #1C1917;
--color-text: #FAFAF9;
--color-text-secondary: #A8A29E;

/* Acentos de marca (ambos modos) */
--color-primary: #9B6CB5;      /* Morado del logo */
--color-secondary: #F5B731;    /* Dorado del logo */
--color-tertiary: #2DB5A0;     /* Cian/turquesa del logo */
```

## Tipografía

```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Outfit:wght@300;400;500;600;700&display=swap');

h1, h2, h3 { font-family: 'Playfair Display', serif; }
body, p, a, button { font-family: 'Outfit', sans-serif; }
```

## Componentes

### 1. Navbar (`Navbar.astro`)
- Posición fija (sticky)
- Transparente cuando está sobre el hero (fondo: transparent)
- Al scrollear: fondo con glassmorphism (`backdrop-blur-xl bg-white/80 dark:bg-black/80`)
- Logo USGAR a la izquierda (usar variante apropiada según tema)
- Menú: Habitaciones, Servicios, Explora Cusco, Contacto
- Derecha: Selector idioma (EN/ES), toggle dark/light, botón "Reservar" (acento morado)
- Mobile: menú hamburguesa con slide-in desde la derecha

### 2. Hero Section
- Video de fondo fullscreen (100vh) muteado, autoplay, loop
- Overlay gradient oscuro sutil para legibilidad del texto
- Título: "USGAR Hotels" en Playfair Display grande
- Subtítulo: "San Pedro, Cusco — A gateway to the Andes"
- El video DEBE tener controles de audio visibles pero discretos
- Usar videos de la carpeta `FOTOS/` (100ANV19.mp4, 100ANV24.mp4 o 100ANV26.mp4)

### 3. Booking Widget (`BookingWidget.astro`)
- Posicionado sobre el hero, en la parte inferior
- Barra horizontal con glassmorphism
- Campos: Check-in (date), Check-out (date), Huéspedes (select), Tipo habitación (select)
- Botón "Buscar Disponibilidad" con acento morado
- En mobile: se convierte en botón CTA que abre un modal

### 4. Room Cards (`RoomCard.astro`)
- Grid de 2-3 columnas (responsive)
- Imagen principal con aspect-ratio 4:3
- Hover: zoom suave (scale 1.05) con overlay que muestra precio
- Nombre en Playfair Display
- "Desde $XX / noche" en Outfit
- Animación de entrada: fade-in + slide-up al scrollear (IntersectionObserver)
- Click → navega a `/rooms/[slug]` con View Transition

### 5. Galería Inmersiva (en página de habitación)
- Grid principal: 1 foto grande + 4 thumbnails
- Click en cualquier foto: abre lightbox fullscreen
- En lightbox: swipe/arrows para navegar, botón cerrar, counter "3/16"
- Video tour: embebido al final de la galería, muteado por defecto
- Transición de entrada suave

### 6. Service Grid (`ServiceGrid.astro`)
- Grid 3-4 columnas de cards compactas
- Cada card: ícono (SVG o emoji), nombre del servicio, descripción breve
- Hover: elevación sutil (shadow + translate-y)
- Animación de entrada escalonada (stagger)

### 7. Reseñas (`ReviewSection.astro`)
- Carrusel horizontal con testimonios
- Cada card: cita, nombre del huésped, bandera del país, estrellas
- Autoplay suave con pausa al hover
- Datos: pueden ser mock basados en reseñas reales de TripAdvisor

### 8. WhatsApp Button (`WhatsAppButton.astro`)
- Posición fija: bottom-right (bottom-6 right-6)
- Ícono de WhatsApp en círculo verde
- Animación de pulso sutil continua
- Hover: scale up + tooltip "¿Necesitas ayuda?"
- z-index alto para estar siempre visible

### 9. Mapa (`MapSection.astro`)
- OpenStreetMap con Leaflet.js
- Centrado en la ubicación del hotel en San Pedro, Cusco
- Marcador personalizado con el isotipo del logo USGAR
- Estilo del mapa: tiles oscuros para dark mode, claros para light mode
- Interactivo (zoom, pan)

### 10. Footer (`Footer.astro`)
- Fondo oscuro (o más oscuro que el tema actual)
- Logo USGAR centrado arriba
- 3 columnas: Contacto | Navegación | Redes Sociales
- Links a Instagram, Facebook, TripAdvisor, Booking
- Copyright + "Hecho con ❤️ en Cusco"
- Mini-mapa o dirección con link a OpenStreetMap

## Animaciones

```css
/* Fade-in al scrollear */
.animate-on-scroll {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}
.animate-on-scroll.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Stagger para grids */
.stagger-child:nth-child(1) { transition-delay: 0.1s; }
.stagger-child:nth-child(2) { transition-delay: 0.2s; }
.stagger-child:nth-child(3) { transition-delay: 0.3s; }
/* etc */
```

## Dark Mode

```javascript
// Detectar preferencia del sistema
const theme = localStorage.getItem('theme') ||
  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
document.documentElement.classList.toggle('dark', theme === 'dark');
```

## Detalles que Evitan lo Genérico

- Separadores con motivos andinos sutiles (líneas geométricas inspiradas en textiles)
- Cursor personalizado sutil al hover sobre las fotos
- Números de habitación con tipografía display extra grande como detalle decorativo
- Gradientes que usan los colores de la marca de forma muy sutil
- Loading skeleton con shimmer animado mientras cargan las fotos
- Efecto parallax sutil en las fotos del hero y secciones
- Texto con reveal animation (letra por letra o palabra por palabra en títulos principales)
