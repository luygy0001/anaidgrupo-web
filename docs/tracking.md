# Tracking y consentimiento de cookies

## Stack

- **Google Tag Manager** como contenedor único. Desde GTM se despliegan GA4 y Meta Pixel. No se insertan directamente en el HTML.
- **Google Consent Mode v2** con todos los flags de publicidad/analítica denegados por defecto.
- **CookieYes** como gestor del banner y bridge automático al Consent Mode (activar la integración de Google Consent Mode en el panel de CookieYes).

## IDs y placeholders

Ubicación única: [`src/lib/constants.ts`](../src/lib/constants.ts).

| Constante       | Placeholder          | Dónde se usa                                                                   |
| --------------- | -------------------- | ------------------------------------------------------------------------------ |
| `GTM_ID`        | `GTM-XXXXXXX`        | [`ConsentAndGTM.tsx`](../src/components/tracking/ConsentAndGTM.tsx) + [`GTMNoScript.tsx`](../src/components/tracking/GTMNoScript.tsx) |
| `COOKIEYES_ID`  | `CLI-XXXXXXXX`       | [`CookieYesLoader.tsx`](../src/components/tracking/CookieYesLoader.tsx)        |

Mientras la constante mantenga el valor placeholder, el componente **no inyecta el script** (para no romper dev ni generar 404s). En cuanto se sustituya por el ID real, la carga empieza automáticamente.

Los IDs de **GA4** y **Meta Pixel** no viven en el código: se configuran dentro de GTM.

## Orden de carga

1. `<head>` → Consent Mode v2 defaults (`beforeInteractive`, inline). Todos los almacenamientos de publicidad y analítica quedan en `denied`; `functionality_storage` y `security_storage` en `granted`.
2. `<head>` → GTM (`afterInteractive`).
3. `<body>` primera línea → `<noscript>` con iframe de GTM (fallback).
4. `<body>` → CookieYes (`afterInteractive`). Cuando el usuario acepta, CookieYes emite `gtag('consent','update', …)` y desbloquea las etiquetas publicitarias/analíticas en GTM.

## Eventos disparados desde el frontend

Todos los eventos pasan por el helper `trackEvent(name, params)` / `trackFormSubmit(opts)` en [`src/lib/tracking.ts`](../src/lib/tracking.ts). El tagging fino (GA4 events, Pixel custom events, conversions) se configura en GTM leyendo estos eventos del `dataLayer`.

| Evento                    | Cuándo se dispara                                                                    | Parámetros                                                                 | Archivo                                                                                                                      |
| ------------------------- | ------------------------------------------------------------------------------------ | -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `form_submit_contacto`    | Envío correcto de cualquier formulario de contacto o solicitud de presupuesto        | `form_location` (pathname o etiqueta custom), `service` (si aplica)        | [`FormContacto`](../src/components/forms/FormContacto.tsx), [`FormSolicitud`](../src/components/forms/FormSolicitud.tsx), [`FormProfesional`](../src/components/forms/FormProfesional.tsx), [`ChatFlow`](../src/components/chat/ChatFlow.tsx) |
| `click_whatsapp`          | Click en cualquier enlace cuya URL contenga `wa.me`, `api.whatsapp.com` o `web.whatsapp.com` | `link_location`                                                             | [`ClickTracker`](../src/components/tracking/ClickTracker.tsx) (delegación global)                                            |
| `click_telefono`          | Click en cualquier `<a href="tel:…">`                                                | `number`, `link_location`                                                   | [`ClickTracker`](../src/components/tracking/ClickTracker.tsx)                                                                |
| `click_email`             | Click en cualquier `<a href="mailto:…">`                                             | `email`, `link_location`                                                    | [`ClickTracker`](../src/components/tracking/ClickTracker.tsx)                                                                |
| `conversion_thank_you`    | Montaje de `/gracias/[tipo]` tras redirección desde un formulario enviado con éxito  | `conversion_type` (`contacto` \| `solicitud` \| `profesional` \| `chat`), `service` (si aplica) | [`ThankYouFire`](../src/components/tracking/ThankYouFire.tsx) en [`/gracias/[tipo]`](../src/app/(es)/gracias/[tipo]/page.tsx) |

### Flujo de conversión con thank-you page

