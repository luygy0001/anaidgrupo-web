# Registro de decisiones — Construcciones Anaid

## 2026-10-06

- **Fuera el contenido inventado de la portada** (commit `1f48df6`): opiniones con sello
  «Verificado», cifras (45 días, +22 %, 70 %), «la primera constructora de Madrid».
  Motivo: nada se publica sin dato real de Luis.
- **Formularios unificados en `/api/lead` → n8n** (commit `413079a`). Sin webhook o con
  fallo de n8n, el usuario ve un error y se le manda a teléfono o WhatsApp. Las fotos se
  piden por WhatsApp.
- **Las fotos de la galería son obras reales de Anaid** (lo confirma Luis). Quité la galería
  y las marqué como «imagen orientativa» antes de saberlo: hay que restaurarlas con los
  datos reales de cada obra. Pendiente: lugar y plazo reales de cada foto (la cocina y el
  baño tenían datos distintos en la cabecera y en la galería).

### Compuerta 1 — respuestas de Luis (2026-10-06)

1. **Modelo:** red coordinada por Luis, con arquitectos y la mayoría de oficios del sector
   disponibles para cualquier necesidad. Se puede decir «coordinado por arquitectos».
2. **Zona:** toda la Comunidad de Madrid. **Valdeavero no debe aparecer** en la web
   (salvo donde la ley lo exija: ver nota sobre el aviso legal).
3. **Plazos:** se fijan por contrato en cada obra; varían con la magnitud y dificultad; por
   experiencia no suelen pasar de 60 días. Redactar así, sin «garantizado» genérico.
4. **Presupuesto en 1 hora:** se cumple con una automatización de n8n que Luis va a crear;
   la web debe conectarse a ella. El formulario se rediseña para recoger todo lo necesario.
5. **Precios por m²:** media-baja 700 €, media 900 €, alta 1.050 €.
6. **Calidades por perfil:** particular, las tres; inmobiliaria, solo media-baja;
   inversor, media-baja y media.
7. **Antibots** obligatorio.
8. **Presupuestos repetidos:** a partir del segundo presupuesto con el mismo email se bloquea
   y se avisa de que cada presupuesto adicional cuesta 150 € (Bizum o transferencia; medios
   de pago por concretar).
9. **Versión en inglés:** se retira.
10. **Panel (`/panel`):** pendiente; Luis pidió una explicación sencilla.
11. **Infraestructura:** dominio en Hostinger; VPS con Dokploy y Docker.

### Compuerta 1 — segunda ronda (2026-10-06)

12. **Valdeavero** solo en aviso legal y privacidad, como exige la ley. En ningún otro sitio.
13. **Correos disponibles:** info@, admi@, hola@ y redes@construccionesanaid.com. Criterio
    aplicado: **info@** como correo público (contacto, aviso legal, privacidad y derechos
    RGPD); **redes@** para perfiles sociales; admi@ y hola@ no se publican.
14. **Cloudflare Turnstile** aprobado como antibots (mencionarlo en cookies y privacidad).
15. **Precios:** nunca con IVA y **no se publican**. El cliente solo elige la calidad; n8n
    calcula el presupuesto con sus datos. Los €/m² (700 / 900 / 1.050) son internos de n8n.
16. **Presupuestos repetidos:** la regla de los 150 € vale para los tres perfiles.
    Inmobiliarias e inversores tienen además un contador de **1 por semana**.
    Interpretación a confirmar: particular, 1 gratis en total; inmobiliaria e inversor,
    1 gratis por semana; el resto, 150 €. El control lo hace n8n (guarda el historial).
17. **n8n** está en el VPS de Hostinger. Luis tiene **Google Workspace** (Gmail, Sheets),
    útil para que n8n envíe el presupuesto y guarde los contactos.
18. **Automatizaciones:** la web deja todo listo y documentado (datos que envía, respuestas
    que espera); Luis monta los flujos de n8n después.

19. **Panel `/panel` se retira.** Al principio los contactos se gestionan con n8n y una base
    de datos. Se quita en la fase de limpieza.

20. **Contrato:** lo firma **Construcciones Anaid** como contratista; responde del plazo y
    subcontrata a la red. Se elimina todo el discurso de «intermediación» / «no ejecutamos
    obras directamente».
21. **Marca:** solo **Construcciones Anaid**. Fuera «Anaid Grupo» de toda la web.
22. **Galería:** vuelve ya, como obras reales de Anaid, con el tipo de obra y sin lugar ni
    plazo hasta que Luis pase los datos.

### Fase 1 — Navegación (2026-10-06, hecha)

Menú con rutas absolutas válidas en todas las páginas (Servicios, Inversores e
inmobiliarias, Cómo trabajamos, Zonas, Guías de precios, Contacto); pie con los 8 servicios;
la portada enlaza a `/servicios` y a `/ia-analisis-proyecto`; las páginas de zona enlazaban
a 4 servicios inexistentes (404) y ahora a los 8 reales; las anclas ya no quedan bajo la
cabecera fija. Criterio de hecho: rastreo desde portada alcanza las 30 páginas del sitemap,
0 enlaces rotos, 0 anclas rotas; verificado a 1366 y 375.
Detectado para la fase de limpieza: `MobileMenu.tsx` no se usa.

### Pendiente de confirmar por Luis

- Lugar y plazo reales de cada foto de la galería.
- Interpretación del contador semanal (punto 16).
