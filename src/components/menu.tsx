"use client";
import Image from "next/image";
import logo from "../../public/logo-poke.png";
import Link from "next/link";
import { NavDesktop } from "./navDesktop";
import { NavMobile } from "./navMobile";

export function Menu({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <header className="bg-blue-50 p-3 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between relative">
        <Link
          href="/"
          className="flex items-center gap-1 transition-opacity hover:opacity-80"
        >
          <div className="relative h-7 w-7 md:h-9 md:w-9 shrink-0">
            <Image
              src={logo}
              alt="Poke Coleção JP"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          <h1 className="text-[18px] md:text-xl font-bold tracking-tight text-slate-900">
            Poke <span className="text-blue-600">Coleção</span>{" "}
            <span className="text-sm font-medium text-slate-500">JP</span>
          </h1>
        </Link>
        <NavDesktop isLoggedIn={isLoggedIn} />
        <NavMobile isLoggedIn={isLoggedIn} />
      </div>
    </header>
  );
}
