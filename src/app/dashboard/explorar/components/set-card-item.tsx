import Link from "next/link";
import { CardData, useSetStore } from "@/store/setStore";

type Props = {
  card: CardData;
};

export default function SetCardItem({ card }: Props) {
  const { lang } = useSetStore();
  return (
    <Link
      href={`/dashboard/detalhe/${card.id}/${lang}`}
      className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-md"
    >
      {/* Imagem */}
      <div className="relative aspect-2.5/3.5 overflow-hidden bg-slate-100">
        {/* Número */}
        <span className="absolute left-2 top-2 z-10 rounded-md bg-slate-900/90 px-2 py-1 text-[10px] font-semibold text-white">
          {card.localId}
        </span>

        {card.image ? (
          <img
            src={`${card.image}/low.webp`}
            alt={card.name}
            loading="lazy"
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full items-center justify-center p-4 text-center text-xs text-slate-400">
            Imagem indisponível
          </div>
        )}
      </div>

      {/* Informações */}
      <div className="p-3">
        <h3 className="truncate text-sm font-semibold text-slate-800">
          {card.name}
        </h3>

        <p className="mt-1 text-xs text-slate-400">{card.localId}</p>
      </div>
    </Link>
  );
}
