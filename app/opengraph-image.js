import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt =
  "NHBoost by Hamza — système d'acquisition pour coachs, freelances et agences";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Image mise en avant (partages sociaux / aperçu) reflétant l'activité :
// agence de systèmes d'acquisition publicitaire. Thème sombre + bleu royal,
// cohérent avec la charte du site. Styles compatibles satori (next/og).
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#08080a",
          color: "#eef1f8",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Glow bleu (couche de fond) */}
        <div
          style={{
            position: "absolute",
            top: -260,
            right: -180,
            width: 900,
            height: 760,
            display: "flex",
            background:
              "radial-gradient(circle at 50% 50%, rgba(74,108,247,0.45) 0%, rgba(74,108,247,0) 70%)",
          }}
        />

        {/* Marque */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 16,
            position: "relative",
          }}
        >
          <div style={{ fontSize: 40, fontWeight: 800, letterSpacing: -1 }}>
            NHBoost
          </div>
          <div style={{ fontSize: 24, fontStyle: "italic", color: "#828aa0" }}>
            by Hamza
          </div>
        </div>

        {/* Accroche */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: 4,
              color: "#7E9BFF",
              border: "1px solid rgba(74,108,247,0.45)",
              borderRadius: 999,
              padding: "10px 22px",
            }}
          >
            COACHS · FREELANCES · AGENCES
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 68,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
              maxWidth: 1000,
            }}
          >
            Un système d'acquisition qui remplit votre agenda.
          </div>
        </div>

        {/* Preuves */}
        <div style={{ display: "flex", gap: 56, position: "relative" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontWeight: 800, color: "#7E9BFF", fontSize: 38 }}>
              +50K€/mois
            </div>
            <div style={{ display: "flex", color: "#828aa0", fontSize: 22 }}>
              objectif visé
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontWeight: 800, color: "#7E9BFF", fontSize: 38 }}>
              Chaque jour
            </div>
            <div style={{ display: "flex", color: "#828aa0", fontSize: 22 }}>
              prospects qualifiés
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontWeight: 800, color: "#7E9BFF", fontSize: 38 }}>
              0 risque
            </div>
            <div style={{ display: "flex", color: "#828aa0", fontSize: 22 }}>
              garantie de résultat
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
