import Container from '@/components/ui/Container';
import { MessageSquareText } from 'lucide-react';
import FormConsulta from '@/components/forms/FormConsulta';
import { RESPUESTA_PLAZO } from '@/lib/constants';

interface CTASectionProps {
  title?: string;
  subtitle?: string;
}

// Sección del formulario de consulta (#contacto). Se usa en portada y en páginas interiores.
// El formulario va sobre una tarjeta blanca: sus etiquetas están pensadas para fondo claro.
export default function CTASection({ title, subtitle }: CTASectionProps = {}) {
  return (
    <section id="contacto" className="py-20 bg-slate-900 text-white relative scroll-mt-20">
      <Container>
        <div className="max-w-3xl mx-auto bg-slate-950 rounded-3xl border border-slate-800 p-6 sm:p-12 shadow-2xl relative overflow-hidden">
          {/* Luz decorativa */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

          <div className="relative space-y-8">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
                <MessageSquareText className="w-3.5 h-3.5" aria-hidden="true" />
                {RESPUESTA_PLAZO}
              </div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                {title || 'Cuéntanos tu reforma'}
              </h2>
              <p className="text-slate-200 text-sm sm:text-base max-w-2xl mx-auto">
                {subtitle ||
                  'Déjanos tus datos y qué quieres reformar. Una persona te contesta por teléfono, WhatsApp o correo para ver tu caso.'}
              </p>
            </div>

            <div className="bg-white text-foreground rounded-2xl p-5 sm:p-8">
              <FormConsulta />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
