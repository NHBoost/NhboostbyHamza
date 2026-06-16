"use client";
// Testimonials.jsx — carrousel de témoignages clients

import React from "react";

const TST = [
  { video:"/assets/testimonial-1.mp4", result:"De 3-4K€ à +30K€/mois", quote:"Avant, on avait quelques clients mais aucune vraie stabilité. Après la mise en place du système, on a commencé à recevoir des prospects qualifiés régulièrement et à signer beaucoup plus facilement.", name:"Agence partenaire", sub:"Système NHBoost", chip:"+30K€/mois", tag:"acquisition" },
  { video:"/assets/testimonial-2.mp4", result:"D'1 RDV/semaine à plusieurs/jour", quote:"Avant, on dépendait des recommandations et de la prospection manuelle. Aujourd'hui, notre agenda se remplit avec des prospects qualifiés et on signe de nouveaux clients chaque semaine.", name:"Coach", sub:"Membre NHBoost", chip:"Agenda plein", tag:"rendez-vous" },
  { video:"/assets/testimonial-3.mp4", result:"Un CA enfin prévisible", quote:"Avant, chaque mois était imprévisible. Aujourd'hui, on a un système d'acquisition clair, des appels réguliers et une vraie visibilité sur notre chiffre d'affaires à venir.", name:"Freelance", sub:"Membre NHBoost", chip:"Prévisible", tag:"prévisibilité" },
  { video:"/assets/testimonial-4.mp4", result:"Fini de courir après les clients", quote:"Avant, il fallait relancer, prospecter et espérer. Aujourd'hui, le système attire les bonnes personnes, filtre les prospects et nous permet de nous concentrer sur les clients les plus rentables.", name:"Agence", sub:"Membre NHBoost", chip:"Inbound", tag:"clients entrants" },
];

export function Testimonials(){
  const [idx, setIdx] = React.useState(0);
  const perView = useResponsivePerView();
  const maxIdx = Math.max(0, TST.length - perView);
  const clamp = (n) => Math.max(0, Math.min(maxIdx, n));
  const go = (n) => setIdx(clamp(n));

  // Le pas de défilement = largeur réelle d'une carte + l'écart (gap).
  // Mesuré dynamiquement pour rester aligné à tous les breakpoints
  // (sinon décalage / espace vide quand on slide, surtout sur mobile).
  const trackRef = React.useRef(null);
  const [step, setStep] = React.useState(340);
  React.useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      const card = track.querySelector(".tst-card");
      if (!card) return;
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      setStep(card.getBoundingClientRect().width + gap);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [perView]);

  // recadre l'index si le nombre de vues change (ex. rotation mobile/desktop)
  React.useEffect(() => { setIdx((n) => Math.max(0, Math.min(maxIdx, n))); }, [maxIdx]);

  return (
    <div className="wrap">
      <div className="tst-head reveal">
        <div>
          <span className="eyebrow">Transformations</span>
          <h2 className="display">Ce que disent <span className="gold-text kicker-italic">nos clients.</span></h2>
        </div>
        <div className="tst-nav">
          <span className="tst-count">{idx+1} / {maxIdx+1}</span>
          <button onClick={()=>go(idx-1)} aria-label="Précédent">←</button>
          <button onClick={()=>go(idx+1)} aria-label="Suivant">→</button>
        </div>
      </div>

      <div className="tst-viewport reveal">
        <div className="tst-track" ref={trackRef} style={{ transform:`translateX(${-idx * step}px)` }}>
          {TST.map((t,i)=>(
            <TstCard t={t} key={i} />
          ))}
        </div>
      </div>

      <div className="tst-dots">
        {Array.from({length:maxIdx+1}).map((_,i)=>(
          <span key={i} className={"d " + (i===idx?"on":"")} onClick={()=>go(i)}></span>
        ))}
      </div>
    </div>
  );
}

function TstCard({ t }){
  const ref = React.useRef(null);
  const [playing, setPlaying] = React.useState(false);
  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      v.muted = false;
      const p = v.play();
      if (p && p.catch) p.catch(() => { v.muted = true; v.play().catch(() => {}); });
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };
  return (
    <article className="tst-card">
      <div className="tst-media" onClick={toggle}>
        <video ref={ref} className="tst-video" loop playsInline preload="metadata" src={t.video}></video>
        {!playing && <div className="ph-play">▶</div>}
        {!playing && t.tag && <span className="label">{t.tag}</span>}
      </div>
      <div className="tst-body">
        <p className="tst-result">↑ {t.result}</p>
        <p className="tst-quote">“{t.quote}”</p>
        <div className="tst-foot">
          <div className="tst-who">
            <div className="nm">{t.name}</div>
            <div className="sub">{t.sub}</div>
          </div>
          <span className="tst-chip">{t.chip}</span>
        </div>
      </div>
    </article>
  );
}

function useResponsivePerView(){
  const [n, setN] = React.useState(perViewFor(window.innerWidth));
  React.useEffect(()=>{
    const on = () => setN(perViewFor(window.innerWidth));
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  },[]);
  return n;
}
function perViewFor(w){
  if(w < 560) return 1;
  if(w < 900) return 2;
  return 3;
}
