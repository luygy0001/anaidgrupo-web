import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ExternalLink,
} from 'lucide-react';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import CookieSettingsButton from '@/components/layout/CookieSettingsButton';
import WhatsAppIcon from '@/components/shared/WhatsAppIcon';
import {
  PHONE,
  PHONE_DISPLAY,
  EMAIL,
  WHATSAPP_URL,
  SOCIAL,
  SITE_NAME,
  HORARIO_DETAIL,
  COVERAGE_AREA,
  POWERED_BY,
  NAV_ITEMS,
  SERVICE_PAGES,
  PRESUPUESTO_HREF,
  ANALITICA_CONFIGURADA,
} from '@/lib/constants';

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.413c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.971h-1.513c-1.491 0-1.956.931-1.956 1.886v2.264h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
    </svg>
  );
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white border-t border-slate-800" role="contentinfo">
      <Container className="py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Marca y Propósito */}
          <div className="space-y-4 lg:col-span-1">
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight text-amber-400">
                Construcciones Anaid
              </span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              Reformas en toda la Comunidad de Madrid. Te asignamos al profesional adecuado de nuestra red, coordinamos la obra y te mandamos el avance casi a diario por WhatsApp.
            </p>
            <div className="flex gap-3 pt-2">
              <a
                href={SOCIAL.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Canal oficial de YouTube de Construcciones Anaid"
                className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-red-400 hover:bg-slate-800 transition-colors"
              >
                <YouTubeIcon className="w-5 h-5" />
              </a>
              <a
                href={SOCIAL.linkedinEmpresa}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Página de LinkedIn de Construcciones Anaid"
                className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-sky-400 hover:bg-slate-800 transition-colors"
              >
                <LinkedInIcon className="w-5 h-5" />
              </a>
              <a
                href={SOCIAL.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Página de Facebook de Construcciones Anaid"
                className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-blue-400 hover:bg-slate-800 transition-colors"
              >
                <FacebookIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Enlaces Rápidos */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-amber-400">
              Navegación
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-300">
              {NAV_ITEMS.filter((item) => item.href !== '/').map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-white transition-colors">{item.label}</Link>
                </li>
              ))}
              <li><a href={PRESUPUESTO_HREF} className="hover:text-white transition-colors">Cuéntanos tu reforma</a></li>
            </ul>
          </div>

          {/* Servicios Clave */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-amber-400">
              Servicios
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-300">
              {SERVICE_PAGES.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="hover:text-white transition-colors">{s.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto Directo */}
          <div className="space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-amber-400">
              Atención Directa
            </h2>
            <div className="space-y-2.5 text-sm text-slate-300">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-emerald-400 font-semibold hover:underline"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#25D366] shrink-0" />
                WhatsApp: {PHONE_DISPLAY}
              </a>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0 text-slate-400" />
                <a href={`tel:${PHONE}`} className="hover:text-white">{PHONE_DISPLAY}</a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0 text-slate-400" />
                <a href={`mailto:${EMAIL}`} className="hover:text-white">{EMAIL}</a>
              </p>
              <p className="flex items-start gap-2 text-xs text-slate-400 pt-1">
                <MapPin className="w-4 h-4 shrink-0 text-slate-500 mt-0.5" />
                <span>{COVERAGE_AREA}</span>
              </p>
              <p className="flex items-start gap-2 text-xs text-slate-400">
                <Clock className="w-4 h-4 shrink-0 text-slate-500 mt-0.5" />
                <span>
                  {HORARIO_DETAIL.tramos.map((tramo) => (
                    <span key={tramo} className="block">
                      {tramo}
                    </span>
                  ))}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Firma PyMExpert y Copyright */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            &copy; {new Date().getFullYear()} {SITE_NAME}. Todos los derechos reservados.
          </p>

          {/* Enlace Obligatorio de Autoría PyMExpert */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
            {/* Espacio real además del hueco visual: los lectores de texto no pegan «porPyMExpert» */}
            <span>Web construida por{' '}</span>
            <a
              href={POWERED_BY.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-amber-400 hover:text-amber-300 inline-flex items-center gap-1 transition-colors"
            >
              {POWERED_BY.name}
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
            <a href="/aviso-legal" className="hover:underline">Aviso Legal</a>
            <a href="/privacidad" className="hover:underline">Privacidad</a>
            <a href="/cookies" className="hover:underline">Cookies</a>
            <a href="/accesibilidad" className="hover:underline">Accesibilidad</a>
            {ANALITICA_CONFIGURADA && (
              <CookieSettingsButton className="hover:underline text-slate-400 hover:text-amber-400 transition-colors">
                Configurar cookies
              </CookieSettingsButton>
            )}
          </div>
        </div>
      </Container>
    </footer>
  );
}
