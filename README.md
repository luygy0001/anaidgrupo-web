# Construcciones Anaid · web

Web de [construccionesanaid.com](https://www.construccionesanaid.com): Next.js 16, React 19,
Tailwind 4 y TypeScript estricto. Se despliega con el `Dockerfile` del repositorio en Dokploy (VPS
de Hostinger en Fráncfort).

## Versión publicada: web provisional

La rama `release/web-basica` es una versión básica y pública mientras se termina la completa
(rama `fix/contenido-real-y-formularios`), que la sustituirá. Diferencias:

- Un solo formulario de consulta (nombre, teléfono, email, tipo de reforma y mensaje) que llega
  por correo a hola@construccionesanaid.com por el SMTP de Hostinger (`src/app/api/contacto`).
  Campo trampa y límite de 5 envíos cada 15 minutos por IP. Sin n8n, sin IA y sin Turnstile.
- Promesa: «Te respondemos en menos de 48 horas laborables». Sin presupuesto automático ni precios.
- Fuera hasta la versión completa: guías de precios, página de IA, «Únete a la red» y «Solicitar
  proyecto».
- Aviso de mejoras en todas las páginas (`src/components/shared/AvisoMejoras.tsx`).

## Cómo se publica un cambio

1. **Commit en una rama de trabajo** (nunca directamente en `main`).
2. **Pull request a `main`** en GitHub y revisión.
3. **Despliegue:** al fusionar en `main`, Dokploy construye la imagen con el `Dockerfile` y la
   publica (automático si está activado el despliegue automático de la aplicación; si no, botón
   **Deploy** en Dokploy). No se suben archivos a mano al servidor.

Después de cada despliegue: abrir https://www.construccionesanaid.com, comprobar que carga sin
contraseña y enviar una consulta de prueba marcada «(PRUEBA)».

## Variables de entorno (Dokploy > Environment)

| Variable | Obligatoria | Valor |
|---|---|---|
| `SMTP_USER` | Sí | `hola@construccionesanaid.com` |
| `SMTP_PASS` | Sí | Contraseña del buzón hola@ (solo en Dokploy y en el gestor de contraseñas) |
| `SMTP_HOST` | No | Por defecto `smtp.hostinger.com` |
| `SMTP_PORT` | No | Por defecto `465` (SSL). Alternativa de Hostinger: `587` |
| `CONTACTO_DESTINO` | No | A quién llegan las consultas. Por defecto `hola@construccionesanaid.com` |

Sin `SMTP_USER` o `SMTP_PASS`, en producción el formulario responde con error y pide llamar o
escribir por WhatsApp: nunca da por enviada una consulta que no ha salido. En desarrollo, sin
ellas, el envío se simula y se anota en la consola del servidor.

## Desarrollo en local

```bash
npm ci
npm run dev -- -p 3001
```

Comprobaciones antes de cada commit: `npx tsc --noEmit`, `npm run lint` y `npm run build`, y
revisión en el navegador a 1366 y 375 px. Decisiones del proyecto: `docs/DECISIONES.md`.
