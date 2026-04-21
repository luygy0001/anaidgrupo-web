'use client';

import { useState, useEffect } from 'react';
import { FileText, CheckCircle, Clock } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { professionals } from '@/lib/api';

export default function ProfesionalDashboardPage() {
  const { token } = useAuth();
  const [myLeads, setMyLeads] = useState<Array<Record<string, unknown>>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    professionals
      .myLeads(token)
      .then((data) => setMyLeads(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [token]);

  const pendientes = myLeads.filter((l) => l.estado === 'PENDIENTE' || l.estado === 'NUEVO').length;
  const aceptados = myLeads.filter((l) => l.estado === 'ACEPTADO' || l.estado === 'EN_CURSO').length;

  const stats = [
    { label: 'Leads pendientes', value: pendientes, icon: Clock, color: 'bg-yellow-100 text-yellow-700' },
    { label: 'Leads aceptados', value: aceptados, icon: CheckCircle, color: 'bg-green-100 text-green-700' },
    { label: 'Total asignados', value: myLeads.length, icon: FileText, color: 'bg-primary/10 text-primary' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Mi panel</h1>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-5 border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground mt-1">
                  {loading ? '...' : stat.value}
                </p>
              </div>
              <div className={`w-10 h-10 flex items-center justify-center rounded-lg ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl p-6 border border-border">
        <h2 className="font-semibold text-foreground mb-4">Leads asignados</h2>
        {loading ? (
          <p className="text-sm text-muted-foreground">Cargando...</p>
        ) : myLeads.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Tus leads asignados aparecerán aquí cuando el equipo de Anaid Grupo te
            asigne nuevos proyectos.
          </p>
        ) : (
          <div className="divide-y divide-border">
            {myLeads.slice(0, 5).map((lead) => (
              <div key={lead.id as string} className="py-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{lead.nombre as string}</p>
                  <p className="text-xs text-muted-foreground">
                    {lead.tipoServicio as string} · {lead.codigoPostal as string}
                  </p>
                </div>
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                  {lead.urgencia as string}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
