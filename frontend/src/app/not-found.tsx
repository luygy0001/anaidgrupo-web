import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
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
            <Button href="/solicitar-proyecto" variant="outline">
              Solicitar proyecto
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
