'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  LayoutDashboard,
  FileText,
  Users,
  UserCircle,
  LogOut,
  ArrowLeftRight,
  Menu,
  X,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface User {
  id: string;
  email: string;
  rol: 'ADMIN' | 'PROFESSIONAL';
  profesionalId?: string;
}

const adminNav = [
  { label: 'Dashboard', href: '/panel/admin', icon: LayoutDashboard },
  { label: 'Leads', href: '/panel/admin/leads', icon: FileText },
  { label: 'Profesionales', href: '/panel/admin/profesionales', icon: Users },
  { label: 'Asignaciones', href: '/panel/admin/asignaciones', icon: ArrowLeftRight },
];

const proNav = [
  { label: 'Dashboard', href: '/panel/profesional', icon: LayoutDashboard },
  { label: 'Mis leads', href: '/panel/profesional/leads', icon: FileText },
  { label: 'Mi perfil', href: '/panel/profesional/perfil', icon: UserCircle },
];

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user: authUser, loading, logout } = useAuth();
  const user = authUser as User | null;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      window.location.href = '/panel/login';
    }
  }, [loading, user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Cargando...</p>
      </div>
    );
  }

  const nav = user?.rol === 'ADMIN' ? adminNav : proNav;

  return (
    <div className="min-h-screen bg-muted flex">
      {/* Sidebar — desktop */}
      <aside className="hidden lg:flex lg:w-64 flex-col bg-white border-r border-border">
        <div className="px-6 py-5 border-b border-border">
          <a href="/" aria-label="Anaid Grupo - Inicio">
            <Image src="/img/logo-small.svg" alt="Anaid Grupo" width={140} height={28} className="h-7 w-auto" />
          </a>
          <p className="text-xs text-muted-foreground mt-0.5">
            {user?.rol === 'ADMIN' ? 'Panel admin' : 'Panel profesional'}
          </p>
        </div>
        <nav className="flex-1 py-4 px-3 space-y-1">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors"
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </a>
          ))}
        </nav>
        <div className="p-3 border-t border-border">
          <div className="flex items-center justify-between px-3 py-2">
            <span className="text-xs text-muted-foreground truncate">
              {user?.email}
            </span>
            <button
              type="button"
              onClick={logout}
              className="p-1.5 text-muted-foreground hover:text-error transition-colors"
              aria-label="Cerrar sesión"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
          <aside className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl flex flex-col">
            <div className="flex items-center justify-between px-4 py-4 border-b border-border">
              <span className="font-bold text-primary">Panel</span>
              <button type="button" onClick={() => setSidebarOpen(false)} aria-label="Cerrar menú">
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex-1 py-4 px-3 space-y-1">
              {nav.map((item) => (
                <a key={item.href} href={item.href} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-muted">
                  <item.icon className="w-4 h-4" />{item.label}
                </a>
              ))}
            </nav>
            <button type="button" onClick={logout} className="m-3 flex items-center gap-2 px-3 py-2 text-sm text-error hover:bg-error/5 rounded-lg">
              <LogOut className="w-4 h-4" />Cerrar sesión
            </button>
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile header */}
        <header className="lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-border">
          <button type="button" onClick={() => setSidebarOpen(true)} aria-label="Abrir menú">
            <Menu className="w-5 h-5" />
          </button>
          <Image src="/img/logo-small.svg" alt="Anaid Grupo" width={120} height={24} className="h-6 w-auto" />
          <span className="text-xs text-muted-foreground">{user?.email?.split('@')[0]}</span>
        </header>
        <main className="flex-1 p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
