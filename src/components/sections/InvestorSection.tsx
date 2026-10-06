import Container from '@/components/ui/Container';
import { TrendingUp, Building2, CheckCircle, ArrowRight, DollarSign } from 'lucide-react';
import { WHATSAPP_URL } from '@/lib/constants';

export default function InvestorSection() {
  return (
    <section id="inversores" className="py-20 bg-slate-50 text-slate-900 relative border-y border-slate-200">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold uppercase tracking-wider">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
            Inversores e inmobiliarias
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Reformas pensadas para <span className="text-amber-600">vender o alquilar antes</span>.
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Cada mes de obra es un mes sin vender ni alquilar. Por eso tienes el presupuesto en menos de 1 hora y el plazo fijado en contrato. Por experiencia, la mayoría de obras no pasan de 60 días.
          </p>
        </div>

        {/* 2 Columnas de Valor: Para Inversores vs Para Inmobiliarias */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Tarjeta Inversores / Flipping */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-md flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-wider bg-amber-50 border border-amber-200 px-3 py-1 rounded-md">
                <DollarSign className="w-4 h-4 text-amber-600" /> Para inversores
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Compras, reformas y vendes o alquilas</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Ves un piso para reformar. Antes de hacer la oferta, ya sabes cuánto te costará la obra. Eliges calidad media-baja o media, la que pide el comprador o el inquilino al que vas.
              </p>
              <ul className="space-y-3 text-sm text-slate-700 pt-2">
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Presupuesto en menos de 1 hora</strong>: decides la compra con el coste de la obra delante.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Plazo y precio en contrato</strong>: lo firmas con el profesional asignado. La mayoría de obras no pasan de 60 días.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Un presupuesto gratis cada semana</strong>: para comparar varias compras sin pagar por mirar. Los siguientes, 150 €.</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <a
                href="#contacto"
                className="w-full text-center py-3.5 px-6 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Pedir presupuesto de mi próxima compra</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Tarjeta Inmobiliarias */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-md flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-sky-700 uppercase tracking-wider bg-sky-50 border border-sky-200 px-3 py-1 rounded-md">
                <Building2 className="w-4 h-4 text-sky-600" /> Para inmobiliarias
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Que la obra no frene la venta</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Tu comprador duda porque no sabe cuánto le costará reformar. Con un presupuesto en menos de 1 hora, sale de la duda el mismo día y la operación sigue viva.
              </p>
              <ul className="space-y-3 text-sm text-slate-700 pt-2">
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                  <span><strong>Presupuesto en menos de 1 hora</strong>: con los datos de la vivienda que nos pases.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                  <span><strong>Calidad media-baja</strong>: la cifra realista que tu comprador necesita para decidir.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                  <span><strong>Un presupuesto gratis cada semana</strong>: los siguientes, 150 €.</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Proponer colaboración por WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
