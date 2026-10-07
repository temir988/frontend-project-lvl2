import { readFileSync } from "node:fs";

import { formatStyle } from "./format";
import type { Style } from "./model";
import { parseFiles } from "./parse";

export default function genDiff(f1: string, f2: string, format: Style = "stylish") {
  const diff = readFiles(f1, f2);
  const res = formatStyle(diff, format);
  return res;
}

function readFiles(f1: string, f2: string) {
  const file1 = readFileSync(f1, "utf-8");
  const file2 = readFileSync(f2, "utf-8");

  const data1 = JSON.parse(file1);
  const data2 = JSON.parse(file2);

  if (!isRecord(data1) || !isRecord(data2)) {
    throw new Error("not valid data");
  }

  return parseFiles(data1, data2);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
