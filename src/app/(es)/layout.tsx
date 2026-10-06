import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/shared/WhatsAppButton';
import CookieConsentBanner from '@/components/shared/CookieConsentBanner';

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
          contenido que puede tapar */}
      <CookieConsentBanner />
      <Header />
      <main id="contenido" tabIndex={-1} className="flex-1 focus:outline-none">{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
