import { describe, expect, it } from "vitest";
import resultFlat from "../__fixtures__/result1.txt?raw";
import genDiff from "../src";

describe("Format diff", () => {
  it("should format flat object", () => {
    const result = genDiff("./__fixtures__/file1.json", "./__fixtures__/file2.json");

    expect(result).toBe(resultFlat);
  });
});
