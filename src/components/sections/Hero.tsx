'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Clock,
  ShieldCheck,
  TrendingUp,
  Zap,
  Phone,
} from 'lucide-react';
import { PHONE, PHONE_DISPLAY, WHATSAPP_URL } from '@/lib/constants';
import Container from '@/components/ui/Container';
import WhatsAppIcon from '@/components/shared/WhatsAppIcon';

const SLIDES = [
  {
    tag: 'Salón',
    title: 'Reforma Integral en Chamberí',
    subtitle: 'Salón diáfano con concepto abierto y cocina integrada',
    stat: '+24% revalorización para venta rápida',
    duration: '42 días',
    location: 'Madrid Centro',
    image: '/images/obra-salon.jpg',
  },
  {
    tag: 'Cocina',
    title: 'Cocina de Diseño con Isla',
    subtitle: 'Muebles a medida, encimera de cuarzo e iluminación LED',
    stat: 'Acabados de lujo y máxima durabilidad',
    duration: '18 días',
    location: 'Pozuelo de Alarcón',
    image: '/images/obra-cocina.jpg',
  },
  {
    tag: 'Baño',
    title: 'Baño Principal en Suite',
    subtitle: 'Ducha italiana, microcemento y grifería empotrada',
    stat: 'Estilo spa residencial contemporáneo',
    duration: '12 días',
    location: 'Alcalá de Henares',
    image: '/images/obra-bano.jpg',
  },
  {
    tag: 'Suite',
    title: 'Dormitorio Principal con Vestidor',
    subtitle: 'Armarios integrados a medida y suite luminosa',
    stat: 'Espacios optimizados al milímetro',
    duration: '15 días',
    location: 'Las Rozas',
    image: '/images/obra-dormitorio.jpg',
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const active = SLIDES[currentSlide];

  return (
    <section className="relative min-h-[90vh] flex items-center py-16 lg:py-24 overflow-hidden bg-slate-950">
      {/* ============================================================
          FONDO CINEMÁTICO: Chalet moderno invertido (espejo) y lleno de luz
          ============================================================ */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/chalet-moderno-noche.jpg"
          alt="Chalet moderno de lujo con piscina iluminada al anochecer construido por Construcciones Anaid"
          fill
          priority
          quality={95}
          className="object-cover object-center lg:object-[center_35%] -scale-x-100"
        />

        {/* Máscara luminosa ultra ligera: solo sombra sutil en el lateral del texto para que la foto brille con toda su fuerza */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/45 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
      </div>

      {/* ============================================================
          CONTENIDO EN PRIMER PLANO
          ============================================================ */}
      <Container className="relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Columna de Texto y Conversión (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Tag / Badge de impacto */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/25 border border-amber-400/50 text-amber-300 text-xs font-bold uppercase tracking-wider shadow-md backdrop-blur-md">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              Presupuestos con IA en menos de 60 minutos
            </div>

            {/* H1 de Alto Impacto con sombra de alta definición */}
            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-black tracking-tight text-white leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)]">
              Reformas integrales con <span className="text-amber-400">plazo cerrado de 30 a 60 días</span> y diseño que revaloriza tu inmueble.
            </h1>

            {/* Subtítulo puente */}
            <p className="text-base sm:text-lg text-slate-100 leading-relaxed max-w-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] font-medium">
              Coordinamos arquitectos, interioristas y oficios homologados en Madrid y zona centro. Recibe fotos y porcentaje de avance casi a diario en tu WhatsApp sin tener que perseguir a nadie.
            </p>

            {/* Badges de Confianza Rápidos */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-white bg-slate-950/70 backdrop-blur-md p-2.5 rounded-xl border border-white/15 shadow-md">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Obra en 30-60 días</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-white bg-slate-950/70 backdrop-blur-md p-2.5 rounded-xl border border-white/15 shadow-md">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Precio cerrado por contrato</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-white bg-slate-950/70 backdrop-blur-md p-2.5 rounded-xl border border-white/15 shadow-md col-span-2 sm:col-span-1">
                <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Especialistas en Inversores</span>
              </div>
            </div>

            {/* CTAs Principales (Acción Inmediata) */}
            <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="#contacto"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm uppercase tracking-wider shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 transition-all transform hover:-translate-y-0.5 text-center"
              >
                Pedir Presupuesto en 1h
              </a>

              {/* Botón WhatsApp Oficial con Icono Original y Texto WhatsApp */}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contactar por WhatsApp"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-black text-sm tracking-wide shadow-xl shadow-[#25D366]/30 transition-all transform hover:-translate-y-0.5 text-center"
              >
                <WhatsAppIcon className="w-5 h-5 fill-white text-white shrink-0" />
                <span>WhatsApp</span>
              </a>
            </div>

            <div className="pt-2 flex items-center gap-2 text-xs text-slate-200 font-medium flex-wrap">
              <span className="drop-shadow-sm">Atención técnica directa:</span>
              <a
                href={`tel:${PHONE}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950/80 hover:bg-slate-900 border border-white/20 text-amber-300 hover:text-amber-200 font-bold transition-all shadow-md backdrop-blur-md"
                aria-label={`Llamar al teléfono ${PHONE_DISPLAY}`}
              >
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Llamar al {PHONE_DISPLAY}</span>
              </a>
              <span className="text-slate-300 drop-shadow-sm">(Sin compromiso)</span>
            </div>
          </div>

          {/* Columna Visual de Muestra en directo (5 cols) - Tarjeta de Cristal Translúcido */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-slate-950/65 backdrop-blur-md p-3 sm:p-4 space-y-3">
              {/* Selector interactivo de estancias */}
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-slate-200 font-bold drop-shadow-xs">
                  Galería de Acabados
                </span>
                <div className="flex items-center gap-1">
                  {SLIDES.map((s, i) => (
                    <button
                      key={s.tag}
                      type="button"
                      onClick={() => setCurrentSlide(i)}
                      className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all ${
                        i === currentSlide
                          ? 'bg-amber-400 text-slate-950 shadow-sm'
                          : 'text-slate-300 hover:text-white bg-white/10 hover:bg-white/20'
                      }`}
                    >
                      {s.tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Imagen de foco nítida enmarcada */}
              <div className="relative h-60 sm:h-64 w-full rounded-xl overflow-hidden border border-white/15">
                <Image
                  src={active.image}
                  alt={active.title}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute top-3 right-3 bg-emerald-600/90 backdrop-blur-sm text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md">
                  Finalizada en {active.duration}
                </div>
                <div className="absolute bottom-3 left-3 bg-slate-950/85 backdrop-blur-md text-amber-300 text-[11px] font-bold px-2.5 py-1 rounded-md border border-white/15">
                  {active.location}
                </div>
              </div>

              {/* Ficha técnica de la obra en curso */}
              <div className="space-y-1 text-left pt-1">
                <h3 className="text-sm font-bold text-white drop-shadow-xs">
                  {active.title}
                </h3>
                <p className="text-xs text-slate-200 leading-snug">
                  {active.subtitle}
                </p>
                <p className="text-xs text-amber-300 font-semibold pt-0.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {active.stat}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
