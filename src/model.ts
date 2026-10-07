export type DiffKeyStatus = "added" | "removed" | "unchanged" | "changed";
export type DiffObject = {
  [key: string]: {
    status: DiffKeyStatus;
    value: unknown;
    newValue?: unknown;
  };
};
export type Style = "stylish" | "plain";
