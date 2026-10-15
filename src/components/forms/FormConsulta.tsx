'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import InfoProteccionDatos from '@/components/forms/InfoProteccionDatos';
import { enviarConsulta } from '@/lib/enviarFormulario';
import { LIMITES, TIPOS_REFORMA, type TipoReforma } from '@/lib/consulta';
import { RESPUESTA_PLAZO } from '@/lib/constants';

type Estado = 'inicial' | 'enviando' | 'error';

// Formulario único de la web provisional: llega por correo a info@ (ver /api/contacto).
// Sin presupuesto automático, sin n8n y sin comprobación antirrobots: campo trampa y límite de
// envíos en el servidor.
export default function FormConsulta({ idPrefijo = 'consulta' }: { idPrefijo?: string }) {
  const [estado, setEstado] = useState<Estado>('inicial');
  const [mensajeError, setMensajeError] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  const enviar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEstado('enviando');

    const form = new FormData(e.currentTarget);
    const texto = (campo: string) => String(form.get(campo) ?? '');
    try {
      await enviarConsulta({
        nombre: texto('nombre'),
        telefono: texto('telefono'),
        email: texto('email'),
        tipoReforma: texto('tipoReforma') as TipoReforma | '',
        mensaje: texto('mensaje'),
        aceptaPrivacidad: form.get('aceptaPrivacidad') === 'on',
        origen: pathname,
        sitioWeb: texto('sitio_web'),
      });
      router.push('/gracias/contacto');
    } catch (err) {
      setMensajeError(err instanceof Error ? err.message : 'No hemos podido enviar tu consulta.');
      setEstado('error');
    }
  };

  const id = (campo: string) => `${idPrefijo}-${campo}`;

  return (
    <form onSubmit={enviar} className="space-y-4">
      <Input
        id={id('nombre')}
        name="nombre"
        label="Nombre"
        required
        maxLength={LIMITES.nombre}
        autoComplete="name"
        placeholder="Tu nombre"
      />
      <div className="grid sm:grid-cols-2 gap-4">
        <Input
          id={id('telefono')}
          name="telefono"
          label="Teléfono"
          type="tel"
          required
          maxLength={LIMITES.telefono}
          autoComplete="tel"
          placeholder="600 000 000"
        />
        <Input
          id={id('email')}
          name="email"
          label="Email"
          type="email"
          required
          maxLength={LIMITES.email}
          autoComplete="email"
          placeholder="tu@email.com"
        />
      </div>
      <Select
        id={id('tipo')}
        name="tipoReforma"
        label="Tipo de reforma"
        required
        defaultValue=""
        placeholder="Elige una opción"
        options={TIPOS_REFORMA.map((t) => ({ value: t.valor, label: t.etiqueta }))}
      />
      <Textarea
        id={id('mensaje')}
        name="mensaje"
        label="Mensaje"
        required
        maxLength={LIMITES.mensaje}
        placeholder="Cuéntanos qué quieres reformar, el municipio y lo que te parezca importante."
      />

      {/* Campo trampa: invisible para las personas (y para los lectores de pantalla); los robots
          suelen rellenarlo. Si llega con algo, el servidor lo descarta sin dar pistas. */}
      <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
        <label htmlFor={id('sitio-web')}>Deja este campo vacío</label>
        <input id={id('sitio-web')} name="sitio_web" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <InfoProteccionDatos />

      <label className="flex items-start gap-2 cursor-pointer">
        <input
          type="checkbox"
          name="aceptaPrivacidad"
          required
          className="mt-1 w-4 h-4 rounded border-border text-primary focus:ring-primary"
        />
        <span className="text-sm text-muted-foreground">
          He leído la <a href="/privacidad" className="text-primary underline">política de privacidad</a>.
        </span>
      </label>

      {estado === 'error' && (
        <p role="alert" className="text-sm text-error">
          {mensajeError}
        </p>
      )}

      <Button type="submit" fullWidth disabled={estado === 'enviando'}>
        {estado === 'enviando' ? 'Enviando…' : 'Enviar consulta'}
      </Button>
      <p className="text-xs text-center text-muted-foreground">{RESPUESTA_PLAZO}.</p>
    </form>
  );
}
