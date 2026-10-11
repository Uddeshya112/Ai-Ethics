import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { automotiveImages } from "@/lib/automotive-images";

const cases = [
  { id: "handan", name: "Handan, China", person: "Gao Yaning · 2016", status: "Reported circumstances · engagement unresolved", asset: automotiveImages.handan },
  { id: "williston", name: "Williston, Florida", person: "Joshua Brown · 2016", status: "NTSB investigation · multi-factor finding", asset: automotiveImages.williston },
  { id: "mountain-view", name: "Mountain View, California", person: "Walter Huang · 2018", status: "NTSB investigation · multi-factor finding", asset: automotiveImages.mountainView },
];

const pathways = [
  { href: "/technology", label: "01 / SYSTEMS", title: "Technology", text: "Explore assistance, monitoring, and operating limits.", asset: automotiveImages.technology },
  { href: "/evidence", label: "02 / SOURCES", title: "Evidence", text: "Trace claims to reports and named sources.", asset: automotiveImages.evidence },
  { href: "/ethics-lab", label: "03 / SCENARIOS", title: "Ethics Lab", text: "Change assumptions in a conceptual model.", asset: automotiveImages.ethicsLab },
  { href: "/timeline", label: "04 / CHRONOLOGY", title: "Timeline", text: "Read dates with their source and precision.", asset: automotiveImages.timeline },
];

