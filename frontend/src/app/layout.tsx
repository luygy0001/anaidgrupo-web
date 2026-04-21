import type { Metadata } from 'next';
import './globals.css';
import { SITE_NAME, SITE_URL } from '@/lib/constants';
import ConsentAndGTM from '@/components/tracking/ConsentAndGTM';
import GTMNoScript from '@/components/tracking/GTMNoScript';
import CookieYesLoader from '@/components/tracking/CookieYesLoader';
import ClickTracker from '@/components/tracking/ClickTracker';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `Reformas integrales en Madrid con profesionales validados y presupuesto claro · ${SITE_NAME}`,
    template: `%s · ${SITE_NAME}`,
  },
  description:
    'Conectamos tu proyecto con profesionales validados en Madrid. Proceso ágil, presupuesto claro y seguimiento digital. Reformas integrales, baño, cocina, piscinas y servicios técnicos.',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    siteName: SITE_NAME,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Manrope:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
        <ConsentAndGTM />
      </head>
      <body className="min-h-full flex flex-col">
        <GTMNoScript />
        <CookieYesLoader />
        <ClickTracker />
        {children}
      </body>
    </html>
  );
}
