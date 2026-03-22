import Header from "@/components/store/Header";
import Footer from "@/components/store/Footer";

/**
 * Layout da loja pública.
 * Envolve todas as páginas voltadas ao cliente com Header e Footer.
 */
export default function StoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />

      {/* Área principal de conteúdo */}
      <main className="min-h-screen flex-1">{children}</main>

      <Footer />
    </>
  );
}
