import { it, describe, expect } from "vitest";
import { parseFiles } from "../src/parse";

describe("Parsing module", () => {
  it("should have removed status", () => {
    expect(parseFiles({ name: "John" }, {})).toMatchObject({ name: "removed" });
  });

  it("should have added status", () => {
    expect(parseFiles({}, { name: "John" })).toMatchObject({ name: "added" });
  });

  it("should have changed status", () => {
    expect(parseFiles({ name: "John" }, { name: "James" })).toMatchObject({
      name: "changed",
    });
  });

  it("should have unchanged status", () => {
    expect(parseFiles({ name: "John" }, { name: "John" })).toMatchObject({
      name: "unchanged",
    });
  });
});
