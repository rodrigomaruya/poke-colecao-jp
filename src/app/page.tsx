import { Features } from "@/components/features";
import { Menu } from "@/components/menu";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getSession } from "@/lib/session";

export default async function Home() {
  const sessionId = await getSession();

  return (
    <>
      <main className="bg-linear-to-br from-blue-100 via-white to-blue-200">
        <Menu isLoggedIn={!!sessionId} />
        <div className="container mx-auto px-6 my-10 md:my-0.5">
          <div className="flex items-center justify-center flex-col md:flex-row">
            <section className=" md:px-6">
              <h1 className="text-3xl md:text-6xl font-bold text-zinc-700 md:mb-5">
                Organize sua coleção <br />
                de Pokemon TCG <br />e descubra quanto ela vale.
              </h1>
              <p className="text-[14px] md:text-xl my-2 leading-6 text-zinc-600">
                Acompanhe suas cartas, veja o preço <br />e nunca mais perca o
                que é importante para você.
              </p>
              <div className="md:mt-10 mt-5 flex flex-col md:flex-row gap-2">
                <Link
                  href={"/dashboard/colecao"}
                  className="bg-blue-500 text-blue-50 py-4 px-4 rounded-md hover:bg-blue-400 w-full md:max-w-50 flex justify-center items-center"
                >
                  Começar agora
                </Link>
                <Link
                  href={"/saiba-mais"}
                  className="py-4 px-4 rounded-md hover:bg-blue-200 w-full md:max-w-50 flex justify-center items-center border border-blue-500 text-blue-500"
                >
                  Saiba mais <ArrowRight />
                </Link>
              </div>
            </section>
            <section className="">
              <Image
                src={"/card-back.png"}
                alt="image"
                width={500}
                height={400}
                loading="eager"
                className="w-auto h-auto"
              />
            </section>
          </div>
        </div>
      </main>
      <section>
        <Features />
      </section>
    </>
  );
}
