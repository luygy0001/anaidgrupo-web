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
            Canal Especializado: Inversores e Inmobiliarias
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Reformas concebidas para <span className="text-amber-600">maximizar la rentabilidad</span> de compra, reforma y venta.
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            En inversión inmobiliaria, el tiempo es el mayor enemigo del margen de beneficio. Diseñamos y ejecutamos reformas exprés en 30-60 días con interiorismo de alta demanda comercial.
          </p>
        </div>

        {/* 2 Columnas de Valor: Para Inversores vs Para Inmobiliarias */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Tarjeta Inversores / Flipping */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-md flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-wider bg-amber-50 border border-amber-200 px-3 py-1 rounded-md">
                <DollarSign className="w-4 h-4 text-amber-600" /> Para Inversores Privados y Fondos
              </div>
              <h3 className="text-2xl font-bold text-slate-900">House Flipping & Alquiler de Alta Rentabilidad</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Comprar un piso antiguo, reformarlo en tiempo récord y venderlo con una plusvalía atractiva o alquilarlo por habitaciones/larga estancia al tramo alto del mercado.
              </p>
              <ul className="space-y-3 text-sm text-slate-700 pt-2">
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Plazo garantizado de 30 a 60 días</strong>: Un mes menos de obra ahorra intereses bancarios y acelera la venta.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Interiorismo neutro y vendedor</strong>: Distribuciones abiertas, luz natural y acabados modernos que destacan en portales.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Presupuesto cerrado sin sorpresas</strong>: Cuidamos cada euro para no mermar tu retorno sobre la inversión (ROI).</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <a
                href="#contacto"
                className="w-full text-center py-3.5 px-6 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Calcular Rentabilidad de mi Próxima Compra</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Tarjeta Inmobiliarias */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-md flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-sky-700 uppercase tracking-wider bg-sky-50 border border-sky-200 px-3 py-1 rounded-md">
                <Building2 className="w-4 h-4 text-sky-600" /> Alianza B2B con Agencias Inmobiliarias
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Desbloquea ventas con compradores indecisos</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                El 70% de los compradores dudan ante una vivienda para reformar porque no saben cuánto les costará la obra. Te damos la cifra técnica en 24h para cerrar la operación.
              </p>
              <ul className="space-y-3 text-sm text-slate-700 pt-2">
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                  <span><strong>Valoración exprés en menos de 24 horas</strong>: Acompañamos a tu cliente o evaluamos con fotos para dar un número seguro.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                  <span><strong>La operación no se cae por la obra</strong>: Tu cliente compra con tranquilidad al tener presupuesto y plazos cerrados.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                  <span><strong>Acuerdos de colaboración continua</strong>: Sinergias transparentes y soporte técnico para tu cartera de clientes.</span>
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
                <span>Proponer Colaboración por WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Caso de éxito de Rentabilidad / Datos Reales */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-md grid sm:grid-cols-4 gap-6 text-center">
          <div>
            <span className="text-2xl sm:text-3xl font-black text-amber-600">45 Días</span>
            <p className="text-xs text-slate-600 mt-1 font-medium">Plazo medio de reforma integral</p>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-black text-emerald-600">+22%</span>
            <p className="text-xs text-slate-600 mt-1 font-medium">Revalorización media en venta rápida</p>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-black text-slate-900">&lt; 1 Hora</span>
            <p className="text-xs text-slate-600 mt-1 font-medium">Entrega de presupuesto estimado</p>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-black text-sky-600">100%</span>
            <p className="text-xs text-slate-600 mt-1 font-medium">Transparencia diaria por WhatsApp</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
