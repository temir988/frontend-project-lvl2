import type { DiffObject, Style } from "../model";
import { styleDiff } from "./stylish";
import { plainDiff } from "./plain";
import { jsonDiff } from "./json";

export function formatStyle(diff: DiffObject, format: Style) {
  if (format === "stylish") {
    return `{\n${styleDiff(diff).join("\n")}\n}`;
  }
  if (format === "json") {
    return JSON.stringify(jsonDiff(diff));
  }
  return plainDiff(diff).join("\n");
}
