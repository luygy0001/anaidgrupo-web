import Container from '@/components/ui/Container';
import { SERVICES } from '@/lib/constants';
import {
  TrendingUp,
  Building2,
  Home,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  TrendingUp,
  Building2,
  Home,
  Sparkles,
};

export default function ServicesGrid() {
  return (
    <section id="servicios" className="py-20 bg-slate-50 text-slate-900 relative border-y border-slate-200">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-300 text-xs font-bold uppercase tracking-wider">
            Especialidades Técnicas
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Soluciones integrales coordinadas por <span className="text-amber-600">arquitectos y técnicos</span>.
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Centralizamos la dirección facultativa y la ejecución de cada oficio. Una única empresa responsable, un solo interlocutor y plazos auditados.
          </p>
        </div>

        {/* Grid de 4 Servicios Clave */}
        <div className="grid md:grid-cols-2 gap-8">
          {SERVICES.map((s, idx) => {
            const Icon = iconMap[s.icon] || Home;
            return (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-amber-400 hover:shadow-lg transition-all flex flex-col justify-between space-y-6 shadow-md group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full uppercase tracking-wider">
                      {s.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                    {s.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {s.description}
                  </p>

                  <ul className="space-y-2 pt-2 text-xs text-slate-700">
                    {s.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <a
                    href="#contacto"
                    className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 hover:text-amber-700 uppercase tracking-wider transition-colors"
                  >
                    <span>Pedir presupuesto para este servicio</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
