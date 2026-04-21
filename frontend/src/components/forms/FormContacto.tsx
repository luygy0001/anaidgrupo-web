'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import { contact } from '@/lib/api';
import { trackFormSubmit } from '@/lib/tracking';

type Status = 'idle' | 'loading' | 'error';

export default function FormContacto() {
  const [status, setStatus] = useState<Status>('idle');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    const form = new FormData(e.currentTarget);
    try {
      await contact.send({
        nombre: form.get('nombre') as string,
        email: form.get('email') as string,
        telefono: (form.get('telefono') as string) || '',
        mensaje: form.get('mensaje') as string,
      });
      trackFormSubmit();
      router.push('/gracias/contacto');
    } catch {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input name="nombre" label="Nombre" required placeholder="Tu nombre" />
      <Input name="email" label="Email" type="email" required placeholder="tu@email.com" />
      <Input name="telefono" label="Teléfono (opcional)" type="tel" placeholder="600 000 000" />
      <Textarea name="mensaje" label="Mensaje" required placeholder="¿En qué podemos ayudarte?" />

      <label className="flex items-start gap-2 cursor-pointer">
        <input type="checkbox" required className="mt-1 w-4 h-4 rounded border-border text-primary focus:ring-primary" />
        <span className="text-sm text-muted-foreground">
          Acepto la <a href="/privacidad" className="text-primary underline">política de privacidad</a>.
        </span>
      </label>

      {status === 'error' && (
        <p className="text-sm text-error">Error al enviar. Inténtalo de nuevo.</p>
      )}

      <Button type="submit" fullWidth disabled={status === 'loading'}>
        {status === 'loading' ? 'Enviando...' : 'Enviar mensaje'}
      </Button>
    </form>
  );
}
