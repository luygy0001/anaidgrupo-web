import Container from '@/components/ui/Container';
import { Brain, MessageSquareText, Clock, Camera, Zap, CheckCircle2 } from 'lucide-react';
import { WHATSAPP_URL } from '@/lib/constants';

const pilares = [
  {
    icon: Zap,
    title: 'Presupuestos con IA en menos de 1 hora',
    description:
      'Procesamos las medidas y estado de tu inmueble con modelos algorítmicos parametrizados a precios reales de mercado en Madrid. Sabrás la viabilidad económica de tu reforma sin esperar semanas.',
    highlight: '60 minutos vs 10 días de la competencia',
  },
  {
    icon: Camera,
    title: 'Reporte diario con fotos directo a tu WhatsApp',
    description:
      'Se acabó desplazarte a la obra o perseguir al contratista por teléfono. Casi a diario recibes en tu móvil fotos del avance, el porcentaje completado de cada fase y las tareas del día siguiente.',
    highlight: 'Transparencia absoluta en tu móvil',
  },
  {
    icon: Clock,
    title: 'Cronograma estricto en 30 a 60 días',
    description:
      'Arquitectos e interioristas coordinan cada gremio (albañilería, fontanería, electricidad, pintura) con cronogramas cerrados. Cada día cuenta para que entres a vivir o vendas tu inmueble rápido.',
    highlight: 'Plazos garantizados por contrato',
  },
];

export default function AIExplainer() {
  return (
    <section id="metodo-ia" className="py-20 bg-slate-900 text-white relative">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold uppercase tracking-wider">
            <Brain className="w-3.5 h-3.5" />
            Tecnología PyMExpert aplicada a la construcción
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            La primera constructora de Madrid donde <span className="text-amber-400">no tienes que perseguir</span> al jefe de obra.
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            Eliminamos de raíz los dos grandes dolores de una reforma: la lentitud en los presupuestos y la incertidumbre durante la obra. Todo controlado desde tu móvil.
          </p>
        </div>

        {/* Grid de 3 Pilares Tecnológicos */}
        <div className="grid md:grid-cols-3 gap-8">
          {pilares.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="bg-slate-950 p-8 rounded-2xl border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-6 shadow-xl"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{p.title}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">{p.description}</p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center gap-2 text-xs font-semibold text-emerald-400">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{p.highlight}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Banner de llamada de acción intermedia */}
        <div className="mt-12 bg-slate-950/60 border border-slate-800 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h4 className="font-bold text-white text-base">¿Tienes una vivienda que necesitas valorar hoy mismo?</h4>
            <p className="text-xs text-slate-400">Envíanos zona, m² y fotos aproximadas por WhatsApp y recibe estimación en 1 hora.</p>
          </div>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shrink-0 transition-colors inline-flex items-center gap-2"
          >
            <MessageSquareText className="w-4 h-4" />
            Valorar mi reforma por WhatsApp
          </a>
        </div>
      </Container>
    </section>
  );
}
