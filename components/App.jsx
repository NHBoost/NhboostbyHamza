"use client";
// App.jsx — composition de la landing ULTRA (Or & Noir)

import React from "react";
import { Booking } from "./Booking";
import { Testimonials } from "./Testimonials";
import {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakSelect,
  TweakColor,
  TweakSlider,
  TweakText,
} from "./tweaks";

const { useState, useEffect, useRef } = React;

/* ---------- reveal on scroll ---------- */
function useReveal() {
  useEffect(() => {
    let io;
    // Only enable the hide-then-fade-in if the animation clock is actually live.
    // (The preview iframe throttles rAF, which would freeze elements at opacity:0.)
    const t0 = performance.now();
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const live = performance.now() - t0 > 4 && performance.now() - t0 < 400;
        if (live) document.documentElement.classList.add("anim-live");
        const els = document.querySelectorAll(".reveal");
        if (!live || !("IntersectionObserver" in window)) {els.forEach((el) => el.classList.add("in"));return;}
        io = new IntersectionObserver((entries) => {
          entries.forEach((e) => {if (e.isIntersecting) {e.target.classList.add("in");io.unobserve(e.target);}});
        }, { threshold: 0.08, rootMargin: "0px 0px -6% 0px" });
        els.forEach((el) => io.observe(el));
        // safety net
        setTimeout(() => document.querySelectorAll(".reveal:not(.in)").forEach((el) => {
          if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("in");
        }), 1500);
      });
    });
    return () => {if (io) io.disconnect();};
  }, []);
}

/* ---------- Nav ---------- */
const NAV_LINKS = [
  ["#garantie", "Garantie"],
  ["#hamza", "Fondateur"],
  ["#reserver", "L'appel"],
  ["#resultats", "Avis"],
];

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  // Close the mobile menu once the viewport grows back to desktop width.
  useEffect(() => {
    const on = () => { if (window.innerWidth > 820) setMenuOpen(false); };
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);
  const close = () => setMenuOpen(false);
  return (
    <nav className={"nav " + (scrolled ? "scrolled" : "")}>
      <div className="nav-inner">
        <button className="nav-toggle" aria-label="Ouvrir le menu" aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}>
          <span className={"nav-burger" + (menuOpen ? " open" : "")}><i></i><i></i><i></i></span>
        </button>
        <div className="nav-links">
          {NAV_LINKS.map(([href, label]) =>
          <a key={href} href={href} className="nav-link">{label}</a>
          )}
        </div>
        <a href="#top" className="brand nav-brand" onClick={close}>
          <img src="/assets/nhboost-logo-blanc.png" className="brand-logo" alt="NHBoost" />
          <span className="brand-by">by Hamza</span>
        </a>
        <div className="nav-right">
          <a href="#reserver" className="btn nav-cta" onClick={close}>Réserver mon appel <span className="arw">→</span></a>
        </div>
      </div>
      <div className={"nav-mobile" + (menuOpen ? " open" : "")}>
        {NAV_LINKS.map(([href, label]) =>
        <a key={href} href={href} className="nav-mobile-link" onClick={close}>{label}</a>
        )}
      </div>
    </nav>);

}

