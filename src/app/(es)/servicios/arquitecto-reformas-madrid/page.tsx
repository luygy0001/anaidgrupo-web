import type { Metadata } from 'next';
import ServiceLanding from '@/components/sections/ServiceLanding';
import { PAGINAS_SERVICIO } from '@/content/servicios';

const pagina = PAGINAS_SERVICIO['arquitecto-reformas-madrid'];

export const metadata: Metadata = {
  title: pagina.titulo,
  description: pagina.descripcionMeta,
  alternates: { canonical: '/servicios/arquitecto-reformas-madrid' },
};

export default function ArquitectoPage() {
  return <ServiceLanding {...pagina.landing} />;
}
