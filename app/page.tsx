import Link from "next/link";
import { ArrowDownRight, ArrowRight, ArrowUpRight, AudioLines, BookOpen, BrainCircuit, ShieldCheck } from "lucide-react";

const stats = [
  { n: "03", label: "fatal crash case studies", note: "Selected cases, not a population sample" },
  { n: "02", label: "countries represented", note: "United States · China" },
  { n: "01", label: "central question", note: "Who carries responsibility when control is shared?" },
];

const pillars = [
  { n: "01", icon: BookOpen, title: "Start with the evidence", text: "Read what investigators and primary sources establish. Keep reported circumstances separate from confirmed findings.", href: "/evidence", action: "Explore the evidence" },
  { n: "02", icon: BrainCircuit, title: "Understand the human system", text: "Automation changes attention, expectation, and reaction. The human operator is part of the system—not an afterthought.", href: "/ethics-lab", action: "Enter the Ethics Lab" },
  { n: "03", icon: ShieldCheck, title: "Question accountability", text: "When technology, interface design, and human supervision interact, responsibility cannot be understood from one factor alone.", href: "/methodology", action: "Read our method" },
];

export default function Home() {
  return (
    <>
      <section className="hero shell">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line" /> A RESEARCH PROJECT ON AUTOMATED DRIVING</div>
          <h1>When the car<br />takes the <em>lead,</em><br />who is still in control?</h1>
          <p className="hero-lede">An evidence-led investigation into AI-assisted driving, human trust, and the limits of automation. Three fatal crashes. One difficult question about the systems we build—and the people asked to supervise them.</p>
          <div className="hero-actions">
            <Link className="button button-dark" href="/cases">Explore the cases <ArrowRight size={16} /></Link>
            <Link className="text-link" href="/methodology">How we handle evidence <ArrowUpRight size={15} /></Link>
          </div>
          <div className="hero-note"><span className="live-dot" /> RESEARCH, NOT RECONSTRUCTION <span className="note-divider">/</span> LAST REVIEW: OCT 2026</div>
        </div>
        <div className="hero-art" aria-label="Abstract illustration of a road, sensing field, and vehicle">
          <div className="art-label art-label-top"><span>PERCEPTION</span><i>01 / INPUT</i></div>
          <div className="radar-ring ring-one" /><div className="radar-ring ring-two" /><div className="radar-ring ring-three" />
          <div className="road-grid"><span /><span /><span /></div>
          <div className="road-lane" />
          <div className="car-shape"><div className="car-glass" /><div className="car-light light-left" /><div className="car-light light-right" /></div>
          <div className="signal signal-one"><span />OBJECT DETECTED</div>
          <div className="signal signal-two"><span />HUMAN OVERSIGHT</div>
          <div className="art-label art-label-bottom"><span>DECISION SYSTEM</span><i>02 / OUTPUT</i></div>
          <div className="art-index">FIELD NOTE<br /><strong>001—003</strong></div>
        </div>
      </section>

      <section className="stats-band">
        <div className="shell stats-grid">{stats.map((s) => <div className="stat" key={s.n}><strong>{s.n}</strong><div><b>{s.label}</b><span>{s.note}</span></div></div>)}</div>
      </section>

      <section className="intro-section shell">
        <div className="section-kicker">THE QUESTION BEHIND THE MACHINE <span>01 — 04</span></div>
        <div className="intro-grid">
          <h2>Automation can<br />change the task.<br /><em>Not the stakes.</em></h2>
          <div className="intro-body"><p>Driver-assistance systems can make complex driving tasks feel easier. But the person behind the wheel may still be expected to monitor the road, understand the system’s limits, and intervene when it fails.</p><p>That creates a fragile relationship between what the technology can do, what a person believes it can do, and what the situation demands in the moment.</p><Link className="arrow-link" href="/evidence">Follow the evidence <ArrowDownRight size={16} /></Link></div>
        </div>
      </section>

      <section className="pillars-section">
        <div className="shell">
          <div className="section-heading"><div><div className="section-kicker">A FRAMEWORK FOR READING THE CASES</div><h2>Three ways to look<br />beyond the dashboard.</h2></div><p>We distinguish what is documented from what is interpreted—and make uncertainty visible.</p></div>
          <div className="pillar-grid">{pillars.map((p) => { const Icon = p.icon; return <article className="pillar-card" key={p.n}><div className="pillar-top"><span>{p.n}</span><Icon size={22} strokeWidth={1.5} /></div><h3>{p.title}</h3><p>{p.text}</p><Link href={p.href}>{p.action} <ArrowUpRight size={15} /></Link></article>; })}</div>
        </div>
      </section>

      <section className="case-teaser shell">
        <div className="section-kicker">THREE INCIDENTS · DISTINCT CONTEXTS <span>02 — 04</span></div>
        <div className="case-teaser-grid"><div><h2>Not one story.<br /><em>Three investigations.</em></h2><p>These cases are selected for examining driver-assistance, supervision, and accountability—not to estimate crash rates or claim that all incidents share a single cause.</p><Link className="button button-outline" href="/cases">View case studies <ArrowRight size={16} /></Link></div>
          <div className="case-list">
            <Link href="/cases#handan" className="case-row"><span className="case-year">2016 · CHINA</span><span className="case-name">Handan, Hebei<small>Gao Yaning · reported circumstances</small></span><ArrowUpRight size={16} /></Link>
            <Link href="/cases#williston" className="case-row"><span className="case-year">2016 · USA</span><span className="case-name">Williston, Florida<small>Joshua Brown · NTSB investigation</small></span><ArrowUpRight size={16} /></Link>
            <Link href="/cases#mountain-view" className="case-row"><span className="case-year">2018 · USA</span><span className="case-name">Mountain View, California<small>Walter Huang · NTSB investigation</small></span><ArrowUpRight size={16} /></Link>
          </div>
        </div>
      </section>

      <section className="quote-band"><div className="shell quote-inner"><AudioLines size={25} strokeWidth={1.3} /><blockquote>“The human operator is often made responsible for the system’s failures, even when the system has shaped the conditions of failure.”</blockquote><p>CONCEPTUAL LENS · MORAL CRUMPLE ZONE</p><span className="quote-attribution">Inspired by Madeleine Clare Elish’s research. This is a paraphrase, not a direct quotation.</span></div></section>

      <section className="final-cta shell"><div><div className="section-kicker">LOOK CLOSER</div><h2>Trust is a design outcome.<br /><em>So is overtrust.</em></h2></div><div><p>Explore a clearly labeled conceptual scenario to see how assumptions about attention, detection, and reaction time shape human–automation interaction.</p><Link className="button button-dark" href="/ethics-lab">Try the Ethics Lab <ArrowRight size={16} /></Link></div></section>
    </>
  );
}