/* ---------- Hero ---------- */
function Hero({ heroLine }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.muted = false;
      const p = v.play();
      // Si la lecture avec son est bloquée par le navigateur, on relance en muet.
      if (p && p.catch) p.catch(() => { v.muted = true; v.play().catch(() => {}); });
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };
  const goFullscreen = (e) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = false;
    v.play().catch(() => {});
    setPlaying(true);
    if (v.requestFullscreen) v.requestFullscreen();
    else if (v.webkitEnterFullscreen) v.webkitEnterFullscreen(); // iOS Safari
    else if (v.webkitRequestFullscreen) v.webkitRequestFullscreen();
  };
  return (
    <header className="hero wrap" id="top">
      <div className="hero-glow"></div>
      <div className="hero-grid">
        <div className="hero-col-text">
          <div className="hero-badge reveal"><span className="pulse"></span><span className="hb-tags">Coachs<i></i>Freelances<i></i>Agences</span></div>
          <h1 className="display reveal">
            0 RISQUE.<br />
            <span className="line2 gold-text">Les résultats sont garantis.</span>
          </h1>
          <p className="hero-claim reveal">Sinon, vous ne payez pas.</p>
          <p className="lede reveal">Découvrez le système <span className="hl">+50k</span> installé chez des dizaines d'agences pour attirer plus de prospects, signer plus de clients et dépasser les <span className="hl">50 000€/mois</span>.</p>
          <div className="reveal cta-row" style={{ marginTop: "28px" }}>
            <a href="#reserver" className="btn">Réserver un appel <span className="arw">→</span></a>
            <a href="https://wa.me/32483095673" target="_blank" rel="noopener noreferrer" className="btn btn-wa">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.67c2.2 0 4.27.86 5.82 2.42a8.2 8.2 0 0 1 2.42 5.82c0 4.54-3.7 8.24-8.25 8.24a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24Zm-3.5 4.43c-.18 0-.46.07-.7.33-.24.26-.92.9-.92 2.2s.94 2.55 1.07 2.73c.13.18 1.85 2.82 4.48 3.95.63.27 1.11.43 1.49.55.63.2 1.2.17 1.65.1.5-.07 1.55-.63 1.77-1.24.22-.61.22-1.13.16-1.24-.07-.11-.24-.18-.5-.31-.26-.13-1.55-.76-1.79-.85-.24-.09-.42-.13-.59.13-.18.26-.68.85-.83 1.02-.15.18-.31.2-.57.07-.26-.13-1.1-.4-2.1-1.29-.78-.69-1.3-1.55-1.45-1.81-.15-.26-.02-.4.11-.53.12-.12.26-.31.39-.46.13-.15.18-.26.26-.44.09-.18.04-.33-.02-.46-.07-.13-.59-1.42-.81-1.94-.21-.51-.43-.44-.59-.45h-.5Z" /></svg>
              Contactez Hamza
            </a>
          </div>
          <p className="hero-prompt reveal">Le système est mis en place pour toi, avec une <b>garantie de résultat certifiée par NHBoost.</b></p>
        </div>

        <div className="hero-col-media reveal">
          <div className="video-frame" onClick={togglePlay}>
            <span className="corner tl"></span><span className="corner tr"></span>
            <span className="corner bl"></span><span className="corner br"></span>
            <video ref={videoRef} className="hero-video" loop playsInline preload="metadata"
            poster="/assets/header-poster.png" src="/assets/header-video.mp4"></video>
            {!playing &&
            <div className="play">
              <svg width="26" height="28" viewBox="0 0 26 28"><path d="M2 2l22 12L2 26z" fill="#ffffff" /></svg>
            </div>
            }
            {!playing && <div className="video-cap">Cliquez pour lancer la vidéo</div>}
            <button className="video-fs" onClick={goFullscreen} aria-label="Ouvrir en plein écran" title="Plein écran">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 2-2v-3" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="hero-proof reveal">
        <div className="hp"><span className="hp-n gold-text">+50K€</span><span className="hp-l">par mois atteints sur plusieurs agences</span></div>
        <span className="hp-div"></span>
        <div className="hp"><span className="hp-n gold-text">Chaque jour</span><span className="hp-l">des prospects qualifiés dans ton agenda</span></div>
        <span className="hp-div"></span>
        <div className="hp"><span className="hp-n gold-text">0 risque</span><span className="hp-l">garantie de résultat encadrée par NHBoost</span></div>
        <span className="hp-div"></span>
        <div className="hp"><span className="hp-n gold-text">+1M€</span><span className="hp-l">généré avec ce système</span></div>
      </div>

      <svg className="scroll-cue" width="20" height="34" viewBox="0 0 20 34" fill="none">
        <rect x="1" y="1" width="18" height="32" rx="9" stroke="currentColor" />
        <circle cx="10" cy="9" r="2.5" fill="currentColor">
          <animate attributeName="cy" values="9;20;9" dur="1.8s" repeatCount="indefinite" />
        </circle>
      </svg>
    </header>);

}

