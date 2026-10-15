# Formularios y recepción de contactos

Todos los formularios públicos envían a una sola ruta, `POST /api/lead`
([`src/app/api/lead/route.ts`](../src/app/api/lead/route.ts)), a través de
[`src/lib/enviarFormulario.ts`](../src/lib/enviarFormulario.ts). Los campos exactos y lo que
debe contestar n8n están en [`n8n-contrato-datos.md`](n8n-contrato-datos.md).

| Formulario | Componente | `tipo` |
| --- | --- | --- |
| Presupuesto (`#contacto`: portada, cómo funciona, guías, IA) | `forms/FormPresupuesto` dentro de `sections/CTASection` | `presupuesto` |
| `/contacto` | `forms/FormContacto` | `contacto` |
| `/solicitar-proyecto`, servicios y zonas | `forms/FormSolicitud` | `solicitud` |
| `/unete-red` | `forms/FormProfesional` | `profesional` |

Las reglas del presupuesto (perfiles, calidades por perfil, tipos de obra, metros, condición
de pago) están en [`src/lib/presupuesto.ts`](../src/lib/presupuesto.ts) y las usan a la vez el
formulario y el servidor.

## Variable obligatoria en el servidor

```
N8N_LEAD_WEBHOOK_URL=https://<tu-n8n>/webhook/<id>
N8N_WEBHOOK_SECRET=<secreto largo; el mismo que la credencial «Anaid - Webhook» de n8n>
```

La ruta valida y sanea los campos permitidos de cada tipo y los reenvía en JSON a ese webhook,
con `tipo`, `ip`, `fecha` y `versionContrato`. **Si la variable falta o n8n no responde con 2xx,
el usuario ve un error y se le invita a llamar o escribir por WhatsApp**: nunca se muestra
«recibido» para un contacto que no ha llegado. En los presupuestos, n8n contesta además si es
gratuito (`aceptado`) o de pago (`pago_requerido`) y la web lo muestra al momento.

Las fotos no se suben por el formulario: se piden por WhatsApp después del envío.

## Antibots: Cloudflare Turnstile (los cuatro formularios)

Componente `forms/Turnstile` (sin interacción para casi todo el mundo) y verificación en
`/api/lead` contra Cloudflare. El token solo vale una vez: tras un envío fallido se pide otro.

| Variable | Dónde | Valor |
|---|---|---|
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Dokploy (se incrusta al compilar) | Clave de sitio creada por Luis en Cloudflare para construccionesanaid.com |
| `TURNSTILE_SECRET_KEY` | Dokploy, solo servidor | Clave secreta del mismo widget. **Nunca en el código** |

- Sin `TURNSTILE_SECRET_KEY` **en producción**, la ruta rechaza los envíos (mejor un error
  visible que entrar bots): comprobarlo en la compuerta 3 antes de publicar.
- En local se usan las claves de prueba públicas de Cloudflare (documentación oficial
  «Testing»): sitio `1x00000000000000000000AA` y secreto `1x0000000000000000000000000000000AA`
  (siempre aprueban); secreto `2x0000000000000000000000000000000AA` para probar el rechazo.
- CSP: `https://challenges.cloudflare.com` en `script-src` y `frame-src` (`next.config.ts`).
- Cloudflare debe figurar en la política de privacidad y en la de cookies.

## Accesibilidad del formulario de presupuesto

Grupos con `fieldset` y `legend`, etiquetas vinculadas, errores asociados a cada campo
(`aria-invalid` y `aria-describedby`), resumen de errores con `role="alert"` que recibe el foco
y resultado con `role="status"` cuyo título recibe el foco. Comprobado con axe (0 infracciones)
y con teclado real.

## Probar en local

Receptor falso que devuelve `aceptado` o `pago_requerido` (este último si el correo contiene
«repetido»): ver `n8n-contrato-datos.md`, apartado 3. Arranca la web con
`N8N_LEAD_WEBHOOK_URL=http://localhost:3999`.
