// Configuration SEO centralisée du site.
// ⚠️ Renseignez votre domaine de production réel ci-dessous (ou via la variable
// d'environnement NEXT_PUBLIC_SITE_URL sur Vercel/Netlify). Le domaine est utilisé
// pour l'URL canonique, le sitemap, robots.txt et les balises Open Graph.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://hamza.nhboost-agency.com"
).replace(/\/+$/, "");

export const SITE_NAME = "NHBoost by Hamza";

// Expression clé principale (page d'accueil)
export const KEYPHRASE = "NHBoost by Hamza";

// Titre SEO (≈ 59 caractères) — l'expression clé est placée en début de titre
export const SEO_TITLE = "NHBoost by Hamza | Acquisition client pour coachs & agences";

// Métadescription attractive (≈ 157 caractères)
export const SEO_DESCRIPTION =
  "NHBoost by Hamza installe pour les coachs, freelances et agences un système d'acquisition qui génère des prospects qualifiés chaque jour. Réservez votre appel.";

export const KEYWORDS = [
  "NHBoost by Hamza",
  "NHBoost",
  "Hamza",
  "système d'acquisition",
  "acquisition client",
  "agence marketing",
  "génération de prospects",
  "prospects qualifiés",
  "coachs",
  "freelances",
  "agences",
  "appel stratégique",
];
