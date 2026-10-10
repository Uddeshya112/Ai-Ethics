"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { computeStoppingDistance } from "@/lib/simulations/stopping-distance";
import { AlertTriangle, ArrowRight, RotateCcw, SlidersHorizontal } from "lucide-react";

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

export default function EthicsLabPage() {
  const [speed, setSpeed] = useState(60);
  const [attention, setAttention] = useState(1.8);
  const [response, setResponse] = useState(0.8);
  const [margin, setMargin] = useState(1.2);
  const [scenario, setScenario] = useState(1);
  const [handoverSpeed, setHandoverSpeed] = useState(90);
  const [warningTime, setWarningTime] = useState(3);
  const [reactionTime, setReactionTime] = useState(1.5);
  const [disengagedMinutes, setDisengagedMinutes] = useState(10);
  const [dutyLens, setDutyLens] = useState("foreseeability");
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const stoppingDistance = useMemo(() => {
    const result = computeStoppingDistance({ speedKmh: speed, reactionTimeSeconds: attention + response, decelerationMps2: 7 });
    return result.ok ? Math.round(result.value.totalDistanceMeters) : 0;
  }, [speed, attention, response]);
  const remaining = Math.round((speed / 3.6) * margin);
  const risk = stoppingDistance > remaining ? "Insufficient margin in this conceptual setup" : "Margin remains in this conceptual setup";
  const reset = () => { setSpeed(60); setAttention(1.8); setResponse(0.8); setMargin(1.2); };
  return <div className="page-shell shell">
    <div className="page-hero"><div className="eyebrow"><span className="eyebrow-line" /> ETHICS LAB / SCENARIO 001</div><h1>Seconds matter.<br /><em>Assumptions matter too.</em></h1><p className="page-lede">Explore how attention delay, response time, and available distance interact. The point is not to predict a crash—it is to make hidden assumptions inspectable.</p></div>
    <div className="lab-warning"><AlertTriangle size={20} /><div><strong>Conceptual demonstration — not a crash reconstruction</strong><p>This simplified model is illustrative only. It omits road grade, tire and brake variation, perception uncertainty, system behavior, obstacle motion, and many other factors. It must not be used to assess a real vehicle, incident, or person.</p></div></div>
    <div className="lab-layout">
      <section className="lab-controls"><div className="lab-panel-heading"><SlidersHorizontal size={18} /><h2>Change the assumptions</h2></div>
        <Slider label="Vehicle speed" value={speed} min={20} max={120} step={5} unit="km/h" onChange={setSpeed} />
        <Slider label="Attention delay" value={attention} min={0.5} max={4} step={0.1} unit="s" onChange={setAttention} />
        <Slider label="Response interval" value={response} min={0.2} max={2} step={0.1} unit="s" onChange={setResponse} />
        <Slider label="Available distance" value={margin} min={0.5} max={5} step={0.1} unit="s of travel" onChange={setMargin} />
        <button className="reset-button" onClick={reset}><RotateCcw size={15} /> Reset assumptions</button>
      </section>
      <section className="lab-results"><div className="result-overline">ILLUSTRATIVE OUTPUT</div><div className="result-primary"><strong>{stoppingDistance}<small> m</small></strong><span>Approx. distance before a full stop under the chosen simplified assumptions</span></div><div className="result-bar"><span style={{ width: `${clamp(stoppingDistance / Math.max(remaining, stoppingDistance, 1) * 100, 4, 100)}%` }} /></div><div className="result-compare"><div><span>Distance margin</span><strong>{remaining} m</strong></div><div><span>Attention + response</span><strong>{(attention + response).toFixed(1)} s</strong></div></div><div className={stoppingDistance > remaining ? "result-status status-alert" : "result-status status-ok"}><span />{risk}</div><p className="result-caveat">Simplified constant-deceleration calculation. The output is not validated against a real vehicle or any of the cases studied here.</p></section>
    </div>
    <section className="editorial-callout"><h3>How Scenario 001 calculates distance</h3><p>Distance before braking begins = speed × (attention delay + response interval). Braking distance = speed² ÷ (2 × deceleration). Total stopping distance = the two distances added together. This model assumes constant deceleration on dry pavement and leaves out the factors listed below; it is an educational illustration, not a reconstruction.</p></section>

    <section className="editorial-section" aria-labelledby="scenario-lab-heading"><div className="editorial-heading"><div><div className="section-kicker">FIVE CONCEPTUAL SCENARIOS</div><h2 id="scenario-lab-heading">Change the question, keep the caveats.</h2></div><p>These are learning activities, not case reconstructions. The scenarios do not establish what happened in any real crash.</p></div>
      <div className="scenario-switcher" role="group" aria-label="Choose an Ethics Lab scenario">{[1,2,3,4,5].map((n)=><button key={n} type="button" aria-pressed={scenario===n} onClick={()=>setScenario(n)}>SCENARIO {String(n).padStart(3,"0")}</button>)}</div>
      <div className="scenario-panel">
        {scenario===1&&<div className="editorial-block"><span className="editorial-label draft">Conceptual assumption</span><h3>Time, attention, and stopping distance</h3><p>Use the sliders above to inspect how assumptions about speed, attention delay, response interval, and available distance affect the illustrative calculation. Change one input at a time and ask what the model leaves out.</p></div>}
        {scenario===2&&<div className="editorial-block"><span className="editorial-label draft">Conceptual assumption</span><h3>The handover</h3><p>A system returns control to a driver after a period of disengagement. This exercise compares warning time with a chosen reaction interval; it does not estimate a real person’s response.</p><div className="editorial-grid"><div><Slider label="Vehicle speed" value={handoverSpeed} min={30} max={120} step={5} unit="km/h" onChange={setHandoverSpeed}/><Slider label="Warning time" value={warningTime} min={1} max={8} step={1} unit="s" onChange={setWarningTime}/></div><div><Slider label="Illustrative reaction interval" value={reactionTime} min={0.5} max={4} step={0.1} unit="s" onChange={setReactionTime}/><Slider label="Prior disengagement" value={disengagedMinutes} min={2} max={30} step={1} unit="min" onChange={setDisengagedMinutes}/></div></div><p className="quiz-feedback" role="status">Chosen time after the reaction interval: {Math.max(0,warningTime-reactionTime).toFixed(1)} seconds. At {handoverSpeed} km/h, {warningTime} seconds represent about {Math.round(handoverSpeed/3.6*warningTime)} metres of travel. A longer disengaged period is a reflection prompt, not a measured multiplier.</p><ul><li>What changes when the driver has been disengaged for twenty minutes versus two?</li><li>Is a warning with two seconds’ notice a warning, or a transfer of blame?</li></ul></div>}
        {scenario===3&&<div className="editorial-block"><span className="editorial-label draft">Conceptual assumption</span><h3>Trust over time</h3><p>This is a conceptual sequence, not observed trip data.</p><ol><li>Driver starts cautiously and monitors closely.</li><li>Many uneventful trips pass; routine success can shape expectations.</li><li>Monitoring may decline as the task feels predictable.</li><li>An unusual edge case appears when vigilance may be lowest.</li></ol><ul><li>Is reduced attention irrational or predictable?</li><li>Whose job is it to design for predictable human behavior?</li></ul></div>}
        {scenario===4&&<div className="editorial-block"><span className="editorial-label draft">Conceptual assumption</span><h3>The warning ladder</h3><div className="editorial-grid three-up"><article><h3>A · Single chime</h3><p>Assumes one prompt will be noticed and understood.</p></article><article><h3>B · Escalating alerts</h3><p>Combines visual and audible cues that grow more persistent.</p></article><article><h3>C · Alerts plus safe fallback</h3><p>Adds an assumed safe system response if the driver does not react; the real design would need independent safety evaluation.</p></article></div><p>Compare what each approach assumes about the driver, safety, and autonomy. This activity does not identify a universally correct design.</p></div>}
        {scenario===5&&<div className="editorial-block"><span className="editorial-label draft">Fictional scenario · not an incident reconstruction</span><h3>Whose duty is it?</h3><p>A fictional road has faded markings. An assistance system struggles with the scene. A driver is attentive but not perfect, and a road authority has not repainted the markings. The short scenario does not describe any of the project’s cases.</p><div className="scenario-switcher" role="group" aria-label="Choose a responsibility lens">{["foreseeability","control","prevention cost"].map((lens)=><button key={lens} type="button" aria-pressed={dutyLens===lens} onClick={()=>setDutyLens(lens)}>{lens}</button>)}</div><p className="quiz-feedback" role="status">Through the {dutyLens} lens, ask what evidence would be needed to identify each actor’s duty. The same facts can support different ethical arguments; this is not a legal allocation.</p></div>}
      </div>
    </section>

    <section className="editorial-section"><div className="editorial-heading"><div><div className="section-kicker">TEST YOUR READING</div><h2>Five questions about evidence and oversight.</h2></div></div><Quiz answers={quizAnswers} onAnswer={(index,value)=>setQuizAnswers((current)=>{const next=[...current];next[index]=value;return next;})}/></section>
    <section className="lab-reflection"><div className="section-kicker">REFLECTION / DISCUSSION</div><h2>What does the model leave out?</h2><div className="reflection-grid"><article><span>01</span><h3>Detection is not certainty</h3><p>Real systems can miss, misclassify, or react differently to objects and road geometry.</p></article><article><span>02</span><h3>Humans are not constant</h3><p>Attention and response vary with context, expectation, fatigue, and interface design.</p></article><article><span>03</span><h3>Numbers inherit assumptions</h3><p>A precise-looking result can still be misleading when the model omits important variables.</p></article></div></section>
    <section className="responsibility-promo">
      <div><div className="section-kicker">ETHICS LAB / MODULE C</div><h2>Who carries responsibility?</h2><p>Explore a qualitative, user-controlled allocation across the driver, system design, and oversight. The visualization is conceptual, not a liability finding.</p></div>
      <Link className="button button-dark" href="/ethics-lab/responsibility">Open responsibility mapping <ArrowRight size={16} /></Link>
    </section>
  </div>;
}

