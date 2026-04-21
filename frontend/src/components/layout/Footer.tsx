import Image from 'next/image';
import {
  Phone,
  Mail,
  MessageCircle,
  MapPin,
  Clock,
} from 'lucide-react';
import Container from '@/components/ui/Container';
import {
  PHONE,
  PHONE_DISPLAY,
  EMAIL,
  WHATSAPP_URL,
  SOCIAL,
  INTERMEDIATION_DISCLAIMER,
  SITE_NAME,
  HORARIO,
  HORARIO_DETAIL,
  ADDRESS,
  COVERAGE_AREA,
} from '@/lib/constants';
import CookieSettingsButton from '@/components/layout/CookieSettingsButton';

const footerLinks = [
  {
    title: 'Servicios',
    links: [
      { label: 'Servicios', href: '/servicios' },
      { label: 'Solicitar proyecto', href: '/solicitar-proyecto' },
      { label: 'Guías y precios', href: '/guias-precios' },
      { label: 'Zonas de cobertura', href: '/zonas' },
    ],
  },
  {
    title: 'Empresa',
    links: [
      { label: 'Cómo funciona', href: '/como-funciona' },
      { label: 'Únete a la red', href: '/unete-red' },
      { label: 'Contacto', href: '/contacto' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Aviso legal', href: '/aviso-legal' },
      { label: 'Política de privacidad', href: '/privacidad' },
      { label: 'Política de cookies', href: '/cookies' },
    ],
  },
];

// Brand icons — lucide-react doesn't include social media brand icons
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-primary text-white" role="contentinfo">
      <Container className="py-12 lg:py-16">
        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Image
              src="/img/logo-small.svg"
              alt={SITE_NAME}
              width={160}
              height={32}
              className="h-8 w-auto brightness-0 invert"
            />
            <p className="mt-3 text-sm text-white/70 leading-relaxed">
              Analizamos tu proyecto y te conectamos con el profesional adecuado
              en la {COVERAGE_AREA}.
            </p>

            {/* Contact */}
            <div className="mt-4 space-y-2">
              <a
                href={`tel:${PHONE}`}
                className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 shrink-0" />
                {PHONE_DISPLAY}
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 shrink-0" />
                {EMAIL}
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors"
              >
                <MessageCircle className="w-4 h-4 shrink-0" />
                WhatsApp
              </a>
              <div className="flex items-start gap-2 text-sm text-white/60">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{ADDRESS}</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-white/60">
                <Clock className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <p>{HORARIO_DETAIL.atencion}</p>
                  <p>{HORARIO_DETAIL.chatbot}</p>
                </div>
              </div>
            </div>

            {/* Social */}
            <div className="mt-4 flex gap-3">
              <a
                href={SOCIAL.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">
                {col.title}
              </h3>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-white/70 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Intermediation disclaimer */}
        <div className="mt-10 pt-6 border-t border-white/10">
          <p className="text-xs text-white/50 leading-relaxed max-w-4xl">
            {INTERMEDIATION_DISCLAIMER}
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-4 pt-4 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} {SITE_NAME}. Todos los derechos
            reservados.
          </p>
          <div className="flex items-center gap-3 text-xs text-white/40">
            <CookieSettingsButton className="hover:text-white transition-colors underline underline-offset-2">
              Configuración de cookies
            </CookieSettingsButton>
            <span aria-hidden="true">·</span>
            <span>{COVERAGE_AREA}</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
