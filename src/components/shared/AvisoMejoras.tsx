import { Sparkles } from 'lucide-react';

// Aviso de la web provisional (rama release/web-basica): se quita al publicar la versión completa.
// Sin fechas ni promesas concretas (decisión de Luis, 15-10-2026).
export default function AvisoMejoras() {
  return (
    <div className="bg-amber-100 text-amber-950 border-b border-amber-200">
      <p className="mx-auto max-w-5xl px-4 py-2 text-center text-xs sm:text-sm font-medium flex items-center justify-center gap-2">
        <Sparkles className="w-4 h-4 shrink-0 text-amber-700" aria-hidden="true" />
        <span>
          Estamos mejorando esta web. Muy pronto podrás pedir tu presupuesto online, recibirlo en
          menos tiempo y descubrir nuevas secciones.
        </span>
      </p>
    </div>
  );
}
