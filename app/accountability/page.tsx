import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, CircleHelp, ClipboardCheck, Cog, UserRound, Scale } from "lucide-react";
export const metadata:Metadata={title:"Accountability framework",description:"A conceptual framework for asking where responsibility and control sit in automated systems."};
const actors=[
{title:"Human operator",icon:UserRound,question:"What task, attention, and intervention were expected of the operator, and what information was available at the time?"},
{title:"Product and system design",icon:Cog,question:"How were capabilities and limits communicated? Which safeguards, monitoring signals, and fallback behaviors were part of the design?"},
{title:"Road and operating context",icon:ClipboardCheck,question:"What environmental or infrastructure conditions shaped the event, and which were known or reasonably knowable?"},
{title:"Governance and oversight",icon:Scale,question:"What evaluation, reporting, standards, maintenance, and post-incident review mechanisms applied?"}
];
export default function AccountabilityPage(){return <div className="page-shell shell">
<div className="page-hero"><div className="eyebrow"><span className="eyebrow-line"/> ACCOUNTABILITY / FRAMEWORK</div><h1>Look across the system.<br/><em>Don't guess liability.</em></h1><p className="page-lede">This page offers questions for structured analysis—not a conclusion about legal fault, moral blame, or responsibility in a specific crash.</p></div>
<div className="notice-box"><CircleHelp size={20}/><div><strong>Conceptual framework only</strong><p>Actual responsibility depends on case-specific evidence, applicable law, and competent investigation. This framework prevents the human operator from being treated as the only relevant part of a complex system.</p></div></div>
<section className="accountability-grid">{actors.map((actor,index)=>{const Icon=actor.icon;return <article className="accountability-card" key={actor.title}><div className="accountability-card-top"><span>ACTOR {String(index+1).padStart(2,"0")}</span><Icon size={22}/></div><h2>{actor.title}</h2><p>{actor.question}</p></article>;})}</section>
<section className="research-status-panel"><div className="section-kicker">A REPEATABLE REVIEW</div><h2>Keep the analysis auditable.</h2><ol className="accountability-steps"><li>State the question precisely and separate observed facts from inference.</li><li>Link factual statements to a named source and specific passage where available.</li><li>Record uncertainty, competing explanations, and limitations of the record.</li><li>Have material public factual changes reviewed by a second editor; preserve the correction history.</li></ol><Link className="button button-dark" href="/ethics-lab/responsibility">Open responsibility mapping <ArrowUpRight size={16}/></Link></section></div>;}
