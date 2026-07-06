---
name: "astro-scaffolder"
description: "Crear estructura inicial del proyecto Astro, configurar adaptador node, tailwind v4, view transitions, y organizar carpetas src/pages, src/components, src/layouts, src/services para el hotel USGAR"
---

# Scaffolding del Proyecto USGAR Hotels

## Paso 1: Inicializar Astro

```bash
npx -y create-astro@latest ./ --template minimal --install --no-git --typescript strict
```

## Paso 2: Instalar dependencias

```bash
npx astro add node tailwind --yes
npm install leaflet
npm install -D @types/leaflet
```

## Paso 3: Configurar `astro.config.mjs`

```javascript
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'hybrid',
  adapter: node({ mode: 'standalone' }),
  vite: {
    plugins: [tailwindcss()]
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: { prefixDefaultLocale: false }
  }
});
```

## Paso 4: Crear estructura de carpetas

```
src/
├── assets/           ← Copiar aquí las fotos y logos del hotel
│   ├── rooms/
│   │   ├── doble-superior/
│   │   ├── matrimonial/
│   │   ├── familiar-superior/
│   │   ├── quadruple-superior/
│   │   └── triple-standar/
│   ├── hotel/        ← Fotos generales (de carpeta FOTOS/)
│   └── logos/        ← Logos (de carpeta USGAR LOGO/)
├── components/
│   ├── Navbar.astro
│   ├── Footer.astro
│   ├── BookingWidget.astro
│   ├── RoomCard.astro
│   ├── ServiceGrid.astro
│   ├── ReviewSection.astro
│   ├── WhatsAppButton.astro
│   └── MapSection.astro
├── layouts/
│   └── Layout.astro   ← Layout base con View Transitions, fonts, dark mode
├── pages/
│   ├── index.astro
│   ├── rooms/
│   │   └── [slug].astro
│   ├── explore.astro
│   ├── book.astro
│   └── api/
│       ├── channex/
│       │   └── availability.ts
│       ├── create-preference.ts
│       └── webhook-mercado-pago.ts
├── services/
│   ├── channex.ts
│   └── mercadopago.ts
├── data/
│   ├── rooms.ts       ← Datos de las 5 habitaciones
│   ├── services.ts    ← Lista de 11 servicios
│   └── attractions.ts ← Atracciones de Cusco
├── i18n/
│   ├── en.json
│   └── es.json
└── styles/
    └── global.css
```

## Paso 5: Layout base con View Transitions

El layout debe incluir:
- `<ViewTransitions />` de `astro:transitions`
- Google Fonts: Playfair Display + Outfit
- Script de dark mode (detectar preferencia del sistema)
- Meta tags SEO base

## Paso 6: Copiar assets

Copiar las fotos y logos desde las carpetas raíz del proyecto a `src/assets/`:
- `USGAR LOGO/*.png` → `src/assets/logos/`
- `FOTOS/*.jpg` → `src/assets/hotel/`
- `Doble Superior Room/*.jpg` → `src/assets/rooms/doble-superior/`
- `Matrimonial Room/*.jpg` → `src/assets/rooms/matrimonial/`
- `Quadruple Superior Room/*.jpg` → `src/assets/rooms/quadruple-superior/`
- Para habitaciones sin fotos, usar fotos de `src/assets/hotel/` como placeholder

## Paso 7: Verificar

```bash
npm run build
```

Si compila sin errores, el scaffolding está completo.
