'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { professionals } from '@/lib/api';

export default function ProfesionalLeadsPage() {
  const { token } = useAuth();
  const [leads, setLeads] = useState<Array<Record<string, unknown>>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    professionals
      .myLeads(token)
      .then((data) => setLeads(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Mis leads</h1>
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-muted-foreground">Cargando...</div>
        ) : leads.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            No tienes leads asignados aún. Cuando Anaid Grupo te asigne un proyecto,
            aparecerá aquí con toda la información necesaria.
          </div>
        ) : (
          <div className="divide-y divide-border">
            {leads.map((lead) => (
              <div key={lead.id as string} className="p-4 hover:bg-muted/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">{lead.nombre as string}</p>
                    <p className="text-sm text-muted-foreground">
                      {lead.tipoServicio as string} · {lead.codigoPostal as string}
                    </p>
                  </div>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                    {lead.urgencia as string}
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                  {lead.descripcion as string}
                </p>
                {lead.telefono ? (
                  <p className="mt-2 text-sm">
                    <span className="text-muted-foreground">Tel:</span>{' '}
                    <a href={`tel:${lead.telefono}`} className="text-primary hover:underline">
                      {lead.telefono as string}
                    </a>
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
