import Script from 'next/script';
import { GTM_ID } from '@/lib/constants';

// Scripts que deben cargarse en <head>:
// 1. Consent Mode v2 defaults (denegado por defecto, UE/RGPD).
// 2. Google Tag Manager (GTM fan-out a GA4 / Meta Pixel / etc.).
// Importante: los defaults de Consent Mode se emiten ANTES de cargar GTM.
// CookieYes actualizará los flags cuando el usuario guarde sus preferencias.

const consentDefaultsSrc = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted',
    wait_for_update: 500,
  });
  gtag('set', 'ads_data_redaction', true);
`.trim();

function gtmSnippet(id: string): string {
  return `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','${id}');`;
}

export default function ConsentAndGTM() {
  const isPlaceholder = !GTM_ID || GTM_ID === 'GTM-XXXXXXX';

  return (
    <>
      <Script
        id="consent-defaults"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: consentDefaultsSrc }}
      />
      {!isPlaceholder && (
        <Script
          id="gtm-loader"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: gtmSnippet(GTM_ID) }}
        />
      )}
    </>
  );
}
