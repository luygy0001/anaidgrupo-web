import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CTABar from '@/components/layout/CTABar';
import WhatsAppButton from '@/components/shared/WhatsAppButton';

export default function EnglishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex-1 pb-16 lg:pb-0">{children}</main>
      <Footer />
      <WhatsAppButton />
      <CTABar />
    </>
  );
}
