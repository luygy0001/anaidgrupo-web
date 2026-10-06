'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Phone, ShieldAlert, Wallet } from 'lucide-react';
import { PHONE, PHONE_DISPLAY, WHATSAPP_URL } from '@/lib/constants';
import WhatsAppIcon from '@/components/shared/WhatsAppIcon';
import { enviarFormulario } from '@/lib/enviarFormulario';
import {
  CALIDADES_POR_PERFIL,
  IMPORTE_PRESUPUESTO_ADICIONAL,
  METROS_MAX,
  METROS_MIN,
  NOMBRE_CALIDAD,
  NOMBRE_PERFIL,
  PERFILES,
  TIPOS_OBRA,
  emailValido,
  metrosObligatorios,
  telefonoValido,
  textoCondicionPago,
  type Calidad,
  type Perfil,
  type TipoObra,
} from '@/lib/presupuesto';

// ============================================================
// Formulario de presupuesto (portada y páginas interiores).
// Accesible por diseño (WCAG 2.2 AA): grupos con fieldset/legend, etiquetas vinculadas,
// errores asociados a cada campo, resumen de errores con role="alert" y resultado con
// role="status". Las reglas de negocio están en src/lib/presupuesto.ts.
// ============================================================

type Campo =
  | 'perfil'
  | 'calidad'
  | 'tipoObra'
  | 'metros'
  | 'municipio'
  | 'descripcion'
  | 'nombre'
  | 'telefono'
  | 'email'
  | 'aceptaPrivacidad'
  | 'aceptaCondicionPago';

type Errores = Partial<Record<Campo, string>>;
type Estado = 'formulario' | 'enviando' | 'aceptado' | 'pago_requerido';

// Primer elemento enfocable de cada campo, para los enlaces del resumen de errores
const DESTINO: Record<Campo, string> = {
  perfil: 'perfil-particular',
  calidad: 'calidad-opcion-0',
  tipoObra: 'tipo-obra',
  metros: 'metros',
  municipio: 'municipio',
  descripcion: 'descripcion',
  nombre: 'nombre',
  telefono: 'telefono',
  email: 'email',
  aceptaPrivacidad: 'acepta-privacidad',
  aceptaCondicionPago: 'acepta-condicion-pago',
};

const CLASE_CAMPO =
  'w-full px-4 py-3 rounded-xl bg-slate-900 border text-white text-sm placeholder:text-slate-400 focus:border-amber-400';
const CLASE_ETIQUETA = 'block text-sm font-semibold text-slate-200 mb-1.5';

