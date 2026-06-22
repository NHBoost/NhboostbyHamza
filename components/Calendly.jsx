"use client";
// Embed Calendly (inline) — gère la réservation, le lien Google Meet et les
// confirmations/rappels automatiquement. Thématisé pour le fond sombre du site.

import React from "react";

// Thème Calendly clair : fond blanc + texte foncé (les champs de saisie
// restent lisibles, contrairement au thème sombre où le texte tapé l'était
// mal). Accent bleu de la charte. Le cadre sombre du site l'encadre.
const THEME =
  "hide_gdpr_banner=1&background_color=ffffff&text_color=1a1f2e&primary_color=3f77be";

export function CalendlyInline({ url }) {
  React.useEffect(() => {
    const id = "calendly-widget-js";
    if (!document.getElementById(id)) {
      const s = document.createElement("script");
      s.id = id;
      s.src = "https://assets.calendly.com/assets/external/widget.js";
      s.async = true;
      document.body.appendChild(s);
    }
  }, []);

  const fullUrl = url + (url.includes("?") ? "&" : "?") + THEME;

  return (
    <div className="calendly-embed reveal">
      <div className="calendly-inline-widget" data-url={fullUrl}></div>
    </div>
  );
}
