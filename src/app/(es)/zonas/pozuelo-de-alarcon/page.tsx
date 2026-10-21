import type { Metadata } from 'next';
import ZoneLanding from '@/components/sections/ZoneLanding';
import { PAGINAS_ZONA } from '@/content/zonas';

const pagina = PAGINAS_ZONA['pozuelo-de-alarcon'];

export const metadata: Metadata = {
  title: pagina.titulo,
  description: pagina.descripcionMeta,
  alternates: { canonical: '/zonas/pozuelo-de-alarcon' },
};

export default function PozueloPage() {
  return <ZoneLanding {...pagina.landing} />;
}
