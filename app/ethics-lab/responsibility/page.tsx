"use client";

import { useMemo, useState } from "react";
import { RotateCcw, Scale } from "lucide-react";

const initialValues = { human: 0, design: 0, organization: 0 };
type Actor = keyof typeof initialValues;
const actorInfo: { key: Actor; title: string; description: string }[] = [
  { key: "human", title: "Human supervision", description: "Attention, understanding, and response demands placed on the human operator." },
  { key: "design", title: "System and interface design", description: "Capability communication, monitoring support, alerts, and interaction design." },
  { key: "organization", title: "Organizational governance", description: "Evaluation, documentation, deployment decisions, and risk-management processes." },
];

export default function ResponsibilityMappingPage() {
  const [values, setValues] = useState(initialValues);
  const total = useMemo(() => Object.values(values).reduce((sum, value) => sum + value, 0), [values]);
  const reset = () => setValues(initialValues);

  return <div className="page-shell shell">
    <div className="page-hero"><div className="eyebrow"><span className="eyebrow-line" /> ETHICS LAB / RESPONSIBILITY MAPPING</div><h1>Map the system.<br /><em>Do not manufacture blame.</em></h1><p className="page-lede">Adjust the relative emphasis you want to examine across three analytical dimensions. These controls represent a discussion prompt, not measured responsibility or legal fault.</p></div>
    <section className="lab-warning"><Scale size={20} /><div><strong>Not a liability calculator</strong><p>The sliders are not evidence-based percentages, and the normalized bars do not describe any actual crash. They only make your chosen discussion emphasis visible.</p></div></section>
    <div className="lab-layout">
      <section className="lab-controls"><div className="lab-panel-heading"><Scale size={18} /><h2>Discussion emphasis</h2></div>
        {actorInfo.map((actor) => <label className="slider-field" key={actor.key}><span className="slider-label">{actor.title}<strong>{values[actor.key]} / 10</strong></span><input type="range" min={0} max={10} step={1} value={values[actor.key]} onChange={(event) => setValues((current) => ({ ...current, [actor.key]: Number(event.target.value) }))} /><span className="slider-scale"><small>Lower emphasis</small><small>Higher emphasis</small></span><span className="source-publisher">{actor.description}</span></label>)}
        <button className="reset-button" onClick={reset}><RotateCcw size={15} /> Reset discussion</button>
      </section>
      <section className="lab-results"><div className="result-overline">YOUR SELECTED EMPHASIS</div>
        {actorInfo.map((actor) => {
          const share = total === 0 ? 0 : Math.round(values[actor.key] / total * 100);
          return <div className="responsibility-row" key={actor.key}><div className="result-compare"><span>{actor.title}</span><strong>{share}%</strong></div><div className="result-bar"><span style={{ width: share + "%" }} /></div></div>;
        })}
        <p className="result-caveat">{total === 0 ? "No emphasis selected. No allocation is inferred." : "Percentages are normalized from your chosen slider values only. They are not findings, probabilities, or estimates of actual responsibility."}</p>
      </section>
    </div>
    <section className="method-section"><div className="section-kicker">REFLECTION</div><h2>What evidence would change your view?</h2><p>Identify the specific source, system documentation, or investigative finding that would support or challenge each dimension. Keep legal responsibility separate from ethical analysis and system-design critique.</p></section>
  </div>;
}
