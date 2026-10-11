/** Paths, alt text, and editorial caveats for the supplied automotive illustrations. */
export const automotiveImages = {
  homepage: {
    src: "/images/automotive/homepage/sunset-highway-reflections.webp",
    alt: "Illustrative car and truck on a reflective highway at sunset; not an incident photograph.",
  },
  handan: {
    src: "/images/automotive/cases/handan/winter-highway-at-sunset.webp",
    alt: "Illustrative sedan and road sweeper on a winter highway at sunset.",
  },
  williston: {
    src: "/images/automotive/cases/williston/golden-highway-rush-at-sunset.webp",
    alt: "Illustrative sedan beside a semitrailer on a highway at sunset.",
  },
  mountainView: {
    src: "/images/automotive/cases/mountain-view/rain-soaked-sunset-highway-crash.webp",
    alt: "Illustrative damaged car on a rain-soaked highway at dusk.",
  },
  technology: {
    src: "/images/automotive/technology/sunset-drive-smart-city.webp",
    alt: "Illustrative driver-assistance cockpit overlooking a city road.",
  },
  ethicsLab: {
    src: "/images/automotive/ethics-lab/autonomous-drive-misty-valley.webp",
    alt: "Illustrative vehicle on a mountain road with conceptual perception overlays.",
  },
  evidence: {
    src: "/images/automotive/evidence/cinematic-crash-investigation-lab.webp",
    alt: "Illustrative automotive investigation workspace with screens and printed diagrams.",
  },
  methodology: {
    src: "/images/automotive/methodology/crash-reconstruction-analysis-lab.webp",
    alt: "Illustrative crash-analysis workspace with a model car, maps, and screens.",
  },
  timeline: {
    src: "/images/automotive/timeline/twilight-highway-mountain-lights.webp",
    alt: "Illustrative twilight highway winding through a mountain landscape.",
  },
  closing: {
    src: "/images/automotive/closing/electric-grand-tourer-misty-coast.webp",
    alt: "Illustrative electric car on a wet coastal road at dusk.",
  },
} as const;

export type AutomotiveImageKey = keyof typeof automotiveImages;
