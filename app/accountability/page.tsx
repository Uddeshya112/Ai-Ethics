import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Building2, MonitorCog, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Responsibility and accountability",
  description: "A framework for examining responsibility across people, interfaces, organizations, and operating conditions.",
};

const actors = [
  { title: "People and supervision", body: "Consider the task a person was asked to perform, what information was available, and whether realistic monitoring was possible.", icon: Users },
  { title: "Interface and system design", body: "Examine capability communication, alerts, monitoring design, and how predictable system boundaries were made visible.", icon: MonitorCog },
  { title: "Organizations and governance", body: "Review design decisions, evaluation, documentation, deployment conditions, and the processes used to identify and mitigate risk.", icon: Building2 },
];

export default function AccountabilityPage() {
  return <div className="page-shell shell">
    <div className="page-hero"><div className="eyebrow"><span className="eyebrow-line" /> ACCOUNTABILITY / FRAMEWORK</div><h1>Responsibility is a system question.<br /><em>Not a shortcut to blame.</em></h1><p className="page-lede">This framework helps readers ask where duties, information, control, and decision-making were located. It does not assign legal liability to any person or organization.</p></div>
    <div className="reflection-grid">{actors.map(({ title, body, icon: Icon }, index) => <article key={title}><span>0{index + 1}</span><Icon size={22} /><h3>{title}</h3><p>{body}</p></article>)}</div>
    <section className="method-section"><div className="section-kicker">ANALYSIS QUESTIONS</div><h2>Map the conditions before drawing conclusions.</h2><ul className="method-bullets"><li>What capability and limitation information was documented?</li><li>What monitoring task was expected, and how was it supported?</li><li>What evidence establishes the timeline and system state?</li><li>Which statements are official findings, reported claims, or project interpretation?</li></ul><Link className="arrow-link" href="/ethics-lab/responsibility">Open the responsibility mapping exercise <ArrowUpRight size={15} /></Link></section>
    <section className="notice-box"><div><strong>Important limit</strong><p>This is an educational analytical framework, not legal advice, a formal fault allocation, or a finding about the people in the case studies.</p></div></section>
  </div>;
}
