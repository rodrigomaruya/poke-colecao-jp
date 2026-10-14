"use server";

import { getCurrentUser } from "@/lib/auth";
import { getUserCollection } from "@/lib/query/collection";

export type CollectionItem = {
  cardId: string;
  cardLanguage: string;
  quantity: number;
  purchasePrice: number | null;
  currency: string;
  name: string;
  localId: string;
  image: string | null;
  setName: string;
  setId: string;
  cardCountOfficial: number;
};

export type CollectionResult =
  | { items: CollectionItem[]; error?: never }
  | { error: string; items?: never };

export async function actionGetCollection(): Promise<CollectionResult> {
  const userId = await getCurrentUser();
  if (!userId) {
    return { error: "Não autenticado" };
  }

  try {
    const rows = await getUserCollection(userId);
    const items: CollectionItem[] = rows.map((row) => ({
      cardId: row.cardId,
      cardLanguage: row.cardLanguage,
      quantity: row.quantity,
      purchasePrice:
        row.purchasePrice != null ? Number(row.purchasePrice) : null,
      currency: row.currency,
      name: row.card.name,
      localId: row.card.localId,
      image: row.card.image,
      setName: row.card.set.name,
      setId: row.card.setId,
      cardCountOfficial: row.card.set.cardCountOfficial,
    }));

    return { items };
  } catch (error) {
    console.error("Erro ao buscar coleção:", error);
    return { error: "Não foi possível carregar a coleção." };
  }
}
