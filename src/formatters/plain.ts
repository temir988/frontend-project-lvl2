import type { DiffObject } from "../model.ts";

function formatValue(value: unknown): string {
  if (typeof value === "object" && value !== null) {
    return "[complex value]";
  }
  if (typeof value === "string") {
    return `'${value}'`;
  }
  return String(value);
}

function render(diff: DiffObject, path: string, lines: string[]): void {
  for (const [key, node] of Object.entries(diff)) {
    const fullPath = path ? `${path}.${key}` : key;
    switch (node.status) {
      case "nested": {
        render(node.children ?? {}, fullPath, lines);
        break;
      }
      case "added": {
        lines.push(`Property '${fullPath}' was added with value: ${formatValue(node.value)}`);
        break;
      }
      case "removed": {
        lines.push(`Property '${fullPath}' was removed`);
        break;
      }
      case "changed": {
        lines.push(
          `Property '${fullPath}' was updated. From ${formatValue(node.value)} to ${formatValue(node.newValue)}`,
        );
        break;
      }
      default: {
        break;
      }
    }
  }
}

export function plainDiff(diff: DiffObject): string[] {
  const lines: string[] = [];
  render(diff, "", lines);
  return lines;
}
