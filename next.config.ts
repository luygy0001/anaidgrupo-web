import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  // Sin la cabecera «X-Powered-By: Next.js»: no dar pistas de la tecnología del servidor.
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.construccionesanaid.com',
      },
      {
        protocol: 'https',
        hostname: 'anaidgrupo.com',
      },
    ],
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
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              // Web provisional: sin scripts ni marcos de terceros (Turnstile vuelve con la versión completa)
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "frame-src 'none'",
              // Fuentes propias (next/font): sin Google Fonts
              "style-src 'self' 'unsafe-inline'",
              "font-src 'self' data:",
              "img-src 'self' data: blob: https:",
              "connect-src 'self' https://*.construccionesanaid.com",
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