/* ---------- Bio ---------- */
function Bio() {
  return (
    <section className="section bio wrap" id="hamza">
      <div className="bio-head reveal">
        <span className="eyebrow">Qui est Hamza</span>
        <h2 className="display">L'HOMME DERRIÈRE <span className="gold-text kicker-italic">NHBoost.</span></h2>
        <div className="role">Fondateur · Opérateur · Expert en Acquisition</div>
      </div>

      <div className="bio-feature">
        <div className="bio-photo reveal">
          <img className="bio-img" src="/assets/hamza.png" alt="Hamza, fondateur de NHBoost" />
          <span className="ph-tag">Hamza · Fondateur</span>
          <div className="frame-edge"></div>
        </div>
        <div className="bio-lead reveal">
          <p className="lead">Chaque jour, des milliers d'entreprises investissent dans la publicité, publient du contenu et tentent de développer leur activité sans jamais parvenir à obtenir un flux régulier de clients.</p>
          <p>La différence entre une entreprise qui stagne et une entreprise qui se développe rapidement ne se trouve généralement ni dans son produit ni dans son service. La différence se trouve dans son <em>système d'acquisition</em>.</p>
          <p>C'est cette maîtrise de l'acquisition qui permet aujourd'hui à Hamza de <em>garantir contractuellement des résultats</em> aux entreprises qu'il accompagne, là où la plupart des agences se contentent de promesses.</p>
        </div>
      </div>

      <div className="bio-eco reveal">
        <div className="bio-eco-label">L'écosystème de Hamza</div>
        <div className="bio-eco-grid">
          <div className="eco-card"><div className="eco-name">Prestigia</div><p>Business centers &amp; fiduciaire — accompagne les entrepreneurs.</p></div>
          <div className="eco-card"><div className="eco-name">BHS</div><p>+100 consultants intégrés en entreprise pour soutenir leur croissance.</p></div>
          <div className="eco-card"><div className="eco-name">Primecast</div><p>Studio personal branding, vidéo &amp; podcast pour dirigeants et marques.</p></div>
        </div>
      </div>

      <div className="bio-body reveal">
        <p>Au fil des années, Hamza a construit plusieurs entreprises dans des secteurs différents. Derrière chacune se trouve le même moteur : des <em>systèmes d'acquisition</em> performants, capables de générer des opportunités commerciales de manière prévisible et répétable.</p>
        <p>À travers <em>NHBoost</em>, Hamza a développé un réseau d'agences et de franchises qui appliquent ces mêmes méthodes de croissance. Grâce à ces systèmes éprouvés, de nombreuses structures accompagnées dépassent aujourd'hui les <em>50 000€ de chiffre d'affaires mensuel</em>, avec un flux constant de prospects qualifiés et de nouveaux clients.</p>
        <p>Son expertise ne repose pas sur la théorie, mais sur des systèmes utilisés chaque jour dans ses propres entreprises. Cette expérience lui permet d'identifier rapidement les leviers de croissance d'une société et de mettre en place les mécanismes nécessaires pour attirer davantage de prospects, signer plus de clients et accélérer durablement leur développement.</p>
        <p>Parce qu'au final, la seule différence entre une entreprise qui peine à se développer et une entreprise qui grandit rapidement est souvent l'accès au bon système et aux bonnes personnes pour l'implémenter. Et c'est précisément la mission d'Hamza à travers <em>NHBoost</em>.</p>
      </div>

      <div className="bio-stats reveal">
        <div><div className="n"><span className="gold-text">14</span> ans</div><div className="l">quand il a commencé</div></div>
        <div><div className="n"><span className="gold-text">4</span></div><div className="l">sociétés dans son écosystème</div></div>
        <div><div className="n"><span className="gold-text">100+</span></div><div className="l">consultants placés via BHS</div></div>
        <div><div className="n"><span className="gold-text">1M€</span></div><div className="l">générés avec ce système</div></div>
      </div>

      <div className="bio-cta reveal">
        <a href="#reserver" className="btn">Réserver un appel <span className="arw">→</span></a>
      </div>
    </section>);

}

/* ---------- Garantie ---------- */
function Garantie() {
  const items = ["Stratégie", "Publicités", "Acquisition", "Message", "Tunnel", "Génération de prospects"];
  return (
    <section className="section garantie wrap" id="garantie">
      <div className="sec-head reveal">
        <span className="eyebrow" style={{ justifyContent: "center" }}>La garantie</span>
        <h2 className="display">ENCORE BLOQUÉ ENTRE <span className="gold-text kicker-italic">5K ET 20K€/MOIS ?</span></h2>
      </div>
      <div className="gar-grid">
        <div className="gar-copy reveal">
          <p>Découvre comment notre système aide les coachs, freelances et agences à générer des prospects qualifiés tous les jours, signer plus de clients et dépasser la barre des <span className="hl">50 000€/mois</span>.</p>
        </div>
        <div className="gar-chips reveal">
          <div className="gar-chips-label">Ce qu'on installe pour toi</div>
          {items.map((x, i) =>
          <div className="gar-chip" key={i}><span className="gar-num">{String(i + 1).padStart(2, '0')}</span>{x}</div>
          )}
        </div>
      </div>
      <div className="sec-cta reveal">
        <a href="#reserver" className="btn">Réserver un appel <span className="arw">→</span></a>
      </div>
    </section>);

}

/* ---------- Booking section ---------- */
function BookingSection() {
  return (
    <section className="section" id="reserver">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow">L'appel stratégique</span>
          <h2 className="display">UN APPEL DE <span className="gold-text kicker-italic">40 MINUTES.</span></h2>
        </div>
        <Booking />
        <Compare />
      </div>
    </section>);

}

