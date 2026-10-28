import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';

// Web provisional (release/web-basica): solo las páginas públicas e indexables. Las legales y la
// de agradecimiento llevan noindex y no van aquí. Al publicar la versión completa, volver a
// añadir guías de precios, IA, únete a la red y solicitar proyecto.
//
// `actualizada` es la fecha real del último cambio importante de cada página (decisión 101) y sale
// en el sitemap como <lastmod>. Cuenta lo que cambia la página para Google: texto visible, título
// o descripción, enlaces y datos estructurados. No cuentan la cabecera, el pie, el aviso de cookies
// ni cambios de código que dejan la página igual. Al cambiar una página, actualiza aquí su fecha;
// si el cambio toca a varias (p. ej. preguntas frecuentes o datos del negocio), a todas las que lo muestran.
const PAGINAS: { path: string; actualizada: string }[] = [
  { path: '', actualizada: '2026-10-21' },
  { path: '/servicios', actualizada: '2026-10-19' },
  { path: '/servicios/reforma-integral-madrid', actualizada: '2026-10-21' },
  { path: '/servicios/reforma-bano-madrid', actualizada: '2026-10-21' },
  { path: '/servicios/reforma-cocina-madrid', actualizada: '2026-10-21' },
  { path: '/servicios/electricista-madrid', actualizada: '2026-10-21' },
  { path: '/servicios/fontanero-madrid', actualizada: '2026-10-21' },
  { path: '/servicios/climatizacion-madrid', actualizada: '2026-10-21' },
  { path: '/servicios/arquitecto-reformas-madrid', actualizada: '2026-10-21' },
  { path: '/servicios/piscinas-diseno-madrid', actualizada: '2026-10-21' },
  { path: '/zonas', actualizada: '2026-10-19' },
  { path: '/zonas/pozuelo-de-alarcon', actualizada: '2026-10-28' },
  { path: '/zonas/las-rozas', actualizada: '2026-10-28' },
  { path: '/zonas/majadahonda', actualizada: '2026-10-28' },
  { path: '/como-funciona', actualizada: '2026-10-19' },
  { path: '/contacto', actualizada: '2026-10-21' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGINAS.map(({ path, actualizada }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: actualizada,
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : path === '/contacto' ? 0.8 : 0.7,
  }));
}
