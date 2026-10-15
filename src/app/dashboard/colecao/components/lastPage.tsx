import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock3, Minus, Plus } from "lucide-react";
import type { CollectionItem } from "@/action-get-collection/actionGetCollection";
import { changeQuantityAction } from "@/action-save-collection/addToCollectionAction";
import { CollectionSubmitButton } from "@/app/dashboard/components/collection-submit-button";

interface LastProps {
  items: CollectionItem[];
}

const priceFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "EUR",
});

export function LastPage({ items }: LastProps) {
  const latestItems = items.slice(0, 20);

  return (
    <section
      aria-labelledby="recent-collection-heading"
      className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
    >
      <div className="flex flex-col gap-2 border-b border-slate-100 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <div>
          <h2
            id="recent-collection-heading"
            className="text-base font-bold text-slate-900"
          >
            Cartas adicionadas recentemente
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Veja os últimos itens da sua coleção.
          </p>
        </div>

        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
          <Clock3 aria-hidden="true" className="size-3.5" />
          {latestItems.length} {latestItems.length === 1 ? "carta" : "cartas"}
        </span>
      </div>

      {latestItems.length > 0 ? (
        <ul className="divide-y divide-slate-100">
          {latestItems.map((item) => (
            <li key={`${item.cardLanguage}:${item.cardId}`}>
              <div className="flex min-w-0 items-center gap-2 px-3 py-3 transition-colors hover:bg-slate-50 sm:gap-3 sm:px-5">
                <Link
                  href={`/dashboard/detalhe/${item.cardId}/${item.cardLanguage}`}
                  className="group flex min-w-0 flex-1 items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:gap-4"
                >
                  <div className="relative aspect-2.5/3.5 w-12 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-100 shadow-sm sm:w-14">
                    {item.image ? (
                      <Image
                        src={`${item.image}/low.webp`}
                        alt={`Carta ${item.name}`}
                        fill
                        sizes="56px"
                        unoptimized
                        className="object-cover transition-transform duration-200 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center px-1 text-center text-[10px] leading-tight text-slate-400">
                        Sem imagem
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-900 group-hover:text-blue-700">
                      {item.name}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-slate-500">
                      {item.setName} <span aria-hidden="true">·</span>{" "}
                      {item.localId}
                    </p>
                    <p className="mt-1 text-xs font-medium text-slate-600 sm:hidden">
                      {item.purchasePrice == null
                        ? "Sem preço registrado"
                        : priceFormatter.format(item.purchasePrice)}
                    </p>
                  </div>

                  <div className="hidden shrink-0 text-right sm:block">
                    <p className="text-sm font-semibold text-slate-800">
                      {item.purchasePrice == null
                        ? "Sem preço registrado"
                        : priceFormatter.format(item.purchasePrice)}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-500">
                      {item.quantity} {item.quantity === 1 ? "cópia" : "cópias"}
                    </p>
                  </div>

                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700">
                    ×{item.quantity}
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="hidden size-4 shrink-0 text-slate-400 transition group-hover:text-blue-600 sm:block"
                  />
                </Link>

                <div className="flex shrink-0 items-center gap-1">
                  <form action={changeQuantityAction}>
                    <input type="hidden" name="cardId" value={item.cardId} />
                    <input
                      type="hidden"
                      name="lang"
                      value={item.cardLanguage}
                    />
                    <input type="hidden" name="delta" value="1" />
                    <CollectionSubmitButton
                      type="submit"
                      aria-label={`Adicionar uma cópia de ${item.name}`}
                      title="Adicionar uma cópia"
                      className="inline-flex size-9 items-center justify-center rounded-lg border border-blue-200 bg-white text-blue-700 transition hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                      <Plus aria-hidden="true" className="size-4" />
                    </CollectionSubmitButton>
                  </form>

                  <form action={changeQuantityAction}>
                    <input type="hidden" name="cardId" value={item.cardId} />
                    <input
                      type="hidden"
                      name="lang"
                      value={item.cardLanguage}
                    />
                    <input type="hidden" name="delta" value="-1" />
                    <CollectionSubmitButton
                      type="submit"
                      aria-label={`Remover uma cópia de ${item.name}`}
                      title={
                        item.quantity === 1
                          ? "Remover carta da coleção"
                          : "Remover uma cópia"
                      }
                      className="inline-flex size-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                    >
                      <Minus aria-hidden="true" className="size-4" />
                    </CollectionSubmitButton>
                  </form>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="px-4 py-8 text-center text-sm text-slate-500 sm:px-5">
          Ainda não há cartas na sua coleção.
        </p>
      )}
    </section>
  );
}
