import TCGdex from "@tcgdex/sdk";

export type TCGdexLanguage = "en" | "pt" | "ja";

export function createTCGdex(language: TCGdexLanguage) {
  const tcgdex = new TCGdex(language);
  tcgdex.setCacheTTL(3600);
  return tcgdex;
}
