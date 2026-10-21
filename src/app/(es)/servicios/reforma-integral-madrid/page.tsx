import type { Metadata } from 'next';
import ServiceLanding from '@/components/sections/ServiceLanding';
import { PAGINAS_SERVICIO } from '@/content/servicios';

const pagina = PAGINAS_SERVICIO['reforma-integral-madrid'];

export const metadata: Metadata = {
  title: pagina.titulo,
  description: pagina.descripcionMeta,
  alternates: { canonical: '/servicios/reforma-integral-madrid' },
};

export default function ReformaIntegralPage() {
  return <ServiceLanding {...pagina.landing} />;
}
