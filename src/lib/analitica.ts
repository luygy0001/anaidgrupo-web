// Google Analytics 4 con consentimiento previo (decisión 100).
//
// Nada de Google se carga hasta que el visitante pulsa «Aceptar» en el aviso de cookies: no hay
// script de Consent Mode por adelantado ni avisos sin cookies («modo básico»). Si después rechaza,
// Analytics se desactiva en esa misma visita y se borran sus cookies _ga.

import { ANALITICA_CONFIGURADA, GA_ID } from '@/lib/constants';

export const CLAVE_CONSENTIMIENTO = 'anaid_cookie_consent_v1';
export const EVENTO_CONSENTIMIENTO = 'consentimiento_cambiado';

export interface Consentimiento {
  analytics: boolean;
  timestamp: string;
}

type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

export function leerConsentimiento(): Consentimiento | null {
  try {
    const guardado = localStorage.getItem(CLAVE_CONSENTIMIENTO);
    if (!guardado) return null;
    const datos: unknown = JSON.parse(guardado);
    if (!datos || typeof datos !== 'object') return null;
    const { analytics, timestamp } = datos as Record<string, unknown>;
    return { analytics: analytics === true, timestamp: typeof timestamp === 'string' ? timestamp : '' };
  } catch {
    // Almacenamiento bloqueado (modo privado estricto): se trata como «sin decidir».
    return null;
  }
}

export function guardarConsentimiento(analytics: boolean): void {
  const datos: Consentimiento = { analytics, timestamp: new Date().toISOString() };
  try {
    localStorage.setItem(CLAVE_CONSENTIMIENTO, JSON.stringify(datos));
  } catch {
    // Sin almacenamiento la decisión vale solo para esta visita.
  }
  window.dispatchEvent(new CustomEvent(EVENTO_CONSENTIMIENTO, { detail: datos }));
}

function claveDesactivar(): `ga-disable-${string}` {
  return `ga-disable-${GA_ID}`;
}

// Carga gtag.js y configura GA4. Solo se llama con el consentimiento ya dado.
export function activarAnalytics(): void {
  if (!ANALITICA_CONFIGURADA || typeof window === 'undefined') return;
  (window as unknown as Record<string, unknown>)[claveDesactivar()] = false;

  if (window.gtag) {
    // Ya estaba cargado y se había rechazado en esta visita: se vuelve a permitir.
    window.gtag('consent', 'update', { analytics_storage: 'granted' });
    return;
  }

  window.dataLayer = window.dataLayer ?? [];
  window.gtag = function gtag() {
    // gtag.js espera el objeto arguments tal cual, no un array.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer?.push(arguments);
  };
  window.gtag('consent', 'default', {
    analytics_storage: 'granted',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });
  window.gtag('js', new Date());
  window.gtag('config', GA_ID, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);
}

// Rechazo después de haber aceptado: se corta el envío y se borran las cookies de Analytics.
export function desactivarAnalytics(): void {
  if (!ANALITICA_CONFIGURADA || typeof window === 'undefined') return;
  (window as unknown as Record<string, unknown>)[claveDesactivar()] = true;
  window.gtag?.('consent', 'update', { analytics_storage: 'denied' });

  const dominios = ['', location.hostname, `.${location.hostname.replace(/^www\./, '')}`];
  for (const cookie of document.cookie.split(';')) {
    const nombre = cookie.split('=')[0].trim();
    if (!nombre.startsWith('_ga')) continue;
    for (const dominio of dominios) {
      document.cookie = `${nombre}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${dominio ? `; domain=${dominio}` : ''}`;
    }
  }
}

// Eventos propios (clics en teléfono, WhatsApp…). Sin consentimiento no existe gtag y no se envía nada.
export function trackEvent(nombre: string, parametros: Record<string, string | number | boolean | undefined> = {}): void {
  if (typeof window === 'undefined' || !window.gtag) return;
  if ((window as unknown as Record<string, unknown>)[claveDesactivar()] === true) return;
  window.gtag('event', nombre, parametros);
}
