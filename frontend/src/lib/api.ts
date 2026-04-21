const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

type RequestOptions = {
  method?: string;
  body?: unknown;
  token?: string;
  headers?: Record<string, string>;
};

async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, token, headers = {} } = options;

  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const res = await fetch(`${API_BASE}${endpoint}`, config);

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(error.message || `Error ${res.status}`);
  }

  if (res.status === 204) return null as T;
  return res.json();
}

// ============================================================
// Auth
// ============================================================

export const auth = {
  login: (email: string, password: string) =>
    request<{ access_token: string; refresh_token: string }>('/auth/login', {
      method: 'POST',
      body: { email, password },
    }),

  refresh: (refreshToken: string) =>
    request<{ access_token: string }>('/auth/refresh', {
      method: 'POST',
      body: { refresh_token: refreshToken },
    }),

  me: (token: string) =>
    request<{ id: string; email: string; rol: string; profesionalId?: string }>('/auth/me', {
      token,
    }),
};

// ============================================================
// Leads
// ============================================================

export const leads = {
  create: (data: {
    nombre: string;
    telefono: string;
    email: string;
    codigoPostal: string;
    descripcion: string;
    urgencia?: string;
    tipoServicio: string;
    noSabeQueNecesita?: boolean;
    fuente?: string;
  }) =>
    request<{ id: string }>('/leads', { method: 'POST', body: data }),

  list: (token: string, params?: { estado?: string; page?: number; limit?: number }) => {
    const query = new URLSearchParams();
    if (params?.estado) query.set('estado', params.estado);
    if (params?.page) query.set('page', String(params.page));
    if (params?.limit) query.set('limit', String(params.limit));
    const qs = query.toString();
    return request<{ data: Array<Record<string, unknown>>; total: number }>(
      `/leads${qs ? `?${qs}` : ''}`,
      { token },
    );
  },

  get: (token: string, id: string) =>
    request<Record<string, unknown>>(`/leads/${id}`, { token }),

  update: (token: string, id: string, data: Record<string, unknown>) =>
    request<Record<string, unknown>>(`/leads/${id}`, {
      method: 'PATCH',
      body: data,
      token,
    }),
};

// ============================================================
// Professionals
// ============================================================

export const professionals = {
  apply: (data: {
    nombre: string;
    email: string;
    telefono: string;
    empresa?: string;
    bio?: string;
    especialidades?: string[];
    zonas?: string[];
  }) =>
    request<{ id: string }>('/professionals/apply', { method: 'POST', body: data }),

  list: (token: string) =>
    request<Array<Record<string, unknown>>>('/professionals', { token }),

  me: (token: string) =>
    request<Record<string, unknown>>('/professionals/me', { token }),

  myLeads: (token: string) =>
    request<Array<Record<string, unknown>>>('/professionals/me/leads', { token }),

  update: (token: string, id: string, data: Record<string, unknown>) =>
    request<Record<string, unknown>>(`/professionals/${id}`, {
      method: 'PATCH',
      body: data,
      token,
    }),
};

// ============================================================
// Assignments
// ============================================================

export const assignments = {
  create: (token: string, data: { leadId: string; profesionalId: string; notasAdmin?: string }) =>
    request<{ id: string }>('/assignments', { method: 'POST', body: data, token }),

  update: (token: string, id: string, data: Record<string, unknown>) =>
    request<Record<string, unknown>>(`/assignments/${id}`, {
      method: 'PATCH',
      body: data,
      token,
    }),

  list: (token: string) =>
    request<Array<Record<string, unknown>>>('/assignments', { token }),
};

// ============================================================
// Chat
// ============================================================

export const chat = {
  createSession: () =>
    request<{ id: string; sessionToken: string }>('/chatbot/session', { method: 'POST' }),

  sendMessage: (sessionToken: string, data: { contenido: string; paso: number }) =>
    request<{ respuesta: string }>(`/chatbot/session/${sessionToken}/message`, {
      method: 'POST',
      body: data,
    }),

  complete: (sessionToken: string, data: Record<string, unknown>) =>
    request<{ leadId: string }>(`/chatbot/session/${sessionToken}/complete`, {
      method: 'POST',
      body: data,
    }),
};

// ============================================================
// Pricing
// ============================================================

export const pricing = {
  getRanges: () =>
    request<Array<{ servicio: string; desde: number; hasta: number; unidad: string }>>(
      '/pricing/ranges',
    ),
};

// ============================================================
// Files (multipart upload)
// ============================================================

export const files = {
  upload: async (file: File, leadId?: string, profesionalId?: string): Promise<{ id: string; url: string }> => {
    const formData = new FormData();
    formData.append('file', file);
    if (leadId) formData.append('leadId', leadId);
    if (profesionalId) formData.append('profesionalId', profesionalId);

    const res = await fetch(`${API_BASE}/files/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({ message: res.statusText }));
      throw new Error(error.message || `Error ${res.status}`);
    }

    return res.json();
  },
};

// ============================================================
// Contact (uses leads endpoint with fuente=FORMULARIO)
// ============================================================

export const contact = {
  send: (data: { nombre: string; email: string; telefono: string; mensaje: string }) =>
    request<{ ok: boolean }>('/contact', { method: 'POST', body: data }),
};
