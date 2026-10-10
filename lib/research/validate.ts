import { claims, incidents, sources } from "./index";
import { claimSchema, incidentSchema, sourceSchema } from "./schema";

export type ValidationIssue = { code: string; message: string };

export function validateResearchDataset(): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const sourceIds = new Set<string>();
  const claimIds = new Set<string>();
  const incidentIds = new Set<string>();

  for (const source of sources) {
    if (sourceIds.has(source.id)) issues.push({ code: "duplicate_source_id", message: `Duplicate source id ${source.id}` });
    sourceIds.add(source.id);
    if (!sourceSchema.safeParse(source).success) issues.push({ code: "invalid_source", message: `Source ${source.id} does not match its schema` });
  }
  for (const incident of incidents) {
    if (incidentIds.has(incident.id)) issues.push({ code: "duplicate_incident_id", message: `Duplicate incident id ${incident.id}` });
    incidentIds.add(incident.id);
    if (!incidentSchema.safeParse(incident).success) issues.push({ code: "invalid_incident", message: `Incident ${incident.id} does not match its schema` });
    for (const event of incident.events) for (const id of event.sourceIds) {
      if (!sourceIds.has(id)) issues.push({ code: "unknown_event_source", message: `Incident ${incident.id} references unknown source ${id}` });
    }
  }
  for (const claim of claims) {
    if (claimIds.has(claim.id)) issues.push({ code: "duplicate_claim_id", message: `Duplicate claim id ${claim.id}` });
    claimIds.add(claim.id);
    if (!claimSchema.safeParse(claim).success) issues.push({ code: "invalid_claim", message: `Claim ${claim.id} does not match its schema` });
    if (["official_finding","documented_fact","reported_fact"].includes(claim.classification) && claim.sourceIds.length === 0) {
      issues.push({ code: "factual_claim_without_source", message: `Factual claim ${claim.id} cites no source` });
    }
    for (const id of claim.sourceIds) {
      if (!sourceIds.has(id)) issues.push({ code: "unknown_source", message: `Claim ${claim.id} cites unknown source ${id}` });
    }
    if (claim.classification === "official_finding" && !claim.sourceIds.some((id) => sources.find((source) => source.id === id)?.sourceType === "official_report")) {
      issues.push({ code: "official_finding_without_official_source", message: `Official finding ${claim.id} lacks an official report source` });
    }
    if (claim.status === "published" && claim.lastVerifiedAt === null) issues.push({ code: "published_unverified_claim", message: `Published claim ${claim.id} has no verification date` });
  }
  return issues;
}
