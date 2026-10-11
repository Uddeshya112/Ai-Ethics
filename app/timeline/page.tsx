import type { Metadata } from "next";
import Link from "next/link";
import { getVisibleIncidents, showDraftResearch } from "@/lib/research/publication";
import { sources } from "@/lib/research/sources";
import EditorialImage from "@/components/EditorialImage";
export const metadata: Metadata = { title:"Incident timeline", description:"Chronological events from the registered research dataset, subject to publication status." };
function sortDateValue(date:string):number{if(!date)return Number.POSITIVE_INFINITY;const normalized=/^\d{4}-\d{2}$/.test(date)?date+"-01":date;const value=Date.parse(normalized+"T12:00:00Z");return Number.isFinite(value)?value:Number.POSITIVE_INFINITY;}
function formatDate(date:string):string{if(!date)return "Date unresolved";if(/^\d{4}-\d{2}$/.test(date)){const p=date.split("-").map(Number);const label=new Intl.DateTimeFormat("en",{month:"long",timeZone:"UTC"}).format(new Date(Date.UTC(p[0],p[1]-1,1)));return label+" "+p[0]+" (day unspecified)";}if(/^\d{4}-\d{2}-\d{2}$/.test(date))return new Intl.DateTimeFormat("en",{day:"numeric",month:"long",year:"numeric",timeZone:"UTC"}).format(new Date(date+"T12:00:00Z"));return "Date unresolved";}
const anchors:Record<string,string>={"gao-yaning":"handan","joshua-brown":"williston","walter-huang":"mountain-view"};
const candidates=[
 ["2014","SAE J3016 levels of driving automation","Verify original publication year and revision history."],
 ["Oct 2015","Autopilot feature rollout","Verify Tesla announcement, release date, and software version."],
 ["Jan 2016","Handan fatal crash","Month precision only; reported fact. Do not infer system engagement."],
 ["May 7, 2016","Williston fatal crash","Documented fact; NTSB HAR-17/02."],
 ["Jun 2016","NHTSA preliminary evaluation","Verify opening date and document number on NHTSA’s site."],
 ["Sep 2016","Driver-attention warning software update","Reported fact; verify Tesla’s announcement and date."],
 ["Jan 2017","NHTSA evaluation closure","Verify closing summary and whether a recall was sought."],
 ["Sep 2017","NTSB Williston board meeting / report","Verify meeting date and adopted report date."],
 ["Mar 23, 2018","Mountain View fatal crash","Documented fact; NTSB HAR-20/01."],
 ["2019","Elish publishes “Moral Crumple Zones”","Confirm exact date before adding day-level precision."],
 ["Feb 2020","NTSB Mountain View board meeting / report","Verify exact meeting and report dates."],
];
export default function TimelinePage(){const visible=getVisibleIncidents();const events=visible.flatMap((incident)=>incident.events.map((event,index)=>({...event,key:incident.id+"-"+event.date+"-"+index,title:incident.title,anchor:anchors[incident.id]}))).sort((a,b)=>sortDateValue(a.date)-sortDateValue(b.date));const titles=new Map(sources.map((source)=>[source.id,source.title]));return <div className="page-shell shell">
<div className="page-hero"><div className="eyebrow"><span className="eyebrow-line"/> TIMELINE / CHRONOLOGY</div><h1>Sequence matters.<br/><em>So does certainty.</em></h1><p className="page-lede">The timeline is built from canonical event records. Month-only dates stay month-only, unresolved dates stay unresolved, and publication status controls which entries appear.</p></div>
<EditorialImage asset="timeline" caption="Illustrative scene only. Event dates and chronology come from the registered sources, not this image." />
{events.length===0?<section className="notice-box"><div><strong>No incident events are cleared for public timeline display.</strong><p>Registered incidents remain draft. Events are hidden in production until each incident is explicitly marked published. Development preview can show draft data.</p></div></section>:<ol className="timeline-list">{events.map((event)=><li className="timeline-item" key={event.key}><div className="timeline-marker" aria-hidden="true"/><div className="timeline-content"><div className="timeline-meta"><time>{formatDate(event.date)}</time><span className="badge badge-gray">{event.classification.replaceAll("_"," ")}</span></div><p>{event.description}</p>{event.sourceIds.length>0&&<p className="timeline-source">Sources: {event.sourceIds.map((id)=>titles.get(id)??id).join("; ")}</p>}{event.anchor&&<Link className="arrow-link" href={"/cases#"+event.anchor}>Related case: {event.title} ↗</Link>}</div></li>)}</ol>}
{showDraftResearch&&<p className="draft-preview-note">Development preview may include draft research. It is not an indication of editorial approval.</p>}
<section className="editorial-section"><div className="editorial-heading"><div><div className="section-kicker">DATE PRECISION</div><h2>Read the date as carefully as the event.</h2></div><p>Dates without a verified day stay month-only. Unresolved means the record does not support a more precise date.</p></div><div className="timeline-legend"><span>Exact date</span><span>Month only · day unspecified</span><span>Year only</span><span>Unresolved</span></div></section>
<section className="editorial-section"><div className="editorial-heading"><div><div className="section-kicker">EDITORIAL QUEUE · NOT A PUBLISHED CHRONOLOGY</div><h2>Candidate entries that still need checking.</h2></div><p>These items are not represented as verified events. Confirm each date and document against its primary source before moving it into the canonical timeline.</p></div><div className="candidate-list">{candidates.map(([date,event,note])=><div className="candidate-row" key={date+event}><time>{date}</time><div><strong>{event}</strong><p className="source-publisher">{note}</p></div><small>VERIFY BEFORE PUBLICATION</small></div>)}</div></section>
<section className="editorial-callout warning"><h3>Recommendations are not implementation.</h3><p>For each incident, record recommendations issued separately from responses received or changes implemented. Those are different claims with different sources. If a response cannot be located, record “Unknown”; do not infer that a recommendation was carried out.</p></section>
</div>;}
