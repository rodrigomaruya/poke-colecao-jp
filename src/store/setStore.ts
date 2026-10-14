import { create } from "zustand";

export type SetData = {
  id: string;
  name: string;
  logo: string | null;
  symbol: string | null;
  releaseDate: string;
  cardCount: {
    official: number;
    total: number;
  };
};

export type CardData = {
  id: string;
  localId: string;
  name: string;
  image: string | null;
};

type Language = "en" | "pt" | "ja";

type SetStore = {
  lang: Language;
  set: SetData | null;
  cards: CardData[];

  setSet: (set: SetData | null) => void;
  setCards: (cards: CardData[]) => void;
  setLang: (lang: Language) => void;
};

export const useSetStore = create<SetStore>()((set) => ({
  set: null,
  cards: [],
  lang: "pt",

  setSet: (setData) => set({ set: setData }),
  setCards: (cards) => set({ cards }),
  setLang: (lang) => set({ lang }),
}));
