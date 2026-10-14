// lib/collection-progress.ts
export type CollectionItem = {
  cardId: string;
  cardLanguage: string;
  quantity: number;
  setId: string;
  setName: string;
  cardCountOfficial: number;
};

export type SetProgress = {
  setId: string;
  setName: string;
  language: string;
  owned: number; // cartas diferentes
  copies: number; // cópias somadas
  total: number; // total oficial do set
  percent: number;
};

export function getSetProgress(items: CollectionItem[]): SetProgress[] {
  const bySet = new Map<string, SetProgress>();

  for (const item of items) {
    const key = `${item.cardLanguage}:${item.setId}`;

    let entry = bySet.get(key);
    if (!entry) {
      entry = {
        setId: item.setId,
        setName: item.setName,
        language: item.cardLanguage,
        owned: 0,
        copies: 0,
        total: item.cardCountOfficial,
        percent: 0,
      };
      bySet.set(key, entry);
    }

    entry.owned += 1;
    entry.copies += item.quantity;
  }

  for (const entry of bySet.values()) {
    entry.percent =
      entry.total > 0
        ? Math.min(100, Math.round((entry.owned / entry.total) * 100))
        : 0;
  }

  return [...bySet.values()].sort((a, b) => b.percent - a.percent);
}
