import type { Metadata } from "next";
import Link from "next/link";
import { claims } from "@/lib/research/claims";
import { claimClassification } from "@/lib/research/schema";

export const metadata: Metadata = { title: "Research overview", description: "Questions, evidence categories, and limitations guiding Beyond Autopilot." };
const concepts = [
{number:"01",title:"The trust–capability gap",text:"Explore the distance between what a driver-assistance system is designed to do, what a person expects it to do, and what can be monitored in practice."},
{number:"02",title:"Perception and edge cases",text:"Consider how unusual road layouts, occlusion, and changing conditions challenge the assumption that routine performance guarantees reliable performance in every situation."},
{number:"03",title:"Human supervision",text:"Ask what continuous supervision requires, what monitoring signals can establish, and how an interface communicates system limits."},
{number:"04",title:"Responsibility in complex systems",text:"Use the moral-crumple-zone concept as an analytical lens for considering responsibility across people, design, operation, and oversight—not as a liability determination."}
];
const labels: Record<(typeof claimClassification.options)[number],string> = {official_finding:"Official finding",documented_fact:"Documented fact",reported_fact:"Reported fact",research_interpretation:"Research interpretation",hypothesis:"Hypothesis / unknown",conceptual_assumption:"Conceptual assumption"};
const descriptions: Record<(typeof claimClassification.options)[number],string> = {
official_finding:"A conclusion made by an official investigative body; verify the exact passage before publication.",
documented_fact:"A statement tied to an identifiable record without implying a broader causal conclusion.",
reported_fact:"A statement attributed to reporting or another secondary source; attribution stays visible.",
research_interpretation:"The project's own analysis, not an official finding.",
hypothesis:"An open question or uncertain proposition; not proof for either side.",
conceptual_assumption:"A premise used in an educational scenario, not a claim about an actual incident."
};
export default function ResearchPage(){return <div className="page-shell shell">
<div className="page-hero"><div className="eyebrow"><span className="eyebrow-line"/> RESEARCH / OVERVIEW</div><h1>Questions before<br/><em>conclusions.</em></h1><p className="page-lede">Beyond Autopilot examines driver-assistance, human supervision, and accountability through a small, deliberately bounded set of cases. This overview describes analytical questions; it does not certify individual claims as publication-ready.</p></div>
<section className="research-card-grid">{concepts.map((item)=><article className="research-card" key={item.number}><span className="research-number">{item.number}</span><h2>{item.title}</h2><p>{item.text}</p></article>)}</section>
<section className="research-status-panel"><div className="section-kicker">EDITORIAL STATUS</div><h2>Evidence labels are not decoration.</h2><p>The canonical dataset currently contains {claims.length} claim records. A record's presence does not mean it passed review. Starter claims remain draft until source passages, context, and limitations are verified.</p><div className="classification-grid">{claimClassification.options.map((item)=><article className="classification-card" key={item}><span className="badge badge-gray">{labels[item]}</span><p>{descriptions[item]}</p></article>)}</div></section>
<section className="research-link-grid" aria-label="Explore research modules"><Link className="research-link-card" href="/timeline"><span>01 / EVENTS</span><strong>Chronological timeline</strong><small>View dated events that pass the publication gate.</small></Link><Link className="research-link-card" href="/technology"><span>02 / SYSTEMS</span><strong>Technology explainer</strong><small>Review a generalized driver-assistance architecture.</small></Link><Link className="research-link-card" href="/accountability"><span>03 / ETHICS</span><strong>Accountability framework</strong><small>Compare questions across system actors.</small></Link><Link className="research-link-card" href="/cases"><span>04 / CASES</span><strong>Case studies</strong><small>Read case summaries with evidence boundaries.</small></Link></section>
</div>;}
