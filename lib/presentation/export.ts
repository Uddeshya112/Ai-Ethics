import { presentationSlides, type PresentationSlide } from "./deck";
import { sources } from "../research/sources";

export function buildSpeakerNotesMarkdown(
  slides: readonly PresentationSlide[] = presentationSlides,
): string {
  const sections = slides.map((slide, index) => {
    const references = slide.sourceIds
      .map((id) => sources.find((source) => source.id === id))
      .filter((source) => source !== undefined)
      .map((source) => `- [${source.publisher}: ${source.title}](${source.url})`);

    return [
      `## ${index + 1}. ${slide.title}`,
      `**${slide.section}** — ${slide.subtitle}`,
      "",
      ...slide.bullets.map((bullet) => `- ${bullet}`),
      "",
      `**Speaker notes:** ${slide.note}`,
      "",
      "**Sources:**",
      ...(references.length > 0 ? references : ["- No source links listed for this slide."]),
    ].join("\n");
  });

  return ["# Beyond Autopilot — speaker notes", "", ...sections, ""].join("\n");
}
