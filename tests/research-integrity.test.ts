import { describe, expect, it } from "vitest";
import { claims, incidents, sources } from "@/lib/research";
import { validateResearchDataset } from "@/lib/research/validate";

describe("research registry integrity", () => {
  it("has no broken references, malformed records, or duplicate ids", () => {
    expect(validateResearchDataset()).toEqual([]);
  });
  it("registers every source reference used by claims and timeline events", () => {
    const ids = new Set(sources.map(source => source.id));
    for (const claim of claims) for (const id of claim.sourceIds) expect(ids.has(id), `${claim.id} → ${id}`).toBe(true);
    for (const incident of incidents) for (const event of incident.events) for (const id of event.sourceIds) expect(ids.has(id)).toBe(true);
  });
  it("requires located official citations for NTSB facts and findings", () => {
    const officialClaims = claims.filter(item => item.classification === "official_finding" || (item.classification === "documented_fact" && item.sourceIds.some(id => sources.find(source => source.id === id)?.sourceType === "official_report")));
    expect(officialClaims.length).toBeGreaterThan(0);
    for (const claim of officialClaims) {
      expect(claim.citations.some(citation => citation.locator.trim().length > 0 && sources.find(source => source.id === citation.sourceId)?.sourceType === "official_report"), claim.id).toBe(true);
    }
  });
  it("keeps all initial research unpublished pending human verification", () => {
    for (const claim of claims) { expect(claim.status).toBe("draft"); expect(claim.lastVerifiedAt).toBeNull(); }
    for (const incident of incidents) expect(incident.publicationStatus).toBe("draft");
  });
  it("requires an official-report source for official findings", () => {
    for (const claim of claims.filter(item => item.classification === "official_finding")) {
      expect(claim.sourceIds.some(id => sources.find(source => source.id === id)?.sourceType === "official_report")).toBe(true);
    }
  });
});
