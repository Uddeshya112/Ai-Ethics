import { z } from "zod";

export const claimClassification = z.enum(["official_finding","documented_fact","reported_fact","research_interpretation","hypothesis","conceptual_assumption"]);
export const confidence = z.enum(["high","moderate","limited","unassessed"]);
export const claimStatus = z.enum(["draft","in_review","published"]);
export const sourceType = z.enum(["official_report","government_data","peer_reviewed","journalism","company_statement","legal_filing","primary_translation"]);
export const sourceRelationship = z.enum(["supports","qualifies","contradicts"]);

export const sourceSchema = z.object({
  id: z.string().min(1), title: z.string().min(1), publisher: z.string().min(1),
  url: z.string().url().or(z.literal("")), sourceType,
  publishedAt: z.string().date().optional(), accessedAt: z.string().date().optional(),
  lastVerifiedAt: z.string().date().nullable().default(null), language: z.string().default("en"),
  translationOfId: z.string().nullable().default(null), limitations: z.array(z.string()).default([]),
});
export const citationSchema = z.object({
  sourceId: z.string().min(1), relationship: sourceRelationship, locator: z.string().min(1),
});
export const claimSchema = z.object({
  id: z.string().min(1), incidentId: z.string().nullable().default(null), statement: z.string().min(1),
  classification: claimClassification, confidence: confidence.default("unassessed"),
  status: claimStatus.default("draft"), limitations: z.array(z.string()).default([]),
  sourceIds: z.array(z.string()).default([]), citations: z.array(citationSchema).default([]), lastVerifiedAt: z.string().date().nullable().default(null),
});
export const eventSchema = z.object({
  date: z.string(), description: z.string().min(1), classification: claimClassification,
  sourceIds: z.array(z.string()).default([]),
});
export const incidentSchema = z.object({
  id: z.string().min(1), slug: z.string().min(1), title: z.string().min(1),
  incidentDate: z.string(), location: z.string(), statusNote: z.string(), summary: z.string(),
  publicationStatus: z.enum(["draft","published"]).default("draft"), events: z.array(eventSchema).default([]),
});
export type Source = z.infer<typeof sourceSchema>;
export type ResearchClaim = z.infer<typeof claimSchema>;
export type Incident = z.infer<typeof incidentSchema>;
export type ClaimClassification = z.infer<typeof claimClassification>;
