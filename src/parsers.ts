import { load } from 'js-yaml';

interface Parser {
  parse: (s: string) => unknown,
}

type SupportedFiles = ".json" | ".yaml" | ".yml";

export function getParser(ext: SupportedFiles | string): Parser {
  if (ext === '.json') {
    return {
      parse: JSON.parse
    }
  } else if (ext === ".yaml" || ext === ".yml") {
    return {
      parse: load
    }
  }

  throw new Error("Unsupported file extention")
}
