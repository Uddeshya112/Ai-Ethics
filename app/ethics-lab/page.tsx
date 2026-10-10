"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { computeStoppingDistance } from "@/lib/simulations/stopping-distance";
import { AlertTriangle, ArrowRight, RotateCcw, SlidersHorizontal } from "lucide-react";

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

export default function EthicsLabPage() {
  const [speed, setSpeed] = useState(60);
  const [attention, setAttention] = useState(1.8);
  const [response, setResponse] = useState(0.8);
  const [margin, setMargin] = useState(1.2);
  const stoppingDistance = useMemo(() => {
    const result = computeStoppingDistance({ speedKmh: speed, reactionTimeSeconds: attention + response, decelerationMps2: 7 });
    return result.ok ? Math.round(result.value.totalDistanceMeters) : 0;
  }, [speed, attention, response]);
  const remaining = Math.round((speed / 3.6) * margin);
  const risk = stoppingDistance > remaining ? "Insufficient margin in this conceptual setup" : "Margin remains in this conceptual setup";
  const reset = () => { setSpeed(60); setAttention(1.8); setResponse(0.8); setMargin(1.2); };
  return <div className="page-shell shell">
    <div className="page-hero"><div className="eyebrow"><span className="eyebrow-line" /> ETHICS LAB / SCENARIO 001</div><h1>Seconds matter.<br /><em>Assumptions matter too.</em></h1><p className="page-lede">Explore how attention delay, response time, and available distance interact. The point is not to predict a crash—it is to make hidden assumptions inspectable.</p></div>
    <div className="lab-warning"><AlertTriangle size={20} /><div><strong>Conceptual demonstration — not a crash reconstruction</strong><p>This simplified model is illustrative only. It omits road grade, tire and brake variation, perception uncertainty, system behavior, obstacle motion, and many other factors. It must not be used to assess a real vehicle, incident, or person.</p></div></div>
    <div className="lab-layout">
      <section className="lab-controls"><div className="lab-panel-heading"><SlidersHorizontal size={18} /><h2>Change the assumptions</h2></div>
        <Slider label="Vehicle speed" value={speed} min={20} max={120} step={5} unit="km/h" onChange={setSpeed} />
        <Slider label="Attention delay" value={attention} min={0.5} max={4} step={0.1} unit="s" onChange={setAttention} />
        <Slider label="Response interval" value={response} min={0.2} max={2} step={0.1} unit="s" onChange={setResponse} />
        <Slider label="Available distance" value={margin} min={0.5} max={5} step={0.1} unit="s of travel" onChange={setMargin} />
        <button className="reset-button" onClick={reset}><RotateCcw size={15} /> Reset assumptions</button>
      </section>
      <section className="lab-results"><div className="result-overline">ILLUSTRATIVE OUTPUT</div><div className="result-primary"><strong>{stoppingDistance}<small> m</small></strong><span>Approx. distance before a full stop under the chosen simplified assumptions</span></div><div className="result-bar"><span style={{ width: `${clamp(stoppingDistance / Math.max(remaining, stoppingDistance, 1) * 100, 4, 100)}%` }} /></div><div className="result-compare"><div><span>Distance margin</span><strong>{remaining} m</strong></div><div><span>Attention + response</span><strong>{(attention + response).toFixed(1)} s</strong></div></div><div className={stoppingDistance > remaining ? "result-status status-alert" : "result-status status-ok"}><span />{risk}</div><p className="result-caveat">Simplified constant-deceleration calculation. The output is not validated against a real vehicle or any of the cases studied here.</p></section>
    </div>
    <section className="lab-reflection"><div className="section-kicker">REFLECTION / DISCUSSION</div><h2>What does the model leave out?</h2><div className="reflection-grid"><article><span>01</span><h3>Detection is not certainty</h3><p>Real systems can miss, misclassify, or react differently to objects and road geometry.</p></article><article><span>02</span><h3>Humans are not constant</h3><p>Attention and response vary with context, expectation, fatigue, and interface design.</p></article><article><span>03</span><h3>Numbers inherit assumptions</h3><p>A precise-looking result can still be misleading when the model omits important variables.</p></article></div></section>
    <section className="responsibility-promo">
      <div><div className="section-kicker">ETHICS LAB / MODULE C</div><h2>Who carries responsibility?</h2><p>Explore a qualitative, user-controlled allocation across the driver, system design, and oversight. The visualization is conceptual, not a liability finding.</p></div>
      <Link className="button button-dark" href="/ethics-lab/responsibility">Open responsibility mapping <ArrowRight size={16} /></Link>
    </section>
  </div>;
}

function Slider({ label, value, min, max, step, unit, onChange }: { label: string; value: number; min: number; max: number; step: number; unit: string; onChange: (value: number) => void }) {
  return <label className="slider-field"><span className="slider-label">{label}<strong>{value.toFixed(step < 1 ? 1 : 0)} {unit}</strong></span><input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} /><span className="slider-scale"><small>{min} {unit}</small><small>{max} {unit}</small></span></label>;
}
