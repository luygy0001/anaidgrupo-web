import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { Shield, Users, Filter, MapPin, MessageCircle, Phone } from 'lucide-react';
import { WHATSAPP_URL, PHONE as PHONE_NUM } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Anaid Grupo · Home Renovation Services in Madrid',
  description: 'We analyze your project and connect you with the right professional in Madrid. Renovations, installations, and technical services.',
  alternates: { canonical: '/en', languages: { es: '/' } },
};

export default function HomeEnPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary to-primary-dark text-white overflow-hidden">
        <Container className="relative py-16 sm:py-20 lg:py-28">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-white">
              Submit your project and we'll find the right professional in Madrid
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-white/80 leading-relaxed max-w-2xl">
              Anaid Grupo analyzes each request, filters the need, and assigns
              your project to the right collaborator based on specialty, area,
              and type of work.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button href="/en/request-project" variant="secondary" size="lg">
                Request free project
              </Button>
              <div className="flex gap-3">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-4 rounded-lg border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition-colors">
                  <MessageCircle className="w-5 h-5" /> WhatsApp
                </a>
                <a href={`tel:${PHONE_NUM}`} className="inline-flex items-center gap-2 px-6 py-4 rounded-lg border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition-colors">
                  <Phone className="w-5 h-5" /> Call
                </a>
              </div>
            </div>
          </div>
        </Container>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent" />
      </section>

      {/* Trust badges */}
      <section className="py-12 bg-muted border-b border-border">
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: 'Guided process', text: 'From the first contact' },
              { icon: Users, title: 'Selected professionals', text: 'Strictly vetted' },
              { icon: Filter, title: 'Filtered requests', text: 'Before assignment' },
              { icon: MapPin, title: 'Community of Madrid', text: 'Local coverage' },
            ].map((b) => (
              <div key={b.title} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <b.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{b.title}</h3>
                  <p className="text-sm text-muted-foreground">{b.text}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-white">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Have a project in mind?</h2>
            <p className="mt-4 text-white/80">Tell us what you need and we'll help you take the next step with the right professional.</p>
            <div className="mt-8">
              <Button href="/en/request-project" variant="secondary" size="lg">Request free project</Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