export default function FormPresupuesto() {
  const [perfil, setPerfil] = useState<Perfil>('particular');
  const [calidad, setCalidad] = useState<Calidad | ''>('');
  const [tipoObra, setTipoObra] = useState<TipoObra | ''>('');
  const [metros, setMetros] = useState('');
  const [municipio, setMunicipio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [aceptaPrivacidad, setAceptaPrivacidad] = useState(false);
  const [aceptaCondicionPago, setAceptaCondicionPago] = useState(false);
  const [trampa, setTrampa] = useState('');

  const [errores, setErrores] = useState<Errores>({});
  const [errorEnvio, setErrorEnvio] = useState('');
  const [estado, setEstado] = useState<Estado>('formulario');
  const [importe, setImporte] = useState(IMPORTE_PRESUPUESTO_ADICIONAL);
  const [intentos, setIntentos] = useState(0);

  const resumenRef = useRef<HTMLDivElement>(null);
  const resultadoRef = useRef<HTMLHeadingElement>(null);

  const calidades = CALIDADES_POR_PERFIL[perfil];
  const calidadFija = calidades.length === 1;
  const calidadElegida: Calidad | '' = calidadFija ? calidades[0] : calidad;

  // Al cambiar de perfil, la calidad elegida puede dejar de estar permitida
  const cambiarPerfil = (nuevo: Perfil) => {
    setPerfil(nuevo);
    if (calidad && !(CALIDADES_POR_PERFIL[nuevo] as readonly string[]).includes(calidad)) setCalidad('');
  };

  // Tras un intento fallido, el foco va al resumen de errores
  useEffect(() => {
    if (intentos > 0 && (Object.keys(errores).length > 0 || errorEnvio)) resumenRef.current?.focus();
  }, [intentos, errores, errorEnvio]);

  // Tras enviar, el foco va al título del resultado
  useEffect(() => {
    if (estado === 'aceptado' || estado === 'pago_requerido') resultadoRef.current?.focus();
  }, [estado]);

  const validar = (): Errores => {
    const e: Errores = {};
    if (!calidadElegida) e.calidad = 'Elige la calidad de los acabados.';
    if (!tipoObra) e.tipoObra = 'Elige el tipo de obra.';
    const m = Number(metros.replace(',', '.'));
    if (metros.trim()) {
      if (!Number.isFinite(m) || m < METROS_MIN || m > METROS_MAX)
        e.metros = `Escribe un número entre ${METROS_MIN} y ${METROS_MAX}.`;
    } else if (tipoObra && metrosObligatorios(tipoObra)) {
      e.metros = 'Indica los metros cuadrados aproximados.';
    }
    if (!municipio.trim()) e.municipio = 'Indica el municipio de la obra.';
    if (tipoObra === 'otra' && !descripcion.trim()) e.descripcion = 'Cuéntanos qué obra necesitas.';
    if (!nombre.trim()) e.nombre = 'Indica tu nombre.';
    if (!telefono.trim()) e.telefono = 'Indica tu móvil.';
    else if (!telefonoValido(telefono)) e.telefono = 'El móvil debe tener entre 9 y 15 cifras.';
    if (!email.trim()) e.email = 'Indica tu correo.';
    else if (!emailValido(email)) e.email = 'Revisa el correo: falta la @ o el dominio.';
    if (!aceptaPrivacidad) e.aceptaPrivacidad = 'Acepta la política de privacidad para continuar.';
    if (!aceptaCondicionPago) e.aceptaCondicionPago = 'Acepta la condición de los presupuestos adicionales.';
    return e;
  };

  const enviar = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setErrorEnvio('');
    const e = validar();
    setErrores(e);
    setIntentos((n) => n + 1);
    if (Object.keys(e).length > 0) return;

    setEstado('enviando');
    try {
      const respuesta = await enviarFormulario('presupuesto', {
        perfil,
        calidad: calidadElegida,
        tipoObra,
        metros: metros.trim() ? Number(metros.replace(',', '.')) : undefined,
        municipio,
        descripcion,
        nombre,
        telefono,
        email,
        aceptaPrivacidad,
        aceptaCondicionPago,
        origenFormulario: typeof window !== 'undefined' ? window.location.pathname : '',
        company_fax: trampa,
      });
      if (respuesta.estado === 'pago_requerido') {
        setImporte(respuesta.importe ?? IMPORTE_PRESUPUESTO_ADICIONAL);
        setEstado('pago_requerido');
      } else {
        setEstado('aceptado');
      }
    } catch (err) {
      setErrorEnvio(err instanceof Error ? err.message : 'No hemos podido enviar tu solicitud.');
      setEstado('formulario');
    }
  };

  const ayudaError = (campo: Campo) =>
    errores[campo] ? (
      <p id={`error-${campo}`} className="mt-1.5 text-sm text-red-300">
        {errores[campo]}
      </p>
    ) : null;

  const borde = (campo: Campo) => (errores[campo] ? 'border-red-400' : 'border-slate-500');
  const describedBy = (campo: Campo, ayuda?: string) =>
    [ayuda, errores[campo] ? `error-${campo}` : undefined].filter(Boolean).join(' ') || undefined;

  if (estado === 'aceptado' || estado === 'pago_requerido') {
    const pago = estado === 'pago_requerido';
    return (
      <div role="status" className="py-10 text-center space-y-6">
        <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
          {pago ? <Wallet className="w-9 h-9" aria-hidden="true" /> : <CheckCircle2 className="w-10 h-10" aria-hidden="true" />}
        </div>
        <h3 ref={resultadoRef} tabIndex={-1} className="text-2xl sm:text-3xl font-black text-white focus:outline-none">
          {pago ? 'Ya tienes un presupuesto gratuito' : 'Recibido. Ya estamos con tu presupuesto.'}
        </h3>
        <div className="text-slate-200 max-w-md mx-auto text-sm leading-relaxed space-y-3">
          {pago ? (
            <>
              <p>
                Este nuevo presupuesto cuesta {importe} €. Para prepararlo, primero hay que abonarlo por Bizum
                o transferencia: te escribimos por WhatsApp con los datos de pago.
              </p>
              <p>Si crees que es un error, dínoslo y lo revisa una persona.</p>
            </>
          ) : (
            <p>
              Te lo enviamos por WhatsApp y por correo en menos de 1 hora, a cualquier hora y cualquier día.
              Antes de contratar, una persona visita la obra para comprobar que todo coincide.
            </p>
          )}
        </div>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-bold text-sm shadow-md transition-colors"
          >
            <WhatsAppIcon className="w-5 h-5 fill-slate-950 text-slate-950" />
            <span>Escribirnos por WhatsApp</span>
          </a>
          <a
            href={`tel:${PHONE}`}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 border border-slate-500 hover:border-amber-400 text-amber-300 font-bold text-sm transition-colors"
          >
            <Phone className="w-4 h-4" aria-hidden="true" />
            <span>Llamar al {PHONE_DISPLAY}</span>
          </a>
        </div>
      </div>
    );
  }

  const listaErrores = (Object.keys(errores) as Campo[]).filter((c) => errores[c]);
  const enviando = estado === 'enviando';

  return (
    <form onSubmit={enviar} noValidate className="space-y-6 text-left" aria-describedby="nota-obligatorios">
      <p id="nota-obligatorios" className="text-sm text-slate-300">
        Los campos con <span aria-hidden="true">*</span>
        <span className="sr-only">asterisco</span> son obligatorios.
      </p>

      {(listaErrores.length > 0 || errorEnvio) && (
        <div
          ref={resumenRef}
          tabIndex={-1}
          role="alert"
          className="p-4 rounded-xl bg-red-500/15 border border-red-400/60 text-red-200 text-sm focus:outline-none"
        >
          <p className="font-bold flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0 text-red-300" aria-hidden="true" />
            {errorEnvio ? 'No se ha podido enviar' : 'Revisa estos campos:'}
          </p>
          {errorEnvio ? (
            <p className="mt-1">{errorEnvio}</p>
          ) : (
            <ul className="mt-2 list-disc pl-5 space-y-1">
              {listaErrores.map((c) => (
                <li key={c}>
                  <a href={`#${DESTINO[c]}`} className="underline hover:text-white">
                    {errores[c]}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Trampa anti-bot oculta (honeypot): las personas no la ven ni la alcanzan */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company_fax">Fax de empresa</label>
        <input
          type="text"
          id="company_fax"
          name="company_fax"
          tabIndex={-1}
          autoComplete="off"
          value={trampa}
          onChange={(e) => setTrampa(e.target.value)}
        />
      </div>

      {/* Perfil */}
      <fieldset>
        <legend className={CLASE_ETIQUETA}>
          ¿Quién eres? <span aria-hidden="true">*</span>
        </legend>
        <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-900 rounded-xl border border-slate-500">
          {PERFILES.map((p) => (
            <label key={p} className="cursor-pointer">
              <input
                type="radio"
                name="perfil"
                id={`perfil-${p}`}
                value={p}
                checked={perfil === p}
                onChange={() => cambiarPerfil(p)}
                className="sr-only peer"
              />
              <span className="block py-2.5 px-2 text-xs sm:text-sm font-bold rounded-lg text-center text-slate-300 hover:text-white peer-checked:bg-amber-400 peer-checked:text-slate-950 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-white">
                {NOMBRE_PERFIL[p]}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Calidad según perfil */}
      <fieldset aria-describedby={describedBy('calidad', 'ayuda-calidad')}>
        <legend className={CLASE_ETIQUETA}>
          Calidad de los acabados <span aria-hidden="true">*</span>
        </legend>
        <p id="ayuda-calidad" className="text-sm text-slate-300 mb-2">
          No ves precios: eliges la calidad y el presupuesto se calcula con ella. Cada calidad tiene un precio
          máximo por material; si luego eliges algo más caro, pagas solo la diferencia.
        </p>
        {calidadFija ? (
          <p className="px-4 py-3 rounded-xl bg-slate-900 border border-slate-500 text-sm text-white">
            Para inmobiliarias, el presupuesto se hace en calidad{' '}
            <strong>{NOMBRE_CALIDAD[calidades[0]].toLowerCase()}</strong>.
          </p>
        ) : (
          <div
            className={`grid ${calidades.length === 3 ? 'grid-cols-3' : 'grid-cols-2'} gap-2 p-1.5 bg-slate-900 rounded-xl border ${borde('calidad')}`}
          >
            {calidades.map((c, i) => (
              <label key={c} className="cursor-pointer">
                <input
                  type="radio"
                  name="calidad"
                  id={`calidad-opcion-${i}`}
                  value={c}
                  checked={calidad === c}
                  onChange={() => setCalidad(c)}
                  className="sr-only peer"
                />
                <span className="block py-2.5 px-2 text-sm font-bold rounded-lg text-center text-slate-300 hover:text-white peer-checked:bg-amber-400 peer-checked:text-slate-950 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-white">
                  {NOMBRE_CALIDAD[c]}
                </span>
              </label>
            ))}
          </div>
        )}
        {ayudaError('calidad')}
      </fieldset>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="tipo-obra" className={CLASE_ETIQUETA}>
            Tipo de obra <span aria-hidden="true">*</span>
          </label>
          <select
            id="tipo-obra"
            value={tipoObra}
            onChange={(e) => setTipoObra(e.target.value as TipoObra | '')}
            aria-required="true"
            aria-invalid={errores.tipoObra ? true : undefined}
            aria-describedby={describedBy('tipoObra')}
            className={`${CLASE_CAMPO} ${borde('tipoObra')}`}
          >
            <option value="">Elige una opción</option>
            {TIPOS_OBRA.map((t) => (
              <option key={t.valor} value={t.valor}>
                {t.etiqueta}
              </option>
            ))}
          </select>
          {ayudaError('tipoObra')}
        </div>

        <div>
          <label htmlFor="metros" className={CLASE_ETIQUETA}>
            Metros cuadrados aproximados{' '}
            {tipoObra === 'otra' ? '(opcional)' : <span aria-hidden="true">*</span>}
          </label>
          <input
            id="metros"
            type="text"
            inputMode="numeric"
            value={metros}
            onChange={(e) => setMetros(e.target.value)}
            placeholder="Ej. 85"
            aria-required={tipoObra !== 'otra'}
            aria-invalid={errores.metros ? true : undefined}
            aria-describedby={describedBy('metros')}
            className={`${CLASE_CAMPO} ${borde('metros')}`}
          />
          {ayudaError('metros')}
        </div>
      </div>

      <div>
        <label htmlFor="municipio" className={CLASE_ETIQUETA}>
          Municipio de la obra <span aria-hidden="true">*</span>
        </label>
        <input
          id="municipio"
          type="text"
          autoComplete="address-level2"
          value={municipio}
          onChange={(e) => setMunicipio(e.target.value)}
          placeholder="Ej. Móstoles, Alcalá de Henares, Madrid centro…"
          aria-required="true"
          aria-invalid={errores.municipio ? true : undefined}
          aria-describedby={describedBy('municipio')}
          className={`${CLASE_CAMPO} ${borde('municipio')}`}
        />
        {ayudaError('municipio')}
      </div>

      <div>
        <label htmlFor="descripcion" className={CLASE_ETIQUETA}>
          Cuéntanos la obra{' '}
          {tipoObra === 'otra' ? <span aria-hidden="true">*</span> : '(opcional)'}
        </label>
        <textarea
          id="descripcion"
          rows={3}
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Ej. Piso de 85 m². Reforma completa: cocina abierta, dos baños y aire acondicionado."
          aria-required={tipoObra === 'otra'}
          aria-invalid={errores.descripcion ? true : undefined}
          aria-describedby={describedBy('descripcion')}
          className={`${CLASE_CAMPO} ${borde('descripcion')}`}
        />
        {ayudaError('descripcion')}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="nombre" className={CLASE_ETIQUETA}>
            Nombre <span aria-hidden="true">*</span>
          </label>
          <input
            id="nombre"
            type="text"
            autoComplete="name"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            aria-required="true"
            aria-invalid={errores.nombre ? true : undefined}
            aria-describedby={describedBy('nombre')}
            className={`${CLASE_CAMPO} ${borde('nombre')}`}
          />
          {ayudaError('nombre')}
        </div>

        <div>
          <label htmlFor="telefono" className={CLASE_ETIQUETA}>
            Móvil (WhatsApp) <span aria-hidden="true">*</span>
          </label>
          <input
            id="telefono"
            type="tel"
            autoComplete="tel"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            placeholder="Ej. 640 000 000"
            aria-required="true"
            aria-invalid={errores.telefono ? true : undefined}
            aria-describedby={describedBy('telefono')}
            className={`${CLASE_CAMPO} ${borde('telefono')}`}
          />
          {ayudaError('telefono')}
        </div>
      </div>

      <div>
        <label htmlFor="email" className={CLASE_ETIQUETA}>
          Correo <span aria-hidden="true">*</span>
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@correo.com"
          aria-required="true"
          aria-invalid={errores.email ? true : undefined}
          aria-describedby={describedBy('email', 'ayuda-email')}
          className={`${CLASE_CAMPO} ${borde('email')}`}
        />
        <p id="ayuda-email" className="mt-1.5 text-sm text-slate-300">
          Te enviamos el presupuesto también en PDF.
        </p>
        {ayudaError('email')}
      </div>

      {/* Transparencia sobre IA (AI Act art. 50 y RGPD art. 22) */}
      <p className="text-sm text-slate-200 leading-relaxed p-4 rounded-xl bg-slate-900 border border-slate-500">
        Tu presupuesto lo prepara un sistema de inteligencia artificial con estos datos y te llega por
        WhatsApp y por correo en menos de 1 hora. Antes de contratar, una persona visita la obra.{' '}
        <Link href="/ia-analisis-proyecto" className="underline text-amber-300 hover:text-amber-200">
          Cómo usamos la IA
        </Link>
      </p>

      <div className="space-y-3">
        <div>
          <div className="flex items-start gap-3">
            <input
              id="acepta-privacidad"
              type="checkbox"
              checked={aceptaPrivacidad}
              onChange={(e) => setAceptaPrivacidad(e.target.checked)}
              aria-required="true"
              aria-invalid={errores.aceptaPrivacidad ? true : undefined}
              aria-describedby={describedBy('aceptaPrivacidad')}
              className="mt-0.5 w-5 h-5 shrink-0 accent-amber-400"
            />
            <label htmlFor="acepta-privacidad" className="text-sm text-slate-200">
              He leído y acepto la{' '}
              <Link href="/privacidad" className="underline text-amber-300 hover:text-amber-200">
                política de privacidad
              </Link>
              . <span aria-hidden="true">*</span>
            </label>
          </div>
          {ayudaError('aceptaPrivacidad')}
        </div>

        <div>
          <div className="flex items-start gap-3">
            <input
              id="acepta-condicion-pago"
              type="checkbox"
              checked={aceptaCondicionPago}
              onChange={(e) => setAceptaCondicionPago(e.target.checked)}
              aria-required="true"
              aria-invalid={errores.aceptaCondicionPago ? true : undefined}
              aria-describedby={describedBy('aceptaCondicionPago')}
              className="mt-0.5 w-5 h-5 shrink-0 accent-amber-400"
            />
            <label htmlFor="acepta-condicion-pago" className="text-sm text-slate-200">
              {textoCondicionPago(perfil)} <span aria-hidden="true">*</span>
            </label>
          </div>
          {ayudaError('aceptaCondicionPago')}
        </div>
      </div>

      <button
        type="submit"
        disabled={enviando}
        className="w-full py-4 px-8 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:bg-slate-700 disabled:text-slate-200 text-slate-950 font-black text-sm uppercase tracking-wider shadow-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
      >
        {enviando ? (
          <span>Enviando tu solicitud…</span>
        ) : (
          <>
            <span>Pedir mi presupuesto</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </>
        )}
      </button>

      <p className="text-sm text-slate-300 text-center">
        ¿Prefieres hablar?{' '}
        <a href={`tel:${PHONE}`} className="font-bold text-amber-300 underline hover:text-amber-200">
          Llama al {PHONE_DISPLAY}
        </a>
      </p>
    </form>
  );
}
