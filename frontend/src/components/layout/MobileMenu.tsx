'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { X, Phone, MessageCircle } from 'lucide-react';
import { NAV_ITEMS, PHONE, PHONE_DISPLAY, WHATSAPP_URL } from '@/lib/constants';
import Button from '@/components/ui/Button';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 h-16 border-b border-border">
          <Image
            src="/img/logo-small.svg"
            alt="Anaid Grupo"
            width={150}
            height={30}
            className="h-7 w-auto"
          />
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-foreground hover:text-primary transition-colors"
            aria-label="Cerrar menú"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto py-4 px-4" aria-label="Menú móvil">
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={onClose}
                  className="block px-4 py-3 text-base font-medium text-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer actions */}
        <div className="border-t border-border p-4 space-y-3">
          <Button href="/solicitar-proyecto" fullWidth>
            Solicitar proyecto gratuito
          </Button>
          <div className="flex gap-3">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border border-border text-sm font-medium text-foreground hover:border-primary hover:text-primary transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
            <a
              href={`tel:${PHONE}`}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border border-border text-sm font-medium text-foreground hover:border-primary hover:text-primary transition-colors"
            >
              <Phone className="w-4 h-4" />
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
