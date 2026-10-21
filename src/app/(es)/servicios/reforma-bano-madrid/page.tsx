import type { Metadata } from 'next';
import ServiceLanding from '@/components/sections/ServiceLanding';
import { PAGINAS_SERVICIO } from '@/content/servicios';

const pagina = PAGINAS_SERVICIO['reforma-bano-madrid'];

export const metadata: Metadata = {
  title: pagina.titulo,
  description: pagina.descripcionMeta,
  alternates: { canonical: '/servicios/reforma-bano-madrid' },
};

export default function ReformaBanoPage() {
  return <ServiceLanding {...pagina.landing} />;
}
