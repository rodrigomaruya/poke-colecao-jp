import { CircleDollarSign, Library } from "lucide-react";
import { CollectionItem } from "./setPage";

interface ResumeProps {
  items: CollectionItem[];
}
export function ResumePage({ items }: ResumeProps) {
  const cents = items.reduce((acc, item) => {
    if (item.purchasePrice == null) return acc;
    return acc + Math.round(item.purchasePrice * 100) * item.quantity;
  }, 0);

  const euros = cents / 100;
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
            <Library size={18} className="text-blue-600" />
          </div>

          <div>
            <p className="text-xs text-slate-500">Total de cartas</p>

            <p className="text-xl font-bold text-slate-900">{items.length}</p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50">
            <CircleDollarSign size={18} className="text-green-600" />
          </div>

          <div>
            <p className="text-xs text-slate-500">Valor estimado</p>

            <p className="text-xl font-bold text-slate-900">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "EUR",
              }).format(euros)}
            </p>
          </div>
        </div>
        <p className="mt-3 text-xs leading-5 text-slate-500">
          A TCGdex disponibiliza os preços em euros (EUR). Estamos trabalhando
          para permitir que você escolha a moeda de exibição.
        </p>
      </div>
    </div>
  );
}
