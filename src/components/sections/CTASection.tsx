'use client';

import { useState } from 'react';
import Container from '@/components/ui/Container';
import { Zap, CheckCircle2, Send, ShieldAlert, ArrowRight, Phone } from 'lucide-react';
import { WHATSAPP_URL, PHONE, PHONE_DISPLAY } from '@/lib/constants';
import WhatsAppIcon from '@/components/shared/WhatsAppIcon';
import { enviarFormulario } from '@/lib/enviarFormulario';

interface CTASectionProps {
  title?: string;
  subtitle?: string;
}

export default function CTASection({ title, subtitle }: CTASectionProps = {}) {
  const [profile, setProfile] = useState<'inversor' | 'inmobiliaria' | 'particular'>('particular');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    const texto = (campo: string) => String(formData.get(campo) ?? '');

    try {
      await enviarFormulario('presupuesto', {
        perfil: profile,
        nombre: texto('nombre'),
        telefono: texto('telefono'),
        email: texto('email'),
        zona: texto('zona'),
        descripcion: texto('detalles'),
        company_fax: texto('company_fax'), // Honeypot anti-spam
      });
      setSubmitted(true);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'No se ha podido procesar la solicitud.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contacto" className="py-20 bg-slate-900 text-white relative">
      <Container>
        <div className="max-w-4xl mx-auto bg-slate-950 rounded-3xl border border-slate-800 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          {/* Luz decorativa */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          {submitted ? (
            <div className="py-12 text-center space-y-6">
              <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                Recibido. Ya estamos con tu presupuesto.
              </h3>
              <p className="text-slate-300 max-w-md mx-auto text-sm leading-relaxed">
                Te lo enviamos por WhatsApp en menos de 1 hora, en horario de atención (lunes a viernes, de 8:30 a 19:30). Si lo has pedido fuera de ese horario, te llega el siguiente día laborable.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm shadow-md transition-colors"
                >
                  <WhatsAppIcon className="w-5 h-5 fill-white text-white" />
                  <span>Escribirnos por WhatsApp</span>
                </a>
                <a
                  href={`tel:${PHONE}`}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-amber-400/50 text-amber-400 font-bold text-sm shadow-sm transition-colors"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>Llamar al {PHONE_DISPLAY}</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="text-center space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
                  <Zap className="w-3.5 h-3.5" />
                  Presupuesto en menos de 1 hora
                </div>
                <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                  {title || 'Pide tu presupuesto. El primero es gratis.'}
                </h2>
                <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
                  {subtitle || 'Dinos quién eres, elige la calidad de los acabados y cuéntanos tu obra. Te mandamos el presupuesto al móvil.'}
                </p>
              </div>

              {/* Selector de Perfil (Alimentador del Triage n8n) */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 p-1.5 bg-slate-900 rounded-xl border border-slate-800">
                <button
                  type="button"
                  onClick={() => setProfile('particular')}
                  className={`py-2.5 px-2 text-xs sm:text-sm font-bold rounded-lg transition-all text-center cursor-pointer ${
                    profile === 'particular'
                      ? 'bg-amber-400 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Soy particular
                </button>
                <button
                  type="button"
                  onClick={() => setProfile('inversor')}
                  className={`py-2.5 px-2 text-xs sm:text-sm font-bold rounded-lg transition-all text-center cursor-pointer ${
                    profile === 'inversor'
                      ? 'bg-amber-400 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Soy inversor
                </button>
                <button
                  type="button"
                  onClick={() => setProfile('inmobiliaria')}
                  className={`py-2.5 px-2 text-xs sm:text-sm font-bold rounded-lg transition-all text-center cursor-pointer ${
                    profile === 'inmobiliaria'
                      ? 'bg-amber-400 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Soy inmobiliaria
                </button>
              </div>

              {/* Mensaje de error si falla la validación */}
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Formulario de presupuesto */}
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                {/* Trampa anti-bot oculta (Honeypot) */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="company_fax">Fax Empresa</label>
                  <input type="text" id="company_fax" name="company_fax" tabIndex={-1} autoComplete="off" />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Nombre *</label>
                    <input
                      type="text"
                      name="nombre"
                      required
                      placeholder="Ej. Carlos Martínez"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-400 placeholder:text-slate-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Móvil (WhatsApp) *</label>
                    <input
                      type="tel"
                      name="telefono"
                      required
                      placeholder="Ej. 640 000 000"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-400 placeholder:text-slate-500"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Correo (opcional, para recibirlo también en PDF)</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="tu@email.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-400 placeholder:text-slate-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Municipio de la obra *</label>
                    <input
                      type="text"
                      name="zona"
                      required
                      placeholder="Ej. Móstoles, Alcalá de Henares, Madrid centro…"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-400 placeholder:text-slate-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    ¿Qué quieres reformar?
                  </label>
                  <textarea
                    rows={3}
                    name="detalles"
                    placeholder="Ej. Piso de 85 m². Reforma completa: cocina abierta, dos baños y aire acondicionado."
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-400 placeholder:text-slate-500"
                  />
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {profile === 'particular'
                    ? 'Tu primer presupuesto es gratis. Si después necesitas otro, cuesta 150 €.'
                    : 'Tienes un presupuesto gratis cada semana. Los siguientes de esa semana cuestan 150 €.'}
                </p>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 px-8 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:bg-slate-800 disabled:text-slate-500 text-slate-950 font-black text-sm uppercase tracking-wider shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {loading ? (
                      <span>Enviando tu solicitud…</span>
                    ) : (
                      <>
                        <span>Pedir mi presupuesto</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 pt-2 gap-2">
                  <span>
                    Usamos tus datos solo para preparar y enviarte el presupuesto.{' '}
                    <a href="/privacidad" className="underline hover:text-amber-400">Privacidad</a>
                  </span>
                  <a
                    href={`tel:${PHONE}`}
                    className="inline-flex items-center gap-1.5 font-bold text-slate-300 hover:text-amber-400 transition-colors"
                    aria-label={`Llamar al ${PHONE_DISPLAY}`}
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Llamar directo: <strong className="text-white underline underline-offset-2">{PHONE_DISPLAY}</strong></span>
                  </a>
                </div>
              </form>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
