"use client";
// Booking.jsx — widget de réservation "Appel Stratégique" fonctionnel
// Étape 1 : coordonnées · Étape 2 : calendrier + créneau · Étape 3 : confirmation

import React from "react";

const BelgiumFlag = () => (
  <span className="flag" aria-hidden="true">
    <svg viewBox="0 0 22 15" width="22" height="15">
      <rect width="22" height="15" fill="#000000"/>
      <rect x="7.33" width="7.33" height="15" fill="#FDDA24"/>
      <rect x="14.66" width="7.34" height="15" fill="#EF3340"/>
    </svg>
  </span>
);

const Check = ({s=14}) => (
  <svg width={s} height={s} viewBox="0 0 16 16" fill="none">
    <path d="M3.5 8.5l3 3 6-7" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Clé d'accès Web3Forms — publique (conçue pour le client). Chaque soumission
// est envoyée par e-mail à l'adresse associée à cette clé sur web3forms.com.
// Surchargée par NEXT_PUBLIC_WEB3FORMS_KEY si défini au build.
const WEB3FORMS_ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "YOUR_WEB3FORMS_ACCESS_KEY";

export function Booking(){
  const [step, setStep] = React.useState(1);
  const [form, setForm] = React.useState({ phone:"", first:"", last:"" });
  const [touched, setTouched] = React.useState(false);
  const [date, setDate] = React.useState(null);   // day number
  const [slot, setSlot] = React.useState(null);
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState("");

  const submitBooking = async () => {
    if (!slot || submitting) return;
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: "Nouvelle réservation — Appel Stratégique NHBoost",
          from_name: "Site NHBoost",
          "Prénom": form.first,
          "Nom": form.last,
          "Téléphone": "+32 " + form.phone,
          "Date souhaitée": date + " " + MONTH,
          "Créneau": slot + " (GMT+1)",
          botcheck: "", // honeypot anti-spam Web3Forms
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStep(3);
      } else {
        setError(data.message || "L'envoi a échoué. Merci de réessayer.");
      }
    } catch (e) {
      setError("Connexion impossible. Vérifiez votre réseau et réessayez.");
    } finally {
      setSubmitting(false);
    }
  };

  // June 2026 — 1 June 2026 is a Monday. Grid starts Sunday.
  const MONTH = "juin 2026";
  const firstDow = 1; // Monday (0=Sun)
  const daysInMonth = 30;
  const today = 4; // pretend "now" is the 4th
  const availableDays = new Set([4,5,9,10,11,12,16,17,18,19,23,24,25,26]);
  const slots = ["09:00","10:30","12:00","14:00","15:30","17:00"];

  const phoneOk = form.phone.replace(/\D/g,"").length >= 6;
  const nameOk  = form.first.trim() && form.last.trim();
  const step1Ok = phoneOk && nameOk;

  const setField = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const cells = [];
  for(let i=0;i<firstDow;i++) cells.push(null);
  for(let d=1; d<=daysInMonth; d++) cells.push(d);

  return (
    <div className="booking-shell reveal">
      <div className="booking-tabs">
        <span className={"tab " + (step<3?"on":"")}><span className="dot"></span>Remplir le formulaire</span>
        <span className="sep"></span>
        <span className={"tab " + (step>=2?"on":"")}><span className="dot"></span>Réserver votre créneau</span>
      </div>

      <div className="booking-body">
        <div className="brand"><img src="/assets/nhboost-logo-blanc.png" className="brand-logo" alt="NHBoost" /></div>

        {step === 1 && (
          <React.Fragment>
            <div className="booking-title">Appel Stratégique NHBoost</div>
            <p className="booking-sub">On analyse ton activité, ton offre et tes objectifs pour voir si notre système peut être installé chez toi.</p>

            <div className="booking-obj">Pendant cet appel de 40 minutes, on va :</div>
            <ul className="objlist">
              <li><span className="ck"><Check/></span><span>Comprendre ta situation actuelle</span></li>
              <li><span className="ck"><Check/></span><span>Identifier ce qui bloque ta croissance</span></li>
              <li><span className="ck"><Check/></span><span>Voir si ton activité correspond au système</span></li>
              <li><span className="ck"><Check/></span><span>T'expliquer comment on peut le mettre en place</span></li>
            </ul>

            <div className="phone-field">
              <span className="phone-cc"><BelgiumFlag/> +32</span>
              <input
                type="tel" inputMode="tel" placeholder="470 00 00 00"
                value={form.phone} onChange={setField("phone")}
              />
            </div>

            <div className="field-row">
              <div className={"field " + (touched && !form.first.trim() ? "invalid":"")}>
                <input className={form.first?"has-val":""} value={form.first} onChange={setField("first")} />
                <label>Prénom *</label>
              </div>
              <div className={"field " + (touched && !form.last.trim() ? "invalid":"")}>
                <input className={form.last?"has-val":""} value={form.last} onChange={setField("last")} />
                <label>Nom de famille *</label>
              </div>
            </div>

            <p className="consent">
              En saisissant vos informations, vous acceptez que vos données soient enregistrées conformément à nos <a href="#">conditions</a> &amp; à la <a href="#">politique de confidentialité</a>.
            </p>

            <button className="continue-btn"
              onClick={() => { setTouched(true); if(step1Ok) setStep(2); }}
              disabled={!step1Ok}>
              Continuer <span className="arw">→</span>
            </button>
          </React.Fragment>
        )}

        {step === 2 && (
          <React.Fragment>
            <button className="back-link" onClick={() => setStep(1)}>← Retour</button>
            <div className="booking-title">Choisissez votre créneau</div>
            <p className="booking-sub">Appel de 40 minutes en visioconférence — fuseau GMT+1.</p>

            <div className="cal">
              <div className="cal-head">
                <span className="cal-month">{MONTH}</span>
                <div className="cal-nav">
                  <button aria-label="Mois précédent">‹</button>
                  <button aria-label="Mois suivant">›</button>
                </div>
              </div>
              <div className="cal-grid">
                {["dim","lun","mar","mer","jeu","ven","sam"].map(d=>(
                  <div className="cal-dow" key={d}>{d}</div>
                ))}
                {cells.map((d,i)=>{
                  if(d===null) return <div key={"e"+i}></div>;
                  const dis = !availableDays.has(d) || d < today;
                  const cls = ["cal-day"];
                  if(dis) cls.push("disabled");
                  else cls.push("avail");
                  if(date===d) { cls.push("selected"); }
                  return (
                    <button key={d} className={cls.join(" ")}
                      disabled={dis}
                      onClick={()=>{ setDate(d); setSlot(null); }}>
                      {d}
                    </button>
                  );
                })}
              </div>

              {!date && (
                <div className="cal-note">Sélectionnez un jour disponible (•) pour voir les créneaux horaires.</div>
              )}

              {date && (
                <React.Fragment>
                  <div className="booking-obj" style={{marginTop:"22px"}}>Créneaux du {date} {MONTH}</div>
                  <div className="slots">
                    {slots.map(s=>(
                      <button key={s} className={"slot " + (slot===s?"selected":"")}
                        onClick={()=>setSlot(s)}>{s}</button>
                    ))}
                  </div>
                  <button className="continue-btn" style={{marginTop:"20px"}}
                    onClick={submitBooking} disabled={!slot || submitting}>
                    {submitting
                      ? <>Envoi en cours…</>
                      : <>Confirmer ma réservation <span className="arw">→</span></>}
                  </button>
                  {error && <p className="booking-error">{error}</p>}
                </React.Fragment>
              )}
            </div>
          </React.Fragment>
        )}

        {step === 3 && (
          <div className="booking-success">
            <div className="success-ring"><Check s={28}/></div>
            <h4>C'est réservé, {form.first} 🎉</h4>
            <p>Vous allez recevoir le lien de visioconférence par SMS et e-mail.</p>
            <div className="recap">
              📅 {date} {MONTH} · {slot} (GMT+1)
            </div>
          </div>
        )}
      </div>

      <div className="powered">POWERED BY <b>NHBoost × iClosed</b></div>
    </div>
  );
}
