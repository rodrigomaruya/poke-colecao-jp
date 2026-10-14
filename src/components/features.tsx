"use client";
import { BadgeDollarSign, Database, Heart, Library } from "lucide-react";

const features = [
  {
    icon: Library,
    title: "Sua coleção",
    description: "Cadastre suas cartas",
  },
  {
    icon: BadgeDollarSign,
    title: "Valor estimado",
    description: "Veja quanto vale",
  },
  {
    icon: Heart,
    title: "Wishlist",
    description: "Monte o que falta",
  },
  {
    icon: Database,
    title: "Dados atualizados",
    description: "Preços da TCGdex",
  },
];

export function Features() {
  return (
    <section className="mx-auto w-full px-4 md:mt-10">
      <div className="grid grid-cols-2 gap-y-8 bg-white px-5 py-8 sm:grid-cols-4 sm:gap-y-0 sm:px-8">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.title}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
                <Icon size={19} strokeWidth={2} className="text-blue-500" />
              </div>

              <h3 className="text-xs font-bold text-slate-800 sm:text-sm">
                {feature.title}
              </h3>

              <p className="mt-1 text-[10px] text-slate-500 sm:text-xs">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
