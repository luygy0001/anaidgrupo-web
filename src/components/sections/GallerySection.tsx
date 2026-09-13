import Container from '@/components/ui/Container';
import Image from 'next/image';
import { Sparkles, ArrowRight, Eye } from 'lucide-react';
import { WHATSAPP_URL } from '@/lib/constants';

const proyectos = [
  {
    title: 'Reforma Integral & Concepto Abierto',
    location: 'Madrid Centro (Barrio de Salamanca)',
    duration: '45 días',
    image: '/images/obra-salon.jpg',
    description: 'Transformación de vivienda antigua de 110 m² en espacio diáfano con cocina integrada y tarima de roble natural. Revalorización estimada del 24% para venta inmediata.',
    tag: 'Flipping & Inversión',
  },
  {
    title: 'Baño Principal en Suite con Ducha Italiana',
    location: 'Alcalá de Henares (Ensanche)',
    duration: '18 días',
    image: '/images/obra-bano.jpg',
    description: 'Sustitución de bañera por plato de ducha a ras de suelo, microcemento beige de gran formato, mampara industrial negra y doble lavabo suspendido con espejos retroiluminados.',
    tag: 'Diseño & Confort',
  },
  {
    title: 'Cocina de Diseño con Isla de Cuarzo',
    location: 'Madrid (Chamberí)',
    duration: '22 días',
    image: '/images/obra-cocina.jpg',
    description: 'Mobiliario en acabado negro mate antihuellas y madera de nogal, isla central con encimera porcelánica efecto cascada e iluminación LED integrada regulable.',
    tag: 'Reforma de Cocina',
  },
];

export default function GallerySection() {
  return (
    <section id="galeria" className="py-20 bg-slate-900 text-white relative">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Obras y Transformaciones
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Espacios pensados para <span className="text-amber-400">vivir con orgullo</span> o vender con plusvalía.
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Cuidamos la iluminación, los materiales y la ergonomía para que cada metro cuadrado transmita sensación de amplitud, calidez y modernidad.
            </p>
          </div>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-bold text-sm shrink-0 hover:underline"
          >
            <span>Ver más ejemplos y fotos por WhatsApp</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Grid de Proyectos */}
        <div className="grid md:grid-cols-3 gap-8">
          {proyectos.map((p, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-amber-500/40 transition-all group flex flex-col justify-between shadow-xl"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-amber-400 border border-slate-700">
                  {p.tag}
                </div>
                <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-0.5 rounded text-[11px] font-semibold text-emerald-400 border border-slate-700">
                  Plazo: {p.duration}
                </div>
              </div>

              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="text-xs text-slate-400 font-medium">{p.location}</div>
                  <h3 className="font-bold text-lg text-slate-900 group-hover:text-amber-600 transition-colors leading-snug">
                    {p.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {p.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
