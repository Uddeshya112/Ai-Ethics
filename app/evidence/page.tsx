import type { Metadata } from "next";
import Link from "next/link";
import { BookOpenCheck, ExternalLink, Info } from "lucide-react";
import { incidents } from "@/lib/research/incidents";
import { claims } from "@/lib/research/claims";
import { sources as canonicalSources } from "@/lib/research/sources";
import { showDraftResearch } from "@/lib/research/publication";

export const metadata: Metadata = { title: "Evidence ledger", description: "Primary sources, claim classifications, and limitations for the Beyond Autopilot research project." };

const sources = [
  { id: "S-01", title: "NTSB investigation: Williston, Florida (HWY16FH018)", publisher: "National Transportation Safety Board", year: "2017", type: "Official investigation", note: "Williston, Florida · Investigation HWY16FH018. Primary source for the NTSB's findings in the Joshua Brown case.", href: "https://www.ntsb.gov/investigations/AccidentReports/Reports/HAR1702.pdf" },
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

const claimSourceById=new Map(canonicalSources.map((source)=>[source.id,source]));
const matrixIncidents=incidents.filter((incident)=>incident.publicationStatus==="published"||showDraftResearch);
const matrixSourceTitles=new Map(canonicalSources.map((source)=>[source.id,source.title]));
const matrixAnchors:Record<string,string>={"gao-yaning":"handan","joshua-brown":"williston","walter-huang":"mountain-view"};
export default function EvidencePage() {
  return <div className="page-shell shell">
    <div className="page-hero"><div className="eyebrow"><span className="eyebrow-line" /> EVIDENCE / TRANSPARENCY</div><h1>Show the source.<br /><em>Keep the uncertainty.</em></h1><p className="page-lede">A source list is only the beginning. The important work is connecting a specific claim to the evidence that supports it—and stating what that evidence cannot tell us.</p></div>
    <section className="evidence-intro"><BookOpenCheck size={22} /><div><h2>Evidence is not a visual style.</h2><p>Labels communicate the status of a claim, not how much we like or dislike it. No claim should gain certainty because it appears in a polished interface.</p></div></section>
    <h2 className="subheading">Claim classifications</h2><div className="classification-grid">{classes.map((c) => <article className="classification-card" key={c.label}><span className={`badge badge-${c.color}`}>{c.label}</span><p>{c.desc}</p></article>)}</div>
    <div className="sources-heading"><div><div className="section-kicker">REFERENCE LIBRARY</div><h2>Start with primary sources.</h2></div><span>{sources.length} starter records</span></div>
    <div className="source-list">{sources.map((s) => <article className="source-card" key={s.id}><div className="source-id">{s.id}</div><div className="source-main"><div className="source-meta"><span>{s.type}</span><span>{s.year}</span></div><h3>{s.title}</h3><p className="source-publisher">{s.publisher}</p><p>{s.note}</p></div><a className="source-open" href={s.href} target="_blank" rel="noreferrer" aria-label={`Open ${s.title} in a new tab`}><ExternalLink size={18} /></a></article>)}</div>
    <section className="claim-register">
      <div className="sources-heading"><div><div className="section-kicker">CLAIM REGISTER</div><h2>Claims with report locators.</h2></div><span>{claims.filter((claim)=>claim.citations.length>0).length} located claims</span></div>
      <p>These report passages were checked for locator accuracy. Claims remain drafts pending independent editorial review.</p>
      <div className="source-list">{claims.filter((claim)=>claim.citations.length>0).map((claim)=><article className="source-card" key={claim.id}>
        <div className="source-main"><div className="source-meta"><span>{claim.classification.replaceAll("_"," ")}</span><span>{claim.status}</span></div><h3>{claim.statement}</h3>
          {claim.citations.map((citation)=><p key={citation.sourceId+citation.locator}><strong>{citation.relationship}: </strong><a href={claimSourceById.get(citation.sourceId)?.url} target="_blank" rel="noreferrer">{claimSourceById.get(citation.sourceId)?.title} — {citation.locator}</a></p>)}
          {claim.limitations.map((limitation)=><p className="source-publisher" key={limitation}>{limitation}</p>)}
        </div>
      </article>)}</div>
    </section>
    <div className="notice-box"><Info size={20} /><div><strong>Editorial status: draft research</strong><p>Six Williston and Mountain View claim locators have been checked against the adopted NTSB reports. The full dataset remains unpublished pending independent review. Handan claims still need primary Chinese-language sources and careful source attribution.</p></div></div>
    <section className="research-status-panel">
      <div className="section-kicker">CASE COMPARISON / DATASET STATUS</div><h2>Compare evidence context, not assumed equivalence.</h2>
      <p>The matrix draws incident and source references from the canonical dataset. Draft incident details are shown only in development preview; production requires explicit publication status.</p>
      <div className="evidence-matrix-wrap"><table className="evidence-matrix">
        <thead><tr><th scope="col">Incident</th><th scope="col">Location</th><th scope="col">Registered status</th><th scope="col">Linked source records</th></tr></thead>
        <tbody>{matrixIncidents.map((incident)=><tr key={incident.id}><th scope="row"><Link href={"/cases#"+(matrixAnchors[incident.id]??"")}>{incident.title}</Link></th><td>{incident.location}</td><td><span className="badge badge-gray">{incident.publicationStatus}</span><br/>{incident.statusNote}</td><td>{Array.from(new Set(incident.events.flatMap((event)=>event.sourceIds))).map((id)=>matrixSourceTitles.get(id)??id).join("; ")||"No registered source"}</td></tr>)}</tbody>
      </table></div>
      {matrixIncidents.length===0&&<p>No incident records are cleared for production matrix display. Draft entries are available only in development or with an explicit preview override.</p>}
    </section>
  </div>;
}