export default function Home() {
  return (
    <div className="home-overview">
      <section className="cinematic-hero" id="home" aria-labelledby="home-title">
        <Image
          className="cinematic-hero-image"
          src={automotiveImages.homepage.src}
          alt={automotiveImages.homepage.alt}
          fill
          priority
          sizes="100vw"
        />
        <div className="cinematic-hero-shade" aria-hidden="true" />
        <div className="cinematic-hero-inner shell">
          <p className="cinematic-eyebrow">BEYOND AUTOPILOT <span>·</span> AI ETHICS &amp; AUTOMATED DRIVING</p>
          <h1 id="home-title">When the car takes the lead,<br /><em>who is still in control?</em></h1>
          <p className="cinematic-lede">Three selected cases. Two very different evidence records. One question about trust, supervision, and responsibility.</p>
          <div className="cinematic-actions">
            <Link className="cinematic-button light" href="#cases">Explore the cases <ArrowRight size={16} /></Link>
            <Link className="cinematic-button outline" href="/methodology">Our approach <ArrowUpRight size={16} /></Link>
          </div>
          <p className="illustration-disclosure">AI-generated illustrative scene · not incident photography</p>
        </div>
        <a className="cinematic-scroll" href="#overview"><span>SCROLL TO EXPLORE</span><ArrowDown size={15} /></a>
        <span className="cinematic-index" aria-hidden="true">RESEARCH FILE&nbsp; / &nbsp;001—003</span>
      </section>

      <section className="overview-statement" id="overview">
        <div className="shell overview-statement-grid">
          <div>
            <p className="cinematic-eyebrow">THE QUESTION BEHIND THE MACHINE</p>
            <h2>Automation changes the task.<br /><em>It does not remove the stakes.</em></h2>
          </div>
          <div className="overview-statement-copy">
            <p>Driver-assistance can make complex driving feel easier. The person behind the wheel may still be expected to monitor the road, understand system limits, and intervene when needed.</p>
            <p>This project asks how capability, expectation, and the conditions for supervision fit together. It does not treat three selected cases as a measure of crash risk.</p>
            <Link className="cinematic-text-link" href="/research">Read the research questions <ArrowUpRight size={15} /></Link>
          </div>
        </div>
        <div className="shell overview-metrics" aria-label="Project scope">
          <div><strong>03</strong><span>selected cases</span></div>
          <div><strong>02</strong><span>evidence contexts</span></div>
          <div><strong>01</strong><span>central question</span></div>
          <p>Illustrative selection · not a population sample</p>
        </div>
      </section>

      <section className="overview-cases" id="cases">
        <div className="shell">
          <div className="overview-section-heading">
            <div><p className="cinematic-eyebrow">THREE INCIDENTS · DISTINCT RECORDS</p><h2>Not one story.<br /><em>Three case files.</em></h2></div>
            <p>Read each case with its own evidence boundary. The images are illustrative context, never evidence of an incident.</p>
          </div>
          <div className="overview-case-grid">
            {cases.map((item, index) => (
              <Link className="overview-case-card" href={`/cases#${item.id}`} key={item.id}>
                <div className="overview-case-image">
                  <Image src={item.asset.src} alt={item.asset.alt} fill sizes="(max-width: 760px) 100vw, 33vw" />
                  <span className="overview-card-number">CASE / 0{index + 1}</span>
                  <span className="overview-image-note">ILLUSTRATION · NOT INCIDENT PHOTOGRAPHY</span>
                </div>
                <div className="overview-case-copy"><p>{item.person}</p><h3>{item.name}</h3><span>{item.status}</span><b>Read the case <ArrowUpRight size={15} /></b></div>
              </Link>
            ))}
          </div>
          <p className="overview-caveat">The project does not claim the three incidents share a single cause, and they cannot establish population-level crash rates.</p>
        </div>
      </section>

      <section className="overview-lenses">
        <div className="shell">
          <div className="overview-section-heading"><div><p className="cinematic-eyebrow">A FRAMEWORK FOR READING THE CASES</p><h2>Look beyond<br /><em>the dashboard.</em></h2></div><p>We separate documented findings from questions and interpretations. Uncertainty stays visible throughout the project.</p></div>
          <div className="overview-lens-list">
            <article><span>01</span><div><h3>Overtrust and naming</h3><p>How might system names, routine success, and interface language shape expectations? The NTSB reports discuss overreliance; they do not establish that product naming caused either US crash.</p></div><Link href="/research" aria-label="Read research questions about overtrust and naming"><ArrowUpRight size={18} /></Link></article>
            <article><span>02</span><div><h3>Perception and monitoring</h3><p>What information can a system and a driver use, and what limits the time available to respond? Technical claims stay tied to a source or labeled conceptual.</p></div><Link href="/technology" aria-label="Explore system and monitoring questions"><ArrowUpRight size={18} /></Link></article>
            <article><span>03</span><div><h3>The human in the loop</h3><p>When is a supervisor meaningfully equipped to see, understand, and act? The Handan case remains unresolved in the registered sources.</p></div><Link href="/accountability" aria-label="Explore the accountability framework"><ArrowUpRight size={18} /></Link></article>
          </div>
          <div className="overview-principles"><span>THREE THINGS TO KEEP IN VIEW</span><p>Level 2 assistance still requires human supervision. Official findings can be multi-factor. Three selected cases do not produce a crash rate.</p></div>
        </div>
      </section>

      <section className="overview-pathways" aria-labelledby="pathways-title">
        <div className="shell">
          <div className="overview-section-heading"><div><p className="cinematic-eyebrow">FOLLOW THE THREAD</p><h2 id="pathways-title">Choose a path<br /><em>through the research.</em></h2></div><p>Move from system concepts to sources, scenarios, and chronology. Each route keeps its full research content.</p></div>
          <div className="overview-pathway-grid">
            {pathways.map((item) => <Link className="overview-pathway-card" href={item.href} key={item.href}>
              <div className="overview-pathway-image"><Image src={item.asset.src} alt={item.asset.alt} fill sizes="(max-width: 680px) 100vw, (max-width: 1000px) 50vw, 25vw" /></div>
              <div className="overview-pathway-copy"><span>{item.label}</span><h3>{item.title}</h3><p>{item.text}</p><b>Explore <ArrowUpRight size={15} /></b></div>
            </Link>)}
          </div>
        </div>
      </section>

      <section className="overview-faq shell">
        <div className="overview-section-heading"><div><p className="cinematic-eyebrow">A FEW IMPORTANT BOUNDARIES</p><h2>Read with care.</h2></div><Link className="cinematic-text-link" href="/evidence">Browse the evidence <ArrowUpRight size={15} /></Link></div>
        <div className="overview-faq-list">
          <details><summary>Is this site saying driver-assistance is unsafe?</summary><p>No. It examines responsibility and design in three selected cases and does not estimate the safety or risk rate of any system.</p></details>
          <details><summary>Why include a case with unclear evidence?</summary><p>Handan demonstrates how uncertainty should be handled. System engagement remains unresolved in the project’s registered sources.</p></details>
          <details><summary>Can I use this in class?</summary><p>The presentation and discussion prompts are available for teaching. Review the project’s reuse terms before redistributing material.</p></details>
        </div>
      </section>

      <section className="cinematic-closing" id="closing">
        <Image src={automotiveImages.closing.src} alt={automotiveImages.closing.alt} fill sizes="100vw" />
        <div className="cinematic-closing-shade" aria-hidden="true" />
        <div className="shell cinematic-closing-copy"><p className="cinematic-eyebrow">BEYOND AUTOPILOT</p><h2>Technology can assist the driver.<br /><em>It cannot make responsibility disappear.</em></h2><div className="cinematic-actions"><Link className="cinematic-button light" href="/presentation">Open the presentation <ArrowRight size={16} /></Link><Link className="cinematic-button outline" href="/corrections">Corrections &amp; updates <ArrowUpRight size={16} /></Link></div><p className="illustration-disclosure">AI-generated illustrative scene · not a documentary photograph</p></div>
      </section>
    </div>
  );
}
