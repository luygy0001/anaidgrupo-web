import type { Metadata } from 'next';
import ServiceLanding from '@/components/sections/ServiceLanding';
import { PAGINAS_SERVICIO } from '@/content/servicios';

const pagina = PAGINAS_SERVICIO['fontanero-madrid'];

export const metadata: Metadata = {
  title: pagina.titulo,
  description: pagina.descripcionMeta,
  alternates: { canonical: '/servicios/fontanero-madrid' },
};

export default function FontaneroPage() {
  return <ServiceLanding {...pagina.landing} />;
}
