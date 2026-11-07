import { describe, expect, it } from "vitest";
import { getDiff } from "../../src/diff";
import { plainDiff } from "../../src/formatters/plain";

describe("Plain formatter", () => {
  it("should correctly write add new nested value", () => {
    const diff = getDiff({ common: {} }, { common: { follow: false } });

    expect(plainDiff(diff)).toEqual(["Property 'common.follow' was added with value: false"]);
  });

  it("should write remove new nested value", () => {
    const diff = getDiff({ common: { setting2: 200 } }, { common: {} });

    expect(plainDiff(diff)).toEqual(["Property 'common.setting2' was removed"]);
  });

  it("should write update new nested value", () => {
    const diff = getDiff({ common: { setting3: true } }, { common: { setting3: null } });

    expect(plainDiff(diff)).toEqual(["Property 'common.setting3' was updated. From true to null"]);
  });

  it("should handle object value", () => {
    const diff = getDiff({ common: {} }, { common: { setting5: { key5: "value5" } } });

    expect(plainDiff(diff)).toEqual([
      "Property 'common.setting5' was added with value: [complex value]",
    ]);
  });

  it("should use single quote for string value", () => {
    const diff = getDiff({ common: {} }, { common: { setting4: "blah blah" } });

    expect(plainDiff(diff)).toEqual([
      "Property 'common.setting4' was added with value: 'blah blah'",
    ]);
  });

  it("should handle deeply nested path", () => {
    const diff = getDiff(
      { common: { setting6: { doge: { wow: "" } } } },
      { common: { setting6: { doge: { wow: "so much" } } } },
    );

    expect(plainDiff(diff)).toEqual([
      "Property 'common.setting6.doge.wow' was updated. From '' to 'so much'",
    ]);
  });

  it("should handle few keys", () => {
    const diff = getDiff(
      { common: { setting6: { doge: { wow: "" } } } },
      {
        common: {
          setting5: { key5: "value5" },
          setting6: { doge: { wow: "so much" } },
        },
      },
    );

    expect(plainDiff(diff)).toEqual([
      "Property 'common.setting5' was added with value: [complex value]",
      "Property 'common.setting6.doge.wow' was updated. From '' to 'so much'",
    ]);
  });
});
