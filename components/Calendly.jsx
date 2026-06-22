"use client";
// Embed Calendly (inline) — gère la réservation, le lien Google Meet et les
// confirmations/rappels automatiquement. Thématisé pour le fond sombre du site.

import React from "react";

// Paramètres de thème Calendly (couleurs de la charte)
const THEME =
  "hide_gdpr_banner=1&background_color=0a0a0d&text_color=eef1f8&primary_color=3f77be";

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
