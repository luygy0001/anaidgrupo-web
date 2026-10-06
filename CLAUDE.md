@AGENTS.md

# Construcciones Anaid — reglas del proyecto

- Tipo: web con IA (captación de obras de reforma). Modo: interno (marca propia de Luis
  Manuel), pero recoge datos de terceros por formulario: aplica RGPD.
- Pila: Next.js 16 + React 19 + Tailwind 4, TypeScript estricto sin `any`. Despliegue con
  el `Dockerfile` del repositorio. Sin dependencias nuevas sin proponerlas.
- Cómo se arranca en local (sin la contraseña de staging):
  `cmd /c "set STAGING_ENABLED=false&& npm run dev -- -p 3001"`.
- Cómo se prueba: `npx tsc --noEmit`, `npm run lint` y `npm run build`; formularios de
  extremo a extremo con un receptor local en `N8N_LEAD_WEBHOOK_URL` (ver docs/formularios.md).
- Cómo se verifica en navegador: http://localhost:3001 a 1366 y 375 px.
- Prohibido: publicar opiniones, cifras, obras o promesas sin dato real de Luis; reintroducir
  envíos a backends externos desde los formularios; secretos en el código.
- Documentos: docs/DECISIONES.md (registro), docs/formularios.md, docs/zonas.md,
  docs/tracking.md.
- Estado actual y siguiente paso: ver docs/DECISIONES.md (última entrada).
