import { describe, expect, it } from "vitest";
import { computeStoppingDistance } from "@/lib/simulations/stopping-distance";

describe("stopping-distance model", () => {
  it("calculates reaction and braking distance separately", () => {
    const result = computeStoppingDistance({ speedKmh: 100, reactionTimeSeconds: 2, decelerationMps2: 8 });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    const v = 100 / 3.6;
    expect(result.value.reactionDistanceMeters).toBeCloseTo(v * 2, 5);
    expect(result.value.brakingDistanceMeters).toBeCloseTo((v * v) / 16, 5);
    expect(result.value.totalDistanceMeters).toBeCloseTo(v * 2 + (v * v) / 16, 5);
    expect(result.modelVersion).toBe("stopping-distance@1.0.0");
  });
  it("scales reaction distance linearly with reaction time", () => {
    const one = computeStoppingDistance({ speedKmh: 100, reactionTimeSeconds: 1, decelerationMps2: 8 });
    const two = computeStoppingDistance({ speedKmh: 100, reactionTimeSeconds: 2, decelerationMps2: 8 });
    expect(one.ok && two.ok).toBe(true);
    if (one.ok && two.ok) expect(two.value.reactionDistanceMeters).toBeCloseTo(one.value.reactionDistanceMeters * 2, 5);
  });
  it("rejects invalid or out-of-range input", () => {
    expect(computeStoppingDistance({ speedKmh: 0, reactionTimeSeconds: 2, decelerationMps2: 8 }).ok).toBe(false);
    expect(computeStoppingDistance({ speedKmh: 500, reactionTimeSeconds: 2, decelerationMps2: 8 }).ok).toBe(false);
    expect(computeStoppingDistance({ speedKmh: 100, reactionTimeSeconds: 2, decelerationMps2: 0.5 }).ok).toBe(false);
    expect(computeStoppingDistance({ speedKmh: Number.NaN, reactionTimeSeconds: 2, decelerationMps2: 8 }).ok).toBe(false);
  });
});
