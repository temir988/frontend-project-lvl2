import { parseFiles } from "./parse";

export default function genDiff(
  f1: string,
  f2: string,
  format: "stylish" | "plain",
) {
  console.log(format);
  readFiles(f1, f2);
}

async function readFiles(f1: string, f2: string) {
  const file1 = Bun.file(f1);
  const file2 = Bun.file(f2);

  const data1 = (await file1.json()) as unknown;
  const data2 = (await file2.json()) as unknown;

  if (!isRecord(data1) || !isRecord(data2)) {
    throw new Error("not valid data");
  }

  parseFiles(data1, data2);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
