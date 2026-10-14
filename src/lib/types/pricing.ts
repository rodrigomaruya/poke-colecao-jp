// lib/types/pricing.ts
export type CardmarketPricing = {
  unit?: string;
  updated?: string;
  idProduct?: number;
  avg?: number;
  low?: number;
  trend?: number;
  avg1?: number;
  avg7?: number;
  avg30?: number;
};

export type TcgplayerPricing = {
  unit?: string;
  updated?: string;
  normal?: {
    lowPrice?: number;
    midPrice?: number;
    highPrice?: number;
    marketPrice?: number;
    directLowPrice?: number;
  };
};

export type CardPricing = {
  cardmarket?: CardmarketPricing | null;
  tcgplayer?: TcgplayerPricing | null;
};
