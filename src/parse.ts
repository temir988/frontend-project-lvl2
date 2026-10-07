import type { DiffObject } from "./model";

export function parseFiles(d1: Record<string, unknown>, d2: Record<string, unknown>): DiffObject {
  const diff: DiffObject = {};
  const keys = new Set(Object.keys(d1).concat(Object.keys(d2)).toSorted());
  for (const key of keys) {
    const have1 = Object.hasOwn(d1, key);
    const have2 = Object.hasOwn(d2, key);
    if (have1 && have2) {
      if (d1[key] == d2[key]) {
        diff[key] = { status: "unchanged", value: d1[key] };
      } else {
        diff[key] = { status: "changed", value: d1[key], newValue: d2[key] };
      }
    } else if (have1 && !have2) {
      diff[key] = { status: "removed", value: d1[key] };
    } else {
      diff[key] = { status: "added", value: d2[key] };
    }
  }
  return diff;
}
