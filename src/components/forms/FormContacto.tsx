'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import { enviarFormulario } from '@/lib/enviarFormulario';
import Turnstile, { MENSAJE_ESPERA_TURNSTILE, TURNSTILE_ACTIVO } from '@/components/forms/Turnstile';
import { trackFormSubmit } from '@/lib/tracking';

type Status = 'idle' | 'loading' | 'error';

export default function FormContacto() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [tokenAntibots, setTokenAntibots] = useState('');
  const [reinicioAntibots, setReinicioAntibots] = useState(0);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (TURNSTILE_ACTIVO && !tokenAntibots) {
      setErrorMessage(MENSAJE_ESPERA_TURNSTILE);
      setStatus('error');
      return;
    }
    setStatus('loading');

    const form = new FormData(e.currentTarget);
    try {
      await enviarFormulario('contacto', {
        nombre: form.get('nombre') as string,
        email: form.get('email') as string,
        telefono: (form.get('telefono') as string) || '',
        mensaje: form.get('mensaje') as string,
        turnstileToken: tokenAntibots,
      });
      trackFormSubmit();
      router.push('/gracias/contacto');
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Error al enviar.');
      setStatus('error');
      setReinicioAntibots((n) => n + 1);
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
        <p role="alert" className="text-sm text-error">{errorMessage}</p>
      )}

      <Turnstile onToken={setTokenAntibots} reinicio={reinicioAntibots} />

      <Button type="submit" fullWidth disabled={status === 'loading'}>
        {status === 'loading' ? 'Enviando...' : 'Enviar mensaje'}
      </Button>
    </form>
  );
}
