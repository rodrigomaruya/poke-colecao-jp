import type { Prisma } from "@prisma/client";
import type { CardPricing } from "@/lib/types/pricing";

export function toCardPricing(
  value: Prisma.JsonValue | null,
): CardPricing | null {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }
  return value as CardPricing;
}
