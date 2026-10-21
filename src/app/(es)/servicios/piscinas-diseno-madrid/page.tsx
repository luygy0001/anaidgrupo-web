import type { Metadata } from 'next';
import ServiceLanding from '@/components/sections/ServiceLanding';
import { PAGINAS_SERVICIO } from '@/content/servicios';

// Servicio nuevo del 19-10-2026 (decisión 92): solo piscinas de diseño. Sustituye a «Pequeñas obras».
// Fotos reales de una obra de profesionales que hoy forman parte de la red; sin año, lugar ni cliente.

const pagina = PAGINAS_SERVICIO['piscinas-diseno-madrid'];

export const metadata: Metadata = {
  title: pagina.titulo,
  description: pagina.descripcionMeta,
  alternates: { canonical: '/servicios/piscinas-diseno-madrid' },
};

export default function PiscinasDisenoPage() {
  return <ServiceLanding {...pagina.landing} />;
}
