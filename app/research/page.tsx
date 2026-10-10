import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, BookOpenCheck, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Research overview",
  description: "Scope, questions, and limits of the Beyond Autopilot case-study research.",
};

const questions = [
  ["Capability", "What was the driver-assistance system designed and documented to do at the time?"],
  ["Supervision", "What do the available records support about the human-supervision context?"],
  ["Responsibility", "How should responsibility be examined across people, interfaces, organizations, and operating conditions?"],
];

export default function ResearchPage() {
  return <div className="page-shell shell">
    <div className="page-hero"><div className="eyebrow"><span className="eyebrow-line" /> RESEARCH / SCOPE</div><h1>Ask better questions.<br /><em>Make narrower claims.</em></h1><p className="page-lede">Beyond Autopilot examines three fatal-crash case studies involving driver assistance. It separates official findings, documented facts, reported claims, and project interpretation.</p></div>
    <section className="method-section"><div className="section-kicker">RESEARCH QUESTIONS</div><div className="reflection-grid">{questions.map(([title, body], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{body}</p></article>)}</div></section>
    <section className="evidence-intro"><BookOpenCheck size={22} /><div><h2>Evidence before narrative</h2><p>Each case has a different evidence context. A secondary report is not an official finding, and a conceptual ethical interpretation is not a forensic conclusion.</p><Link className="arrow-link" href="/evidence">Explore the evidence ledger <ArrowUpRight size={15} /></Link></div></section>
    <section className="notice-box"><ShieldCheck size={20} /><div><strong>Scope and limitations</strong><p>These selected cases are illustrative, not a representative sample. This project does not estimate population-level crash rates, rank manufacturers by risk, or establish one universal cause.</p></div></section>
  </div>;
}
