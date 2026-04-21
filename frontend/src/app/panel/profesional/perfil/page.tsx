'use client';

import { useState, useEffect } from 'react';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { professionals } from '@/lib/api';

export default function ProfesionalPerfilPage() {
  const { token } = useAuth();
  const [profile, setProfile] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!token) return;

    professionals
      .me(token)
      .then((data) => setProfile(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [token]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token || !profile) return;

    setSaving(true);
    setSaved(false);

    const form = new FormData(e.currentTarget);
    try {
      await professionals.update(token, profile.id as string, {
        nombre: form.get('nombre'),
        empresa: form.get('empresa') || null,
        telefono: form.get('telefono'),
        bio: form.get('bio') || null,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      // silently fail
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-muted-foreground">Cargando perfil...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Mi perfil</h1>

      <div className="bg-white rounded-xl border border-border p-6 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Input
              name="nombre"
              label="Nombre"
              defaultValue={(profile?.nombre as string) || ''}
              placeholder="Tu nombre"
            />
            <Input
              name="empresa"
              label="Empresa"
              defaultValue={(profile?.empresa as string) || ''}
              placeholder="Nombre de empresa"
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Input
              label="Email"
              type="email"
              defaultValue={(profile?.email as string) || ''}
              disabled
            />
            <Input
              name="telefono"
              label="Teléfono"
              type="tel"
              defaultValue={(profile?.telefono as string) || ''}
              placeholder="600 000 000"
            />
          </div>
          <Textarea
            name="bio"
            label="Biografía"
            defaultValue={(profile?.bio as string) || ''}
            placeholder="Describe tu actividad profesional..."
          />

          <div className="flex items-center gap-3 pt-2">
            <Button type="submit" disabled={saving}>
              {saving ? 'Guardando...' : 'Guardar cambios'}
            </Button>
            {saved && (
              <span className="text-sm text-success font-medium">Cambios guardados</span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
