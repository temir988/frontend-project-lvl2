import { describe, expect, it } from "vitest";
import resultFlat from "../__fixtures__/result1.txt?raw";
import genDiff from "../src";

describe("Format diff", () => {
  it("should format flat json files", () => {
    const result = genDiff("./__fixtures__/file1.json", "./__fixtures__/file2.json");

    expect(result).toBe(resultFlat);
  });

  it("should format flat yaml files", () => {
    const result = genDiff("./__fixtures__/file1.yaml", "./__fixtures__/file2.yaml");

    expect(result).toBe(resultFlat);
  });
});
