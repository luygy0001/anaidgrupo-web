import Container from '@/components/ui/Container';
import { Star, Quote, CheckCircle } from 'lucide-react';

const testimonios = [
  {
    nombre: 'Javier M.',
    rol: 'Inversor Inmobiliario (House Flipping en Madrid)',
    texto:
      'Llevo 6 pisos reformados para vender y con Construcciones Anaid es la primera vez que una obra termina exactamente el día fijado en contrato (42 días). El desglose inicial fue clavado sin un solo sobrecoste. Conseguí vender el piso en dos semanas.',
    rating: 5,
    obra: 'Reforma integral 85 m² en Chamberí',
  },
  {
    nombre: 'Carmen R.',
    rol: 'Directora de Agencia Inmobiliaria (Alcalá de Henares)',
    texto:
      'Tener a Construcciones Anaid como partner es una tranquilidad brutal. Cada vez que entra un cliente dudando sobre comprar una vivienda a reformar, les pido una valoración y en 24 horas la tengo. Hemos cerrado 4 operaciones gracias a su agilidad.',
    rating: 5,
    obra: 'Colaboración continua en valoraciones de reformas',
  },
  {
    nombre: 'Beatriz y David',
    rol: 'Propietarios particulares (Madrid Este)',
    texto:
      'Lo de las fotos diarias por WhatsApp es una maravilla. Los dos trabajamos todo el día y no teníamos tiempo de ir al piso a vigilar. Ver cada tarde el avance, las dudas resueltas al momento y la casa impecable nos quitó el 100% del estrés de la obra.',
    rating: 5,
    obra: 'Reforma integral de piso familiar en Ensanche',
  },
];

export default function ReviewsSection() {
  return (
    <section id="testimonios" className="py-20 bg-slate-50 text-slate-900 border-t border-slate-200">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-300 text-xs font-bold uppercase tracking-wider">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            Opiniones Reales de Clientes
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            La tranquilidad de trabajar con <span className="text-amber-600">gente de palabra</span>.
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Nuestros clientes no buscan el presupuesto más chapucero ni promesas en el aire; buscan plazos que se cumplen, números claros y cero quebraderos de cabeza.
          </p>
        </div>

        {/* Grid de Testimonios */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonios.map((t, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-6 shadow-md relative"
            >
              <Quote className="w-8 h-8 text-amber-400/20 absolute top-6 right-6" />

              <div className="space-y-4">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-sm text-slate-700 leading-relaxed italic">
                  &ldquo;{t.texto}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-900 text-sm">{t.nombre}</h3>
                  <span className="flex items-center gap-1 text-[10px] text-emerald-800 bg-emerald-100 border border-emerald-300 px-1.5 py-0.5 rounded font-bold">
                    <CheckCircle className="w-2.5 h-2.5 text-emerald-600" /> Verificado
                  </span>
                </div>
                <p className="text-xs text-amber-700 font-semibold">{t.rol}</p>
                <p className="text-[11px] text-slate-500">{t.obra}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
