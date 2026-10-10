import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, CircleHelp, Scale } from "lucide-react";

export const metadata: Metadata = { title: "Research methodology", description: "Case selection, evidence classifications, limitations, and editorial standards." };

const principles = [
  ["Primary sources first", "Official reports are the starting point for investigative findings. Journalism provides context and reported accounts, with attribution preserved."],
  ["Claims stay granular", "A source may support one statement but not a broader causal conclusion. Evidence is attached to claims, not only to entire pages."],
  ["Uncertainty remains visible", "Conflicts, missing information, translation choices, and unresolved questions are documented instead of silently reconciled."],
  ["Interpretation is labeled", "Ethical analysis and design implications are presented as analysis, not as a finding made by investigators."],
];

export default function MethodologyPage() {
  return <div className="page-shell shell">
    <div className="page-hero"><div className="eyebrow"><span className="eyebrow-line" /> RESEARCH PROTOCOL</div><h1>Trust the process.<br /><em>Interrogate the claim.</em></h1><p className="page-lede">A transparent methodology is part of the product. It makes the boundary between evidence and interpretation as visible as the interface itself.</p></div>
    <div className="method-grid"><aside className="method-aside"><Scale size={28} /><span className="section-kicker">EDITORIAL STANDARD</span><p>Accuracy before drama. Context before conclusion. People before spectacle.</p><Link href="/corrections">View corrections policy <ArrowUpRight size={14} /></Link></aside><div className="principles-list">{principles.map((p,i)=><article key={p[0]}><span>0{i+1}</span><div><h2>{p[0]}</h2><p>{p[1]}</p></div><CheckCircle2 size={19} /></article>)}</div></div>
    <section className="method-section"><div className="section-kicker">CASE SELECTION</div><h2>Why these three cases?</h2><p>The cases were selected because they are widely discussed examples of fatal crashes involving Tesla vehicles and driver-assistance questions across two countries. They provide contrasting evidence contexts: two cases with NTSB investigations and one case where publicly available details and system-engagement claims require more caution.</p><p>This is a purposive, illustrative selection—not a random or representative sample. It cannot estimate the frequency or relative risk of crashes, compare manufacturers, or establish that all three incidents had the same cause. Conclusions should be limited to the cases and sources actually examined.</p></section>
    <section className="method-section"><div className="section-kicker">PEOPLE & LANGUAGE</div><h2>Respectful treatment of fatal incidents</h2><ul className="method-bullets"><li>Use deceased people’s names when relevant to the public record, without sensationalism.</li><li>Do not speculate about private motives, health, family matters, or personal character.</li><li>Describe technical details only when relevant to the evidence or clearly labeled analysis.</li><li>For translated sources, record the original-language source and treat translations as derived sources. Flag material translation ambiguity rather than presenting translated wording as an independent primary source.</li></ul></section>
    <section className="method-section"><div className="section-kicker">SIMULATION LIMITS</div><h2>Conceptual, not forensic</h2><p>The Ethics Lab demonstrates selected human-factors concepts using adjustable assumptions. It is not a reconstruction of any crash, does not estimate the outcome of a real incident, and must not be interpreted as evidence about the people involved in these cases.</p><Link className="arrow-link" href="/ethics-lab">Read the scenario disclaimer <ArrowUpRight size={15} /></Link></section>
    <section className="notice-box"><CircleHelp size={20} /><div><strong>What this project does not claim</strong><p>Three selected cases do not establish population-level crash rates, prove a universal causal mechanism, or replace the complete investigative records. Research conclusions remain open to correction as stronger evidence becomes available.</p></div></section>
  </div>;
}
