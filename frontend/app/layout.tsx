import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "AdorniLeaks — Archivo periodístico de Manuel Adorni",
    template: "%s | AdorniLeaks",
  },
  description:
    "Archivo público de todo lo dicho, hecho y prometido por Manuel Adorni, vocero presidencial de Argentina. Causas judiciales, conferencias de prensa, desaires y dichos polémicos. Para que no lo olvidemos.",
  keywords: [
    "Manuel Adorni",
    "vocero presidencial",
    "Argentina",
    "Milei",
    "transparencia",
    "periodismo",
    "archivo",
  ],
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: "AdorniLeaks",
    title: "AdorniLeaks — Archivo periodístico de Manuel Adorni",
    description:
      "Todo lo que dijo, hizo y desairó el vocero presidencial argentino. Curado y archivado automáticamente.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AdorniLeaks",
    description: "Archivo público sobre Manuel Adorni.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-AR">
      <body>
        {children}
      </body>
    </html>
  );
}
