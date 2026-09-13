'use client';

import { WHATSAPP_URL } from '@/lib/constants';
import WhatsAppIcon from '@/components/shared/WhatsAppIcon';

export default function WhatsAppButton() {
  return (
    <aside aria-label="Contacto directo por WhatsApp" className="hidden lg:flex fixed bottom-6 right-6 z-40 items-center gap-3">
      {/* Tooltip con aviso de presupuesto rápido */}
      <div className="hidden sm:flex flex-col items-end bg-slate-950/95 backdrop-blur-md text-white px-4 py-2 rounded-2xl shadow-2xl border border-slate-800 text-xs">
        <span className="text-slate-300">¿Presupuesto en 1 hora?</span>
        <span className="text-[#25D366] font-bold">Escríbenos a WhatsApp</span>
      </div>

      {/* Botón Flotante con Icono Oficial y Texto WhatsApp */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2.5 px-4 py-3 sm:px-5 sm:py-3.5 rounded-full bg-[#25D366] text-white shadow-2xl hover:bg-[#20bd5a] hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
        aria-label="Contactar por WhatsApp con Construcciones Anaid"
      >
        <WhatsAppIcon className="w-6 h-6 fill-white shrink-0" />
        <span className="font-bold text-sm tracking-wide">WhatsApp</span>
      </a>
    </aside>
  );
}
