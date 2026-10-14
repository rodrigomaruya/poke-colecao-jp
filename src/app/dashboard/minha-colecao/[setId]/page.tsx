import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, Minus, Plus } from "lucide-react";
import { notFound, redirect } from "next/navigation";
import {
  addSetCardToCollectionAction,
  changeQuantityAction,
} from "@/action-save-collection/addToCollectionAction";
import { getCurrentUser } from "@/lib/auth";
import { getSetCardCollection } from "@/lib/query/collection";
import { getSetWithCache } from "@/lib/query/sets";

type Language = "en" | "pt" | "ja";

type PageProps = {
  params: Promise<{ setId: string }>;
  searchParams: Promise<{ lang?: string }>;
};

function parseLanguage(language: string | undefined): Language {
  return language === "en" || language === "ja" ? language : "pt";
}

const cardNumberCollator = new Intl.Collator("en", {
  numeric: true,
  sensitivity: "base",
});

export default async function MyCollectionPage({
  params,
  searchParams,
}: PageProps) {
  const [{ setId }, query] = await Promise.all([params, searchParams]);
  const language = parseLanguage(query.lang);
  const userId = await getCurrentUser();

  if (!userId) redirect("/login");

  const result = await getSetWithCache(setId, language);
  if (!result) notFound();

  const { set } = result;
  const cards = [...set.cards].sort(
    (a, b) =>
      cardNumberCollator.compare(a.localId, b.localId) ||
      a.id.localeCompare(b.id),
  );
  const collection = await getSetCardCollection(
    userId,
    cards.map((card) => card.id),
    language,
  );
  const quantityByCardId = new Map(
    collection.map((item) => [item.cardId, item.quantity]),
  );
  const collectionCards = cards.filter((card) => quantityByCardId.has(card.id));
  const ownedCards = collection.length;
  const progress =
    cards.length > 0 ? Math.round((ownedCards / cards.length) * 100) : 0;

  return (
    <div className="p-4 sm:p-8">
      <Link
        href="/dashboard/colecao"
        className="mb-5 inline-flex items-center gap-2 rounded-lg text-sm font-semibold text-slate-600 transition hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
      >
        <ArrowLeft aria-hidden="true" className="size-4" />
        Voltar para minha coleção
      </Link>

      <header className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <p className="text-xs font-bold tracking-[0.12em] text-indigo-600 uppercase">
              {set.id} · {language.toUpperCase()}
            </p>
            <h1 className="mt-1 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
              {set.name}
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              {ownedCards} de {cards.length} cartas diferentes na sua coleção
            </p>
          </div>

          <div className="w-full sm:max-w-56">
            <div className="mb-2 flex items-center justify-between text-xs font-semibold text-slate-600">
              <span>Progresso do set</span>
              <span>{progress}%</span>
            </div>
            <div
              role="progressbar"
              aria-label={`Progresso de ${set.name}`}
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
              className="h-2 overflow-hidden rounded-full bg-slate-100"
            >
              <div
                className="h-full rounded-full bg-linear-to-r from-blue-600 to-indigo-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      {collectionCards.length > 0 ? (
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {collectionCards.map((card) => {
            const quantity = quantityByCardId.get(card.id)!;
            return (
              <li
                className="flex items-center overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm sm:block p-1"
                key={card.id}
              >
                <Link
                  href={`/dashboard/detalhe/${card.id}/${language}`}
                  className="shrink-0 sm:block"
                >
                  <div className="relative h-20 w-14 bg-slate-100 sm:aspect-2.5/3.5 sm:h-auto sm:w-full">
                    <span className="absolute left-2 top-2 z-10 hidden rounded-md bg-slate-900/85 px-2 py-1 text-xs font-bold text-white sm:inline">
                      {card.localId}
                    </span>
                    {quantity > 0 && (
                      <span className="absolute right-2 top-2 z-10 hidden items-center gap-1 rounded-md bg-emerald-600 px-2 py-1 text-xs font-bold text-white sm:inline-flex">
                        <Check aria-hidden="true" className="size-3.5" />×
                        {quantity}
                      </span>
                    )}
                    {card.image ? (
                      <div className="relative h-20 w-14 md:w-full md:h-full">
                        <Image
                          src={`${card.image}/low.webp`}
                          alt={card.name}
                          fill
                          sizes="(max-width: 639px) 56px, (max-width: 1024px) 25vw, 16vw"
                          unoptimized
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="flex h-full items-center justify-center p-3 text-center text-xs text-slate-400">
                        Imagem indisponível
                      </div>
                    )}
                  </div>
                </Link>
                <div className="min-w-0 flex-1 p-3">
                  <h2 className="truncate text-sm font-semibold text-slate-800">
                    {card.name}
                  </h2>
                  <span className="mt-1 block text-xs text-slate-500 sm:hidden">
                    {card.localId}
                  </span>
                  <div className="mt-2 flex items-center justify-between gap-2 sm:mt-3">
                    <span className="text-xs text-slate-500">
                      {quantity === 0
                        ? "Ainda não tenho"
                        : `${quantity} ${quantity === 1 ? "cópia" : "cópias"}`}
                    </span>
                    <div className="flex items-center gap-1">
                      {quantity > 0 && (
                        <form action={changeQuantityAction}>
                          <input type="hidden" name="cardId" value={card.id} />
                          <input type="hidden" name="lang" value={language} />
                          <input type="hidden" name="delta" value="-1" />
                          <button
                            type="submit"
                            aria-label={`Remover uma cópia de ${card.name}`}
                            className="inline-flex size-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                          >
                            <Minus aria-hidden="true" className="size-4" />
                          </button>
                        </form>
                      )}
                      <form action={addSetCardToCollectionAction}>
                        <input type="hidden" name="cardId" value={card.id} />
                        <input type="hidden" name="lang" value={language} />
                        <button
                          type="submit"
                          aria-label={`Adicionar uma cópia de ${card.name}`}
                          className="inline-flex size-8 items-center justify-center rounded-lg border border-blue-200 text-blue-700 transition hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        >
                          <Plus aria-hidden="true" className="size-4" />
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">
          Você ainda não tem cartas deste set na sua coleção.
        </p>
      )}
    </div>
  );
}
