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
    title: "AdorniLeaks — Archivo de Actualidad y Contralor",
    description:
      "Archivo público de todo lo dicho, hecho y prometido por Manuel Adorni. Informes centrales, desaires, causas y contradicciones.",
    images: [
      {
        url: "https://adorni-leaks.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "AdorniLeaks",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AdorniLeaks",
    description: "Archivo público sobre Manuel Adorni.",
    images: ["https://adorni-leaks.vercel.app/og-image.png"],
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
