import Container from '@/components/ui/Container';
import { Brain, FileText, Camera, Clock, CheckCircle2, MessageSquareText } from 'lucide-react';
import { WHATSAPP_URL } from '@/lib/constants';

const pilares = [
  {
    icon: FileText,
    title: 'Presupuesto paramétrico en menos de 1 hora',
    description:
      'Mediante nuestro sistema de IA entrenado con precios de obra en la Comunidad de Madrid, calculamos desgloses fiables de materiales, mano de obra e instalaciones sin esperas de semanas.',
    highlight: 'Sin esperas ni presupuestos inflados',
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
    <section id="metodo-ia" className="py-20 bg-white text-slate-900 relative">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-300 text-xs font-bold uppercase tracking-wider">
            <Brain className="w-3.5 h-3.5 text-amber-600" />
            Tecnología PyMExpert aplicada a la construcción
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            La primera constructora de Madrid donde <span className="text-amber-600">no tienes que perseguir</span> al jefe de obra.
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
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
                className="bg-slate-50/80 p-8 rounded-2xl border border-slate-200/90 hover:border-amber-400/80 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{p.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{p.description}</p>
                </div>

                <div className="pt-4 border-t border-slate-200 flex items-center gap-2 text-xs font-semibold text-emerald-700">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span>{p.highlight}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Banner de llamada de acción intermedia */}
        <div className="mt-12 bg-amber-50 border border-amber-200 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left shadow-xs">
          <div>
            <h4 className="font-bold text-slate-900 text-base">¿Tienes una vivienda que necesitas valorar hoy mismo?</h4>
            <p className="text-xs text-slate-600">Envíanos zona, m² y fotos aproximadas por WhatsApp y recibe estimación en 1 hora.</p>
          </div>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider shrink-0 transition-colors inline-flex items-center gap-2 shadow-xs"
          >
            <MessageSquareText className="w-4 h-4" />
            Valorar mi reforma por WhatsApp
          </a>
        </div>
      </Container>
    </section>
  );
}
