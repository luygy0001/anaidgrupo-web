# Contrato de datos web → n8n (presupuestos)

Versión `2026-10-06` (viaja en cada envío como `versionContrato`). Si cambia algún campo, sube la
versión aquí, en `src/lib/presupuesto.ts` y en el flujo de n8n a la vez.

La web envía cada formulario a `POST /api/lead`, que valida y reenvía a la URL de
`N8N_LEAD_WEBHOOK_URL` (nodo **Webhook** de n8n, método POST, respuesta «Using 'Respond to
Webhook' node»). **Autenticación:** si existe `N8N_WEBHOOK_SECRET`, la web envía la cabecera
`X-Webhook-Secret` con ese valor; en n8n, Header Auth con la credencial `Anaid - Webhook`
(nombre de cabecera `X-Webhook-Secret`, mismo valor). El diseño del flujo está en
`D:\CoworkClaude\n8n-automatizaciones\automatizaciones\construcciones-anaid\presupuesto-desde-formulario`.
Tiempo máximo de espera de la web: **10 segundos**. Si n8n no contesta 2xx a
tiempo, la web muestra un error y pide al cliente que llame o escriba por WhatsApp.

## 1. Presupuesto (`tipo: "presupuesto"`)

| Campo | Tipo | Obligatorio | Valores |
|---|---|---|---|
| `tipo` | texto | sí | `presupuesto` |
| `perfil` | texto | sí | `particular`, `inversor`, `inmobiliaria` |
| `calidad` | texto | sí | `media-baja`, `media`, `alta`. Particular: las tres; inversor: `media-baja` o `media`; inmobiliaria: siempre `media-baja` (la web lo fuerza) |
| `tipoObra` | texto | sí | `reforma-integral`, `cocina`, `bano`, `cocina-y-bano`, `otra` |
| `metros` | número entero | sí, salvo `otra` | 1 a 5000 (m² aproximados) |
| `municipio` | texto | sí | Libre (Comunidad de Madrid) |
| `descripcion` | texto | solo si `tipoObra` es `otra` | Hasta 2000 caracteres |
| `nombre` | texto | sí | |
| `telefono` | texto | sí | Solo cifras, con `+` opcional, 9 a 15 cifras (la web quita espacios) |
| `email` | texto | sí | En minúsculas |
| `aceptaPrivacidad` | booleano | sí | `true` |
| `aceptaCondicionPago` | booleano | sí | `true` (aceptó que los presupuestos adicionales cuestan 150 €) |
| `origenFormulario` | texto | no | Ruta de la página donde se envió (`/`, `/como-funciona`…) |
| `ip` | texto | sí | IP del cliente (para el control de abusos) |
| `fecha` | texto | sí | ISO 8601 en UTC |
| `versionContrato` | texto | sí | `2026-10-06` |

Los campos vacíos no se envían.

### Ejemplo que recibe n8n

```json
{
  "tipo": "presupuesto",
  "perfil": "particular",
  "calidad": "media",
  "tipoObra": "reforma-integral",
  "metros": 85,
  "municipio": "Alcalá de Henares",
  "nombre": "Nombre Apellido",
  "telefono": "600111222",
  "email": "cliente@correo.com",
  "aceptaPrivacidad": true,
  "aceptaCondicionPago": true,
  "origenFormulario": "/",
  "ip": "203.0.113.10",
  "fecha": "2026-10-06T14:48:55.014Z",
  "versionContrato": "2026-10-06"
}
```

### Lo que n8n debe contestar (nodo «Respond to Webhook», JSON, código 200)

n8n decide **en el momento** si el presupuesto es gratuito, mirando su historial por `email`
**y** por `telefono` (cambiar de correo no debe bastar para saltarse la regla):

- Particular: 1 presupuesto gratis en total.
- Inversor e inmobiliaria: 1 presupuesto gratis **por semana**.

| Situación | Respuesta | Lo que ve el cliente |
|---|---|---|
| Gratuito | `{ "estado": "aceptado" }` | «Recibido. Una persona lo revisa y te lo enviamos por correo y por WhatsApp en menos de 24 horas.» |
| Adicional (de pago) | `{ "estado": "pago_requerido", "importe": 150 }` | «Ya tienes un presupuesto gratuito. Este cuesta 150 €; te escribimos por WhatsApp con los datos de pago (Bizum o transferencia). Si crees que es un error, lo revisa una persona.» |

Si n8n contesta 200 sin `estado`, la web lo trata como `aceptado`. **Cualquier otro código**
(4xx, 5xx) o no contestar en 10 s = error visible para el cliente.

### Obligaciones del lado de n8n (cumplimiento)

1. **Presupuesto generado con IA** (AI Act art. 50 y RGPD art. 22): el presupuesto (PDF y
   mensaje) debe decir «Presupuesto elaborado con ayuda de inteligencia artificial» e incluir
   cómo pedir que lo revise una persona (correo info@construccionesanaid.com o teléfono).
2. **Borrador, nunca envío automático** (decisión 45): n8n deja el presupuesto como borrador de
   correo con el PDF y avisa a Luis; Luis lo revisa, lo envía y reenvía el PDF por WhatsApp desde
   la app. En el futuro el borrador irá al profesional encargado de la obra.
3. **WhatsApp lo contesta Luis (una persona)**: no hace falta aviso de IA ni API de WhatsApp.
   **Si algún día las conversaciones las contesta una IA**, el primer mensaje debe decirlo y
   explicar cómo hablar con una persona (AI Act art. 50.1, en vigor desde el 02-08-2026).
4. **Plazo de 24 horas**: la web lo promete; si un borrador lleva más de 20 horas sin enviarse,
   n8n se lo recuerda a Luis para no incumplirlo en silencio.
5. **Datos**: guardar solo lo necesario y el tiempo que dice la política de privacidad (sin obra,
   12 meses; ejecuciones de n8n, 14 días). La política ya nombra a Anthropic (API de Claude), el
   VPS de Hostinger en Fráncfort, Google y Cloudflare: si cambia un proveedor, hay que
   actualizarla. La cuenta de Google es el Workspace de PyMExpert (nunca un Gmail personal) y los
   correos salen como info@construccionesanaid.com.
6. **Precios internos**: los €/m² por calidad (700 / 900 / 1.050, sin IVA) y los textos de cada
   calidad viven solo en n8n; la web nunca los publica.

### Implementación en n8n (2026-10-08)

Construida y probada en el laboratorio con datos sintéticos; detalle en
`D:\CoworkClaude
8n-automatizacionesutomatizaciones\construcciones-anaid\presupuesto-desde-formulario`.

- Webhook `POST /webhook/anaid-solicitudes`, autenticado con la cabecera `X-Webhook-Secret`
  (credencial `Anaid - Webhook` = `N8N_WEBHOOK_SECRET` de la web).
- Responde `{"estado":"aceptado"}` o `{"estado":"pago_requerido","importe":150}` en el momento;
  datos inválidos, 422 con `{"error": "..."}` (la web ya los filtra antes).
- Una petición idéntica en menos de 15 minutos devuelve el mismo estado y no se registra dos veces.
- Contacto, solicitud de proyecto y alta de profesional: `{"estado":"aceptado"}` y registro en la
  pestaña `Contactos`.
- Pendiente para producción: Google Workspace de PyMExpert, instancia n8n de producción y prueba
  con servicios reales. Hasta entonces, la web no tiene `N8N_LEAD_WEBHOOK_URL` y muestra el error
  de contacto directo.

## 2. Otros formularios

| `tipo` | Origen | Campos | Respuesta esperada |
|---|---|---|---|
| `contacto` | `/contacto` | `nombre`, `email` (obligatorio), `telefono`, `mensaje` | 200 |
| `solicitud` | `/solicitar-proyecto`, servicios y zonas | `nombre`, `telefono` (obligatorio), `email`, `codigoPostal`, `tipoServicio`, `noSabeQueNecesita`, `urgencia`, `descripcion`, `origenFormulario` | 200 |
| `profesional` | `/unete-red` | `nombre`, `empresa`, `telefono` (obligatorio), `email`, `especialidades` (lista), `zonas`, `experiencia`, `descripcion` | 200 |

Todos llevan además `tipo`, `ip`, `fecha` y `versionContrato`.

## 3. Cómo probarlo sin n8n

Receptor falso en local (ver la skill `auditoria-web-pymexpert`, referencia de formularios):
devuelve `pago_requerido` si el correo contiene «repetido» y `aceptado` en el resto. Arranca la web
con `N8N_LEAD_WEBHOOK_URL=http://localhost:3999`.
