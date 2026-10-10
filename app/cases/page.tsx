import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, FileText, ShieldAlert } from "lucide-react";

export const metadata: Metadata = { title: "Case studies", description: "Three selected Tesla-related fatal crash cases, with evidence boundaries and source links." };

const cases = [
  {
    id: "handan", no: "CASE 01", place: "HANDAN, HEBEI · CHINA", date: "JANUARY 2016", person: "Gao Yaning",
    title: "What can be established when the record is incomplete?",
    type: "Reported circumstances", status: "Important uncertainty",
    summary: "Contemporary reporting described a fatal collision involving a Tesla vehicle in Hebei. Publicly available reporting does not establish every operational detail with the same level of certainty as a formal investigative report.",
    takeaway: "Autopilot engagement must not be stated as confirmed without a reliable primary source establishing it. Treat media reports as attributed reports, not official findings.",
    links: [{ label: "The Guardian reporting", href: "https://www.theguardian.com/technology/2016/sep/14/tesla-fatal-crash-china-autopilot-gao-yaning" }],
  },
  {
    id: "williston", no: "CASE 02", place: "WILLISTON, FLORIDA · UNITED STATES", date: "MAY 7, 2016", person: "Joshua Brown",
    title: "A fatal collision at the limits of driver assistance",
    type: "Official investigation", status: "NTSB report available",
    summary: "The NTSB investigated the fatal collision between a Tesla Model S and a tractor-trailer. Its findings address multiple contributing factors, including driver behavior and the operational limits and use of the driver-assistance system.",
    takeaway: "Do not reduce a multi-factor investigation to a single-cause story. The official report is the primary reference for findings and probable cause.",
    links: [{ label: "NTSB investigation · HWY16FH018", href: "https://www.ntsb.gov/investigations/Pages/hwy16fh018.aspx" }],
  },
  {
    id: "mountain-view", no: "CASE 03", place: "MOUNTAIN VIEW, CALIFORNIA · UNITED STATES", date: "MARCH 23, 2018", person: "Walter Huang",
    title: "When road geometry, system behavior, and supervision intersect",
    type: "Official investigation", status: "NTSB report available",
    summary: "The NTSB’s investigation examined the crash involving a Tesla Model X, roadway conditions, system performance, driver monitoring, and the broader context of driver-assistance use.",
    takeaway: "The case should be read through the report’s specific findings. Avoid turning any one technical factor into a complete explanation of the incident.",
    links: [{ label: "NTSB investigation · HWY18FH011", href: "https://www.ntsb.gov/investigations/pages/HWY18FH011.aspx" }, { label: "Final report · HAR-20/01 (PDF)", href: "https://www.ntsb.gov/investigations/AccidentReports/Reports/HAR2001.pdf" }],
  },
];

export default function CasesPage() {
  return <div className="page-shell shell">
    <div className="page-hero"><div className="eyebrow"><span className="eyebrow-line" /> CASE FILES / 001—003</div><h1>Three cases.<br /><em>Carefully bounded claims.</em></h1><p className="page-lede">These incidents are examined to understand the interaction between driver-assistance technology, human supervision, and responsibility. They are not a representative sample and cannot establish population-level crash rates.</p></div>
    <div className="notice-box"><ShieldAlert size={20} /><div><strong>How to read these case studies</strong><p>Each page separates official findings from documented facts, reported circumstances, and project interpretation. Where the public record is incomplete, the uncertainty stays visible.</p></div></div>
    <div className="case-detail-list">{cases.map((c) => <article className="case-detail" id={c.id} key={c.id}>
      <div className="case-detail-meta"><span>{c.no}</span><span>{c.date}</span></div><div className="case-detail-grid"><div><div className="case-place">{c.place}</div><h2>{c.person}</h2><p className="case-title">{c.title}</p></div><div className="case-detail-content"><div className="badge-row"><span className={c.id === "handan" ? "badge badge-amber" : "badge badge-blue"}>{c.type}</span><span className="muted-label">{c.status}</span></div><p>{c.summary}</p><div className="case-takeaway"><strong>Evidence boundary</strong><p>{c.takeaway}</p></div><div className="source-links">{c.links.map((l) => <a key={l.href} href={l.href} target="_blank" rel="noreferrer"><FileText size={15} />{l.label}<ArrowUpRight size={14} /></a>)}</div></div></div>
    </article>)}</div>
    <div className="bottom-callout"><div><span className="section-kicker">NEXT: THE EVIDENCE LEDGER</span><h2>Follow each claim back<br />to its source.</h2></div><Link className="button button-dark" href="/evidence">Explore evidence <ArrowUpRight size={16} /></Link></div>
  </div>;
}
