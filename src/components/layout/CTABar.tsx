'use client';

import { Phone, MessageCircle, FileText } from 'lucide-react';
import { PHONE, WHATSAPP_URL } from '@/lib/constants';

export default function CTABar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white border-t border-border shadow-lg">
      <div className="flex items-stretch divide-x divide-border">
        <a
          href="/solicitar-proyecto"
          className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold text-white bg-primary hover:bg-primary-dark transition-colors"
        >
          <FileText className="w-4 h-4" />
          Solicitar proyecto
        </a>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-foreground hover:text-primary transition-colors"
          aria-label="Hablar por WhatsApp"
        >
          <MessageCircle className="w-5 h-5 text-green-600" />
        </a>
        <a
          href={`tel:${PHONE}`}
          className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-foreground hover:text-primary transition-colors"
          aria-label="Llamar ahora"
        >
          <Phone className="w-5 h-5 text-primary" />
        </a>
      </div>
    </div>
  );
}
