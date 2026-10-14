"use server";

import { redirect } from "next/navigation";
import { revalidatePath, updateTag } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { getUserCollectionCacheTag } from "@/lib/query/collection";

type Lang = "en" | "pt" | "ja";

function parseLang(value: FormDataEntryValue | null): Lang | null {
  return value === "en" || value === "pt" || value === "ja" ? value : null;
}

export async function addToCollectionAction(
  cardId: string,
  lang: string,
  trend?: number,
): Promise<boolean> {
  const userId = await getCurrentUser();
  if (!userId) redirect("/login");

  if (!cardId || !lang) return false;

  const card = await prisma.card.findUnique({
    where: { id_language: { id: cardId, language: lang } },
    select: { id: true, setId: true },
  });
  if (!card) return false;

  await prisma.collection.upsert({
    where: {
      userId_cardId_cardLanguage: { userId, cardId, cardLanguage: lang },
    },
    update: { quantity: { increment: 1 }, purchasePrice: trend },
    create: {
      userId,
      cardId,
      cardLanguage: lang,
      quantity: 1,
      purchasePrice: trend,
    },
  });

  updateTag(getUserCollectionCacheTag(userId));
  revalidatePath("/dashboard/colecao");
  revalidatePath(`/dashboard/detalhe/${cardId}/${lang}`);
  revalidatePath(`/dashboard/minha-colecao/${card.setId}`);
  return true;
}

export async function addSetCardToCollectionAction(formData: FormData) {
  const cardId = String(formData.get("cardId") ?? "");
  const lang = parseLang(formData.get("lang"));
  if (!cardId || !lang) return;

  await addToCollectionAction(cardId, lang);
}

export async function changeQuantityAction(formData: FormData) {
  const userId = await getCurrentUser();
  if (!userId) redirect("/login");

  const cardId = String(formData.get("cardId") ?? "");
  const lang = parseLang(formData.get("lang"));
  const delta = Number(formData.get("delta"));
  if (!cardId || !lang || (delta !== 1 && delta !== -1)) return;

  const key = {
    userId_cardId_cardLanguage: { userId, cardId, cardLanguage: lang },
  };

  const item = await prisma.collection.findUnique({
    where: key,
    include: { card: { select: { setId: true } } },
  });
  if (!item) return;

  const next = item.quantity + delta;
  if (next <= 0) {
    await prisma.collection.delete({ where: key });
  } else {
    await prisma.collection.update({ where: key, data: { quantity: next } });
  }

  updateTag(getUserCollectionCacheTag(userId));
  revalidatePath("/dashboard/colecao");
  revalidatePath(`/dashboard/detalhe/${cardId}/${lang}`);
  revalidatePath(`/dashboard/minha-colecao/${item.card.setId}`);
}
