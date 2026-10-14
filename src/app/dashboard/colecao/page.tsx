import { ResumePage } from "./components/resumePage";
import { SetPage } from "./components/setPage";
import { LastPage } from "./components/lastPage";
import { EmptyCollectionState } from "./components/empty-collection-state";
import { actionGetCollection } from "@/action-get-collection/actionGetCollection";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";

export default async function ColecaoPage() {
  const result = await actionGetCollection();

  if (!result || "error" in result) return;

  return (
    <div className="p-4 sm:p-8">
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Minha coleção</h1>

      {result.items.length === 0 ? (
        <EmptyCollectionState />
      ) : (
        <>
          <div className="mb-6 flex flex-col gap-5">
            <div className="flex flex-col gap-4 rounded-2xl bg-linear-to-r from-blue-600 via-indigo-600 to-violet-600 p-5 text-white shadow-lg shadow-blue-900/15 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div className="flex items-start gap-3">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/15">
                  <Search aria-hidden="true" className="size-5" />
                </span>
                <div>
                  <h2 className="text-lg font-bold">
                    Encontre sua próxima carta
                  </h2>
                  <p className="mt-1 text-sm text-blue-50">
                    Explore as cartas e adicione novas à sua coleção.
                  </p>
                </div>
              </div>

              <Link
                href="/dashboard/explorar"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-blue-700 shadow-sm transition hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto"
              >
                Explorar cartas
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
          </div>

          <ResumePage items={result.items} />

          <SetPage items={result.items} />

          <LastPage items={result.items} />
        </>
      )}
    </div>
  );
}
