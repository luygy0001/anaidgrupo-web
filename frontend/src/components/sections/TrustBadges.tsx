import Container from '@/components/ui/Container';
import { Shield, Users, Filter, MapPin } from 'lucide-react';

const badges = [
  {
    icon: Shield,
    title: 'Proceso guiado',
    text: 'Desde el primer contacto',
  },
  {
    icon: Users,
    title: 'Colaboradores seleccionados',
    text: 'Estrictamente filtrados',
  },
  {
    icon: Filter,
    title: 'Solicitudes filtradas',
    text: 'Antes de asignar',
  },
  {
    icon: MapPin,
    title: 'Comunidad de Madrid',
    text: 'Cobertura local',
  },
];

export default function TrustBadges() {
  return (
    <section className="py-12 bg-muted border-b border-border">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {badges.map((badge) => (
            <div key={badge.title} className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
                <badge.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  {badge.title}
                </h3>
                <p className="text-sm text-muted-foreground">{badge.text}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
