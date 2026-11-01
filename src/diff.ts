import type { DiffObject } from "./model";

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function getDiff(
  d1: Record<string, unknown>,
  d2: Record<string, unknown>,
  depth = 1,
): DiffObject {
  const diff: DiffObject = {};
  const keys = [...new Set([...Object.keys(d1), ...Object.keys(d2)])].sort();
  for (const key of keys) {
    const have1 = Object.hasOwn(d1, key);
    const have2 = Object.hasOwn(d2, key);
    if (have1 && have2) {
      if (isObject(d1[key]) && isObject(d2[key])) {
        diff[key] = {
          status: "nested",
          depth,
          children: getDiff(d1[key], d2[key], depth + 1),
        };
      } else if (d1[key] === d2[key]) {
        diff[key] = { status: "unchanged", depth, value: d1[key] };
      } else {
        diff[key] = { status: "changed", depth, value: d1[key], newValue: d2[key] };
      }
    } else if (have1 && !have2) {
      diff[key] = { status: "removed", depth, value: d1[key] };
    } else {
      diff[key] = { status: "added", depth, value: d2[key] };
    }
  }
  return diff;
}
