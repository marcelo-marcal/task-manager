import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// ============================================================
// FONTES
// ============================================================

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ============================================================
// METADADOS GERAIS DO SISTEMA
// ============================================================

export const metadata: Metadata = {
  title: "FX",
  description:
    "Sistema interno de gerenciamento de projetos, tarefas e rotinas para escritório contábil.",
};

// ============================================================
// LAYOUT RAIZ
// ============================================================

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className="dark"
      suppressHydrationWarning
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}