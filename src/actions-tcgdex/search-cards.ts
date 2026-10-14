"use server";

import { createTCGdex } from "@/lib/tcgdex";
import TCGdex, { Card } from "@tcgdex/sdk";
import { getCardDetails } from "@/lib/query/card";
import type { CardPricing } from "@/lib/types/pricing";
import { toCardPricing } from "@/utils/toCardPricing";

type TCGdexLanguage = "en" | "pt" | "ja";
type CardWithPricing = Card & {
  pricing?: {
    cardmarket?: {
      updated?: string;
      unit?: string;
      idProduct?: number;
      avg?: number;
      low?: number;
      trend?: number;
      avg1?: number;
      avg7?: number;
      avg30?: number;
      "avg-holo"?: number;
      "low-holo"?: number;
      "trend-holo"?: number;
      "avg1-holo"?: number;
      "avg7-holo"?: number;
      "avg30-holo"?: number;
    };
    tcgplayer?: {
      updated?: string;
      unit?: string;
      normal?: {
        lowPrice?: number;
        midPrice?: number;
        highPrice?: number;
        marketPrice?: number;
        directLowPrice?: number;
      };
    };
  };
};

type CardDetails = {
  id: string;
  language: string;
  name: string;
  localId: string;
  image: string | null;
  rarity: string | null;
  category: string | null;
  hp: number | null;
  types: string[];
  stage: string | null;
  evolveFrom: string | null;
  set: {
    id: string;
    name: string;
    cardCountOfficial: number | null;
    cardCountTotal: number | null;
  };
  pricing: CardPricing | null;
  pricingUpdatedAt: Date | null;
};

interface Props {
  lang: string;
  localId: string;
}
export async function getCardAction({ lang, localId }: Props) {
  if (lang !== "en" && lang !== "pt" && lang !== "ja") {
    return { error: "Selecione um idioma" };
  }

  try {
    // 3. Inicializa a SDK com a linguagem dinâmica
    const card = await getCardDetails(localId, lang);

    if (!card) {
      return {
        error: `Carta não encontrada com o ID "${localId}" para o idioma "${lang}".`,
      };
    }

    const image = card?.image;
    const imageTrue = image && !image.startsWith("undefined/") ? image : null;
    const normalizedPricing = toCardPricing(card.pricing);

    const cardData: CardDetails = {
      id: card.id,
      language: card.language,
      name: card.name,
      image: imageTrue,
      localId: card.localId,

      set: {
        id: card.set.id,
        name: card.set.name,
        cardCountOfficial: card.set.cardCountOfficial ?? null,
        cardCountTotal: card.set.cardCountTotal ?? null,
      },

      category: card.category ?? null,
      rarity: card.rarity ?? null,
      hp: card.hp ?? null,
      types: card.types ?? [],
      stage: card.stage ?? null,
      evolveFrom: card.evolveFrom ?? null,
      pricing: normalizedPricing,
      pricingUpdatedAt: normalizedPricing?.cardmarket?.updated
        ? new Date(normalizedPricing.cardmarket.updated)
        : null,
    };

    return { cardData };
  } catch (error) {
    console.error("Erro na requisição:", error);
    return { error: "Ocorreu um erro ao buscar a carta." };
  }
}
