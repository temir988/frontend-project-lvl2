import type { DiffObject, Style } from "../model";
import { styleDiff } from "./stylish";
import { plainDiff } from "./plain";

export function formatStyle(diff: DiffObject, format: Style) {
  if (format === "stylish") {
    return `{\n${styleDiff(diff).join("\n")}\n}`;
  }
  return plainDiff(diff).join("\n");
}
