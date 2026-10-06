import Link from 'next/link';
import { EMAIL, LEGAL, SITE_NAME } from '@/lib/constants';

// Primera capa informativa junto a cada formulario (RGPD art. 13 y LOPDGDD art. 11). La segunda
// capa es /privacidad: si cambian proveedores o finalidades, actualizar las dos.

type TipoFormulario = 'presupuesto' | 'solicitud' | 'contacto' | 'profesional';

const PROVEEDORES_BASE = 'Hostinger, Google y Cloudflare';

const TEXTOS: Record<TipoFormulario, { finalidad: string; destinatarios: string }> = {
  presupuesto: {
    finalidad:
      'preparar y enviarte tu presupuesto y decidir de forma automática si es gratuito (puedes pedir que lo revise una persona)',
    destinatarios:
      'el profesional que haría la obra, si sigues adelante, y nuestros proveedores (Hostinger, Google, Anthropic y Cloudflare, algunos en EE. UU. con garantías)',
  },
  solicitud: {
    finalidad: 'estudiar tu proyecto y contactarte',
    destinatarios: `el profesional que haría la obra, si sigues adelante, y nuestros proveedores (${PROVEEDORES_BASE}, algunos en EE. UU. con garantías)`,
  },
  contacto: {
    finalidad: 'responder a tu consulta',
    destinatarios: `nuestros proveedores (${PROVEEDORES_BASE}, algunos en EE. UU. con garantías)`,
  },
  profesional: {
    finalidad: 'valorar tu incorporación como profesional colaborador',
    destinatarios: `nuestros proveedores (${PROVEEDORES_BASE}, algunos en EE. UU. con garantías)`,
  },
};

export default function InfoProteccionDatos({
  tipo,
  tema = 'claro',
}: {
  tipo: TipoFormulario;
  tema?: 'claro' | 'oscuro';
}) {
  const { finalidad, destinatarios } = TEXTOS[tipo];
  const claseTexto = tema === 'oscuro' ? 'text-slate-300' : 'text-muted-foreground';
  const claseEnlace =
    tema === 'oscuro' ? 'underline text-amber-300 hover:text-amber-200' : 'underline text-primary';

  return (
    <p className={`text-xs leading-relaxed ${claseTexto}`}>
      <strong>Protección de datos.</strong> Responsable: {LEGAL.titular} ({SITE_NAME}). Finalidad:{' '}
      {finalidad}. Base legal: tu solicitud. Destinatarios: {destinatarios}. Derechos: acceso,
      rectificación, supresión y otros, en {EMAIL}. Más información en la{' '}
      <Link href="/privacidad" className={claseEnlace}>
        política de privacidad
      </Link>
      .
    </p>
  );
}
