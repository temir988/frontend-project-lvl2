export type DiffKeyStatus = "added" | "removed" | "unchanged" | "changed" | "nested";
export type DiffObject = {
  [key: string]: {
    status: DiffKeyStatus;
    depth: number;
    value?: unknown;
    newValue?: unknown;
    children?: DiffObject;
  };
};
export type Style = "stylish" | "plain" | "json";
