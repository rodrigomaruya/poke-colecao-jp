"use client";

import { useState, useTransition } from "react";
import { getSetsAction } from "@/actions-tcgdex/seach-set";
import { useSetStore } from "@/store/setStore";

export default function CardSearchForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const { setCards, setSet, setLang } = useSetStore();

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    setError(null);
    setCards([]);
    setSet(null);
    setLang("pt");

    const formData = new FormData(event.currentTarget);

    const rawLang = formData.get("lang");

    if (rawLang !== "en" && rawLang !== "pt" && rawLang !== "ja") {
      return setError("Selecione um idioma");
    }

    setLang(rawLang);

    startTransition(async () => {
      const res = await getSetsAction(formData);

      if (res.error) {
        setError(res.error);
        return;
      }
      if (res.data) {
        setCards(res.data.cards);
        setSet(res.data.set);
      }
    });
  }

  return (
    <div className="w-full rounded-xl border border-slate-200 bg-white/90 p-3 shadow-sm backdrop-blur-sm transition-all duration-200 sm:p-4">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] lg:items-end"
      >
        <div className="w-full">
          <label
            htmlFor="lang"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.08em] text-slate-600"
          >
            Idioma
          </label>

          <select
            id="lang"
            name="lang"
            defaultValue="pt"
            className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-base text-slate-800 outline-none transition placeholder:text-slate-400 focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/20 md:text-sm"
          >
            <option value="pt">Português</option>
            <option value="ja">Japonês</option>
            <option value="en">Inglês</option>
          </select>
        </div>

        <div className="w-full">
          <label
            htmlFor="setId"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.08em] text-slate-600"
          >
            Set
          </label>

          <input
            id="setId"
            name="setId"
            type="text"
            placeholder="Ex: sv01"
            className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-base text-slate-800 outline-none transition placeholder:text-slate-400 focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/20 md:text-sm"
          />
        </div>

        <div className="flex w-full items-end lg:w-auto">
          <button
            type="submit"
            disabled={isPending}
            className="h-11 w-full rounded-lg bg-linear-to-r from-blue-600 to-indigo-600 px-5 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-70 lg:min-w-32"
          >
            {isPending ? "Buscando..." : "Buscar"}
          </button>
        </div>
      </form>

      {error && (
        <div
          aria-live="polite"
          className="mt-3 flex w-full items-center justify-center rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-center text-xs font-medium text-red-700"
        >
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
