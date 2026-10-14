"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

import SetCardItem from "./set-card-item";
import { useSetStore } from "@/store/setStore";

const CARDS_PER_PAGE = 20;

export default function SetCards() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const { cards } = useSetStore();

  const filteredCards = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) {
      return cards;
    }

    return cards.filter((card) => {
      return (
        card.name.toLowerCase().includes(value) ||
        card.localId.toLowerCase().includes(value)
      );
    });
  }, [cards, search]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredCards.length / CARDS_PER_PAGE),
  );

  const currentPage = Math.min(page, totalPages);

  const visibleCards = filteredCards.slice(
    (currentPage - 1) * CARDS_PER_PAGE,
    currentPage * CARDS_PER_PAGE,
  );

  function handleSearch(value: string) {
    setSearch(value);
    setPage(1);
  }

  function previousPage() {
    setPage((current) => Math.max(1, current - 1));
  }

  function nextPage() {
    setPage((current) => Math.min(totalPages, current + 1));
  }

  return (
    <section className="mt-2 w-full rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
      {/* Cabeçalho */}
      <div className="mb-4 flex flex-col gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-h-11 items-center">
          <p className="text-sm font-medium text-slate-600">
            <span className="font-bold text-slate-900">
              {filteredCards.length}
            </span>{" "}
            cartas encontradas
          </p>
        </div>

        {/* Busca */}
        <div className="relative w-full sm:max-w-sm sm:flex-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            value={search}
            onChange={(event) => handleSearch(event.target.value)}
            placeholder="Buscar por nome ou localId..."
            className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-base text-slate-800 outline-none transition placeholder:text-slate-400 focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/20 md:text-sm"
          />
        </div>
      </div>

      {/* Grid */}
      {visibleCards.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5">
          {visibleCards.map((card) => (
            <SetCardItem key={card.id} card={card} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <p className="font-medium text-slate-700">Nenhuma carta encontrada</p>

          <p className="mt-1 text-sm text-slate-400">
            Tente buscar por outro nome ou número.
          </p>
        </div>
      )}

      {/* Paginação */}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          <button
            onClick={previousPage}
            disabled={currentPage === 1}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft size={17} />
          </button>

          <span className="px-3 text-sm text-slate-600">
            Página <strong className="text-slate-900">{currentPage}</strong> de{" "}
            {totalPages}
          </span>

          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRight size={17} />
          </button>
        </div>
      )}
    </section>
  );
}
