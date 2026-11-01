import type { DiffKeyStatus, DiffObject, Style } from "./model";

const indentSize = 4;

const mapStatus: Record<Exclude<DiffKeyStatus, "nested">, "+" | "-" | " "> = {
  added: "+",
  removed: "-",
  unchanged: " ",
  changed: "+",
};

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function buildIndent(depth: number): string {
  return " ".repeat(depth * indentSize);
}

function stringifyValue(value: unknown, depth: number): string {
  if (!isObject(value)) {
    return String(value);
  }
  const entries = Object.entries(value).map(
    ([key, val]) => `${buildIndent(depth + 1)}${key}: ${stringifyValue(val, depth + 1)}`,
  );
  return `{\n${entries.join("\n")}\n${buildIndent(depth)}}`;
}

function formatDiff(diff: DiffObject): string[] {
  return Object.entries(diff).flatMap(([key, node]): string[] => {
    const { status, depth } = node;
    const markerIndent = buildIndent(depth).slice(2);
    switch (status) {
      case "nested": {
        return [
          `${buildIndent(depth)}${key}: {`,
          ...formatDiff(node.children!),
          `${buildIndent(depth)}}`,
        ];
      }
      case "changed": {
        return [
          `${markerIndent}${mapStatus.removed} ${key}: ${stringifyValue(node.value!, depth)}`,
          `${markerIndent}${mapStatus.added} ${key}: ${stringifyValue(node.newValue!, depth)}`,
        ];
      }
      default: {
        return [
          `${markerIndent}${mapStatus[status]} ${key}: ${stringifyValue(node.value!, depth)}`,
        ];
      }
    }
  });
}

export function formatStyle(diff: DiffObject, format: Style) {
  if (format === "stylish") {
    return `{\n${formatDiff(diff).join("\n")}\n}`;
  }
}
