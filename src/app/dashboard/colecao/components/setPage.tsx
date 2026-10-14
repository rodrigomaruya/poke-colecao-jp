import { getSetProgress } from "@/utils/getSetProgress";
import { Layers3 } from "lucide-react";
import Link from "next/link";

export type CollectionItem = {
  cardId: string;
  cardLanguage: string;
  quantity: number;
  purchasePrice: number | null;
  currency: string;
  name: string;
  localId: string;
  image: string | null;
  setName: string;
  setId: string;
  cardCountOfficial: number;
};

interface GetProps {
  items: CollectionItem[];
}

export function SetPage({ items }: GetProps) {
  const progress = getSetProgress(items);

  return (
    <section
      aria-labelledby="set-progress-heading"
      className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
    >
      <div className="flex flex-col gap-3 border-b border-slate-100 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <div className="flex items-center gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
            <Layers3 aria-hidden="true" className="size-5" />
          </span>
          <div>
            <h2
              id="set-progress-heading"
              className="text-base font-bold text-slate-900"
            >
              Progresso dos sets
            </h2>
            <p className="mt-0.5 text-sm text-slate-500">
              Acompanhe quantas cartas faltam para completar cada set.
            </p>
          </div>
        </div>

        <span className="inline-flex w-fit items-center rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
          {progress.length} {progress.length === 1 ? "set" : "sets"}
        </span>
      </div>

      {progress.length > 0 ? (
        <ul className="grid gap-3 p-4 sm:grid-cols-2 sm:p-5">
          {progress.map((set) => (
            <Link
              key={`${set.language}:${set.setId}`}
              href={`/dashboard/minha-colecao/${set.setId}?lang=${set.language}`}
            >
              <li>
                <SetProgress
                  name={set.setName}
                  setId={set.setId}
                  language={set.language}
                  percentage={set.percent}
                  owned={set.owned}
                  total={set.total}
                />
              </li>
            </Link>
          ))}
        </ul>
      ) : (
        <p className="px-4 py-8 text-center text-sm text-slate-500 sm:px-5">
          O progresso dos sets aparecerá quando você adicionar cartas.
        </p>
      )}
    </section>
  );
}

function SetProgress({
  name,
  setId,
  language,
  percentage,
  owned,
  total,
}: {
  name: string;
  setId: string;
  language: string;
  percentage: number;
  owned: number;
  total: number;
}) {
  const languageName =
    {
      pt: "Português",
      en: "Inglês",
      ja: "Japonês",
    }[language] ?? language.toUpperCase();

  return (
    <article className="h-full rounded-xl border border-slate-200 bg-slate-50/70 p-4 transition-colors hover:border-indigo-200 hover:bg-indigo-50/30">
      <div className="flex min-w-0 items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold text-slate-900">
            {name}
          </h3>
          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
            <span className="rounded-md bg-white px-2 py-0.5 text-[11px] font-medium text-slate-500 ring-1 ring-inset ring-slate-200">
              {setId}
            </span>
            <span className="rounded-md bg-white px-2 py-0.5 text-[11px] font-medium text-slate-500 ring-1 ring-inset ring-slate-200">
              {languageName}
            </span>
          </div>
        </div>

        <span className="shrink-0 rounded-lg bg-white px-2.5 py-1 text-sm font-bold text-indigo-700 ring-1 ring-inset ring-indigo-100">
          {percentage}%
        </span>
      </div>

      <div
        role="progressbar"
        aria-label={`Progresso de ${name}`}
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200"
      >
        <div
          className="h-full rounded-full bg-linear-to-r from-blue-600 to-indigo-500 transition-[width] duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="mt-2 flex items-center justify-between gap-2 text-xs">
        <span className="font-medium text-slate-600">
          {owned} de {total} cartas
        </span>
        <span className="text-right text-slate-500">
          {Math.max(total - owned, 0)}{" "}
          {total - owned === 1 ? "carta faltando" : "cartas faltando"}
        </span>
      </div>
    </article>
  );
}
