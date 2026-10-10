export const STOPPING_DISTANCE_MODEL_VERSION = "stopping-distance@1.0.0";

export type StoppingDistanceInput = { speedKmh: number; reactionTimeSeconds: number; decelerationMps2: number };
export type StoppingDistanceValue = { reactionDistanceMeters: number; brakingDistanceMeters: number; totalDistanceMeters: number };
export type StoppingDistanceResult =
  | { ok: true; value: StoppingDistanceValue; modelVersion: string }
  | { ok: false; errors: string[]; modelVersion: string };

export function validateStoppingDistanceInput(input: StoppingDistanceInput): string[] {
  const errors: string[] = [];
  if (!Number.isFinite(input.speedKmh) || input.speedKmh <= 0 || input.speedKmh > 200) errors.push("speedKmh must be greater than 0 and at most 200");
  if (!Number.isFinite(input.reactionTimeSeconds) || input.reactionTimeSeconds < 0 || input.reactionTimeSeconds > 10) errors.push("reactionTimeSeconds must be between 0 and 10");
  if (!Number.isFinite(input.decelerationMps2) || input.decelerationMps2 < 1 || input.decelerationMps2 > 15) errors.push("decelerationMps2 must be between 1 and 15");
  return errors;
}
export function computeStoppingDistance(input: StoppingDistanceInput): StoppingDistanceResult {
  const errors = validateStoppingDistanceInput(input);
  if (errors.length) return { ok: false, errors, modelVersion: STOPPING_DISTANCE_MODEL_VERSION };
  const v = input.speedKmh / 3.6;
  const reactionDistanceMeters = v * input.reactionTimeSeconds;
  const brakingDistanceMeters = (v * v) / (2 * input.decelerationMps2);
  return { ok: true, value: { reactionDistanceMeters, brakingDistanceMeters, totalDistanceMeters: reactionDistanceMeters + brakingDistanceMeters }, modelVersion: STOPPING_DISTANCE_MODEL_VERSION };
}
