export type PricedItem = {
  quantity: number;
  purchasePrice: number | null;
};

export function sumPurchasePrice(items: PricedItem[]): number {
  const cents = items.reduce((acc, item) => {
    if (item.purchasePrice == null) return acc;
    return acc + Math.round(item.purchasePrice * 100) * item.quantity;
  }, 0);

  return cents / 100;
}
