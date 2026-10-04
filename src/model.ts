export type DiffKeyStatus = "added" | "removed" | "unchanged" | "changed";
export type DiffObject = {
  [key: string]: DiffKeyStatus;
};
