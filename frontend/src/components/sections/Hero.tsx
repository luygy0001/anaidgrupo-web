import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import { WHATSAPP_URL, PHONE } from '@/lib/constants';
import { MessageCircle, Phone } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-primary to-primary-dark text-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }} />
      </div>

      <Container className="relative py-16 sm:py-20 lg:py-28">
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-white">
            Reformas integrales en Madrid
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-white/80 leading-relaxed max-w-2xl">
            Conectamos tu proyecto con profesionales validados. Proceso ágil,
            presupuesto claro y seguimiento digital.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button
              href="/solicitar-proyecto"
              variant="secondary"
              size="lg"
            >
              Solicitar proyecto gratuito
            </Button>
            <div className="flex gap-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-lg border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </a>
              <a
                href={`tel:${PHONE}`}
                className="inline-flex items-center gap-2 px-6 py-4 rounded-lg border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition-colors"
              >
                <Phone className="w-5 h-5" />
                Llamar
              </a>
            </div>
          </div>
        </div>
      </Container>

      {/* Decorative accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent" />
    </section>
  );
}
