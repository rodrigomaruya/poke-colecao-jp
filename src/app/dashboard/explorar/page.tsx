import CardSearchForm from "./components/search-sets";
import SetCards from "./components/set-cards";
import SetHeader from "./components/setHeader";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function ExplorarPage() {
  return (
    <main>
      <div className="container m-auto flex flex-col items-center justify-center p-3 sm:p-5">
        <Link
          href="/dashboard/colecao"
          className="group mb-4 inline-flex w-full items-center justify-center gap-3 self-start rounded-2xl border border-slate-200 bg-white p-3 text-left shadow-sm transition hover:border-blue-200 hover:bg-blue-50/60 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:w-fit sm:justify-start sm:px-4"
        >
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition-colors group-hover:bg-blue-100 group-hover:text-blue-700">
            <ArrowLeft aria-hidden="true" className="size-5" />
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-semibold text-slate-800 group-hover:text-blue-800">
              Voltar para minha coleção
            </span>
            <span className="mt-0.5 block text-xs text-slate-500">
              Retorne às suas cartas e ao progresso dos sets
            </span>
          </span>
        </Link>
        <CardSearchForm />
        <SetHeader />
        <SetCards />
      </div>
    </main>
  );
}
