import { GTM_ID } from '@/lib/constants';

// Fallback <noscript> que debe ir justo después de <body>.
// Usa iframe clásico de GTM para usuarios con JS deshabilitado.

export default function GTMNoScript() {
  const isPlaceholder = !GTM_ID || GTM_ID === 'GTM-XXXXXXX';
  if (isPlaceholder) return null;

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
