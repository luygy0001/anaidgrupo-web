import type { Metadata } from 'next';
import ServiceLanding from '@/components/sections/ServiceLanding';
import { PAGINAS_SERVICIO } from '@/content/servicios';

const pagina = PAGINAS_SERVICIO['reforma-cocina-madrid'];

export const metadata: Metadata = {
  title: pagina.titulo,
  description: pagina.descripcionMeta,
  alternates: { canonical: '/servicios/reforma-cocina-madrid' },
};

export default function ReformaCocinaPage() {
  return <ServiceLanding {...pagina.landing} />;
}
