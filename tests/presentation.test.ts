import { describe, expect, it } from "vitest";
import { presentationSlides, validatePresentation } from "../lib/presentation/deck";
describe("presentation deck integrity",()=>{
it("accepts the canonical deck",()=>{expect(presentationSlides).toHaveLength(15);expect(validatePresentation()).toEqual([]);});
it("rejects duplicate slide IDs",()=>{const corrupted=[presentationSlides[0],{...presentationSlides[1],id:presentationSlides[0].id}];expect(validatePresentation(corrupted).some((issue)=>issue.includes("Duplicate slide id"))).toBe(true);});
it("rejects missing bullet content",()=>{const corrupted=[{...presentationSlides[0],bullets:[]}];expect(validatePresentation(corrupted).some((issue)=>issue.includes("non-empty bullets"))).toBe(true);});
it("rejects unknown source references",()=>{const corrupted=[{...presentationSlides[0],sourceIds:["source-that-does-not-exist"]}];expect(validatePresentation(corrupted).some((issue)=>issue.includes("unknown source"))).toBe(true);});
});
