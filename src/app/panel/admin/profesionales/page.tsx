'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { professionals as prosApi } from '@/lib/api';

const estadoColors: Record<string, string> = {
  PENDIENTE: 'bg-yellow-100 text-yellow-700',
  ACTIVO: 'bg-green-100 text-green-700',
  PAUSADO: 'bg-gray-100 text-gray-700',
  RECHAZADO: 'bg-red-100 text-red-700',
};

export default function AdminProfesionalesPage() {
  const { token } = useAuth();
  const [professionals, setProfessionals] = useState<Array<Record<string, unknown>>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    prosApi
      .list(token)
      .then((data) => setProfessionals(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Profesionales</h1>

      <div className="bg-white rounded-xl border border-border overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-muted-foreground">Cargando...</div>
        ) : professionals.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            No hay profesionales registrados aún. Las solicitudes de incorporación aparecerán aquí.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted border-b border-border">
                  <th className="px-4 py-3 text-left font-medium">Nombre</th>
                  <th className="px-4 py-3 text-left font-medium">Empresa</th>
                  <th className="px-4 py-3 text-left font-medium">Email</th>
                  <th className="px-4 py-3 text-left font-medium">Teléfono</th>
                  <th className="px-4 py-3 text-left font-medium">Estado</th>
                  <th className="px-4 py-3 text-left font-medium">Rating</th>
                  <th className="px-4 py-3 text-left font-medium">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {professionals.map((pro) => (
                  <tr key={pro.id as string} className="border-b border-border hover:bg-muted/30">
                    <td className="px-4 py-3 font-medium">{pro.nombre as string}</td>
                    <td className="px-4 py-3">{(pro.empresa as string) || '—'}</td>
                    <td className="px-4 py-3">{pro.email as string}</td>
                    <td className="px-4 py-3">{pro.telefono as string}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          estadoColors[pro.estado as string] || ''
                        }`}
                      >
                        {pro.estado as string}
                      </span>
                    </td>
                    <td className="px-4 py-3">{(pro.rating as number) ?? '—'}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {new Date(pro.creadoEn as string).toLocaleDateString('es-ES')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
