import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case timeline",
  description: "A cautious chronology of the three selected driver-assistance case studies.",
};

const events = [
  { date: "January 2016", caseName: "Handan, China", person: "Gao Yaning", detail: "A fatal crash was described in contemporary reporting. Publicly available detail and claims about system engagement require careful attribution.", status: "Reported context" },
  { date: "May 2016", caseName: "Williston, Florida", person: "Joshua Brown", detail: "A fatal crash later investigated by the National Transportation Safety Board under investigation HWY16FH018.", status: "Official investigation" },
  { date: "March 2018", caseName: "Mountain View, California", person: "Walter Huang", detail: "A fatal crash investigated by the NTSB under HWY18FH011; the final report is HAR-20/01.", status: "Official investigation" },
];

export default function TimelinePage() {
  return <div className="page-shell shell">
    <div className="page-hero"><div className="eyebrow"><span className="eyebrow-line" /> TIMELINE / CASE CONTEXT</div><h1>Chronology without<br /><em>false precision.</em></h1><p className="page-lede">Dates are shown only at the precision supported by the current project records. This overview is a navigation aid, not a substitute for the underlying reports.</p></div>
    <div className="principles-list">{events.map((event) => <article key={event.caseName}><span aria-hidden="true">•</span><div><div className="source-meta"><span>{event.status}</span><span>{event.date}</span></div><h2>{event.caseName} · {event.person}</h2><p>{event.detail}</p></div></article>)}</div>
    <section className="notice-box"><div><strong>Chronology caveat</strong><p>The Handan date remains at month precision. Do not infer an exact day or treat system engagement as confirmed without adequate primary-source support. Consult the <a href="/evidence">evidence ledger</a> for source context.</p></div></section>
  </div>;
}
