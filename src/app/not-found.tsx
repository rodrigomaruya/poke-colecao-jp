import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, House } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-linear-to-br from-blue-50 via-white to-indigo-50 px-4 py-12">
      <section className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl shadow-blue-900/5 sm:p-12">
        <Image
          src="/logo-poke.png"
          alt="Poke Coleção JP"
          width={80}
          height={80}
          className="mx-auto mb-5 size-20 object-contain"
        />

        <p className="text-sm font-bold tracking-[0.2em] text-blue-600 uppercase">
          Erro 404
        </p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
          Página não encontrada
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500 sm:text-base">
          Parece que esta página se perdeu. Confira o endereço ou volte para
          continuar explorando sua coleção.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <House aria-hidden="true" className="size-4" />
            Ir para o início
          </Link>
          <Link
            href="/dashboard/colecao"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Minha coleção
          </Link>
        </div>
      </section>
    </main>
  );
}
