"use client";

import { logout } from "@/actions-login/logout";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  Heart,
  Home,
  Library,
  LogOut,
  Menu,
  Search,
  Settings,
  X,
} from "lucide-react";

const menuItems = [
  { label: "Início", href: "/", icon: Home },
  { label: "Minha coleção", href: "/dashboard/colecao", icon: Library },
  { label: "Wishlist", href: "/dashboard/wishlist", icon: Heart },
  { label: "Explorar", href: "/dashboard/explorar", icon: Search },
];

export function MobileSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await logout();
    setIsOpen(false);
    router.push("/");
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white lg:hidden">
      <div className="relative flex h-14 items-center justify-between px-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2"
          onClick={() => setIsOpen(false)}
        >
          <span className="relative h-8 w-8 shrink-0">
            <Image
              src="/logo-poke.png"
              alt="Poke Coleção JP"
              fill
              className="object-contain"
              sizes="32px"
            />
          </span>
          <span className="text-base font-bold tracking-tight text-slate-900">
            Poke<span className="text-blue-600">Coleção</span>
            <span className="text-sm font-medium text-slate-500">JP</span>
          </span>
        </Link>

        <button
          type="button"
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isOpen}
          aria-controls="dashboard-mobile-menu"
          onClick={() => setIsOpen((open) => !open)}
          className="rounded-lg p-2 text-slate-700 transition hover:bg-slate-100"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {isOpen && (
          <nav
            id="dashboard-mobile-menu"
            aria-label="Navegação do dashboard"
            className="absolute left-0 right-0 top-full border-t border-slate-200 bg-white p-3 shadow-lg"
          >
            <div className="space-y-1">
              {menuItems.map(({ label, href, icon: Icon }) => {
                const active =
                  pathname === href || pathname.startsWith(`${href}/`);

                return (
                  <Link
                    key={href}
                    href={href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${
                      active
                        ? "bg-blue-50 text-blue-600"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <Icon size={18} strokeWidth={2} />
                    <span>{label}</span>
                  </Link>
                );
              })}

              <div className="my-2 border-t border-slate-100" />

              {/* <Link
                href="/configuracoes"
                aria-current={
                  pathname.startsWith("/configuracoes") ? "page" : undefined
                }
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${
                  pathname.startsWith("/configuracoes")
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Settings size={18} />
                <span>Configurações</span>
              </Link> */}

              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
              >
                <LogOut size={18} />
                <span>Sair</span>
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
