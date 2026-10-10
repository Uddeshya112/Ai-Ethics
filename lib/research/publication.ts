import type { Incident } from "./schema";
import { incidents } from "./incidents";

export const showDraftResearch =
  process.env.NODE_ENV !== "production" || process.env.SHOW_DRAFT_RESEARCH === "true";

export function getVisibleIncidents(): Incident[] {
  return incidents.filter((incident) => incident.publicationStatus === "published" || showDraftResearch);
}