Tras un envío correcto, cada formulario hace `router.push` a su URL de gracias:

| Formulario        | URL destino                                     | Parámetros query                          |
| ----------------- | ----------------------------------------------- | ----------------------------------------- |
| `FormContacto`    | `/gracias/contacto`                             | —                                         |
| `FormSolicitud`   | `/gracias/solicitud`                            | `service` (código, p.ej. `REFORMA_INTEGRAL`) |
| `FormProfesional` | `/gracias/profesional`                          | —                                         |
| `ChatFlow`        | `/gracias/chat`                                 | `service` (mapeado)                       |

Los eventos `form_submit_contacto` y `conversion_thank_you` son **complementarios**: el primero dispara desde el formulario justo antes de navegar (útil si la navegación falla); el segundo dispara al montar la página de gracias (conversión finalizada). En GTM, define conversiones sobre `conversion_thank_you` y usa `form_submit_contacto` como señal de intención.

Las páginas `/gracias/[tipo]` llevan `robots: { index: false, follow: true }` y **no** se incluyen en el sitemap.

### Uso del helper

```ts
import { trackEvent, trackFormSubmit } from '@/lib/tracking';

// Evento genérico:
trackEvent('mi_evento', { foo: 'bar' });

// Submit de formulario:
trackFormSubmit();                                   // usa window.location.pathname
trackFormSubmit({ service: 'REFORMA_INTEGRAL' });     // añade parámetro service
trackFormSubmit({ form_location: 'zona-pozuelo' });   // etiqueta semántica
```

El helper es SSR-safe: hace no-op cuando no existe `window`.

## Banner y reapertura

- El banner lo pinta CookieYes. Configurar categorías: **Necesarias** (siempre on), **Analíticas** (→ `analytics_storage`), **Marketing** (→ `ad_storage` + `ad_user_data` + `ad_personalization`).
- Activar **Google Consent Mode v2** dentro del panel de CookieYes para que el bridge sea automático (evita escribir JS manual de update).
- Reapertura desde el footer: [`CookieSettingsButton`](../src/components/layout/CookieSettingsButton.tsx) llama a `window.revisitCkyConsent()`. Si CookieYes no está cargado, cae a navegar a `/cookies`.

## Cómo probar (GTM Preview Mode)

1. Sustituye `GTM_ID` y `COOKIEYES_ID` en [`src/lib/constants.ts`](../src/lib/constants.ts) por los reales.
2. `npm run dev` → abre `http://localhost:3000`.
3. En GTM, `Preview` → pon la URL de dev y conecta.
4. Chequeos mínimos:
   - **Consent Mode defaults**: en la consola del navegador, escribe `dataLayer` y verifica que las primeras entradas incluyen el `gtag('consent','default', …)` con los `denied`.
   - **Banner**: aparece CookieYes en primera visita. Aceptar analíticas debería enviar un push `gtag('consent','update', {analytics_storage: 'granted'})` al dataLayer.
   - **`form_submit_contacto`**: rellena y envía `/contacto`; en GTM Preview debe aparecer el evento con `form_location = "/contacto"`.
   - **`click_whatsapp`**: click en el botón flotante → evento con `link_location`.
   - **`click_telefono` / `click_email`**: click en los del footer → eventos con `number` / `email`.
   - **`conversion_thank_you`**: tras enviar un formulario, la URL cambia a `/gracias/<tipo>` y el evento aparece con `conversion_type` correspondiente (y `service` cuando el formulario lo pasa).
5. Para validar Consent Mode con GA4: usar `?gtm_debug=1` y abrir `Tag Assistant` para ver que los hits se envían en modo denegado hasta aceptar.

## Añadir un nuevo evento

1. En el sitio de disparo: `trackEvent('nombre_snake_case', { ... })`.
2. Documentarlo en la tabla de arriba.
3. En GTM: crear un `Trigger` de tipo "Custom Event" con ese nombre exacto, y la etiqueta destino (GA4 event / Meta Pixel CustomEvent).

## Ampliación: municipios (Bloque B)

Las landings de zona deben disparar `form_submit_contacto` con `form_location = "zona-<slug>"` (p.ej. `"zona-pozuelo-de-alarcon"`). El patrón queda resuelto pasando el parámetro al helper desde el formulario embebido en la landing de zona.
