import Container from '@/components/ui/Container';
import { TrendingUp, Building2, Clock, CheckCircle, ArrowRight, DollarSign } from 'lucide-react';
import { WHATSAPP_URL } from '@/lib/constants';

export default function InvestorSection() {
  return (
    <section id="inversores" className="py-20 bg-slate-950 text-white relative border-y border-slate-800">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold uppercase tracking-wider">
            <TrendingUp className="w-3.5 h-3.5" />
            Canal Especializado: Inversores e Inmobiliarias
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Reformas concebidas para <span className="text-emerald-400">maximizar la rentabilidad</span> de compra, reforma y venta.
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            En inversión inmobiliaria, el tiempo es el mayor enemigo del margen de beneficio. Diseñamos y ejecutamos reformas exprés en 30-60 días con interiorismo de alta demanda comercial.
          </p>
        </div>

        {/* 2 Columnas de Valor: Para Inversores vs Para Inmobiliarias */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Tarjeta Inversores / Flipping */}
          <div className="bg-slate-900/90 p-8 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider bg-amber-400/10 px-3 py-1 rounded-md">
                <DollarSign className="w-4 h-4" /> Para Inversores Privados y Fondos
              </div>
              <h3 className="text-2xl font-bold text-white">House Flipping & Alquiler de Alta Rentabilidad</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Comprar un piso antiguo, reformarlo en tiempo récord y venderlo con una plusvalía atractiva o alquilarlo por habitaciones/larga estancia al tramo alto del mercado.
              </p>
              <ul className="space-y-3 text-sm text-slate-300 pt-2">
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Plazo garantizado de 30 a 60 días</strong>: Un mes menos de obra ahorra intereses bancarios y acelera la venta.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Interiorismo neutro y vendedor</strong>: Distribuciones abiertas, luz natural y acabados modernos que destacan en portales inmobiliarios.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Presupuesto cerrado sin sorpresas</strong>: Cuidamos cada euro para no mermar tu retorno sobre la inversión (ROI).</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <a
                href="#contacto"
                className="w-full text-center py-3.5 px-6 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-2"
              >
                <span>Calcular Rentabilidad de mi Próxima Compra</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Tarjeta Inmobiliarias */}
          <div className="bg-slate-900/90 p-8 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-sky-400 uppercase tracking-wider bg-sky-400/10 px-3 py-1 rounded-md">
                <Building2 className="w-4 h-4" /> Alianza B2B con Agencias Inmobiliarias
              </div>
              <h3 className="text-2xl font-bold text-white">Desbloquea ventas con compradores indecisos</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                El 70% de los compradores dudan ante una vivienda para reformar porque no saben cuánto les costará la obra. Te damos la cifra técnica en 24h para cerrar la operación.
              </p>
              <ul className="space-y-3 text-sm text-slate-300 pt-2">
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span><strong>Valoración exprés en menos de 24 horas</strong>: Acompañamos a tu cliente o evaluamos con fotos para dar un número seguro.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span><strong>La operación no se cae por la obra</strong>: Tu cliente compra con tranquilidad al tener presupuesto y plazos cerrados.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span><strong>Acuerdos de colaboración continua</strong>: Sinergias transparentes y soporte técnico para tu cartera de clientes.</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-2"
              >
                <span>Proponer Colaboración por WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Caso de Éxito de Rentabilidad / Datos Reales */}
        <div className="bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-800 grid sm:grid-cols-4 gap-6 text-center">
          <div>
            <span className="text-2xl sm:text-3xl font-black text-amber-400">45 Días</span>
            <p className="text-xs text-slate-400 mt-1">Plazo medio de reforma integral</p>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-black text-emerald-400">+22%</span>
            <p className="text-xs text-slate-400 mt-1">Revalorización media en venta rápida</p>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-black text-white">&lt; 1 Hora</span>
            <p className="text-xs text-slate-400 mt-1">Entrega de presupuesto estimado</p>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-black text-sky-400">100%</span>
            <p className="text-xs text-slate-400 mt-1">Transparencia diaria por WhatsApp</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