/* ---------- Compare ---------- */
function Compare() {
  const yes = ["Comprendre ta situation actuelle", "Identifier ce qui bloque ta croissance", "Voir si ton activité correspond au système", "T'expliquer comment on peut le mettre en place"];
  return (
    <div className="compare single">
      <div className="cmp-card is reveal">
        <h3>Un appel stratégique de 40 minutes</h3>
        <ul className="cmp-list">
          {yes.map((t, i) => <li key={i}><span className="cmp-ic yes">✓</span>{t}</li>)}
        </ul>
      </div>
    </div>);

}

/* ---------- Final CTA ---------- */
function FinalCTA() {
  return (
    <section className="section final wrap">
      <div className="final-glow"></div>
      <span className="eyebrow reveal" style={{ justifyContent: "center" }}>Dernière étape</span>
      <h2 className="display reveal" style={{ marginTop: "18px" }}>Arrête de <span className="gold-text kicker-italic">stagner.</span></h2>
      <p className="reveal">Les places sont limitées. Réserve ton appel stratégique pendant qu'il en reste.</p>
      <div className="reveal">
        <a href="#reserver" className="btn">Réserver mon appel stratégique <span className="arw">→</span></a>
      </div>
    </section>);

}

/* ---------- Tweaks ---------- */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "direction": "editorial",
  "gold": ["#79ADE3", "#3F77BE", "#232A5E"],
  "glow": 1,
  "heroLine": "5K ET 20K€/MOIS ?"
} /*EDITMODE-END*/;

const DIR_LABEL = { editorial: "Éditorial Or", brutal: "Brutal Or", minimal: "Minimal Or" };

export default function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  useReveal();

  useEffect(() => {
    const r = document.documentElement;
    r.classList.remove("dir-editorial", "dir-brutal", "dir-minimal");
    r.classList.add("dir-" + t.direction);
  }, [t.direction]);

  useEffect(() => {
    const s = document.documentElement.style;
    const g = t.gold || TWEAK_DEFAULTS.gold;
    s.setProperty("--gold-1", g[0]);
    s.setProperty("--gold-2", g[1]);
    s.setProperty("--gold-3", g[2]);
    s.setProperty("--gold-solid", g[1]);
    s.setProperty("--gold-grad", `linear-gradient(135deg, ${g[0]} 0%, ${g[1]} 46%, ${g[2]} 100%)`);
    // Sheen (marque + titres surlignés) : on garde des bleus clairs (g0/g1) et on
    // exclut le marine (g2) pour rester lisible sur le fond sombre.
    s.setProperty("--gold-sheen", `linear-gradient(120deg, ${g[0]} 0%, ${g[1]} 30%, ${g[0]} 55%, ${g[1]} 80%, ${g[0]} 100%)`);
    s.setProperty("--glow", String(t.glow));
  }, [t.gold, t.glow]);

  return (
    <React.Fragment>
      <Nav />
      <Hero heroLine={t.heroLine} />
      <div className="wrap"><hr className="rule" /></div>
      <Garantie />
      <div className="wrap"><hr className="rule" /></div>
      <Bio />
      <div className="wrap"><hr className="rule" /></div>
      <BookingSection />
      <section className="section" id="resultats">
        <Testimonials />
        <div className="wrap sec-cta reveal">
          <a href="#reserver" className="btn">Réserver un appel <span className="arw">→</span></a>
        </div>
      </section>
      <FinalCTA />
      <footer className="footer">
        <div className="brand">
          <img src="/assets/nhboost-logo-blanc.png" className="brand-logo" alt="NHBoost" />
          <span className="brand-by">by Hamza</span>
        </div>
        <div className="small">© 2026 NHBoost by Hamza — Tous droits réservés · Mentions légales · Confidentialité</div>
      </footer>

      <TweaksPanel>
        <TweakSection label="Direction visuelle" />
        <TweakSelect label="Direction" value={t.direction}
        options={[["editorial", "Éditorial Or"], ["brutal", "Brutal Or"], ["minimal", "Minimal Or"]]}
        onChange={(v) => setTweak("direction", v)} />

        <TweakSection label="Couleur" />
        <TweakColor label="Teinte" value={t.gold}
        options={[
        ["#79ADE3", "#3F77BE", "#232A5E"],
        ["#6FA8DC", "#3568A8", "#1E2452"],
        ["#8FBCEA", "#4A86C8", "#2A3270"],
        ["#7E9BFF", "#3F5FE6", "#1E37A8"]]
        }
        onChange={(v) => setTweak("gold", v)} />

        <TweakSection label="Ambiance" />
        <TweakSlider label="Intensité de la lueur" value={t.glow} min={0} max={1.6} step={0.1}
        onChange={(v) => setTweak("glow", v)} />

        <TweakSection label="Copy" />
        <TweakText label="Accroche héro" value={t.heroLine}
        onChange={(v) => setTweak("heroLine", v)} />
      </TweaksPanel>
    </React.Fragment>);

}
