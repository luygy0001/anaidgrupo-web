import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import FormProfesional from '@/components/forms/FormProfesional';

export const metadata: Metadata = {
  title: 'Join our network',
  description: 'Join the Anaid Grupo network of professional collaborators. Receive filtered leads with technological support in Madrid.',
  alternates: { canonical: '/en/join-network', languages: { es: '/unete-red' } },
};

export default function JoinNetworkEnPage() {
  return (
    <>
      <section className="section-padding bg-gradient-to-br from-primary/5 to-accent/5">
        <Container narrow>
          <h1 className="text-3xl sm:text-4xl font-bold text-center">Join the Anaid Grupo collaborator network</h1>
          <p className="mt-4 text-muted-foreground text-center text-lg">
            If you're a professional in the sector and want to receive better-filtered opportunities with more commercial order and technological support, we'd like to meet you.
          </p>
        </Container>
      </section>
      <section className="section-padding">
        <Container narrow>
          <FormProfesional />
        </Container>
      </section>
    </>
  );
}
