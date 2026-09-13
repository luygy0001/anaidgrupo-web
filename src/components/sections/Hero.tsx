'use client';

import { useState, useEffect } from 'react';
import Container from '@/components/ui/Container';
import { WHATSAPP_URL, PHONE, PHONE_DISPLAY } from '@/lib/constants';
import { Clock, ShieldCheck, Zap, TrendingUp, Phone } from 'lucide-react';
import Image from 'next/image';
import WhatsAppIcon from '@/components/shared/WhatsAppIcon';

const SLIDES = [
  {
    image: '/images/obra-salon.jpg',
    title: 'Reforma Integral en Madrid',
    subtitle: 'Salón diáfano con concepto abierto y cocina integrada',
    location: 'Madrid Centro',
    duration: '42 días',
    stat: '+24% revalorización inmobiliaria para venta rápida',
    tag: 'Salón',
  },
  {
    image: '/images/obra-cocina.jpg',
    title: 'Cocina de Diseño con Isla',
    subtitle: 'Mobiliario a medida en nogal y electrodomésticos ocultos',
    location: 'Alcalá de Henares',
    duration: '21 días',
    stat: 'Acabados prémium pensados para máxima durabilidad',
    tag: 'Cocina',
  },
  {
    image: '/images/obra-bano.jpg',
    title: 'Baño en Suite con Microcemento',
    subtitle: 'Ducha italiana con grifería termostática y hornacina LED',
    location: 'Pozuelo de Alarcón',
    duration: '14 días',
    stat: 'Sensación spa y optimización milimétrica del espacio',
    tag: 'Baño',
  },
  {
    image: '/images/obra-dormitorio.jpg',
    title: 'Dormitorio Suite con Iluminación LED',
    subtitle: 'Armarios empotrados integrados y suelo en roble natural',
    location: 'Las Rozas',
    duration: '28 días',
    stat: 'Aislamiento acústico integral y confort de lujo',
    tag: 'Suite',
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Rotación automática suave cada 5.5 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const active = SLIDES[currentSlide];

  return (
    <section className="relative min-h-[680px] lg:min-h-[740px] bg-slate-950 text-white overflow-hidden flex items-center py-16 sm:py-24">
      {/* ============================================================
          FONDO DINÁMICO DIFUMINADO (Carrusel cinemático de obras reales)
          ============================================================ */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {SLIDES.map((slide, idx) => (
          <div
            key={slide.image}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={idx === 0}
              className={`object-cover w-full h-full filter blur-[2px] transition-transform duration-[6500ms] ease-out ${
                idx === currentSlide ? 'scale-110' : 'scale-100'
              }`}
            />
          </div>
        ))}

        {/* Máscara degradada de contraste para que el texto sea 100% legible */}
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50" />
      </div>

      {/* ============================================================
          CONTENIDO EN PRIMER PLANO
          ============================================================ */}
      <Container className="relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Columna de Texto y Conversión (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Tag / Badge de impacto */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider shadow-sm">
              <Zap className="w-3.5 h-3.5" />
              Presupuestos con IA en menos de 60 minutos
            </div>

            {/* H1 de Alto Impacto (Fórmula La Forja: dolor + solución concreta) */}
            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-black tracking-tight text-white leading-tight drop-shadow-md">
              Reformas integrales con <span className="text-amber-400">plazo cerrado de 30 a 60 días</span> y diseño que revaloriza tu inmueble.
            </h1>

            {/* Subtítulo puente */}
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl drop-shadow-sm font-normal">
              Coordinamos arquitectos, interioristas y oficios homologados en Madrid y zona centro. Recibe fotos y porcentaje de avance casi a diario en tu WhatsApp sin tener que perseguir a nadie.
            </p>

            {/* Badges de Confianza Rápidos */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-200 bg-slate-900/60 backdrop-blur-sm p-2 rounded-lg border border-slate-800/80">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Obra en 30-60 días</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-200 bg-slate-900/60 backdrop-blur-sm p-2 rounded-lg border border-slate-800/80">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Precio cerrado por contrato</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-200 bg-slate-900/60 backdrop-blur-sm p-2 rounded-lg border border-slate-800/80 col-span-2 sm:col-span-1">
                <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Especialistas en Inversores</span>
              </div>
            </div>

            {/* CTAs Principales (Acción Inmediata) */}
            <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="#contacto"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm uppercase tracking-wider shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all transform hover:-translate-y-0.5 text-center"
              >
                Pedir Presupuesto en 1h
              </a>

              {/* Botón WhatsApp Oficial con Icono Original y Texto WhatsApp */}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contactar por WhatsApp"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-black text-sm tracking-wide shadow-lg shadow-[#25D366]/25 transition-all transform hover:-translate-y-0.5 text-center"
              >
                <WhatsAppIcon className="w-5 h-5 fill-white text-white shrink-0" />
                <span>WhatsApp</span>
              </a>
            </div>

            <div className="pt-2 flex items-center gap-2 text-xs text-slate-300 font-medium flex-wrap">
              <span>Atención técnica directa:</span>
              <a
                href={`tel:${PHONE}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-amber-400 hover:text-amber-300 font-bold transition-all shadow-sm"
                aria-label={`Llamar al teléfono ${PHONE_DISPLAY}`}
              >
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Llamar al {PHONE_DISPLAY}</span>
              </a>
              <span className="text-slate-400">(Sin compromiso)</span>
            </div>
          </div>

          {/* Columna Visual de Muestra en directo (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-900/90 backdrop-blur-xl p-3 sm:p-4 space-y-3">
              {/* Selector interactivo de estancias */}
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                  Ejemplos de Obra
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
                          : 'text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-800'
                      }`}
                    >
                      {s.tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Imagen de foco nítida enmarcada */}
              <div className="relative h-64 sm:h-72 w-full rounded-xl overflow-hidden border border-slate-800">
                <Image
                  src={active.image}
                  alt={active.title}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute top-3 right-3 bg-emerald-500/90 backdrop-blur-sm text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md">
                  Finalizada en {active.duration}
                </div>
                <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md text-amber-400 text-[11px] font-bold px-2.5 py-1 rounded-md border border-slate-800">
                  {active.location}
                </div>
              </div>

              {/* Ficha técnica de la obra en curso */}
              <div className="space-y-1 text-left pt-1">
                <h3 className="text-sm font-bold text-white">
                  {active.title}
                </h3>
                <p className="text-xs text-slate-300 leading-snug">
                  {active.subtitle}
                </p>
                <p className="text-xs text-amber-400 font-semibold pt-0.5 flex items-center gap-1.5">
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
