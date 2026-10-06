import Container from '@/components/ui/Container';
import { Brain, FileText, Camera, Clock, CheckCircle2, MessageSquareText } from 'lucide-react';
import { WHATSAPP_URL } from '@/lib/constants';

const pilares = [
  {
    icon: FileText,
    title: 'Presupuesto en menos de 24 horas',
    description:
      'Rellenas el formulario, nos cuentas tu obra y eliges la calidad de los acabados. Un sistema de inteligencia artificial prepara el presupuesto, una persona lo revisa y te lo enviamos. Antes de contratar, visitamos la obra para comprobar que todo coincide.',
    highlight: 'Sin esperar semanas',
  },
  {
    icon: Camera,
    title: 'Fotos de tu obra casi cada día',
    description:
      'Estás en el trabajo y te vibra el móvil: fotos de cómo avanza tu cocina. No tienes que pasarte por la obra ni llamar a nadie para saber cómo va.',
    highlight: 'Todo en tu WhatsApp',
  },
  {
    icon: Clock,
    title: 'Plazo y precio en contrato',
    description:
      'Te asignamos al profesional adecuado de nuestra red y firmas con él el contrato, con el plazo y el precio por escrito. Nosotros coordinamos y te acompañamos hasta el final. Por experiencia, la mayoría de obras no pasan de 60 días.',
    highlight: 'Un solo interlocutor: nosotros',
  },
];

export default function AIExplainer() {
  return (
    <section id="metodo-ia" className="py-20 bg-white text-slate-900 relative">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-300 text-xs font-bold uppercase tracking-wider">
            <Brain className="w-3.5 h-3.5 text-amber-600" />
            Con tecnología de PyMExpert
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Una reforma en la que <span className="text-amber-600">no tienes que perseguir</span> a nadie.
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Lo que más quema de una reforma: esperar semanas un presupuesto y no saber cómo va la obra. Aquí tienes el número en menos de 24 horas y el avance en tu móvil.
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

        <p className="mt-8 text-center text-sm">
          <a href="/ia-analisis-proyecto" className="font-semibold text-amber-700 underline hover:text-amber-800">
            Cómo preparamos tu presupuesto
          </a>
        </p>

        {/* Banner de llamada de acción intermedia */}
        <div className="mt-12 bg-amber-50 border border-amber-200 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left shadow-xs">
          <div>
            <h4 className="font-bold text-slate-900 text-base">¿Quieres saber hoy cuánto cuesta reformar tu casa?</h4>
            <p className="text-xs text-slate-600">Escríbenos por WhatsApp con el municipio, los metros y unas fotos. Te decimos el siguiente paso.</p>
          </div>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-bold text-xs uppercase tracking-wider shrink-0 transition-colors inline-flex items-center gap-2 shadow-xs"
          >
            <MessageSquareText className="w-4 h-4" />
            Escribir por WhatsApp
          </a>
        </div>
      </Container>
    </section>
  );
}
