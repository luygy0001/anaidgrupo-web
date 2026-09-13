'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import { professionals } from '@/lib/api';
import { trackFormSubmit } from '@/lib/tracking';

const SPECIALTIES = [
  'Reformas integrales',
  'Reformas de baño',
  'Reformas de cocina',
  'Electricidad',
  'Fontanería',
  'Climatización',
  'Arquitectura técnica',
  'Pequeñas obras',
];

type Status = 'idle' | 'loading' | 'error';

export default function FormProfesional() {
  const [status, setStatus] = useState<Status>('idle');
  const [selectedSpecs, setSelectedSpecs] = useState<string[]>([]);
  const router = useRouter();

  const toggleSpec = (spec: string) => {
    setSelectedSpecs((prev) =>
      prev.includes(spec) ? prev.filter((s) => s !== spec) : [...prev, spec]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      await professionals.apply({
        nombre: data.get('nombre') as string,
        empresa: (data.get('empresa') as string) || undefined,
        email: data.get('email') as string,
        telefono: data.get('telefono') as string,
        especialidades: selectedSpecs,
        zonas: [(data.get('zonas') as string) || 'Madrid'],
      });
      trackFormSubmit({ form_location: 'form-profesional' });
      router.push('/gracias/profesional');
    } catch {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <Input name="nombre" label="Nombre completo" required placeholder="Tu nombre" />
        <Input name="empresa" label="Empresa (opcional)" placeholder="Nombre de la empresa" />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Input name="email" label="Email" type="email" required placeholder="tu@email.com" />
        <Input name="telefono" label="Teléfono" type="tel" required placeholder="600 000 000" />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Especialidades <span className="text-error">*</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {SPECIALTIES.map((spec) => (
            <button
              key={spec}
              type="button"
              onClick={() => toggleSpec(spec)}
              className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                selectedSpecs.includes(spec)
                  ? 'bg-primary text-white border-primary'
                  : 'border-border text-foreground hover:border-primary'
              }`}
            >
              {spec}
            </button>
          ))}
        </div>
      </div>

      <Input name="zonas" label="Zonas de trabajo" placeholder="Ej: Madrid centro, zona sur, toda la comunidad..." required />
      <Input name="experiencia" label="Años de experiencia" placeholder="Ej: 10 años" required />
      <Textarea
        name="descripcion"
        label="Cuéntanos sobre tu actividad"
        placeholder="Describe tu actividad, tipos de trabajo que realizas, equipo..."
        required
      />

      <label className="flex items-start gap-2 cursor-pointer">
        <input
          type="checkbox"
          name="privacidad"
          required
          className="mt-1 w-4 h-4 rounded border-border text-primary focus:ring-primary"
        />
        <span className="text-sm text-muted-foreground">
          Acepto la{' '}
          <a href="/privacidad" className="text-primary underline">
            política de privacidad
          </a>{' '}
          y el tratamiento de mis datos.
        </span>
      </label>

      {status === 'error' && (
        <p className="text-sm text-error">
          Error al enviar la solicitud. Inténtalo de nuevo o contacta por WhatsApp.
        </p>
      )}

      <Button type="submit" fullWidth disabled={status === 'loading'}>
        {status === 'loading' ? 'Enviando...' : 'Enviar solicitud'}
      </Button>
    </form>
  );
}
