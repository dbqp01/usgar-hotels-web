---
name: "image-optimizer"
description: "Optimizar imágenes pesadas del hotel USGAR usando el componente Image de astro:assets. Convertir fotos profesionales de 20-35MB JPG a WebP optimizado de ~300KB. Lazy loading, responsive images, rendimiento Lighthouse"
---

# Optimización de Imágenes — USGAR Hotels

## Problema

Las fotos profesionales del hotel pesan 20-35MB cada una (formato JPG, resolución DSLR).
La web no puede servir imágenes tan pesadas. Necesitamos compresión automática.

## Solución: Astro `<Image />`

Astro procesa las imágenes en **build time**, generando versiones WebP optimizadas automáticamente.

### Uso correcto

```astro
---
import { Image } from 'astro:assets';
import roomPhoto from '../assets/rooms/doble-superior/_DSC3937.jpg';
---

<Image
  src={roomPhoto}
  alt="Habitación Doble Superior — USGAR Hotels San Pedro"
  width={1200}
  height={800}
  format="webp"
  quality={80}
  loading="lazy"
  decoding="async"
  class="rounded-lg"
/>
```

### USO INCORRECTO — NUNCA hacer esto

```html
<!-- ❌ NUNCA usar <img> con ruta directa para fotos del hotel -->
<img src="/fotos/_DSC3937.jpg" />

<!-- ❌ NUNCA importar desde public/ -->
<img src="/public/rooms/photo.jpg" />
```

## Reglas

1. **SIEMPRE** importar imágenes desde `src/assets/` (no desde `public/`)
2. **SIEMPRE** usar `<Image />` de `astro:assets` para fotos del hotel
3. **SIEMPRE** especificar `format="webp"` y `quality={80}`
4. **SIEMPRE** usar `loading="lazy"` excepto para la primera imagen visible (above the fold)
5. **SIEMPRE** incluir alt text descriptivo para SEO y accesibilidad
6. Para la imagen hero/above-the-fold: usar `loading="eager"` y `fetchpriority="high"`
7. Especificar `width` y `height` para evitar layout shift (CLS)

## Tamaños recomendados

| Contexto | Width | Quality |
|---|---|---|
| Hero fullscreen | 1920 | 85 |
| Room card thumbnail | 800 | 80 |
| Galería lightbox | 1600 | 85 |
| Galería thumbnail | 400 | 75 |
| Logo | original | 90 |

## Responsive Images

```astro
<Image
  src={photo}
  widths={[400, 800, 1200, 1600]}
  sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px"
  format="webp"
  quality={80}
  alt="..."
/>
```

## Videos

Los videos NO se procesan con `<Image />`. Usar `<video>` nativo:

```html
<video
  autoplay
  muted
  loop
  playsinline
  preload="metadata"
  poster="/video-poster.webp"
>
  <source src="/videos/room-tour.mp4" type="video/mp4" />
</video>
```

Los videos van en `public/videos/` (no se procesan en build).
Los posters de video SÍ se procesan con `<Image />`.

## Objetivo de Rendimiento

- Lighthouse Performance: > 90
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1
- Total page weight: < 2MB en la primera carga
