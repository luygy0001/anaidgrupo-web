import type { NextConfig } from 'next';
import { ANALITICA_CONFIGURADA } from './src/lib/constants';

// Google Analytics (decisión 100): solo si hay ID se abre la CSP a Google. Aun así, nada de Google
// se carga hasta que el visitante acepta (src/lib/analitica.ts).
const GOOGLE_SCRIPT = ANALITICA_CONFIGURADA ? ' https://www.googletagmanager.com' : '';
const GOOGLE_CONNECT = ANALITICA_CONFIGURADA
  ? ' https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com'
  : '';

const scriptSrc =
  process.env.NODE_ENV === 'production'
    ? `script-src 'self' 'unsafe-inline'${GOOGLE_SCRIPT}`
    : `script-src 'self' 'unsafe-inline' 'unsafe-eval'${GOOGLE_SCRIPT}`;

const nextConfig: NextConfig = {
  output: 'standalone',
  // Sin la cabecera «X-Powered-By: Next.js»: no dar pistas de la tecnología del servidor.
  poweredByHeader: false,
  images: {
    // AVIF primero (pesa en torno a un 20 % menos que WebP) y WebP para los navegadores sin AVIF.
    // La primera vez que se pide cada tamaño tarda algo más en generarse; después sale de la caché.
    formats: ['image/avif', 'image/webp'],
    // 75 es la calidad por defecto; 60 solo para la foto de la portada, que va bajo un degradado
    // oscuro: en AVIF pesa la mitad (20 KB en móvil frente a 40 KB) sin diferencia a simple vista.
    qualities: [60, 75],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.construccionesanaid.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        // Servicio retirado el 19-10-2026 (decisión 92): a la lista de servicios, no a una página
        // de otro servicio que no responde a lo que se buscaba.
        source: '/servicios/pequenas-obras-madrid',
        destination: '/servicios',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
          },
          {
            // Aísla la ventana de otros orígenes (Lighthouse lo pide); los enlaces externos ya llevan noopener
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              // Web provisional: sin scripts ni marcos de terceros (Turnstile vuelve con la versión completa).
              // 'unsafe-eval' solo en desarrollo: lo necesita la recarga en caliente de Next, no la producción.
              scriptSrc,
              "frame-src 'none'",
              // Fuentes propias (next/font): sin Google Fonts
              "style-src 'self' 'unsafe-inline'",
              "font-src 'self' data:",
              "img-src 'self' data: blob: https:",
              `connect-src 'self' https://*.construccionesanaid.com${GOOGLE_CONNECT}`,
              "form-action 'self'",
              "frame-ancestors 'none'",
              "base-uri 'self'",
            ].join('; '),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
