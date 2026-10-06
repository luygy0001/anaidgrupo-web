import Container from '@/components/ui/Container';
import { Zap } from 'lucide-react';
import FormPresupuesto from '@/components/forms/FormPresupuesto';

interface CTASectionProps {
  title?: string;
  subtitle?: string;
}

// Sección del formulario de presupuesto (#contacto). Se usa en portada y en páginas interiores.
export default function CTASection({ title, subtitle }: CTASectionProps = {}) {
  return (
    <section id="contacto" className="py-20 bg-slate-900 text-white relative">
      <Container>
        <div className="max-w-4xl mx-auto bg-slate-950 rounded-3xl border border-slate-800 p-6 sm:p-12 shadow-2xl relative overflow-hidden">
          {/* Luz decorativa */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

          <div className="relative space-y-8">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
                <Zap className="w-3.5 h-3.5" aria-hidden="true" />
                Presupuesto en menos de 24 horas
              </div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                {title || 'Pide tu presupuesto. El primero es gratis.'}
              </h2>
              <p className="text-slate-200 text-sm sm:text-base max-w-2xl mx-auto">
                {subtitle ||
                  'Dinos quién eres, elige la calidad de los acabados y cuéntanos tu obra. Te mandamos el presupuesto al móvil.'}
              </p>
            </div>

            <FormPresupuesto />
          </div>
        </div>
      </Container>
    </section>
  );
}
