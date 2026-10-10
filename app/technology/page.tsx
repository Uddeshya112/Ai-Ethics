import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Eye, Gauge, UserRound } from "lucide-react";

export const metadata: Metadata = {
  title: "Technology and supervision",
  description: "A plain-language overview of driver assistance, system boundaries, and human supervision.",
};

const layers = [
  { title: "Sensing and perception", body: "The system interprets sensor inputs and estimates relevant objects or road features. Perception can be incomplete or uncertain.", icon: Eye },
  { title: "Assistance behavior", body: "A driver-assistance feature can support a bounded driving task without becoming a fully autonomous driver in every condition.", icon: Gauge },
  { title: "Human supervision", body: "The person behind the wheel may remain responsible for monitoring the road and responding when the system reaches its limits.", icon: UserRound },
];

export default function TechnologyPage() {
  return <div className="page-shell shell">
    <div className="page-hero"><div className="eyebrow"><span className="eyebrow-line" /> TECHNOLOGY / SYSTEM BOUNDARIES</div><h1>Assistance is a capability.<br /><em>Not a promise.</em></h1><p className="page-lede">Driver-assistance systems combine technical capability with human expectations. A responsible explanation must describe both the feature and its limits.</p></div>
    <div className="reflection-grid">{layers.map(({ title, body, icon: Icon }, index) => <article key={title}><span>0{index + 1}</span><Icon size={22} /><h3>{title}</h3><p>{body}</p></article>)}</div>
    <section className="method-section"><div className="section-kicker">INTERPRETATION RULE</div><h2>Do not collapse different evidence into one claim.</h2><p>Product documentation, official investigative findings, contemporaneous reporting, and project analysis answer different questions. A claim about a specific incident needs a source that supports that incident-specific detail.</p><Link className="arrow-link" href="/evidence">Review source classifications <ArrowUpRight size={15} /></Link></section>
    <section className="notice-box"><div><strong>Terminology matters</strong><p>Feature names and marketing language do not, by themselves, establish the technical capability available in a particular vehicle, software version, road, or moment.</p></div></section>
  </div>;
}
