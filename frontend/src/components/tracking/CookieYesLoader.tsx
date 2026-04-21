import Script from 'next/script';
import { COOKIEYES_ID } from '@/lib/constants';

// CookieYes carga el banner y gestiona las categorías (necesarias, analíticas,
// marketing). La propia plataforma integra Consent Mode v2 si se activa el
// toggle "Google Consent Mode" en su panel, por lo que el puente a
// dataLayer.gtag('consent','update',...) se hace automáticamente al guardar
// preferencias. Si más adelante se cambia de proveedor, este componente es el
// único sitio a modificar.

export default function CookieYesLoader() {
  const isPlaceholder = !COOKIEYES_ID || COOKIEYES_ID === 'CLI-XXXXXXXX';
  if (isPlaceholder) return null;

  return (
    <Script
      id="cookieyes"
      strategy="afterInteractive"
      src={`https://cdn-cookieyes.com/client_data/${COOKIEYES_ID}/script.js`}
    />
  );
}
