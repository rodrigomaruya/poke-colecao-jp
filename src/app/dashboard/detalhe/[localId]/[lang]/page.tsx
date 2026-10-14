import { getCardAction } from "@/actions-tcgdex/search-cards";
import { PokemonCardDetails } from "../../components/pokemon-card-details";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    localId: string;
    lang: string;
  }>;
};

export default async function DetalhePage({ params }: Props) {
  const { localId, lang } = await params;
  const card = await getCardAction({ lang, localId });
  if (!card.cardData) notFound();

  return (
    <div>
      <PokemonCardDetails card={card.cardData} lang={lang} />
    </div>
  );
}
