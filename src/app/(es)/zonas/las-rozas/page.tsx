import type { Metadata } from 'next';
import ZoneLanding from '@/components/sections/ZoneLanding';
import { PAGINAS_ZONA } from '@/content/zonas';

const pagina = PAGINAS_ZONA['las-rozas'];

export const metadata: Metadata = {
  title: pagina.titulo,
  description: pagina.descripcionMeta,
  alternates: { canonical: '/zonas/las-rozas' },
};

export default function LasRozasPage() {
  return <ZoneLanding {...pagina.landing} />;
}
