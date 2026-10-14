// lib/queries/sets.ts
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { createTCGdex } from "@/lib/tcgdex";

type Lang = "en" | "pt" | "ja";

const includeCards = {
  cards: { orderBy: { localId: "asc" as const } },
} as const;

function findSetCached(setId: string, lang: Lang) {
  return prisma.cardSet.findFirst({
    where: {
      id: { equals: setId, mode: "insensitive" },
      language: lang,
    },
    include: includeCards,
  });
}

async function saveSetFromRemote(setId: string, lang: Lang) {
  const tcgdex = createTCGdex(lang);
  const remote = await tcgdex.set.get(setId);
  if (!remote) return false;

  await prisma.$transaction(async (tx) => {
    await tx.cardSet.createMany({
      data: [
        {
          id: remote.id,
          language: lang,
          name: remote.name,
          logo: remote.logo ?? null,
          symbol: remote.symbol ?? null,
          releasedAt: remote.releaseDate ? new Date(remote.releaseDate) : null,
          cardCountOfficial: remote.cardCount.official,
          cardCountTotal: remote.cardCount.total,
        },
      ],
      skipDuplicates: true,
    });

    if (remote.cards.length > 0) {
      await tx.card.createMany({
        data: remote.cards.map((card) => ({
          id: card.id,
          language: lang,
          localId: card.localId,
          name: card.name,
          image: card.image ?? null,
          setId: remote.id,
        })),
        skipDuplicates: true,
      });
    }
  });

  return true;
}

export async function getSetWithCache(rawSetId: string, lang: Lang = "ja") {
  const setId = rawSetId.trim();

  const cached = await findSetCached(setId, lang);
  if (cached) return { set: cached, source: "db" as const };

  try {
    const saved = await saveSetFromRemote(setId, lang);
    if (!saved) return null;
  } catch (error) {
    if (
      !(
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      )
    ) {
      throw error;
    }
  }

  const result = await findSetCached(setId, lang);
  return result ? { set: result, source: "api" as const } : null;
}
