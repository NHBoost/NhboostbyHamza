import { SITE_URL } from "../seo.config";

// Sitemap — on n'indexe que la (les) page(s) principale(s).
// Le site est une landing page unique : les sections (Garantie, Fondateur,
// L'appel, Avis) sont des ancres #, pas des URLs distinctes — elles ne sont
// donc pas listées ici.
export default function sitemap() {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
  ];
}
