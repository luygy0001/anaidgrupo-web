import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { CheckCircle, XCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'How it works',
  description: 'Learn how Anaid Grupo analyzes each request, filters the need, and assigns the right professional for your project in Madrid.',
  alternates: { canonical: '/en/how-it-works', languages: { es: '/como-funciona' } },
};

export default function HowItWorksEnPage() {
  return (
    <>
      <section className="section-padding bg-gradient-to-br from-primary/5 to-transparent">
        <Container narrow>
          <h1 className="text-3xl sm:text-4xl font-bold text-center">How we analyze and assign each project</h1>
          <p className="mt-4 text-muted-foreground text-center text-lg">A transparent process designed to connect your project with the right professional.</p>
        </Container>
      </section>

      <section className="section-padding">
        <Container>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="p-6 rounded-xl bg-success/5 border border-success/20">
              <h2 className="text-xl font-bold text-foreground mb-4">What Anaid Grupo does</h2>
              <ul className="space-y-3">
                {['Receives and analyzes each client request', 'Filters and classifies needs by type, urgency, and area', 'Assigns the most suitable professional collaborator', 'Guides the client through the initial steps'].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-foreground"><CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />{item}</li>
                ))}
              </ul>
            </div>
            <div className="p-6 rounded-xl bg-error/5 border border-error/20">
              <h2 className="text-xl font-bold text-foreground mb-4">What Anaid Grupo does NOT do</h2>
              <ul className="space-y-3">
                {['Does not execute works or technical services', 'Does not invoice the end client', 'Does not offer technical warranty on the work', 'Does not replace professional on-site validation'].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-foreground"><XCircle className="w-4 h-4 text-error mt-0.5 flex-shrink-0" />{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-padding bg-primary text-white">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-white">Ready to start?</h2>
            <p className="mt-4 text-white/80">Submit your project and we'll assign the right professional for you.</p>
            <div className="mt-6"><Button href="/en/request-project" variant="secondary" size="lg">Request free project</Button></div>
          </div>
        </Container>
      </section>
    </>
  );
}
