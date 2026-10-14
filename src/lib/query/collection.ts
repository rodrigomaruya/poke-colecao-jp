// lib/queries/collection.ts
import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";

type Lang = "en" | "pt" | "ja";

export function getUserCollectionCacheTag(userId: string) {
  return `user-collection:${userId}`;
}

export async function getSetCardCollection(
  userId: string,
  cardIds: string[],
  language: Lang,
) {
  if (cardIds.length === 0) return [];

  return prisma.collection.findMany({
    where: {
      userId,
      cardLanguage: language,
      cardId: { in: cardIds },
    },
    select: { cardId: true, quantity: true },
  });
}

export async function getUserCollection(userId: string) {
  const getCachedCollection = unstable_cache(
    () =>
      prisma.collection.findMany({
        where: { userId },
        include: { card: { include: { set: true } } },
        orderBy: { updatedAt: "desc" },
      }),
    ["user-collection", userId],
    { tags: [getUserCollectionCacheTag(userId)] },
  );

  return getCachedCollection();
}

export function summarizeCollection<
  T extends {
    quantity: number;
    card: { set: { id: string; name: string; cardCountOfficial: number } };
  },
>(items: T[]) {
  const totalCopies = items.reduce((sum, i) => sum + i.quantity, 0);

  const bySet = new Map<
    string,
    { name: string; owned: number; total: number }
  >();
  for (const item of items) {
    const set = item.card.set;
    const entry = bySet.get(set.id) ?? {
      name: set.name,
      owned: 0,
      total: set.cardCountOfficial,
    };
    entry.owned += 1;
    bySet.set(set.id, entry);
  }

  return {
    uniqueCards: items.length,
    totalCopies,
    sets: [...bySet.entries()].map(([id, s]) => ({ id, ...s })),
  };
}
