import { it, describe, expect } from "vitest";
import { getDiff } from "../src/diff";

describe("getDiff", () => {
  it("should have removed status", () => {
    expect(getDiff({ name: "John" }, {})).toMatchObject({
      name: {
        status: "removed",
        depth: 1,
        value: "John",
      },
    });
  });

  it("should have added status", () => {
    expect(getDiff({}, { name: "John" })).toMatchObject({
      name: {
        status: "added",
        depth: 1,
        value: "John",
      },
    });
  });

  it("should have changed status", () => {
    expect(getDiff({ name: "John" }, { name: "James" })).toMatchObject({
      name: {
        status: "changed",
        depth: 1,
        value: "John",
        newValue: "James",
      },
    });
  });

  it("should have unchanged status", () => {
    expect(getDiff({ name: "John" }, { name: "John" })).toMatchObject({
      name: { status: "unchanged", depth: 1, value: "John" },
    });
  });

  describe("nested structures", () => {
    it("should have removed status for a nested key", () => {
      const data1 = { common: { setting2: 200 } };
      const data2 = { common: {} };

      const diff = getDiff(data1, data2);

      expect(diff).toMatchObject({
        common: {
          status: "nested",
          depth: 1,
          children: {
            setting2: { status: "removed", depth: 2, value: 200 },
          },
        },
      });
    });

    it("should have added status for a nested key", () => {
      const data1 = { common: {} };
      const data2 = { common: { follow: false } };

      const diff = getDiff(data1, data2);

      expect(diff).toMatchObject({
        common: {
          status: "nested",
          depth: 1,
          children: {
            follow: { status: "added", depth: 2, value: false },
          },
        },
      });
    });

    it("should have changed status for a nested key", () => {
      const data1 = { common: { setting3: true } };
      const data2 = { common: { setting3: null } };

      const diff = getDiff(data1, data2);

      expect(diff).toMatchObject({
        common: {
          status: "nested",
          depth: 1,
          children: {
            setting3: {
              status: "changed",
              depth: 2,
              value: true,
              newValue: null,
            },
          },
        },
      });
    });

    it("should have unchanged status for a nested key", () => {
      const data1 = { common: { setting1: "Value 1" } };
      const data2 = { common: { setting1: "Value 1" } };

      const diff = getDiff(data1, data2);

      expect(diff).toMatchObject({
        common: {
          status: "nested",
          depth: 1,
          children: {
            setting1: { status: "unchanged", depth: 2, value: "Value 1" },
          },
        },
      });
    });

    it("should handle deeply nested keys", () => {
      const data1 = { common: { setting6: { doge: { wow: "" } } } };
      const data2 = { common: { setting6: { doge: { wow: "so much" } } } };

      const diff = getDiff(data1, data2);

      expect(diff).toMatchObject({
        common: {
          status: "nested",
          depth: 1,
          children: {
            setting6: {
              status: "nested",
              depth: 2,
              children: {
                doge: {
                  status: "nested",
                  depth: 3,
                  children: {
                    wow: {
                      status: "changed",
                      depth: 4,
                      value: "",
                      newValue: "so much",
                    },
                  },
                },
              },
            },
          },
        },
      });
    });

    it("should handle nested empty objects", () => {
      const data1 = { common: {} };
      const data2 = { common: {} };

      const diff = getDiff(data1, data2);

      expect(diff).toMatchObject({
        common: {
          status: "nested",
          depth: 1,
          children: {},
        },
      });
    });

    it("should handle a value changing from an object to a primitive", () => {
      const data1 = { group1: { nest: { key: "value" } } };
      const data2 = { group1: { nest: "str" } };

      const diff = getDiff(data1, data2);

      expect(diff).toMatchObject({
        group1: {
          status: "nested",
          depth: 1,
          children: {
            nest: {
              status: "changed",
              depth: 2,
              value: { key: "value" },
              newValue: "str",
            },
          },
        },
      });
    });

    it("should handle a value changing from a primitive to an object", () => {
      const data1 = { group3: { deep: { id: 45 } } };
      const data2 = { group3: { deep: { id: { number: 45 } } } };

      const diff = getDiff(data1, data2);

      expect(diff).toMatchObject({
        group3: {
          status: "nested",
          depth: 1,
          children: {
            deep: {
              status: "nested",
              depth: 2,
              children: {
                id: {
                  status: "changed",
                  depth: 3,
                  value: 45,
                  newValue: { number: 45 },
                },
              },
            },
          },
        },
      });
    });

    it("should have removed status for a nested object", () => {
      const data1 = { group2: { abc: 12345, deep: { id: 45 } } };
      const data2 = {};

      const diff = getDiff(data1, data2);

      expect(diff).toMatchObject({
        group2: {
          status: "removed",
          depth: 1,
          value: { abc: 12345, deep: { id: 45 } },
        },
      });
    });

    it("should have added status for a nested object", () => {
      const data1 = {};
      const data2 = { group3: { deep: { id: { number: 45 } }, fee: 100500 } };

      const diff = getDiff(data1, data2);

      expect(diff).toMatchObject({
        group3: {
          status: "added",
          depth: 1,
          value: { deep: { id: { number: 45 } }, fee: 100500 },
        },
      });
    });
  });
});
