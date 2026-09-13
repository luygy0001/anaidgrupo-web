'use client';

import { MessageCircle } from 'lucide-react';
import { WHATSAPP_URL } from '@/lib/constants';

export default function WhatsAppFloatingButton() {
  return (
    <aside aria-label="Contacto directo por WhatsApp" className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      <div className="hidden sm:flex flex-col items-end bg-white text-slate-900 px-3.5 py-1.5 rounded-full shadow-lg border border-slate-200 text-xs font-semibold animate-pulse">
        <span>¿Presupuesto en 1 hora?</span>
        <span className="text-emerald-600 font-bold">Escríbenos por WhatsApp</span>
      </div>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp directamente con Construcciones Anaid"
        className="w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-emerald-300"
      >
        <MessageCircle className="w-8 h-8" />
      </a>
    </aside>
  );
}
