import Link from "next/link";
import { ArrowLeft, Wrench } from "lucide-react";

export default function WishlistPage() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4 sm:p-8">
      <section
        aria-labelledby="wishlist-maintenance-heading"
        className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-10"
      >
        <span className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
          <Wrench aria-hidden="true" className="size-8" />
        </span>

        <p className="mt-6 inline-flex rounded-full bg-amber-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-amber-700">
          Em manutenção
        </p>

        <h1
          id="wishlist-maintenance-heading"
          className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl"
        >
          Estamos preparando sua lista de desejos
        </h1>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-600 sm:text-base">
          Esta página está temporariamente em manutenção. Estamos trabalhando
          para que você possa acompanhar aqui as cartas que deseja encontrar.
        </p>

        <Link
          href="/dashboard/colecao"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Voltar para minha coleção
        </Link>
      </section>
    </main>
  );
}