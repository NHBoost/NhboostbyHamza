# NHBoost by Hamza — Landing page

Landing page (page de vente « Appel Stratégique ») de **NHBoost by Hamza**, construite avec [Next.js](https://nextjs.org/) (App Router) et React 18.

## Stack

- **Next.js 14** (App Router, rendu client)
- **React 18**
- CSS custom (design tokens, thème sombre / bleu royal)

## Développement

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build de production

```bash
npm run build
npm run start
```

## Structure

```
app/
  layout.jsx      # <html>, polices Google, métadonnées, import du CSS
  page.jsx        # monte <App/> (rendu client) dans #root
  globals.css     # design tokens + styles + responsive
components/
  App.jsx         # composition (Nav, Hero, Bio, Garantie, Booking, CTA, footer)
  Booking.jsx     # widget de réservation 3 étapes
  Testimonials.jsx# carrousel de témoignages
  tweaks.jsx      # panneau d'édition (masqué par défaut)
public/
  assets/         # visuels
```

## Déploiement

Compatible **Vercel** / **Netlify** (build statique Next.js, détection automatique).
