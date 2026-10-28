import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import MarcoPagina from '@/components/layout/MarcoPagina';

// Título propio para la pestaña. Next.js ya añade «noindex» a las respuestas 404.
export const metadata: Metadata = {
  title: 'Página no encontrada',
};

// La 404 queda fuera del layout de las páginas: lleva su propio marco (cabecera, pie y WhatsApp)
// para que quien llegue por un enlace roto pueda seguir navegando desde el menú.
export default function NotFound() {
  return (
    <MarcoPagina>
      <section className="py-20 sm:py-28">
        <Container narrow>
          <div className="text-center">
            <p className="text-6xl font-bold text-primary">404</p>
            <h1 className="mt-4 text-2xl font-bold text-foreground">
              Página no encontrada
            </h1>
            <p className="mt-2 text-muted-foreground">
              La página que buscas no existe o ha sido movida.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Button href="/">Ir al inicio</Button>
              <Button href="/contacto" variant="outline">
                Contactar
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </MarcoPagina>
  );
}
