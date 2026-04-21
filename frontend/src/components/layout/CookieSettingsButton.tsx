'use client';

// Reabre el banner de CookieYes. Si CookieYes aún no se ha cargado
// (p.ej. dominio de dev sin ID), cae al fallback de ir a /cookies.

export default function CookieSettingsButton({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const handleClick = (e: React.MouseEvent) => {
    if (typeof window !== 'undefined' && typeof window.revisitCkyConsent === 'function') {
      e.preventDefault();
      window.revisitCkyConsent();
    }
  };

  return (
    <a href="/cookies" onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
