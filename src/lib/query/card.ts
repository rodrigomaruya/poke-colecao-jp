// lib/queries/cards.ts
import type { Card as TCGCard } from "@tcgdex/sdk";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { createTCGdex } from "@/lib/tcgdex";

type Lang = "en" | "pt" | "ja";

const PRICE_TTL_MS = 1000 * 60 * 60 * 24; // 24h

export async function getCardDetails(cardId: string, lang: Lang) {
  const key = { id_language: { id: cardId, language: lang } };
  let source: "db" | "api" = "db";

  let card = await prisma.card.findUnique({
    where: key,
    include: { set: true },
  });
  if (!card) return null;

  const needsDetails = !card.detailsAt;
  const needsPricing =
    !card.pricingAt || Date.now() - card.pricingAt.getTime() > PRICE_TTL_MS;

  if (needsDetails || needsPricing) {
    const remote = (await createTCGdex(lang).card.get(cardId)) as
      | (TCGCard & { pricing?: unknown })
      | undefined;

    if (remote) {
      source = "api";
      card = await prisma.card.update({
        where: key,
        data: {
          ...(needsDetails && {
            category: remote.category ?? null,
            language: lang,
            rarity: remote.rarity ?? null,
            hp: remote.hp ?? null,
            types: remote.types ?? [],
            stage: remote.stage ?? null,
            evolveFrom: remote.evolveFrom ?? null,
            detailsAt: new Date(),
          }),
          ...(needsPricing && {
            pricing: remote.pricing
              ? (remote.pricing as Prisma.InputJsonValue)
              : Prisma.DbNull,
            pricingAt: new Date(),
          }),
        },
        include: { set: true },
      });
    }
  }

  return {
    id: card.id,
    language: card.language,
    name: card.name,
    localId: card.localId,
    image: card.image ? `${card.image}/high.webp` : null,
    rarity: card.rarity,
    category: card.category,
    hp: card.hp,
    types: card.types,
    stage: card.stage,
    evolveFrom: card.evolveFrom,
    set: {
      id: card.set.id,
      name: card.set.name,
      cardCountOfficial: card.set.cardCountOfficial,
      cardCountTotal: card.set.cardCountTotal,
    },
    pricing: card.pricing,
    pricingUpdatedAt: card.pricingAt,
  };
}
