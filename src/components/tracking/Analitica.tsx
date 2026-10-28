'use client';

import { useEffect } from 'react';
import { ANALITICA_CONFIGURADA } from '@/lib/constants';
import {
  EVENTO_CONSENTIMIENTO,
  activarAnalytics,
  desactivarAnalytics,
  leerConsentimiento,
  type Consentimiento,
} from '@/lib/analitica';

// Carga Google Analytics solo si el visitante ya lo aceptó (en esta visita o en una anterior) y
// reacciona cuando cambia su decisión desde el aviso o desde «Configurar cookies».
export default function Analitica() {
  useEffect(() => {
    if (!ANALITICA_CONFIGURADA) return;
    if (leerConsentimiento()?.analytics) activarAnalytics();

    const alCambiar = (e: Event) => {
      const { analytics } = (e as CustomEvent<Consentimiento>).detail;
      if (analytics) activarAnalytics();
      else desactivarAnalytics();
    };
    window.addEventListener(EVENTO_CONSENTIMIENTO, alCambiar);
    return () => window.removeEventListener(EVENTO_CONSENTIMIENTO, alCambiar);
  }, []);

  return null;
}
