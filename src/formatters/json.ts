import type { DiffObject } from "../model.ts";

export type JsonNode = {
  status: string;
  value?: unknown;
  oldValue?: unknown;
  newValue?: unknown;
  children?: JsonDiff;
};
export type JsonDiff = { [key: string]: JsonNode };

export function jsonDiff(diff: DiffObject): JsonDiff {
  const res: JsonDiff = {};
  for (const [key, node] of Object.entries(diff)) {
    if (node.status === "nested") {
      res[key] = { status: node.status, children: jsonDiff(node.children!) };
    } else if (node.status === "changed") {
      res[key] = { status: node.status, oldValue: node.value, newValue: node.newValue };
    } else {
      res[key] = { status: node.status, value: node.value };
    }
  }
  return res;
}
