import { it, describe, expect } from "vitest";
import { getDiff } from "../src/diff";

describe("Parsing module", () => {
  it("should have removed status", () => {
    expect(getDiff({ name: "John" }, {})).toMatchObject({
      name: {
        status: "removed",
        value: "John",
      },
    });
  });

  it("should have added status", () => {
    expect(getDiff({}, { name: "John" })).toMatchObject({
      name: {
        status: "added",
        value: "John",
      },
    });
  });

  it("should have changed status", () => {
    expect(getDiff({ name: "John" }, { name: "James" })).toMatchObject({
      name: {
        status: "changed",
        value: "John",
        newValue: "James",
      },
    });
  });

  it("should have unchanged status", () => {
    expect(getDiff({ name: "John" }, { name: "John" })).toMatchObject({
      name: { status: "unchanged", value: "John" },
    });
  });
});
