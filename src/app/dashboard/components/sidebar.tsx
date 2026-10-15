"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Library,
  Heart,
  Search,
  Settings,
  LogOut,
  CircleDollarSign,
  Smartphone,
} from "lucide-react";
import Image from "next/image";
import { logout } from "@/actions-login/logout";
import { useRouter } from "next/navigation";

const menuItems = [
  {
    label: "Início",
    href: "/",
    icon: Home,
  },
  {
    label: "Minha coleção",
    href: "/dashboard/colecao",
    icon: Library,
  },
  {
    label: "Wishlist",
    href: "/dashboard/wishlist",
    icon: Heart,
  },
  {
    label: "Explorar",
    href: "/dashboard/explorar",
    icon: Search,
  },
  {
    label: "Instalar app",
    href: "/instalar",
    icon: Smartphone,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.push("/");
  }

  return (
    <aside className="sticky top-0 hidden h-screen w-60 shrink-0 border-r border-slate-200 bg-white lg:block">
      <div className="flex h-full flex-col px-3 py-5">
        {/* Logo */}
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1 transition-opacity hover:opacity-80 "
        >
          {" "}
          <div className="relative w-7 h-7">
            {" "}
            <Image
              src={"/logo-poke.png"}
              alt="Poke Coleção JP"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />{" "}
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900">
            Poke<span className="text-blue-600">Coleção</span>
            <span className="text-sm font-medium text-slate-500">JP</span>
          </span>
        </Link>

        {/* Menu principal */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;

            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  active
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon size={17} strokeWidth={2} />

                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="my-5 border-t border-slate-100" />

        {/* Configurações */}
        {/* <Link
          href="/configuracoes"
          className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
            pathname.startsWith("/configuracoes")
              ? "bg-blue-50 text-blue-600"
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          }`}
        >
          <Settings size={17} />

          <span>Configurações</span>
        </Link> */}

        {/* Sair */}
        <div className="mt-auto">
          <button
            type="button"
            onClick={() => handleLogout()}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
          >
            <LogOut size={17} />

            <span>Sair</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
