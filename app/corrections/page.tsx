import type { Metadata } from "next";
import { MailCheck, ShieldCheck } from "lucide-react";

export const metadata: Metadata = { title: "Corrections & updates", description: "How to report an error or request a source correction." };

export default function CorrectionsPage() {
  return <div className="page-shell shell narrow-page">
    <div className="page-hero"><div className="eyebrow"><span className="eyebrow-line" /> ACCOUNTABILITY / VERSION HISTORY</div><h1>Research should be<br /><em>correctable.</em></h1><p className="page-lede">If a source is wrong, a claim is overstated, or a citation no longer resolves, the responsible response is to record and correct it.</p></div>
    <div className="correction-card"><ShieldCheck size={25} /><h2>Our correction standard</h2><ul className="method-bullets"><li>Corrections should identify the affected claim or page and the nature of the change.</li><li>Material changes to causal language require a second editorial review.</li><li>Original uncertainty should not be silently removed when updating a claim.</li><li>Where practical, correction records should include the date, reason, previous wording, and revised wording.</li></ul></div>
    <div className="notice-box"><MailCheck size={20} /><div><strong>Public correction log</strong><p>The database-backed correction log is not connected yet. Until it is implemented, do not treat this page as proof that a formal submission workflow is live. For now, open an issue in the project repository describing the claim and providing the supporting source.</p><a className="inline-link" href="https://github.com/Uddeshya112/Ai-Ethics/issues" target="_blank" rel="noreferrer">Open a project issue ↗</a></div></div>
  </div>;
}
