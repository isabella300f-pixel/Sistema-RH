import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sistema RH - Adriana",
  description: "Módulo de Gestão de Pessoas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-gray-900 text-white antialiased">
        {children}
      </body>
    </html>
  );
}
