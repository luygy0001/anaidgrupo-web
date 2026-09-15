'use client';

import { useState, useEffect } from 'react';
import { ShieldCheck, Cookie, Settings2, X, Check } from 'lucide-react';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
}

const STORAGE_KEY = 'anaid_cookie_consent_v1';

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: CookiePreferences = JSON.parse(stored);
        setAnalytics(!!parsed.analytics);
        setMarketing(!!parsed.marketing);
        setVisible(false);
      } else {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }

    const handleReopen = () => {
      setShowSettings(true);
      setVisible(true);
    };

    window.addEventListener('open_cookie_settings', handleReopen);
    return () => window.removeEventListener('open_cookie_settings', handleReopen);
  }, []);

  const saveConsent = (prefs: { necessary: boolean; analytics: boolean; marketing: boolean }) => {
    const data: CookiePreferences = {
      ...prefs,
      timestamp: new Date().toISOString(),
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // Ignore storage errors in restricted iframe/private mode
    }
    setVisible(false);
    setShowSettings(false);

    if (typeof window !== 'undefined' && (window as unknown as { gtag?: Function }).gtag) {
      (window as unknown as { gtag: Function }).gtag('consent', 'update', {
        analytics_storage: prefs.analytics ? 'granted' : 'denied',
        ad_storage: prefs.marketing ? 'granted' : 'denied',
      });
    }
  };

  if (!visible) return null;

  return (
    <aside
      role="dialog"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-desc"
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
                <h3 id="cookie-title" className="text-xs font-bold text-white tracking-tight">
                  Transparencia de cookies (RGPD / AEPD)
                </h3>
                <p id="cookie-desc" className="text-[11px] text-slate-300 leading-snug">
                  Usamos cookies técnicas para que la web funcione y analíticas para medir visitas. Puedes aceptarlas, rechazarlas o configurarlas.{' '}
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
                onClick={() => saveConsent({ necessary: true, analytics: true, marketing: true })}
                className="flex-1 py-1.5 px-3 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition-all shadow-sm active:scale-95 text-center cursor-pointer"
              >
                Aceptar todas
              </button>

              <button
                type="button"
                onClick={() => saveConsent({ necessary: true, analytics: false, marketing: false })}
                className="flex-1 py-1.5 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white font-semibold text-xs transition-all active:scale-95 text-center cursor-pointer"
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
                <h4 className="text-xs font-bold text-white">Preferencias de privacidad</h4>
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
                  <span className="text-[10px] text-slate-400">Seguridad y funcionamiento básico</span>
                </div>
                <span className="text-[10px] font-bold text-amber-400 uppercase">Activas</span>
              </div>

              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">Analíticas</span>
                  <span className="text-[10px] text-slate-400">Estadísticas anónimas de visita</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={analytics}
                    onChange={(e) => setAnalytics(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-8 h-4 bg-slate-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-amber-400 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all"></div>
                </label>
              </div>

              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">Personalización</span>
                  <span className="text-[10px] text-slate-400">Recuerda tu tipo de proyecto</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={marketing}
                    onChange={(e) => setMarketing(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-8 h-4 bg-slate-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-amber-400 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all"></div>
                </label>
              </div>
            </div>

            <button
              type="button"
              onClick={() => saveConsent({ necessary: true, analytics, marketing })}
              className="w-full py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs inline-flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Guardar selección</span>
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
