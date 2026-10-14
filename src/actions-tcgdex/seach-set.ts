"use server";

import { getSetWithCache } from "@/lib/query/sets";

export async function getSetsAction(formData: FormData) {
  const rawLang = formData.get("lang");

  if (rawLang !== "en" && rawLang !== "pt" && rawLang !== "ja") {
    return { error: "Selecione um idioma" };
  }
  const rawSet = (formData.get("setId") as string) || "";

  try {
    const result = await getSetWithCache(rawSet, rawLang);
    if (!result) {
      return {
        error: "Nenhum set encontrado",
      };
    }

    const { cards, ...setRow } = result.set;
    const set = {
      id: setRow.id,
      language: setRow.language,
      name: setRow.name,
      logo: setRow.logo ?? null,
      symbol: null,
      releaseDate: setRow.releasedAt?.toISOString().slice(0, 10) ?? "",
      cardCount: {
        official: cards.length,
        total: cards.length,
      },
    };

    const cardData = cards.map((card) => ({
      id: card.id,
      localId: card.localId,
      name: card.name,
      image: card.image ?? null,
    }));
    return { data: { set, cards: cardData }, source: result.source };
  } catch (error) {
    console.error("Erro ao buscar sets:", error);

    return {
      error: "Não foi possível buscar os sets.",
    };
  }
}
