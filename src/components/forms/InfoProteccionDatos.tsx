import Link from 'next/link';
import { EMAIL, LEGAL, SITE_NAME } from '@/lib/constants';

// Primera capa informativa junto al formulario (RGPD art. 13 y LOPDGDD art. 11). La segunda
// capa es /privacidad: si cambian proveedores o finalidades, actualizar las dos.
// Web provisional: la consulta llega por correo a info@ (Hostinger). Sin IA ni automatizaciones.

export default function InfoProteccionDatos({ tema = 'claro' }: { tema?: 'claro' | 'oscuro' }) {
  const claseTexto = tema === 'oscuro' ? 'text-slate-300' : 'text-muted-foreground';
  const claseEnlace =
    tema === 'oscuro' ? 'underline text-amber-300 hover:text-amber-200' : 'underline text-primary';

  return (
    <p className={`text-xs leading-relaxed ${claseTexto}`}>
      <strong>Protección de datos.</strong> Responsable: {LEGAL.titular} ({SITE_NAME}). Finalidad:
      responder a tu consulta y, si sigues adelante, preparar tu presupuesto. Base legal: tu
      solicitud. Destinatarios: el profesional que haría la obra, si sigues adelante, y nuestro
      proveedor de servidor y correo (Hostinger). Derechos: acceso,
      rectificación, supresión y otros, en {EMAIL}. Más información en la{' '}
      <Link href="/privacidad" className={claseEnlace}>
        política de privacidad
      </Link>
      .
    </p>
  );
}
