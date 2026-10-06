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

### Pendiente de confirmar por Luis

- ¿Los €/m² llevan IVA incluido? ¿Valen para todo tipo de obra o solo para la reforma
  integral? (un baño o una cocina suelen presupuestarse por partida, no por m²).
- Regla de los 150 €: ¿para todos los perfiles o solo inmobiliarias e inversores?
  ¿Se detecta también por teléfono, además de por email?
- Lugar y plazo reales de cada foto de la galería.
- ¿Dónde corre n8n: en el mismo VPS?
