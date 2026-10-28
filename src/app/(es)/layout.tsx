import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/shared/WhatsAppButton';
import CookieConsentBanner from '@/components/shared/CookieConsentBanner';
import { GTM_CONFIGURADO } from '@/lib/constants';

export default function SpanishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <a href="#contenido" className="saltar-contenido">
        Saltar al contenido
      </a>
      {/* El aviso de cookies va al principio del orden de tabulación: se alcanza antes que el
          contenido que puede tapar. Solo existe si hay medición configurada: sin cookies que
          necesiten permiso no hay nada que aceptar (guía de cookies de la AEPD). */}
      {GTM_CONFIGURADO && <CookieConsentBanner />}
      <Header />
      <main id="contenido" tabIndex={-1} className="flex-1 focus:outline-none">{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
