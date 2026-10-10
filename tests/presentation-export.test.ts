import { describe, expect, it } from "vitest";
import { buildSpeakerNotesMarkdown } from "../lib/presentation/export";

describe("speaker notes export", () => {
  it("exports presenter notes and linked citations for sourced slides", () => {
    const markdown = buildSpeakerNotesMarkdown();

    expect(markdown).toContain("**Speaker notes:**");
    expect(markdown).toContain("[National Transportation Safety Board:");
    expect(markdown).toContain("https://www.ntsb.gov/investigations/AccidentReports/Reports/HAR1702.pdf");
    expect(markdown).toContain("[The Guardian (Reuters reporting):");
  });

  it("keeps unsourced slides clearly marked without inventing references", () => {
    const markdown = buildSpeakerNotesMarkdown().split("## 1. Beyond Autopilot")[1];

    expect(markdown).toContain("No source links listed for this slide.");
  });
});
