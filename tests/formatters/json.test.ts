import { describe, expect, it } from "vitest";
import { getDiff } from "../../src/diff";
import { jsonDiff } from "../../src/formatters/json";

describe("JSON formatter", () => {
  it("should write add new nested value", () => {
    const diff = getDiff({ common: {} }, { common: { follow: false } });

    expect(jsonDiff(diff)).toEqual({
      common: {
        status: "nested",
        children: {
          follow: { status: "added", value: false },
        },
      },
    });
  });

  it("should write update value", () => {
    const diff = getDiff({ common: { setting3: true } }, { common: { setting3: null } });

    expect(jsonDiff(diff)).toEqual({
      common: {
        status: "nested",
        children: {
          setting3: { status: "changed", oldValue: true, newValue: null },
        },
      },
    });
  });

  it("should write remove value", () => {
    const diff = getDiff({ common: { setting2: 200 } }, { common: {} });

    expect(jsonDiff(diff)).toEqual({
      common: {
        status: "nested",
        children: {
          setting2: { status: "removed", value: 200 },
        },
      },
    });
  });
});
