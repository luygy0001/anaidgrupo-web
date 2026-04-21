'use client';

import { useState, useEffect } from 'react';
import { Filter } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { leads as leadsApi } from '@/lib/api';

const estadoColors: Record<string, string> = {
  NUEVO: 'bg-blue-100 text-blue-700',
  ANALIZADO: 'bg-yellow-100 text-yellow-700',
  ASIGNADO: 'bg-purple-100 text-purple-700',
  EN_CURSO: 'bg-green-100 text-green-700',
  CERRADO: 'bg-gray-100 text-gray-700',
  DESCARTADO: 'bg-red-100 text-red-700',
};

const estadoOptions = ['TODOS', 'NUEVO', 'ANALIZADO', 'ASIGNADO', 'EN_CURSO', 'CERRADO', 'DESCARTADO'];

export default function AdminLeadsPage() {
  const { token } = useAuth();
  const [leads, setLeads] = useState<Array<Record<string, unknown>>>([]);
  const [loading, setLoading] = useState(true);
  const [filtroEstado, setFiltroEstado] = useState('TODOS');
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    if (!token) return;

    setLoading(true);
    const params = filtroEstado !== 'TODOS' ? { estado: filtroEstado } : undefined;

    leadsApi
      .list(token, params)
      .then((res) => setLeads(res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [token, filtroEstado]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Leads</h1>
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowFilter(!showFilter)}
            className="flex items-center gap-1 px-3 py-2 text-sm border border-border rounded-lg hover:bg-muted transition-colors"
          >
            <Filter className="w-4 h-4" />
            {filtroEstado === 'TODOS' ? 'Filtrar' : filtroEstado}
          </button>
          {showFilter && (
            <div className="absolute right-0 top-full mt-1 bg-white border border-border rounded-lg shadow-lg z-10 py-1 min-w-[140px]">
              {estadoOptions.map((estado) => (
                <button
                  key={estado}
                  type="button"
                  onClick={() => {
                    setFiltroEstado(estado);
                    setShowFilter(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors ${
                    filtroEstado === estado ? 'font-medium text-primary' : ''
                  }`}
                >
                  {estado === 'TODOS' ? 'Todos' : estado}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-border overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-muted-foreground">Cargando leads...</div>
        ) : leads.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            {filtroEstado !== 'TODOS'
              ? `No hay leads con estado "${filtroEstado}".`
              : 'No hay leads aún. Los leads aparecerán aquí cuando se envíen solicitudes.'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted border-b border-border">
                  <th className="px-4 py-3 text-left font-medium">Nombre</th>
                  <th className="px-4 py-3 text-left font-medium">Servicio</th>
                  <th className="px-4 py-3 text-left font-medium">Urgencia</th>
                  <th className="px-4 py-3 text-left font-medium">Estado</th>
                  <th className="px-4 py-3 text-left font-medium">Score</th>
                  <th className="px-4 py-3 text-left font-medium">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id as string} className="border-b border-border hover:bg-muted/30">
                    <td className="px-4 py-3 font-medium">{lead.nombre as string}</td>
                    <td className="px-4 py-3">{lead.tipoServicio as string}</td>
                    <td className="px-4 py-3">{lead.urgencia as string}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          estadoColors[lead.estado as string] || ''
                        }`}
                      >
                        {lead.estado as string}
                      </span>
                    </td>
                    <td className="px-4 py-3">{(lead.score as number) ?? '—'}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {new Date(lead.creadoEn as string).toLocaleDateString('es-ES')}
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
