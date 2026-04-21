import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;

  const spanishPages = [
    '',
    '/como-funciona',
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
    '/solicitar-proyecto',
    '/guias-precios',
    '/guias-precios/precios-reformas-madrid',
    '/guias-precios/cuanto-cuesta-reforma-integral',
    '/guias-precios/cuanto-cuesta-reformar-bano',
    '/guias-precios/cuanto-cuesta-reformar-cocina',
    '/guias-precios/checklist-presupuesto',
    '/guias-precios/errores-habituales-reforma',
    '/guias-precios/licencias-dudas-reforma',
    '/ia-analisis-proyecto',
    '/unete-red',
    '/contacto',
  ];

  const englishPages = [
    '/en',
    '/en/how-it-works',
    '/en/services',
    '/en/request-project',
    '/en/join-network',
    '/en/contact',
  ];

  const allPages = [...spanishPages, ...englishPages];

  return allPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' || path === '/en' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : path === '/solicitar-proyecto' ? 0.9 : 0.7,
  }));
}
