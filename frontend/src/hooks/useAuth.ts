'use client';

import { useState, useEffect, useCallback } from 'react';
import { auth } from '@/lib/api';

type User = {
  id: string;
  email: string;
  rol: 'ADMIN' | 'PROFESSIONAL';
  profesionalId?: string;
};

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('anaid_token');
    if (!stored) {
      setLoading(false);
      return;
    }

    setToken(stored);
    auth
      .me(stored)
      .then((u) => setUser(u as User))
      .catch(() => {
        localStorage.removeItem('anaid_token');
        localStorage.removeItem('anaid_refresh');
        document.cookie = 'access_token=; path=/; max-age=0';
      })
      .finally(() => setLoading(false));
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('anaid_token');
    localStorage.removeItem('anaid_refresh');
    document.cookie = 'access_token=; path=/; max-age=0';
    window.location.href = '/panel/login';
  }, []);

  return { user, token, loading, logout };
}
