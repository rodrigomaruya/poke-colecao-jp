import type { Metadata } from "next";
import { ArrowUpFromLine, Check, Share, Smartphone } from "lucide-react";
import { Menu } from "@/components/menu";
import { getSession } from "@/lib/session";

export const metadata: Metadata = {
  title: "Instalar no iPhone",
  description:
    "Veja como adicionar o Poke Coleção JP à tela inicial do seu iPhone.",
};

const steps = [
  {
    title: "Abra o site no Safari",
    description:
      "No iPhone, acesse o Poke Coleção JP pelo navegador Safari. A opção de adicionar à tela inicial fica no menu de compartilhamento do Safari.",
  },
  {
    title: "Toque em Compartilhar",
    description:
      "Toque no ícone de compartilhamento (o quadrado com uma seta para cima). Ele costuma ficar na barra inferior do Safari.",
    icon: Share,
  },
  {
    title: "Escolha “Adicionar à Tela de Início”",
    description:
      "Role as opções do menu, se necessário, e toque em “Adicionar à Tela de Início”. Se aparecer “Abrir como App da Web”, deixe essa opção ativada.",
    icon: ArrowUpFromLine,
  },
  {
    title: "Confirme em “Adicionar”",
    description:
      "Pronto! O ícone do Poke Coleção JP aparecerá na tela inicial. Toque nele para abrir o site em uma janela própria, como um app.",
    icon: Check,
  },
];

export default async function InstallPage() {
  const sessionId = await getSession();

  return (
    <main className="min-h-screen bg-slate-50">
      <Menu isLoggedIn={!!sessionId} />

      <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16">
        <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm sm:p-10">
          <div className="mb-6 flex size-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
            <Smartphone aria-hidden="true" className="size-7" />
          </div>

          <p className="text-sm font-semibold text-blue-700">
            Leva só alguns toques
          </p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Adicione à tela inicial do iPhone
          </h1>
          <p className="mt-3 text-base leading-7 text-slate-600">
            Você pode criar um atalho do Poke Coleção JP e abrir o site como um
            app, sem precisar baixar nada da App Store.
          </p>

          <ol className="mt-8 space-y-6">
            {steps.map(({ title, description, icon: Icon }, index) => (
              <li key={title} className="flex gap-4">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                  {index + 1}
                </span>
                <div>
                  <h2 className="flex items-center gap-2 font-bold text-slate-900">
                    {Icon && (
                      <Icon
                        aria-hidden="true"
                        className="size-4 shrink-0 text-blue-700"
                      />
                    )}
                    {title}
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    {description}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <p className="mt-8 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
            Dica: se você abriu esta página em outro navegador, copie o endereço
            e abra-o no Safari para seguir os passos.
          </p>
        </div>
      </section>
    </main>
  );
}
