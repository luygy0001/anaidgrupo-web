'use client';

import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import ChatFlow from './ChatFlow';

export default function ChatGuiado() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Chat bubble trigger — positioned above WhatsApp button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-20 right-20 lg:bottom-6 lg:right-24 z-30 flex items-center gap-2 px-4 py-3 rounded-full bg-primary text-white shadow-lg hover:bg-primary-dark hover:scale-105 transition-all duration-200"
          aria-label="Abrir chat guiado"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm font-medium hidden sm:inline">
            ¿Te ayudamos?
          </span>
        </button>
      )}

      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-0 right-0 sm:bottom-4 sm:right-4 z-50 w-full sm:w-96 sm:max-h-[600px] bg-white sm:rounded-xl shadow-2xl border border-border flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-primary text-white">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              <div>
                <p className="text-sm font-semibold">Asistente Anaid</p>
                <p className="text-xs text-white/70">
                  Te guiamos paso a paso
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Cerrar chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat flow */}
          <ChatFlow onClose={() => setIsOpen(false)} />
        </div>
      )}
    </>
  );
}
