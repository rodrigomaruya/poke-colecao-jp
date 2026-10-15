"use client";
import Image from "next/image";
import {
  ArrowLeft,
  BadgeInfo,
  Coins,
  Library,
  LoaderCircle,
  Shield,
  Sparkles,
  Tag,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { CardPricing } from "@/lib/types/pricing";
import { addToCollectionAction } from "@/action-save-collection/addToCollectionAction";

export interface CardDetails {
  id: string;
  language: string;
  name: string;
  localId: string;
  image: string | null;
  rarity: string | null;
  category: string | null;
  hp: number | null;
  types: string[];
  stage: string | null;
  evolveFrom: string | null;
  set: {
    id: string;
    name: string;
    cardCountOfficial: number | null;
    cardCountTotal: number | null;
  };
  pricing: CardPricing | null;
  pricingUpdatedAt: Date | null;
}

type PokemonCardDetailsProps = {
  card: CardDetails;
  lang: string;
};

export function PokemonCardDetails({ card, lang }: PokemonCardDetailsProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  async function handleAddCollection() {
    if (isAdding) return;

    setIsAdding(true);
    setFeedback(null);

    try {
      const added = await addToCollectionAction(
        card.id,
        lang,
        card.pricing?.cardmarket?.trend,
      );

      setFeedback(
        added
          ? {
              type: "success",
              message: `${card.name} foi adicionada à sua coleção.`,
            }
          : {
              type: "error",
              message:
                "Não foi possível adicionar esta carta à coleção. Tente novamente.",
            },
      );
    } catch {
      setFeedback({
        type: "error",
        message:
          "Ocorreu um erro ao adicionar a carta à coleção. Tente novamente.",
      });
    } finally {
      setIsAdding(false);
    }
  }

  if (!card) {
    return (
      <div className="flex min-h-50 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50">
        <h1 className="text-sm font-medium text-slate-500">
          Nenhuma carta encontrada
        </h1>
      </div>
    );
  }

  const price = card.pricing?.cardmarket?.trend || 0;
  const cardNumber = `${card.localId}/${card.set.cardCountOfficial || 0}`;

  return (
    <div className="mx-auto w-full max-w-6xl sm:p-4">
      <div className="overflow-hidden rounded-md border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
        <nav
          aria-label="Navegação da coleção"
          className="flex flex-wrap items-center gap-2 border-b border-slate-100 px-3 py-2.5 sm:px-4"
        >
          <Link
            href="/dashboard/explorar"
            className="inline-flex min-h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500 sm:text-sm"
          >
            <ArrowLeft aria-hidden="true" className="size-4 shrink-0" />
            Explorar cartas
          </Link>
          <Link
            href="/dashboard/colecao"
            className="inline-flex min-h-9 items-center gap-2 rounded-lg border border-blue-100 bg-blue-50/70 px-3 py-2 text-xs font-semibold text-blue-700 transition-colors hover:border-blue-200 hover:bg-blue-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:text-sm"
          >
            <Library aria-hidden="true" className="size-4 shrink-0" />
            Minha coleção
          </Link>
        </nav>
        <div className="grid gap-4 p-3 md:grid-cols-[320px_1fr] md:p-4 lg:p-5">
          <div className="mx-auto w-full max-w-80 overflow-hidden rounded-[22px] border border-slate-200 bg-slate-50 p-2 shadow-inner md:max-w-none">
            <div className="relative overflow-hidden rounded-[18px] bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.14),transparent_35%),linear-gradient(180deg,#f8fafc_0%,#eef2ff_100%)]">
              <Image
                src={card.image || "/logo-poke.png"}
                alt={card.name}
                width={500}
                height={700}
                className="h-auto w-full object-cover"
                loading="eager"
                unoptimized
              />
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-slate-900 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white">
                {card.set.id}
              </span>

              {card.rarity && (
                <span className="inline-flex items-center rounded-full bg-violet-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-violet-700">
                  {card.rarity}
                </span>
              )}
            </div>

            <h1 className="mt-4 text-2xl font-black tracking-tighter text-slate-900 sm:text-3xl lg:text-4xl">
              {card.name}
            </h1>

            <p className="mt-2 text-sm font-medium text-slate-500">
              {card.set.name} · Nº {cardNumber}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {card.types?.map((type) => (
                <span
                  key={type}
                  className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700"
                >
                  {type}
                </span>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50/70 p-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                Preço médio
              </p>
              <p className="mt-1 text-2xl font-black tracking-[-0.04em] text-slate-900">
                {price ? `€ ${price.toFixed(2)}` : "Preço indisponível"}
              </p>
              <p className="mt-2 text-xs leading-5 text-slate-500">
                A TCGdex disponibiliza os preços em euros (EUR). Estamos
                trabalhando para permitir que você escolha a moeda de exibição.
              </p>
            </div>

            <div className="mt-5 flex flex-col gap-3">
              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  disabled={isAdding}
                  aria-busy={isAdding}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                  onClick={handleAddCollection}
                >
                  {isAdding && (
                    <LoaderCircle
                      aria-hidden="true"
                      className="size-4 animate-spin"
                    />
                  )}
                  {isAdding ? "Adicionando..." : "Adicionar à coleção"}
                </button>
              </div>

              {feedback && (
                <p
                  role={feedback.type === "error" ? "alert" : "status"}
                  aria-live="polite"
                  className={`text-sm font-medium ${
                    feedback.type === "success"
                      ? "text-green-700"
                      : "text-red-700"
                  }`}
                >
                  {feedback.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="grid gap-4 border-t border-slate-200 bg-slate-50 p-3 md:grid-cols-2 md:p-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-3 sm:p-4">
            <div className="mb-4 flex items-center gap-2">
              <BadgeInfo className="h-4 w-4 text-slate-700" />
              <h2 className="text-base font-bold text-slate-900">
                Principais detalhes
              </h2>
            </div>

            <div className="space-y-3">
              <InfoRow label="Raridade" value={card.rarity ?? "-"} />
              <InfoRow label="Set" value={card.set.name} />
              <InfoRow label="Número" value={cardNumber} />
              <InfoRow label="Idioma" value={card.language ?? "-"} />
              <InfoRow label="HP" value={String(card.hp ?? "-")} />
              <InfoRow label="Estágio" value={card.stage ?? "-"} />
              <InfoRow label="Evolui de" value={card.evolveFrom ?? "-"} />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-3 sm:p-4">
            <div className="mb-4 flex items-center gap-2">
              <Coins className="h-4 w-4 text-slate-700" />
              <h2 className="text-base font-bold text-slate-900">Preços</h2>
            </div>

            <div className="space-y-3">
              <PriceRow
                name="Cardmarket"
                value={price ? `€ ${price.toFixed(2)}` : "Não consta"}
              />
              <PriceRow
                name="Cardmarket — 30 dias"
                value={
                  card.pricing?.cardmarket?.avg30
                    ? `€ ${card.pricing.cardmarket.avg30.toFixed(2)}`
                    : "Não consta"
                }
              />
              <PriceRow
                name="Tendência"
                value={
                  card.pricing?.cardmarket?.avg
                    ? `€ ${card.pricing?.cardmarket.avg.toFixed(2)}`
                    : "Não consta"
                }
              />
              <PriceRow
                name="Mais baixo"
                value={
                  card.pricing?.cardmarket?.low
                    ? `€ ${card.pricing.cardmarket.low.toFixed(2)}`
                    : "Não consta"
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-slate-100 py-2.5 text-sm">
      <span className="text-slate-500">{label}</span>
      <span className="text-right font-semibold text-slate-800">{value}</span>
    </div>
  );
}

function PriceRow({ name, value }: { name: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-slate-100 py-2.5">
      <span className="text-sm text-slate-600">{name}</span>
      <span className="text-sm font-bold text-slate-900">{value}</span>
    </div>
  );
}

function getLanguage(id: string) {
  if (id.startsWith("SV2a")) {
    return "Japonês";
  }

  return "-";
}
