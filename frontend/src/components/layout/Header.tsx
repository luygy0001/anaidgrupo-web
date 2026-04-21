'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Menu, Phone } from 'lucide-react';
import { NAV_ITEMS, PHONE, PHONE_DISPLAY } from '@/lib/constants';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import MobileMenu from './MobileMenu';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <Container>
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center" aria-label="Anaid Grupo - Inicio">
            <Image
              src="/img/logo-small.svg"
              alt="Anaid Grupo"
              width={180}
              height={36}
              className="h-8 lg:h-9 w-auto"
              priority
            />
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Navegación principal">
            {NAV_ITEMS.filter((item) => item.label !== 'Inicio').map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors rounded-md"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${PHONE}`}
              className="flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-dark transition-colors"
              aria-label={`Llamar al ${PHONE_DISPLAY}`}
            >
              <Phone className="w-4 h-4" />
              <span>{PHONE_DISPLAY}</span>
            </a>
            <Button href="/solicitar-proyecto" size="sm">
              Solicitar proyecto
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
            onClick={() => setMobileOpen(true)}
            aria-label="Abrir menú"
            aria-expanded={mobileOpen ? "true" : "false"}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </Container>

      {/* Mobile menu */}
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
