import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Home renovation services in Madrid: full renovation, bathroom, kitchen, electrician, plumber, HVAC, architect, and small works.',
  alternates: { canonical: '/en/services', languages: { es: '/servicios' } },
};

const services = [
  { title: 'Full renovation', desc: 'Complete home and commercial space renovations.' },
  { title: 'Bathroom renovation', desc: 'Modern bathroom upgrades and remodels.' },
  { title: 'Kitchen renovation', desc: 'Functional and modern kitchen design and renovation.' },
  { title: 'Electrician', desc: 'Electrical installations, repairs, and certifications.' },
  { title: 'Plumber', desc: 'Plumbing repairs, installations, and maintenance.' },
  { title: 'HVAC', desc: 'Air conditioning, heating, and climate control.' },
  { title: 'Architect / technician', desc: 'Technical projects, permits, and construction oversight.' },
  { title: 'Small works', desc: 'Minor repairs, painting, and assembly work.' },
];

export default function ServicesEnPage() {
  return (
    <>
      <section className="section-padding">
        <Container>
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-4">Services we can help you with</h1>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
            Anaid Grupo centralizes your request, analyzes the project, and assigns it to the right collaborator based on the type of work.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {services.map((s) => (
              <div key={s.title} className="p-6 rounded-xl bg-white border border-border">
                <h3 className="font-semibold text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button href="/en/request-project" size="lg">Request free project</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
