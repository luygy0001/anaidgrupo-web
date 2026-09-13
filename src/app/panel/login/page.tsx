'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import { auth } from '@/lib/api';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await auth.login(email, password);

      // Store in localStorage for client-side use
      localStorage.setItem('anaid_token', data.access_token);
      localStorage.setItem('anaid_refresh', data.refresh_token);

      // Store in cookie for middleware route protection
      document.cookie = `access_token=${data.access_token}; path=/; max-age=86400; SameSite=Lax`;

      // Get user info to route correctly
      const user = await auth.me(data.access_token);

      if (user.rol === 'ADMIN') {
        window.location.href = '/panel/admin';
      } else {
        window.location.href = '/panel/profesional';
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al iniciar sesión';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted">
      <Container narrow>
        <div className="max-w-sm mx-auto bg-white p-8 rounded-xl shadow-sm border border-border">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-primary">Anaid Grupo</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Acceso al panel privado
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="tu@email.com"
            />
            <Input
              label="Contraseña"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />

            {error && (
              <p className="text-sm text-error">{error}</p>
            )}

            <Button type="submit" fullWidth disabled={loading}>
              {loading ? 'Entrando...' : 'Iniciar sesión'}
            </Button>
          </form>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            <a href="/" className="text-primary hover:underline">
              Volver al inicio
            </a>
          </p>
        </div>
      </Container>
    </div>
  );
}
