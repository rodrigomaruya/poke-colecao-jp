"use client";

import Link from "next/link";
import {
  ArrowLeft,
  BadgeCheck,
  CalendarDays,
  Layers3,
  type LucideIcon,
} from "lucide-react";
import { useSetStore } from "@/store/setStore";

export default function SetHeader() {
  const { set } = useSetStore();

  if (!set) {
    return null;
  }

  const seriesLabel = set.name.toLowerCase().includes("mega")
    ? "Mega Evolution"
    : "Coleção Pokémon";

  return (
    <section className="w-full mt-2">
      <div className="overflow-hidden rounded-md bg-white shadow-[0_10px_28px_rgba(15,23,42,0.06)]">
        <div className="grid md:grid-cols-[230px_1fr]">
          <div className="flex items-center justify-center bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18),rgba(15,23,42,0.02)_40%,rgba(248,250,252,1)_100%)] p-4">
            {set.logo ? (
              <img
                src={`${set.logo}.png`}
                alt={set.name}
                className="max-h-44 w-full object-contain drop-shadow-[0_10px_18px_rgba(14,116,144,0.18)]"
              />
            ) : (
              <div className="flex h-40 w-full items-center justify-center rounded-md bg-slate-50 text-sm text-slate-400">
                Sem imagem
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center p-4 sm:p-5">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2 text-sm text-slate-700">
                <span className="font-semibold text-slate-500">Série</span>
                <span className="font-semibold text-slate-800">
                  {seriesLabel}
                </span>
              </div>

              <span className="inline-flex items-center rounded-md bg-violet-100 px-2 py-1 text-[10px] font-bold tracking-[0.12em] text-violet-700 uppercase">
                {set.id}
              </span>
            </div>

            <h1 className="text-[2rem] font-black leading-none tracking-tighter text-slate-900">
              {set.name}
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Coleção de cartas Pokémon
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <Info
                icon={CalendarDays}
                label="Lançamento"
                value={formatDate(set.releaseDate)}
              />

              <Info
                icon={BadgeCheck}
                label="Oficiais"
                value={String(set.cardCount.official)}
              />

              <Info
                icon={Layers3}
                label="Total"
                value={String(set.cardCount.total)}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Info({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2.5 rounded-md bg-slate-50 px-2.5 py-2.5">
      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white text-slate-700 shadow-sm ring-1 ring-slate-200">
        <Icon className="h-4 w-4" />
      </div>

      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-400">
          {label}
        </p>
        <p className="mt-0.5 text-sm font-bold text-slate-900">{value}</p>
      </div>
    </div>
  );
}

function formatDate(date: string | null) {
  if (!date) return "—";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat("pt-BR").format(parsed);
}
