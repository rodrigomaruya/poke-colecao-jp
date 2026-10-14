import Image from "next/image";

export function SaibaMaisHero() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-blue-200 via-white to-blue-100">
      <div className="mx-auto flex justify-between min-h-75 max-w-6xl items-center px-4 py-12 sm:px-6 lg:px-8 ">
        <div className="relative z-10 max-w-xl">
          <span className="inline-flex rounded-full bg-blue-100 px-4 py-1.5 text-sm font-semibold text-blue-600">
            Saiba mais
          </span>

          <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
            Tudo sobre o
            <br />
            <span className="text-blue-600">Poke Coleção JP</span>
          </h1>

          <p className="mt-5 max-w-lg text-base leading-7 text-slate-600">
            Aqui você encontra todas as informações sobre como funciona o nosso
            site, de onde vêm os dados e como você pode aproveitar ao máximo sua
            experiência.
          </p>
        </div>

        <div className="relative hidden h-72 w-80 md:block lg:right-16">
          <Image
            src="/saiba-mais.png"
            alt="Pikachu"
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain object-bottom"
          />
        </div>

        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-blue-100/60 blur-3xl" />
      </div>
    </section>
  );
}
