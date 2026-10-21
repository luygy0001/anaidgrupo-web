import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';

/**
 * Rastreadores de IA nombrados uno a uno (Luis, 21-10-2026, igual que en pymexpert.com).
 *
 * La regla general `*` ya los deja pasar, pero nombrarlos deja escrito que el permiso es expreso
 * y no un descuido. Entran también los de entrenamiento: la web no tiene nada privado y conviene
 * que los asistentes conozcan Construcciones Anaid. Las rutas internas quedan fuera para todos.
 *
 * Un grupo con nombre sustituye al `*` para ese rastreador: por eso cada grupo repite el `disallow`.
 */
const rastreadoresIA = [
  // OpenAI (ChatGPT): búsqueda, peticiones del usuario y entrenamiento.
  'OAI-SearchBot',
  'ChatGPT-User',
  'GPTBot',
  // Anthropic (Claude).
  'Claude-SearchBot',
  'Claude-User',
  'ClaudeBot',
  // Perplexity.
  'PerplexityBot',
  'Perplexity-User',
  // Google: Gemini y los resúmenes con IA (Google-Extended es un permiso, no un rastreador).
  'Google-Extended',
  // Microsoft: Bing alimenta a Copilot y a la búsqueda de ChatGPT.
  'Bingbot',
  // Apple, Meta, Amazon y Common Crawl.
  'Applebot',
  'Applebot-Extended',
  'meta-externalagent',
  'Amazonbot',
  'CCBot',
];

// Rutas internas: el formulario envía por /api/; /admin/ no existe hoy, pero queda cerrada de antemano.
const internas = ['/api/', '/admin/'];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      ...rastreadoresIA.map((userAgent) => ({ userAgent, allow: '/', disallow: internas })),
      { userAgent: '*', allow: '/', disallow: internas },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
