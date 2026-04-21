// Tracking helper — push events to Google Tag Manager dataLayer.
// GTM se encarga del fan-out a GA4, Meta Pixel, etc. desde su UI.
// Consent Mode v2 queda a cargo de CookieYes (ver CookieYesLoader).

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    // CookieYes expone una API global para reabrir el banner.
    revisitCkyConsent?: () => void;
  }
}

export type TrackEventParams = Record<string, string | number | boolean | undefined>;

export function trackEvent(name: string, params: TrackEventParams = {}): void {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event: name, ...params });
}

// Helper para disparar "form_submit_contacto" con los parámetros estándar.
// - form_location: si no se pasa, usa window.location.pathname.
// - service: opcional (sólo en formularios que incluyen tipo de servicio).
export function trackFormSubmit(options: {
  form_location?: string;
  service?: string;
} = {}): void {
  const form_location =
    options.form_location ??
    (typeof window !== 'undefined' ? window.location.pathname : 'unknown');
  trackEvent('form_submit_contacto', {
    form_location,
    ...(options.service ? { service: options.service } : {}),
  });
}
