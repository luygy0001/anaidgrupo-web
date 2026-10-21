import type { Metadata } from 'next';
import ZoneLanding from '@/components/sections/ZoneLanding';
import { PAGINAS_ZONA } from '@/content/zonas';

const pagina = PAGINAS_ZONA['majadahonda'];

export const metadata: Metadata = {
  title: pagina.titulo,
  description: pagina.descripcionMeta,
  alternates: { canonical: '/zonas/majadahonda' },
};

export default function MajadahondaPage() {
  return <ZoneLanding {...pagina.landing} />;
}
