import type { Metadata } from "next";
import { ArrowUpRight, BookOpenCheck, ExternalLink, Info } from "lucide-react";

export const metadata: Metadata = { title: "Evidence ledger", description: "Primary sources, claim classifications, and limitations for the Beyond Autopilot research project." };

const sources = [
  { id: "S-01", title: "NTSB investigation: Williston, Florida (HWY16FH018)", publisher: "National Transportation Safety Board", year: "2017", type: "Official investigation", note: "Williston, Florida · Investigation HWY16FH018. Primary source for the NTSB's findings in the Joshua Brown case.", href: "https://www.ntsb.gov/investigations/Pages/hwy16fh018.aspx" },
  { id: "S-02", title: "Collision Between a Sport Utility Vehicle Operating with Partial Driving Automation and a Crash Attenuator", publisher: "National Transportation Safety Board", year: "2020", type: "Final accident report", note: "Mountain View, California · Report HAR-20/01, docket HWY18FH011. Consult the report for the full findings and probable cause.", href: "https://www.ntsb.gov/investigations/AccidentReports/Reports/HAR2001.pdf" },
  { id: "S-03", title: "Mountain View investigation", publisher: "National Transportation Safety Board", year: "2018–2020", type: "Official investigation", note: "Investigation page for the March 2018 crash involving Walter Huang.", href: "https://www.ntsb.gov/investigations/pages/HWY18FH011.aspx" },
  { id: "S-04", title: "Reporting on the Handan crash", publisher: "The Guardian (Reuters wire report)", year: "2016", type: "Journalism", note: "Secondary reporting on the death of Gao Yaning. Claims about system engagement should remain attributed unless corroborated by primary evidence.", href: "https://www.theguardian.com/technology/2016/sep/14/tesla-fatal-crash-china-autopilot-gao-yaning" },
  { id: "S-05", title: "Moral Crumple Zones: Cautionary Tales in Human-Robot Interaction", publisher: "Madeleine Clare Elish", year: "2019", type: "Research paper", note: "Peer-reviewed conceptual lens for examining how human operators can absorb responsibility within complex automated systems. Published in Engaging Science, Technology, and Society, 5 (2019), 40–60.", href: "https://estsjournal.org/index.php/ests/article/view/260" },
];

const classes = [
  { label: "Official finding", color: "blue", desc: "A statement explicitly made in an official investigation or primary record. It must link to the exact report or passage." },
  { label: "Documented fact", color: "green", desc: "A fact supported by an identifiable primary source, without implying an official causal conclusion." },
  { label: "Reported fact", color: "amber", desc: "A statement attributed to a named media or secondary source. Attribution remains visible." },
  { label: "Research interpretation", color: "purple", desc: "An analytical conclusion developed by this project. It is not presented as an investigator’s finding." },
  { label: "Hypothesis / unknown", color: "gray", desc: "A question or uncertain proposition that the available evidence does not settle." },
];

export default function EvidencePage() {
  return <div className="page-shell shell">
    <div className="page-hero"><div className="eyebrow"><span className="eyebrow-line" /> EVIDENCE / TRANSPARENCY</div><h1>Show the source.<br /><em>Keep the uncertainty.</em></h1><p className="page-lede">A source list is only the beginning. The important work is connecting a specific claim to the evidence that supports it—and stating what that evidence cannot tell us.</p></div>
    <section className="evidence-intro"><BookOpenCheck size={22} /><div><h2>Evidence is not a visual style.</h2><p>Labels communicate the status of a claim, not how much we like or dislike it. No claim should gain certainty because it appears in a polished interface.</p></div></section>
    <h2 className="subheading">Claim classifications</h2><div className="classification-grid">{classes.map((c) => <article className="classification-card" key={c.label}><span className={`badge badge-${c.color}`}>{c.label}</span><p>{c.desc}</p></article>)}</div>
    <div className="sources-heading"><div><div className="section-kicker">REFERENCE LIBRARY</div><h2>Start with primary sources.</h2></div><span>{sources.length} starter records</span></div>
    <div className="source-list">{sources.map((s) => <article className="source-card" key={s.id}><div className="source-id">{s.id}</div><div className="source-main"><div className="source-meta"><span>{s.type}</span><span>{s.year}</span></div><h3>{s.title}</h3><p className="source-publisher">{s.publisher}</p><p>{s.note}</p></div><a className="source-open" href={s.href} target="_blank" rel="noreferrer" aria-label={`Open ${s.title} in a new tab`}><ExternalLink size={18} /></a></article>)}</div>
    <div className="notice-box"><Info size={20} /><div><strong>Editorial status: starter bibliography</strong><p>These are initial research leads, not a claim that every citation locator and every factual statement has completed a full editorial audit. Verify exact report passages, publication metadata, and translation provenance before formal publication.</p></div></div>
  </div>;
}
