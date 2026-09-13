import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import FormContacto from '@/components/forms/FormContacto';
import { Phone, Mail, MessageCircle, Clock } from 'lucide-react';
import { PHONE, PHONE_DISPLAY, EMAIL, WHATSAPP_URL, HORARIO } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact Anaid Grupo by phone, WhatsApp, or email. We are in Madrid to help you with your project.',
  alternates: { canonical: '/en/contact', languages: { es: '/contacto' } },
};

export default function ContactEnPage() {
  return (
    <section className="section-padding">
      <Container>
        <h1 className="text-3xl font-bold text-center mb-10">Contact</h1>
        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <div className="space-y-4">
            <a href={`tel:${PHONE}`} className="flex items-center gap-4 p-4 rounded-xl bg-muted hover:bg-primary/5 transition-colors">
              <Phone className="w-5 h-5 text-primary" /><div><p className="text-sm text-muted-foreground">Phone</p><p className="font-semibold">{PHONE_DISPLAY}</p></div>
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-xl bg-muted hover:bg-green-50 transition-colors">
              <MessageCircle className="w-5 h-5 text-green-600" /><div><p className="text-sm text-muted-foreground">WhatsApp</p><p className="font-semibold">Chat on WhatsApp</p></div>
            </a>
            <a href={`mailto:${EMAIL}`} className="flex items-center gap-4 p-4 rounded-xl bg-muted hover:bg-primary/5 transition-colors">
              <Mail className="w-5 h-5 text-primary" /><div><p className="text-sm text-muted-foreground">Email</p><p className="font-semibold">{EMAIL}</p></div>
            </a>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-muted">
              <Clock className="w-5 h-5 text-primary" /><div><p className="text-sm text-muted-foreground">Hours</p><p className="font-semibold">{HORARIO}</p></div>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-4">Send us a message</h2>
            <FormContacto />
          </div>
        </div>
      </Container>
    </section>
  );
}
