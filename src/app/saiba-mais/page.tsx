import { SaibaMaisHero } from "./components/saiba-mais-hero";
import { InfoCard } from "./components/info-card";
import { PokemonNotice } from "./components/pokemon-notice";
import { Menu } from "@/components/menu";
import { getSession } from "@/lib/session";

export default async function SaibaMaisPage() {
  const sessionId = await getSession();
  return (
    <main className="min-h-screen bg-white">
      <Menu isLoggedIn={!!sessionId} />
      <SaibaMaisHero />

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2">
          <InfoCard
            icon="◎"
            iconClass="bg-blue-600"
            title="O que é o Poke Coleção JP?"
          >
            <p>
              O Poke Coleção JP é uma ferramenta para ajudar você a organizar
              sua coleção de cartas Pokémon TCG, acompanhar cartas desejadas e
              visualizar informações das cartas de forma prática e intuitiva.
            </p>
          </InfoCard>

          <InfoCard
            icon="▤"
            iconClass="bg-indigo-600"
            title="De onde vêm os dados?"
          >
            <p>
              As informações das cartas são obtidas através da{" "}
              <a
                href="https://tcgdex.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-blue-600 hover:underline"
              >
                TCGdex
              </a>
              , uma API pública que disponibiliza dados sobre cartas de Pokémon
              TCG.
            </p>

            <a
              href="https://tcgdex.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 font-semibold text-blue-600 hover:underline"
            >
              Conheça a TCGdex →
            </a>
          </InfoCard>

          <InfoCard icon="⚙" iconClass="bg-green-600" title="Como funciona?">
            <ol className="space-y-3">
              {[
                "Você pesquisa uma carta.",
                "O Poke Coleção JP consulta os dados disponíveis.",
                "As informações utilizadas pelo sistema podem ser armazenadas localmente.",
                "Você adiciona a carta à sua coleção.",
                "Você pode adicionar cartas à sua lista de desejos.",
              ].map((item, index) => (
                <li key={item} className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                    {index + 1}
                  </span>

                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </InfoCard>

          <InfoCard icon="◇" iconClass="bg-orange-500" title="Sobre os preços">
            <p>
              Os valores apresentados, quando disponíveis, são informações de
              referência provenientes das fontes utilizadas pelo sistema. Os
              preços podem variar conforme loja, estado da carta, idioma, edição
              e momento da consulta.
            </p>
          </InfoCard>
        </div>

        <div className="mt-5">
          <InfoCard
            icon="▤"
            iconClass="bg-blue-600"
            title="Por que alguns dados podem demorar para aparecer?"
            highlighted
          >
            <p>
              Para evitar consultas desnecessárias à API, o Poke Coleção JP
              mantém em seu banco algumas informações das cartas que já foram
              utilizadas pelos usuários. Dessa forma, quando uma carta já está
              cadastrada no sistema, podemos reutilizar essas informações em vez
              de consultar a API novamente.
            </p>
          </InfoCard>
        </div>

        <PokemonNotice />
      </section>
    </main>
  );
}
