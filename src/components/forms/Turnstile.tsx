'use client';

import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';

// ============================================================
// Antibots Cloudflare Turnstile (decisión de Luis, punto 14 de docs/DECISIONES.md).
// - Sin interacción para la mayoría de personas (appearance: interaction-only).
// - El token solo vale una vez: el formulario sube «reinicio» tras cada envío fallido.
// - El servidor lo verifica en /api/lead con TURNSTILE_SECRET_KEY.
// - Sin NEXT_PUBLIC_TURNSTILE_SITE_KEY (desarrollo sin claves) no se pinta nada.
// CSP: https://challenges.cloudflare.com en script-src y frame-src (next.config.ts).
// ============================================================

export const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? '';
export const TURNSTILE_ACTIVO = TURNSTILE_SITE_KEY !== '';

export const MENSAJE_ESPERA_TURNSTILE =
  'Espera unos segundos: estamos comprobando que no eres un robot. Si no avanza, recarga la página o llámanos.';

interface OpcionesTurnstile {
  sitekey: string;
  callback: (token: string) => void;
  'expired-callback': () => void;
  'error-callback': () => void;
  language: string;
  theme: 'auto' | 'light' | 'dark';
  appearance: 'always' | 'execute' | 'interaction-only';
}

interface TurnstileApi {
  render: (contenedor: HTMLElement, opciones: OpcionesTurnstile) => string;
  reset: (id: string) => void;
  remove: (id: string) => void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

interface TurnstileProps {
  onToken: (token: string) => void;
  reinicio?: number;
  tema?: 'light' | 'dark';
}

export default function Turnstile({ onToken, reinicio = 0, tema = 'light' }: TurnstileProps) {
  const contenedorRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<string | null>(null);
  const onTokenRef = useRef(onToken);
  const [apiLista, setApiLista] = useState(false);

  useEffect(() => {
    onTokenRef.current = onToken;
  }, [onToken]);

  useEffect(() => {
    if (!TURNSTILE_ACTIVO || !apiLista || !contenedorRef.current || !window.turnstile || widgetRef.current) return;
    widgetRef.current = window.turnstile.render(contenedorRef.current, {
      sitekey: TURNSTILE_SITE_KEY,
      callback: (token) => onTokenRef.current(token),
      'expired-callback': () => onTokenRef.current(''),
      'error-callback': () => onTokenRef.current(''),
      language: 'es',
      theme: tema,
      appearance: 'interaction-only',
    });
    return () => {
      if (widgetRef.current && window.turnstile) window.turnstile.remove(widgetRef.current);
      widgetRef.current = null;
    };
  }, [apiLista, tema]);

  // Tras un envío fallido, pide un token nuevo
  useEffect(() => {
    if (reinicio > 0 && widgetRef.current && window.turnstile) {
      onTokenRef.current('');
      window.turnstile.reset(widgetRef.current);
    }
  }, [reinicio]);

  if (!TURNSTILE_ACTIVO) return null;

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        // onReady se dispara al cargar y en cada montaje posterior (navegación entre páginas)
        onReady={() => setApiLista(true)}
      />
      <div ref={contenedorRef} />
    </>
  );
}
