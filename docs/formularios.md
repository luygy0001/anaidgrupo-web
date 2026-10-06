# Formularios y recepción de contactos

Todos los formularios públicos envían a una sola ruta, `POST /api/lead`
([`src/app/api/lead/route.ts`](../src/app/api/lead/route.ts)), a través de
[`src/lib/enviarFormulario.ts`](../src/lib/enviarFormulario.ts).

| Formulario                         | Componente              | `tipo`        |
| ---------------------------------- | ----------------------- | ------------- |
| Presupuesto de portada (`#contacto`) | `sections/CTASection` | `presupuesto` |
| `/contacto`, `/en/contact`         | `forms/FormContacto`    | `contacto`    |
| `/solicitar-proyecto`, zonas, servicios | `forms/FormSolicitud` | `solicitud` |
| `/unete-red`, `/en/join-network`   | `forms/FormProfesional` | `profesional` |

## Variable obligatoria en el servidor

```
N8N_LEAD_WEBHOOK_URL=https://<tu-n8n>/webhook/<id>
```

La ruta valida y sanea los campos permitidos de cada tipo y los reenvía en JSON
a ese webhook, con `tipo`, `ip` y `fecha`. **Si la variable falta o n8n no
responde con 2xx, el usuario ve un error y se le invita a llamar o escribir por
WhatsApp**: nunca se muestra «recibido» para un contacto que no ha llegado.

Las fotos no se suben por el formulario: se piden por WhatsApp después del envío.

## Probar en local

Arranca un receptor cualquiera que devuelva 200 (por ejemplo un webhook de
prueba de n8n) y lanza la web con la variable apuntando a él.
