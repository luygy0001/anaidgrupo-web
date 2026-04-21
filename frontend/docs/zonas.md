# Landings de zona (municipios)

## Estrategia

La web tiene dos tipos de landings geográficas:

- **`/servicios/<servicio>-madrid`** — landings por **servicio** con cobertura "Madrid capital y Comunidad de Madrid". Son el eje principal de captación por intención de servicio (ej. "reforma de baño Madrid").
- **`/zonas/<municipio>`** — landings por **municipio** para capturar intención geográfica explícita (ej. "reformas Pozuelo"). Cada landing enlaza a los 8 servicios (`-madrid`) en el contexto del municipio y embeda un formulario con `form_location = "zona-<slug>"`.

Las dos capas se cruzan:

- Cada página de servicio (`ServiceLanding`) muestra un bloque **Cobertura en la Comunidad de Madrid** con enlaces a las zonas destacadas y a `/zonas`.
- Cada landing de zona (`ZoneLanding`) muestra una matriz con los 8 servicios enlazando a `/servicios/<slug>-madrid`.

## Estructura

| Ruta                                  | Archivo                                                                    |
| ------------------------------------- | -------------------------------------------------------------------------- |
| `/zonas` (índice, 3 capas)            | [`src/app/(es)/zonas/page.tsx`](../src/app/(es)/zonas/page.tsx)            |
| `/zonas/pozuelo-de-alarcon`           | [`src/app/(es)/zonas/pozuelo-de-alarcon/page.tsx`](../src/app/(es)/zonas/pozuelo-de-alarcon/page.tsx) |
| `/zonas/las-rozas`                    | [`src/app/(es)/zonas/las-rozas/page.tsx`](../src/app/(es)/zonas/las-rozas/page.tsx) |
| `/zonas/majadahonda`                  | [`src/app/(es)/zonas/majadahonda/page.tsx`](../src/app/(es)/zonas/majadahonda/page.tsx) |

Componente compartido: [`src/components/sections/ZoneLanding.tsx`](../src/components/sections/ZoneLanding.tsx).

## Añadir una nueva landing de municipio

1. Crear `src/app/(es)/zonas/<slug>/page.tsx`:

   ```tsx
   import type { Metadata } from 'next';
   import ZoneLanding from '@/components/sections/ZoneLanding';

   const MUNICIPIO = 'Nombre del municipio';
   const SLUG = 'nombre-del-municipio';
   const DESCRIPTION =
     'Reformas y servicios técnicos en <Municipio>. Anaid Grupo asigna al profesional validado más adecuado para tu proyecto en la Comunidad de Madrid.';

   export const metadata: Metadata = {
     title: 'Reformas en <Municipio> | Anaid Grupo',
     description: DESCRIPTION,
     alternates: { canonical: `/zonas/${SLUG}` },
   };

   export default function Page() {
     return (
       <ZoneLanding
         municipio={MUNICIPIO}
         slug={SLUG}
         description={DESCRIPTION}
         introParagraphs={[/* 2-3 párrafos específicos */]}
         highlights={[/* 3-5 puntos concretos del municipio */]}
         crossLinks={[/* 2-3 municipios cercanos con landing */]}
       />
     );
   }
   ```

2. Actualizar [`/zonas/page.tsx`](../src/app/(es)/zonas/page.tsx): marcar `hasLanding: true` en el municipio correspondiente dentro del array `CAPAS`.

3. Añadir la ruta al sitemap: [`src/app/sitemap.ts`](../src/app/sitemap.ts) → `'/zonas/<slug>'`.

4. Verificar que los `crossLinks` de las otras landings se actualizan si procede (enlaces recíprocos).

## Criterios de calidad por landing

- **Title**: ~60 caracteres, patrón "Reformas en <Municipio> | Anaid Grupo".
- **Description**: 150–160 caracteres, con mención al municipio y a la Comunidad de Madrid.
- **H1**: "Reformas y profesionales en <Municipio>" (lo pinta el template).
- **Intro**: 2–3 párrafos específicos del municipio (zonas, tipología de vivienda, tipo de proyecto más frecuente). **No contenido genérico reciclado.**
- **Highlights**: 3–5 puntos realmente diferenciales del municipio.
- **CTA**: formulario embebido con `form_location = "zona-<slug>"`.
- **Schemas**: `LocalBusiness` (areaServed = City containedInPlace "Comunidad de Madrid") + `BreadcrumbList`. Se inyectan automáticamente desde el template.
- **Breadcrumb visible**: Inicio › Zonas › <Municipio>.
- **Cross-links**: mínimo 2 enlaces a zonas cercanas + enlace a `/zonas`.

## Tracking

- Los envíos desde la landing de zona disparan `form_submit_contacto` con `form_location = "zona-<slug>"`.
- Después del envío, el usuario aterriza en `/gracias/solicitud?service=<código>` y se dispara `conversion_thank_you`.
- Ver [`docs/tracking.md`](./tracking.md) para el detalle completo del funnel.

## Capas de cobertura

El índice `/zonas` agrupa municipios en tres capas según estrategia comercial:

1. **Zonas premium** — ticket alto, acabados de gama alta (Pozuelo, Las Rozas, Majadahonda). Actualmente las 3 tienen landing dedicada.
2. **Zona metropolitana sur y corredor del Henares** — volumen (Móstoles, Fuenlabrada, Leganés, Getafe, Alcorcón, Torrejón de Ardoz). Pendientes de landing dedicada.
3. **Núcleo operativo** — Alcalá de Henares, con sede en Valdeavero.

Cuando se cree una landing nueva para una zona de las capas 2 ó 3, marcar `hasLanding: true` en [`/zonas/page.tsx`](../src/app/(es)/zonas/page.tsx) para que el enlace se active y desaparezca el tag "Próximamente landing dedicada".
