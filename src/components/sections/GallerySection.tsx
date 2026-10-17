import Container from '@/components/ui/Container';
import Image from 'next/image';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { WHATSAPP_URL, PRESUPUESTO_HREF } from '@/lib/constants';

type Obra = {
  title: string;
  description: string;
  image: string;
  tag: string;
  // Solo con dato real de Luis: si falta, no se muestra.
  location?: string;
  duration?: string;
};

// Obras reales de profesionales de la red de Construcciones Anaid (confirmado por Luis el
// 06-10-2026). Anaid no ejecuta la obra: la firma el autónomo asignado.
// Pendiente: lugar y plazo reales de cada una.
const proyectos: Obra[] = [
  {
    title: 'Salón a doble altura',
    image: '/images/salon-doble-altura.jpg',
    description: 'Doble altura con grandes ventanales, escalera volada de madera, barandilla de vidrio y suelo en espiga.',
    tag: 'Vivienda unifamiliar',
  },
  {
    title: 'Cocina abierta con isla',
    image: '/images/obra-cocina.jpg',
    description: 'Mobiliario a medida, isla central con encimera porcelánica e iluminación LED integrada.',
    tag: 'Cocina',
  },
  {
    title: 'Baño en suite con ducha a ras de suelo',
    image: '/images/obra-bano.jpg',
    description: 'Plato de ducha a ras de suelo, microcemento de gran formato, mampara negra y doble lavabo suspendido.',
    tag: 'Baño',
  },
];

export default function GallerySection() {
  return (
    <section id="galeria" className="py-20 relative overflow-hidden bg-slate-100 text-slate-900 border-t border-slate-200">
      {/* ============================================================
          FONDO CINEMÁTICO: Foto 100% natural, cero filtros, cero velos
          ============================================================ */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/salon-doble-altura.jpg"
          alt="Salón de lujo a dos alturas con escalera volada de madera y barandilla acristalada, obra de la red de Construcciones Anaid"
          fill
          className="object-cover object-center"
        />
      </div>

      <Container className="relative z-10">
        {/* Cabecera de la Sección: Tarjeta local blanca para lectura impecable sin tapar la foto */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6">
          <div className="space-y-3.5 max-w-2xl text-left bg-white/95 backdrop-blur-md p-6 sm:p-8 rounded-3xl shadow-2xl border border-slate-200/90">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-800 border border-amber-300 text-xs font-bold uppercase tracking-wider shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Obras reales de nuestra red
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Así quedan las casas con <span className="text-amber-600">profesionales de nuestra red</span>.
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
              Obras reales de profesionales de la red de Construcciones Anaid. Si te gusta alguna, pide una parecida y te decimos cuánto costaría en tu casa.
            </p>
          </div>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-slate-900/95 hover:bg-slate-900 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-2xl backdrop-blur-md shrink-0 border border-slate-700 hover:border-amber-400"
          >
            <span>Pide más fotos de obras por WhatsApp</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </a>
        </div>

        {/* Grid de Proyectos con Tarjetas Blancas Nítidas */}
        <div className="grid md:grid-cols-3 gap-8">
          {proyectos.map((p, idx) => (
            <div
              key={idx}
              className="bg-white/95 backdrop-blur-md rounded-2xl overflow-hidden border border-slate-200/90 shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-amber-300 border border-white/15 shadow-sm">
                  {p.tag}
                </div>
                {p.duration && (
                  <div className="absolute bottom-3 right-3 bg-emerald-700 backdrop-blur-md px-2.5 py-0.5 rounded-md text-[11px] font-bold text-white shadow-md">
                    Plazo: {p.duration}
                  </div>
                )}
              </div>

              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between text-left">
                <div className="space-y-2">
                  {p.location && (
                    <div className="text-xs text-amber-700 font-bold uppercase tracking-wider">{p.location}</div>
                  )}
                  <h3 className="font-extrabold text-xl text-slate-900 group-hover:text-amber-600 transition-colors leading-snug">
                    {p.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {p.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Obra de nuestra red
                  </span>
                  <a
                    href={PRESUPUESTO_HREF}
                    className="font-bold text-amber-600 hover:text-amber-700 inline-flex items-center gap-1"
                  >
                    <span>Quiero una así</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
