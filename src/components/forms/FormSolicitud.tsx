'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import { leads, files } from '@/lib/api';
import { trackFormSubmit } from '@/lib/tracking';

type FormStatus = 'idle' | 'loading' | 'error';

const urgenciaOptions = [
  { value: 'BAJA', label: 'Baja' },
  { value: 'MEDIA', label: 'Media' },
  { value: 'ALTA', label: 'Alta' },
  { value: 'URGENTE', label: 'Urgente' },
];

const tipoServicioOptions = [
  { value: 'REFORMA_INTEGRAL', label: 'Reforma integral' },
  { value: 'REFORMA_BANO', label: 'Reforma de baño' },
  { value: 'REFORMA_COCINA', label: 'Reforma de cocina' },
  { value: 'ELECTRICIDAD', label: 'Electricista' },
  { value: 'FONTANERIA', label: 'Fontanero' },
  { value: 'CLIMATIZACION', label: 'Climatización' },
  { value: 'ARQUITECTO', label: 'Arquitecto / técnico' },
  { value: 'PEQUENAS_OBRAS', label: 'Pequeñas obras' },
  { value: 'NO_SE', label: 'No lo sé' },
];

interface FormSolicitudProps {
  formLocation?: string;
}

export default function FormSolicitud({ formLocation }: FormSolicitudProps = {}) {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [codigoPostal, setCodigoPostal] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [urgencia, setUrgencia] = useState('MEDIA');
  const [tipoServicio, setTipoServicio] = useState('');
  const [noSabeQueNecesita, setNoSabeQueNecesita] = useState(false);
  const [fotos, setFotos] = useState<FileList | null>(null);
  const [aceptaPrivacidad, setAceptaPrivacidad] = useState(false);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      // Create lead via API
      const result = await leads.create({
        nombre,
        telefono,
        email,
        codigoPostal,
        descripcion,
        urgencia,
        tipoServicio: tipoServicio || 'NO_SE',
        noSabeQueNecesita,
        fuente: 'FORMULARIO',
      });

      // Upload photos if any
      if (fotos && fotos.length > 0) {
        for (let i = 0; i < fotos.length; i++) {
          await files.upload(fotos[i], result.id);
        }
      }

      const service = tipoServicio || 'NO_SE';
      trackFormSubmit({ service, ...(formLocation ? { form_location: formLocation } : {}) });
      router.push(`/gracias/solicitud?service=${encodeURIComponent(service)}`);
    } catch {
      setStatus('error');
      setErrorMessage(
        'Ha ocurrido un error al enviar tu solicitud. Por favor, inténtalo de nuevo o contacta con nosotros.'
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Input
        label="Nombre completo"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Tu nombre"
        required
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Teléfono"
          type="tel"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          placeholder="600 000 000"
          required
        />
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com"
          required
        />
      </div>

      <Input
        label="Código postal"
        value={codigoPostal}
        onChange={(e) => setCodigoPostal(e.target.value)}
        placeholder="28001"
        required
      />

      <Select
        label="Tipo de servicio"
        options={tipoServicioOptions}
        value={tipoServicio}
        onChange={(e) => setTipoServicio(e.target.value)}
        placeholder="Selecciona un servicio"
        required
      />

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="noSabeQueNecesita"
          checked={noSabeQueNecesita}
          onChange={(e) => setNoSabeQueNecesita(e.target.checked)}
          className="h-4 w-4 rounded border-border text-primary focus:ring-primary/20"
        />
        <label
          htmlFor="noSabeQueNecesita"
          className="text-sm text-muted-foreground"
        >
          No estoy seguro/a de qué profesional necesito
        </label>
      </div>

      <Select
        label="Urgencia"
        options={urgenciaOptions}
        value={urgencia}
        onChange={(e) => setUrgencia(e.target.value)}
      />

      <Textarea
        label="Describe tu proyecto"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        placeholder="Cuéntanos qué necesitas: tipo de trabajo, estado actual, medidas aproximadas..."
        required
      />

      <div className="space-y-1">
        <label className="block text-sm font-medium text-foreground">
          Fotos del proyecto (opcional)
        </label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => setFotos(e.target.files)}
          className="w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition-colors"
        />
        <p className="text-sm text-muted-foreground">
          Puedes adjuntar varias imágenes para ayudarnos a analizar mejor tu
          necesidad.
        </p>
      </div>

      <div className="flex items-start gap-2">
        <input
          type="checkbox"
          id="aceptaPrivacidad"
          checked={aceptaPrivacidad}
          onChange={(e) => setAceptaPrivacidad(e.target.checked)}
          required
          className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary/20"
        />
        <label htmlFor="aceptaPrivacidad" className="text-sm text-foreground">
          Acepto la{' '}
          <a href="/privacidad" className="text-primary underline">
            política de privacidad
          </a>{' '}
          y el tratamiento de mis datos.
        </label>
      </div>

      <p className="text-xs text-muted-foreground">
        Tus datos están protegidos y solo se usarán para gestionar tu solicitud.
      </p>

      {status === 'error' && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-4">
          <p className="text-sm text-red-700">{errorMessage}</p>
        </div>
      )}

      <Button type="submit" fullWidth disabled={status === 'loading'}>
        {status === 'loading' ? 'Enviando...' : 'Enviar solicitud'}
      </Button>
    </form>
  );
}
