'use client';
import Image from 'next/image';
import Link from 'next/link';

import { useEffect, useRef, useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { NAV_ITEMS, PHONE, PHONE_DISPLAY, WHATSAPP_URL, SITE_NAME, PRESUPUESTO_HREF } from '@/lib/constants';
import Container from '@/components/ui/Container';
import WhatsAppIcon from '@/components/shared/WhatsAppIcon';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  // Para devolver el foco al botón cuando el menú se cierra con Escape (WCAG 2.4.3)
  const botonMenuRef = useRef<HTMLButtonElement>(null);

  // Escape cierra el menú móvil (navegación por teclado)
  useEffect(() => {
    if (!mobileOpen) return;
    const cerrarConEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        botonMenuRef.current?.focus();
      }
    };
    document.addEventListener('keydown', cerrarConEscape);
    return () => document.removeEventListener('keydown', cerrarConEscape);
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
      <Container>
        <div className="flex items-center justify-between h-16 lg:h-20 gap-4">
          {/* Logo y Marca Oficial */}
          <Link href="/" className="flex items-center group shrink-0 py-1" aria-label={`${SITE_NAME} - Inicio`}>
            <Image
              src="/images/logo.png"
              alt="Construcciones Anaid - Reformas Integrales y Arquitectura en Madrid"
              width={260}
              height={106}
              priority
              className="h-10 sm:h-12 lg:h-14 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-0.5" aria-label="Navegación principal">
            {NAV_ITEMS.filter((item) => item.label !== 'Inicio' && item.label !== 'Contacto').map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="whitespace-nowrap px-2.5 py-1.5 text-xs font-bold text-slate-700 hover:text-amber-600 transition-colors rounded-lg hover:bg-slate-100/80"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Botones de Acción con Separación Espaciosa */}
          <div className="flex items-center gap-2 sm:gap-3.5 lg:gap-4 shrink-0">
            {/* Divisor vertical */}
            <div className="hidden xl:block h-5 w-px bg-slate-200" />

            {/* Botón de Llamada Telefónica Directa */}
            <a
              href={`tel:${PHONE}`}
              aria-label={`Llamar directamente al ${PHONE_DISPLAY}`}
              className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-xs font-bold text-slate-800 hover:text-amber-600 transition-all shadow-xs group"
            >
              <Phone className="w-3.5 h-3.5 text-amber-600 shrink-0 group-hover:rotate-12 transition-transform" />
              <span className="hidden md:inline font-mono tracking-tight">{PHONE_DISPLAY}</span>
              <span className="md:hidden text-xs">Llamar</span>
            </a>

            {/* Botón WhatsApp Oficial */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contactar por WhatsApp"
              className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-xl bg-[#25D366]/10 text-[#075E54] border border-[#25D366]/30 text-xs font-bold hover:bg-[#25D366]/20 transition-all shadow-xs"
            >
              <WhatsAppIcon className="w-4 h-4 text-[#075E54]" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>

            {/* Botón Contactar (formulario de la portada) */}
            <a
              href={PRESUPUESTO_HREF}
              className="hidden lg:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-sm hover:shadow-md transition-all transform hover:-translate-y-0.5"
            >
              Contactar
            </a>

            {/* Botón menú móvil */}
            <button
              ref={botonMenuRef}
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="xl:hidden p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100"
              aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={mobileOpen}
              aria-controls="menu-movil"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Menú móvil desplegable */}
        {mobileOpen && (
          <nav id="menu-movil" aria-label="Menú" className="xl:hidden py-4 border-t border-slate-200 bg-white space-y-2">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100 hover:text-amber-600 rounded-lg"
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-slate-200 flex flex-col gap-2.5 px-3">
              <a
                href={`tel:${PHONE}`}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 font-bold text-sm hover:text-amber-600 transition-colors"
              >
                <Phone className="w-4 h-4 text-amber-600" />
                <span>Llamar ahora: {PHONE_DISPLAY}</span>
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-bold text-sm shadow-md transition-colors"
              >
                <WhatsAppIcon className="w-5 h-5 fill-slate-950 text-slate-950" />
                <span>WhatsApp</span>
              </a>
              <a
                href={PRESUPUESTO_HREF}
                onClick={() => setMobileOpen(false)}
                className="w-full text-center py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm shadow-md"
              >
                Cuéntanos tu reforma
              </a>
            </div>
          </nav>
        )}
      </Container>
    </header>
  );
}
