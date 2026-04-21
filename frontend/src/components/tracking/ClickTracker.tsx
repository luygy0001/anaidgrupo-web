'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/lib/tracking';

// Delegación global: captura clicks en enlaces tel:, mailto: y de WhatsApp
// sin necesidad de envolver cada componente. Se monta una sola vez en el
// layout raíz. Si el evento se propaga con botón central/ctrl (abre pestaña),
// igual se registra — que es lo deseable para tracking.

function findAnchor(target: EventTarget | null): HTMLAnchorElement | null {
  let node = target as HTMLElement | null;
  while (node && node !== document.body) {
    if (node.tagName === 'A') return node as HTMLAnchorElement;
    node = node.parentElement;
  }
  return null;
}

function linkLocation(anchor: HTMLAnchorElement): string {
  const section = anchor.closest('section, header, footer, main')?.getAttribute('id');
  return section || window.location.pathname;
}

export default function ClickTracker() {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const anchor = findAnchor(e.target);
      if (!anchor) return;

      const href = anchor.getAttribute('href') || '';
      const lower = href.toLowerCase();

      if (lower.startsWith('tel:')) {
        trackEvent('click_telefono', {
          number: href.replace(/^tel:/i, ''),
          link_location: linkLocation(anchor),
        });
        return;
      }

      if (lower.startsWith('mailto:')) {
        trackEvent('click_email', {
          email: href.replace(/^mailto:/i, '').split('?')[0],
          link_location: linkLocation(anchor),
        });
        return;
      }

      if (lower.includes('wa.me') || lower.includes('api.whatsapp.com') || lower.includes('web.whatsapp.com')) {
        trackEvent('click_whatsapp', {
          link_location: linkLocation(anchor),
        });
      }
    };

    document.addEventListener('click', handler, { capture: true });
    return () => document.removeEventListener('click', handler, { capture: true });
  }, []);

  return null;
}
