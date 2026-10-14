export function PokemonNotice() {
  return (
    <div className="mt-5 rounded-2xl border border-red-100 bg-red-50 p-6">
      <div className="flex gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-500 text-xl text-white">
          !
        </div>

        <div>
          <h2 className="font-bold text-slate-900">Importante sobre Pokémon</h2>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            O Poke Coleção JP é um projeto independente e não é afiliado,
            patrocinado ou endossado pela The Pokémon Company, Nintendo ou
            outras empresas responsáveis pelo Pokémon TCG.
          </p>
        </div>
      </div>
    </div>
  );
}