const quizQuestions=[
  {question:"True or false: Level 2 means the system is responsible for supervising the road.",options:["True","False"],correct:1,feedback:"At Level 2, the human remains the driver and must supervise. Verify the exact standard wording against SAE J3016."},
  {question:"The NTSB’s Williston findings involved…",options:["Only the truck driver","Only the car driver","Multiple factors, including system design"],correct:2,feedback:"The probable-cause statement is multi-factor. Read the adopted report for its exact wording."},
  {question:"Why does “likely” matter in the Mountain View distraction finding?",options:["It marks uncertainty in the report’s conclusion","It means the phone use was independently proven beyond doubt","It can be dropped in a short summary"],correct:0,feedback:"The qualifier is part of the finding. Removing it overstates what the report says."},
  {question:"What can three selected cases tell us about crash rates?",options:["A reliable rate for all driver-assistance systems","Nothing about population-level rates","Which manufacturer is safest"],correct:1,feedback:"Three purposively selected cases do not provide exposure-adjusted population data."},
  {question:"Which wording is more precise?",options:["Autopilot caused the crash","The NTSB identified Autopilot’s steering into the gore area as part of its probable cause"],correct:1,feedback:"Attribute the statement to the report and preserve its multi-factor context."},
];
function Quiz({answers,onAnswer}:{answers:number[];onAnswer:(index:number,value:number)=>void}){return <div className="editorial-grid">{quizQuestions.map((item,index)=><fieldset className="editorial-block" key={item.question} style={{border:0,borderTop:"1px solid var(--line)",minWidth:0,paddingInline:0}}><legend><strong>{String(index+1).padStart(2,"0")} · {item.question}</strong></legend><div className="quiz-options">{item.options.map((option,choice)=><button key={option} type="button" aria-pressed={answers[index]===choice} onClick={()=>onAnswer(index,choice)}>{option}</button>)}</div><p className="quiz-feedback" aria-live="polite">{answers[index]===undefined?"Choose an answer to see the evidence note.":(answers[index]===item.correct?"Correct. ":"Not quite. ")+item.feedback}</p></fieldset>)}</div>}

function Slider({ label, value, min, max, step, unit, onChange }: { label: string; value: number; min: number; max: number; step: number; unit: string; onChange: (value: number) => void }) {
  return <label className="slider-field"><span className="slider-label">{label}<strong>{value.toFixed(step < 1 ? 1 : 0)} {unit}</strong></span><input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} /><span className="slider-scale"><small>{min} {unit}</small><small>{max} {unit}</small></span></label>;
}

