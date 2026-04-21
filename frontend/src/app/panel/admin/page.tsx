'use client';

import { useState, useEffect } from 'react';
import { FileText, Users, ArrowLeftRight, TrendingUp } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { leads, professionals, assignments } from '@/lib/api';

export default function AdminDashboardPage() {
  const { token } = useAuth();
  const [stats, setStats] = useState({
    leadsNuevos: 0,
    prosActivos: 0,
    asignPendientes: 0,
    conversion: 0,
  });
  const [recentLeads, setRecentLeads] = useState<Array<Record<string, unknown>>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    Promise.all([
      leads.list(token, { limit: 100 }),
      professionals.list(token),
      assignments.list(token),
    ])
      .then(([leadsRes, prosRes, assignRes]) => {
        const allLeads = leadsRes.data || [];
        const allPros = Array.isArray(prosRes) ? prosRes : [];
        const allAssign = Array.isArray(assignRes) ? assignRes : [];

        const leadsNuevos = allLeads.filter(
          (l) => l.estado === 'NUEVO'
        ).length;
        const prosActivos = allPros.filter(
          (p) => p.estado === 'ACTIVO'
        ).length;
        const asignPendientes = allAssign.filter(
          (a) => a.estado === 'PENDIENTE'
        ).length;
        const cerrados = allLeads.filter(
          (l) => l.estado === 'CERRADO'
        ).length;
        const conversion =
          allLeads.length > 0
            ? Math.round((cerrados / allLeads.length) * 100)
            : 0;

        setStats({ leadsNuevos, prosActivos, asignPendientes, conversion });
        setRecentLeads(allLeads.slice(0, 5));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [token]);

  const kpis = [
    { label: 'Leads nuevos', value: String(stats.leadsNuevos), icon: FileText, color: 'bg-primary/10 text-primary' },
    { label: 'Profesionales activos', value: String(stats.prosActivos), icon: Users, color: 'bg-success/10 text-success' },
    { label: 'Asignaciones pendientes', value: String(stats.asignPendientes), icon: ArrowLeftRight, color: 'bg-accent/10 text-accent' },
    { label: 'Tasa de conversión', value: `${stats.conversion}%`, icon: TrendingUp, color: 'bg-info/10 text-info' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">
        Dashboard administrativo
      </h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {kpis.map((stat) => (
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

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-border">
          <h2 className="font-semibold text-foreground mb-4">Últimos leads</h2>
          {loading ? (
            <p className="text-sm text-muted-foreground">Cargando...</p>
          ) : recentLeads.length === 0 ? (
            <p className="text-sm text-muted-foreground">No hay leads aún.</p>
          ) : (
            <div className="divide-y divide-border">
              {recentLeads.map((lead) => (
                <div key={lead.id as string} className="py-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{lead.nombre as string}</p>
                    <p className="text-xs text-muted-foreground">
                      {lead.tipoServicio as string} · {lead.codigoPostal as string}
                    </p>
                  </div>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                    {lead.estado as string}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="bg-white rounded-xl p-6 border border-border">
          <h2 className="font-semibold text-foreground mb-4">Actividad reciente</h2>
          <p className="text-sm text-muted-foreground">
            El registro de actividad aparecerá aquí.
          </p>
        </div>
      </div>
    </div>
  );
}
