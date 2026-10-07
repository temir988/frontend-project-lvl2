import type { DiffKeyStatus, DiffObject, Style } from "./model";

const mapStatus: Record<DiffKeyStatus, "+" | "-" | " "> = {
  added: "+",
  removed: "-",
  unchanged: " ",
  changed: "+",
};

export function formatStyle(diff: DiffObject, format: Style) {
  if (format === "stylish") {
    const content = Object.entries(diff).map(([key, obj]) => {
      const spaces = "  ";
      if (obj.status === "changed") {
        return `${spaces}${mapStatus.removed} ${key}: ${obj.value}\n${spaces}${mapStatus.added} ${key}: ${obj.newValue}\n`;
      }
      return `${spaces}${mapStatus[obj.status]} ${key}: ${obj.value}\n`;
    });
    return `{\n${content.join("")}}`;
  }
}
