"use client";

import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";

const slides = [
  { section: "OPENING", title: "Beyond Autopilot", subtitle: "AI ethics, human trust, and the limits of automated driving", bullets: ["Three fatal crash case studies", "A question of human–automation responsibility", "An evidence-first research project"], note: "Introduce the research question. Clarify that this is not a claim that all incidents share a cause." },
  { section: "THE QUESTION", title: "When the car takes the lead, who is still in control?", subtitle: "Automation changes the task. It does not remove the stakes.", bullets: ["System capability", "Human expectation", "Supervision under pressure"], note: "Frame the presentation around the gap between designed capability and perceived capability." },
  { section: "CONTEXT", title: "Driver assistance is not autonomous driving", subtitle: "Names and interfaces shape what people believe a system can do.", bullets: ["Capabilities are bounded", "Driver attention remains a safety factor", "Terminology can encourage overconfidence"], note: "Use precise language and avoid implying that a named feature makes the vehicle fully autonomous." },
  { section: "HUMAN FACTORS", title: "Trust can become overtrust", subtitle: "A system that works often can still fail at the moment it matters.", bullets: ["Automation bias", "Out-of-the-loop effects", "Expectation and vigilance"], note: "Distinguish a conceptual human-factors lens from evidence about any individual driver." },
  { section: "CASE 01", title: "Handan, China · 2016", subtitle: "Gao Yaning", bullets: ["Contemporary reporting describes a fatal crash", "Publicly available details require careful attribution", "Autopilot engagement must not be treated as confirmed without primary support"], note: "Do not overstate system engagement. The evidence context is different from the NTSB cases." },
  { section: "CASE 02", title: "Williston, Florida · 2016", subtitle: "Joshua Brown", bullets: ["NTSB investigation HWY16FH018", "Official findings discuss multiple contributing factors", "Read the final report before summarizing probable cause"], note: "Do not reduce the investigation to a one-factor narrative." },
  { section: "CASE 03", title: "Mountain View, California · 2018", subtitle: "Walter Huang", bullets: ["NTSB investigation HWY18FH011", "Final report HAR-20/01", "System behavior, roadway context, and supervision all require precise reading"], note: "Use the official report as the controlling source for investigative findings." },
  { section: "COMPARISON", title: "Three cases do not make a crash-rate study", subtitle: "Selection can illuminate questions, not estimate prevalence.", bullets: ["Purposive case selection", "Different evidentiary records", "No population-level risk estimate"], note: "State the generalization limit explicitly." },
  { section: "SYSTEM DESIGN", title: "The interface is part of the safety system", subtitle: "Warnings, naming, and monitoring influence human behavior.", bullets: ["Communicate capability boundaries", "Design for attention limits", "Avoid relying on warnings alone"], note: "Frame these as design implications, not claims about a specific unverified interface event." },
  { section: "CONCEPT", title: "The moral crumple zone", subtitle: "When the human operator absorbs responsibility for a complex system.", bullets: ["Responsibility can be unevenly distributed", "Human oversight may be constrained by design", "Accountability needs a system-level view"], note: "Attribute the concept to Madeleine Clare Elish; use the paper as the primary reference." },
  { section: "ETHICS LAB", title: "Make the assumptions visible", subtitle: "A conceptual model of attention, response, and distance.", bullets: ["Illustrative inputs", "Transparent calculations", "Not a crash reconstruction"], note: "If demonstrating the lab, repeat that it is not a forensic model." },
  { section: "LIMITATIONS", title: "What this research cannot conclude", subtitle: "A boundary is part of an honest finding.", bullets: ["No universal causal mechanism", "No comparative manufacturer risk ranking", "No population-level crash rate from three cases"], note: "Use this slide to establish credibility, not to diminish the value of the case analysis." },
  { section: "RECOMMENDATIONS", title: "Design for realistic human supervision", subtitle: "Do not treat the human as an infinite safety buffer.", bullets: ["Clear capability communication", "Robust attention monitoring", "Independent evaluation and transparent reporting"], note: "Present recommendations as normative proposals informed by the case analysis." },
  { section: "CONCLUSION", title: "Trust is a design outcome", subtitle: "So is overtrust.", bullets: ["Capability must be communicated", "Evidence must remain traceable", "Responsibility must be examined across the system"], note: "Return to the opening question and summarize the argument." },
  { section: "SOURCES", title: "Read the evidence yourself", subtitle: "Start with primary investigations and trace every claim.", bullets: ["NTSB · HWY16FH018", "NTSB · HWY18FH011 / HAR-20/01", "Elish · The Moral Crumple Zone"], note: "Point to the evidence library for links and editorial limitations." },
];

export default function PresentationPage() {
  const [index, setIndex] = useState(0);
  const [showNotes, setShowNotes] = useState(false);
  const current = slides[index];
  const move = useCallback((delta: number) => setIndex((i) => (i + delta + slides.length) % slides.length), []);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === "PageDown") move(1);
      if (event.key === "ArrowLeft" || event.key === "PageUp") move(-1);
      if (event.key === "Home") setIndex(0);
      if (event.key === "End") setIndex(slides.length - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [move]);
  return <div className="presentation-page shell">
    <div className="presentation-heading"><div><div className="eyebrow"><span className="eyebrow-line" /> PRESENTATION / INTERACTIVE PREVIEW</div><h1>Fifteen slides.<br /><em>One difficult question.</em></h1></div><p>Use ← → or the controls to navigate. Speaker notes are available below each slide. This is an initial web-based presentation draft.</p></div>
    <section className="slide-frame" aria-label={`Slide ${index + 1} of ${slides.length}`}>
      <div className="slide-topline"><span>BEYOND AUTOPILOT</span><span>{current.section}</span><span>{String(index + 1).padStart(2,"0")} / {slides.length}</span></div>
      <div className="slide-body" key={index}><div className="slide-accent" /><div className="slide-section">{current.section}</div><h2>{current.title}</h2><p className="slide-subtitle">{current.subtitle}</p><ul>{current.bullets.map((b) => <li key={b}><span />{b}</li>)}</ul></div>
      <div className="slide-footer"><span>AI ETHICS · HUMAN TRUST</span><span>RESEARCH PREVIEW · NOT FINAL DECK</span></div>
    </section>
    <div className="slide-controls"><button onClick={() => move(-1)} aria-label="Previous slide"><ArrowLeft size={17} /> Previous</button><div className="slide-progress" aria-label={`Slide ${index + 1} of ${slides.length}`}>{slides.map((s,i)=><button key={s.section + i} className={i === index ? "active" : ""} aria-label={`Go to slide ${i+1}: ${s.title}`} onClick={() => setIndex(i)} />)}</div><button onClick={() => move(1)}>Next <ArrowRight size={17} /></button></div>
    <div className="notes-panel"><button onClick={() => setShowNotes(!showNotes)} className="notes-toggle">{showNotes ? "Hide speaker notes" : "Show speaker notes"} <span>{showNotes ? "−" : "+"}</span></button>{showNotes && <div className="speaker-note"><strong>Presenter notes · Slide {index + 1}</strong><p>{current.note}</p></div>}</div>
    <div className="presentation-bottom"><button className="reset-button" onClick={() => {setIndex(0);setShowNotes(false);}}><RotateCcw size={15} /> Restart presentation</button><span>Keyboard navigation: ← → · Home · End</span></div>
  </div>;
}
