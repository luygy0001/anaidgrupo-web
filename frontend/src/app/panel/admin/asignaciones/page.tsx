'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { assignments as assignApi } from '@/lib/api';

const estadoColors: Record<string, string> = {
  PENDIENTE: 'bg-yellow-100 text-yellow-700',
  ACEPTADO: 'bg-green-100 text-green-700',
  RECHAZADO: 'bg-red-100 text-red-700',
  COMPLETADO: 'bg-blue-100 text-blue-700',
};

export default function AdminAsignacionesPage() {
  const { token } = useAuth();
  const [asignaciones, setAsignaciones] = useState<Array<Record<string, unknown>>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    assignApi
      .list(token)
      .then((data) => setAsignaciones(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Asignaciones</h1>

      <div className="bg-white rounded-xl border border-border overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-muted-foreground">Cargando...</div>
        ) : asignaciones.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            No hay asignaciones aún. Asigna un lead a un profesional desde la vista de leads.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted border-b border-border">
                  <th className="px-4 py-3 text-left font-medium">Lead</th>
                  <th className="px-4 py-3 text-left font-medium">Profesional</th>
                  <th className="px-4 py-3 text-left font-medium">Estado</th>
                  <th className="px-4 py-3 text-left font-medium">Notas</th>
                  <th className="px-4 py-3 text-left font-medium">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {asignaciones.map((a) => {
                  const lead = a.lead as Record<string, unknown> | undefined;
                  const pro = a.profesional as Record<string, unknown> | undefined;
                  return (
                    <tr key={a.id as string} className="border-b border-border hover:bg-muted/30">
                      <td className="px-4 py-3 font-medium">
                        {lead?.nombre as string || a.leadId as string}
                      </td>
                      <td className="px-4 py-3">
                        {pro?.nombre as string || a.profesionalId as string}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            estadoColors[a.estado as string] || ''
                          }`}
                        >
                          {a.estado as string}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground max-w-xs truncate">
                        {(a.notasAdmin as string) || '—'}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {new Date(a.creadoEn as string).toLocaleDateString('es-ES')}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
