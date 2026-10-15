import type { Metadata } from 'next';
import { Inter, Manrope } from 'next/font/google';
import './globals.css';
import { SITE_NAME, SITE_URL } from '@/lib/constants';
import ConsentAndGTM from '@/components/tracking/ConsentAndGTM';
import GTMNoScript from '@/components/tracking/GTMNoScript';
import ClickTracker from '@/components/tracking/ClickTracker';

// Fuentes servidas desde la propia web: next/font las descarga al compilar y el navegador no
// pide nada a Google (sin enviar la IP del visitante a terceros, RGPD). Fuentes variables.
const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });
const manrope = Manrope({ subsets: ['latin'], display: 'swap', variable: '--font-manrope' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `Reformas en la Comunidad de Madrid · ${SITE_NAME}`,
    template: `%s · ${SITE_NAME}`,
  },
  description:
    'Reformas integrales, de cocina y de baño en la Comunidad de Madrid con una red de profesionales coordinada por Construcciones Anaid. Te respondemos en menos de 48 horas.',
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
    <html lang="es" className={`${inter.variable} ${manrope.variable} h-full antialiased`}>
      <head>
        <ConsentAndGTM />
      </head>
      <body className="min-h-full flex flex-col">
        <GTMNoScript />
        <ClickTracker />
        {children}
      </body>
    </html>
  );
}
