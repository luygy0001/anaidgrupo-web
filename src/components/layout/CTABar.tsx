'use client';

import { Phone, FileText } from 'lucide-react';
import { PHONE, WHATSAPP_URL } from '@/lib/constants';
import WhatsAppIcon from '@/components/shared/WhatsAppIcon';

export default function CTABar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-2xl safe-area-pb">
      <div className="flex items-stretch divide-x divide-slate-200">
        <a
          href="#contacto"
          className="flex-1 flex items-center justify-center gap-2 py-3.5 text-xs font-black uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 transition-colors shadow-xs"
        >
          <FileText className="w-4 h-4 text-slate-950" />
          <span>Solicitar proyecto (1h)</span>
        </a>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-5 py-3.5 text-xs font-bold text-[#128C7E] bg-emerald-50 hover:bg-emerald-100 transition-colors"
          aria-label="Hablar por WhatsApp con Construcciones Anaid"
        >
          <WhatsAppIcon className="w-5 h-5 text-[#25D366] shrink-0" />
          <span className="hidden sm:inline font-bold">WhatsApp</span>
        </a>
        <a
          href={`tel:${PHONE}`}
          className="flex items-center justify-center gap-2 px-5 py-3.5 text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 transition-colors"
          aria-label="Llamar directamente por teléfono"
        >
          <Phone className="w-4 h-4 text-amber-600" />
          <span className="hidden sm:inline">Llamar</span>
        </a>
      </div>
    </div>
  );
}
