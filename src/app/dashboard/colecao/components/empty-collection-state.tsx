import Link from "next/link";
import { ArrowRight, Layers3, Sparkles } from "lucide-react";

export function EmptyCollectionState() {
  return (
    <section className="relative isolate flex min-h-96 flex-col items-center justify-center overflow-hidden rounded-3xl border border-blue-100 bg-linear-to-br from-white via-blue-50 to-indigo-100 px-5 py-12 text-center shadow-sm sm:px-10">
      <div
        aria-hidden="true"
        className="absolute -right-16 -top-20 -z-10 size-56 rounded-full bg-violet-300/30 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-24 -left-12 -z-10 size-56 rounded-full bg-sky-300/30 blur-3xl"
      />

      <div className="relative mb-7 flex size-24 items-center justify-center rounded-3xl bg-white text-blue-600 shadow-xl shadow-blue-900/10 ring-1 ring-blue-100 sm:size-28">
        <Layers3 aria-hidden="true" className="size-12 sm:size-14" />
        <span className="absolute -right-2 -top-2 flex size-9 items-center justify-center rounded-full bg-amber-400 text-white shadow-md">
          <Sparkles aria-hidden="true" className="size-5" />
        </span>
      </div>

      <p className="mb-3 rounded-full bg-blue-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-700">
        Sua jornada começa aqui
      </p>
      <h2 className="max-w-xl text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
        Sua coleção ainda está esperando pela primeira carta!
      </h2>
      <p className="mt-3 max-w-lg text-sm leading-6 text-slate-600 sm:text-base">
        Explore as cartas Pokémon, encontre suas favoritas e adicione a primeira
        para começar a montar sua coleção.
      </p>

      <Link
        href="/dashboard/explorar"
        className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:w-auto"
      >
        Encontrar minha primeira carta
        <ArrowRight aria-hidden="true" className="size-4" />
      </Link>
    </section>
  );
}
