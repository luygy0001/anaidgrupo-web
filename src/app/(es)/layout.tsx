import MarcoPagina from '@/components/layout/MarcoPagina';

export default function SpanishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MarcoPagina>{children}</MarcoPagina>;
}
