import type { DiffObject, Style } from "../model.ts";
import { styleDiff } from "./stylish.ts";
import { plainDiff } from "./plain.ts";
import { jsonDiff } from "./json.ts";

export function formatStyle(diff: DiffObject, format: Style) {
  if (format === "stylish") {
    return `{\n${styleDiff(diff).join("\n")}\n}`;
  }
  if (format === "json") {
    return JSON.stringify(jsonDiff(diff));
  }
  return plainDiff(diff).join("\n");
}
