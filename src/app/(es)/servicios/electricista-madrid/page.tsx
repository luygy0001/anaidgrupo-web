import type { Metadata } from 'next';
import ServiceLanding from '@/components/sections/ServiceLanding';
import { PAGINAS_SERVICIO } from '@/content/servicios';

const pagina = PAGINAS_SERVICIO['electricista-madrid'];

export const metadata: Metadata = {
  title: pagina.titulo,
  description: pagina.descripcionMeta,
  alternates: { canonical: '/servicios/electricista-madrid' },
};

export default function ElectricistaPage() {
  return <ServiceLanding {...pagina.landing} />;
}
