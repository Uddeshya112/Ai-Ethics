import type { Incident } from "./schema";

export const incidents: Incident[] = [
  { id: "joshua-brown", slug: "joshua-brown", title: "Joshua Brown — Williston, Florida (2016)", incidentDate: "2016-05-07", location: "Near Williston, Florida, United States", statusNote: "NTSB investigation HWY16FH018", summary: "A Tesla Model S struck a semitrailer turning across its path. The NTSB discussed the truck driver's failure to yield, driver inattention and automation overreliance, and vehicle operational design.", publicationStatus: "draft", events: [
    { date: "2016-05-07", description: "Fatal collision near Williston, Florida.", classification: "documented_fact", sourceIds: ["ntsb-hw16fh018"] },
    { date: "2017-09-12", description: "NTSB adopts Highway Accident Report HAR-17/02.", classification: "official_finding", sourceIds: ["ntsb-hw16fh018"] },
  ] },
  { id: "walter-huang", slug: "walter-huang", title: "Walter Huang — Mountain View, California (2018)", incidentDate: "2018-03-23", location: "Mountain View, California, United States", statusNote: "NTSB investigation HWY18FH011", summary: "A Tesla Model X struck a crash attenuator at a highway gore area. The NTSB addressed system behavior, likely driver distraction, driver monitoring, and the unrepaired attenuator.", publicationStatus: "draft", events: [
    { date: "2018-03-23", description: "Fatal collision in Mountain View, California.", classification: "documented_fact", sourceIds: ["ntsb-hw18fh011"] },
    { date: "2020-02-25", description: "NTSB adopts Highway Accident Report HAR-20/01.", classification: "official_finding", sourceIds: ["ntsb-hw18fh011"] },
  ] },
  { id: "gao-yaning", slug: "gao-yaning", title: "Gao Yaning — Handan, China (2016)", incidentDate: "2016-01-01", location: "Near Handan, Hebei, China", statusNote: "Autopilot engagement unconfirmed", summary: "Contemporary reporting describes a Tesla Model S striking a stationary road-sweeping vehicle. The current project source set does not establish Autopilot engagement; the different evidence base is explicit.", publicationStatus: "draft", events: [
    { date: "2016-01", description: "Crash reported near Handan, Hebei, China.", classification: "reported_fact", sourceIds: ["gao-guardian-2016"] },
    { date: "", description: "Whether Autopilot was engaged remains unresolved in the sources registered here.", classification: "hypothesis", sourceIds: ["gao-guardian-2016"] },
  ] },
];
