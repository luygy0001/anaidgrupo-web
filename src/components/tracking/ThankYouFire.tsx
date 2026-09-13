'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/lib/tracking';

// Dispara `conversion_thank_you` al montar la página de gracias.
// Los formularios navegan aquí tras éxito, de modo que este evento representa
// la conversión finalizada (complementario a `form_submit_contacto`).

export default function ThankYouFire({
  conversionType,
  service,
}: {
  conversionType: string;
  service?: string;
}) {
  useEffect(() => {
    trackEvent('conversion_thank_you', {
      conversion_type: conversionType,
      ...(service ? { service } : {}),
    });
  }, [conversionType, service]);

  return null;
}
