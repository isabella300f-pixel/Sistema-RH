import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Venda ComCiência Trainning",
  description: "Plataforma de Gestão e Desenvolvimento",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-venda-dark text-venda-cream antialiased">
        {children}
      </body>
    </html>
  );
}
