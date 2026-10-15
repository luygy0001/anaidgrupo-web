import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';

// Web provisional (release/web-basica): solo las páginas públicas e indexables. Las legales y la
// de agradecimiento llevan noindex y no van aquí. Al publicar la versión completa, volver a
// añadir guías de precios, IA, únete a la red y solicitar proyecto.
const PAGINAS = [
  '',
  '/servicios',
  '/servicios/reforma-integral-madrid',
  '/servicios/reforma-bano-madrid',
  '/servicios/reforma-cocina-madrid',
  '/servicios/electricista-madrid',
  '/servicios/fontanero-madrid',
  '/servicios/climatizacion-madrid',
  '/servicios/arquitecto-reformas-madrid',
  '/servicios/pequenas-obras-madrid',
  '/zonas',
  '/zonas/pozuelo-de-alarcon',
  '/zonas/las-rozas',
  '/zonas/majadahonda',
  '/como-funciona',
  '/contacto',
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGINAS.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : path === '/contacto' ? 0.8 : 0.7,
  }));
}
