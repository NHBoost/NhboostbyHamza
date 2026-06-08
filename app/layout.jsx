import "./globals.css";

export const metadata = {
  title: "NHBoost by Hamza — Appel Stratégique",
  description:
    "Découvre comment notre système aide les coachs, freelances et agences à générer des prospects qualifiés tous les jours, signer plus de clients et dépasser la barre des 50 000€/mois.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,400..900;1,400..900&family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900&family=Archivo:ital,wght@0,400..900;1,400..900&family=Manrope:wght@400;500;600;700;800&family=Hanken+Grotesk:ital,wght@0,300..800;1,300..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
