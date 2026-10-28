'use client';

import { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Cookie, X, Check } from 'lucide-react';
import { guardarConsentimiento, leerConsentimiento } from '@/lib/analitica';

// «Aceptar» y «Rechazar» con el mismo aspecto: rechazar tiene que ser igual de fácil y visible
// que aceptar (guía de cookies de la AEPD).
const BOTON_ELECCION =
  'flex-1 py-1.5 px-3 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition-all shadow-sm active:scale-95 text-center cursor-pointer';

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);

  // La elección guardada se lee al montar: en el servidor no existe localStorage, y leerla en el
  // estado inicial haría que el HTML del servidor y el del navegador no coincidieran (hidratación).
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const guardado = leerConsentimiento();
    if (guardado) {
      setAnalytics(guardado.analytics);
      setVisible(false);
    } else {
      setVisible(true);
    }

    const handleReopen = () => {
      setShowSettings(true);
      setVisible(true);
    };

    window.addEventListener('open_cookie_settings', handleReopen);
    return () => window.removeEventListener('open_cookie_settings', handleReopen);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  // Accesibilidad (WCAG 2.4.11, foco no oculto): mientras el aviso está abierto, la página
  // reserva su altura abajo para que el elemento con foco se desplace por encima de él,
  // y Escape lo cierra por esta visita sin guardar consentimiento (no se activa nada).
  useEffect(() => {
    if (!visible) return;
    const html = document.documentElement;
    const reservarEspacio = () => {
      const alto = bannerRef.current?.offsetHeight ?? 0;
      html.style.scrollPaddingBottom = `${alto + 24}px`;
    };
    reservarEspacio();
    window.addEventListener('resize', reservarEspacio);
    const cerrarConEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setVisible(false);
    };
    document.addEventListener('keydown', cerrarConEscape);
    return () => {
      html.style.scrollPaddingBottom = '';
      window.removeEventListener('resize', reservarEspacio);
      document.removeEventListener('keydown', cerrarConEscape);
    };
  }, [visible, showSettings]);

  // Guarda la decisión y avisa al cargador de Analytics (src/lib/analitica.ts), que lo activa o
  // lo desactiva y borra sus cookies.
  const guardar = (aceptaAnalitica: boolean) => {
    guardarConsentimiento(aceptaAnalitica);
    setAnalytics(aceptaAnalitica);
    setVisible(false);
    setShowSettings(false);
  };

  if (!visible) return null;

  return (
    <div
      ref={bannerRef}
      role="dialog"
      aria-labelledby="cookie-title"
      aria-describedby={showSettings ? undefined : 'cookie-desc'}
      className="fixed bottom-3 inset-x-3 sm:bottom-6 sm:left-4 sm:right-auto sm:max-w-md z-50 animate-in fade-in slide-in-from-bottom-3 duration-300 pointer-events-auto"
    >
      <div className="bg-slate-950/95 backdrop-blur-xl border border-slate-800 rounded-2xl p-3 sm:p-4 shadow-2xl text-white">
        {!showSettings ? (
          /* ============================================================
             VISTA COMPACTA (Mínima intrusión, máxima claridad RGPD/AEPD)
             ============================================================ */
          <div className="space-y-2.5">
            <div className="flex items-start gap-2.5">
              <div className="p-1.5 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-400 shrink-0 mt-0.5">
                <Cookie className="w-4 h-4" />
              </div>
              <div className="space-y-0.5 text-left">
                <p id="cookie-title" className="text-xs font-bold text-white tracking-tight">
                  Transparencia de cookies (RGPD / AEPD)
                </p>
                <p id="cookie-desc" className="text-[11px] text-slate-300 leading-snug">
                  Con tu permiso usamos Google Analytics para contar visitas de forma agregada. Si no lo aceptas, no se carga. Puedes cambiar tu decisión cuando quieras.{' '}
                  <a href="/cookies" className="text-amber-400 hover:underline font-medium">
                    Leer política
                  </a>.
                </p>
              </div>
            </div>

            {/* Fila de Botones Compacta en Móvil */}
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => guardar(true)}
                className={BOTON_ELECCION}
              >
                Aceptar
              </button>

              <button
                type="button"
                onClick={() => guardar(false)}
                className={BOTON_ELECCION}
              >
                Rechazar
              </button>

              <button
                type="button"
                onClick={() => setShowSettings(true)}
                className="py-1.5 px-2 text-[11px] text-slate-400 hover:text-amber-400 underline transition-colors shrink-0 cursor-pointer"
                title="Configurar cookies"
              >
                Ajustes
              </button>
            </div>
          </div>
        ) : (
          /* ============================================================
             MODAL DE AJUSTES DETALLADOS
             ============================================================ */
          <div className="space-y-3 text-left">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <p id="cookie-title" className="text-xs font-bold text-white">Preferencias de privacidad</p>
              </div>
              <button
                type="button"
                onClick={() => setShowSettings(false)}
                className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-900"
                aria-label="Cerrar ajustes"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">Técnicas</span>
                  <span className="text-[10px] text-slate-400">Solo guardan tu decisión sobre las cookies</span>
                </div>
                <span className="text-[10px] font-bold text-amber-400 uppercase">Activas</span>
              </div>

              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">Analíticas</span>
                  <span className="text-[10px] text-slate-400">Google Analytics: visitas contadas de forma agregada</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={analytics}
                    onChange={(e) => setAnalytics(e.target.checked)}
                    role="switch"
                    aria-checked={analytics}
                    aria-label="Cookies analíticas"
                    className="sr-only peer"
                  />
                  <div className="w-8 h-4 bg-slate-700 rounded-full peer peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-white peer-checked:after:translate-x-full peer-checked:bg-amber-400 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all"></div>
                </label>
              </div>
            </div>

            <button
              type="button"
              onClick={() => guardar(analytics)}
              className="w-full py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs inline-flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Guardar selección</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
