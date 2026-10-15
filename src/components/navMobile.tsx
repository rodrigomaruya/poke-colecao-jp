"use client";

import Link from "next/link";
import { Hamburger, LogOutIcon, Menu, UserCircle, X } from "lucide-react";
import { useState } from "react";
import { logout } from "@/actions-login/logout";

const links = [
  { href: "/", label: "Início" },
  { href: "/explorar", label: "Explorar" },
  { href: "/dashboard/colecao", label: "Minha coleção" },
  { href: "/wishlist", label: "Wishlist" },
  { href: "/instalar", label: "Instalar app" },
];

export function NavMobile({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [open, setOpen] = useState(false);

  async function handleLogout() {
    await logout();
  }
  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className=" rounded-lg p-2 text-slate-700 transition-colors hover:bg-slate-100"
      >
        {" "}
        {open ? <X size={24} /> : <Menu size={24} />}{" "}
      </button>

      {open && (
        <div className="absolute left-0 right-0 z-9999 top-full border-t bg-white px-4 py-4 shadow-lg">
          <nav className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-blue-600"
              >
                {link.label}
              </Link>
            ))}

            {isLoggedIn ? (
              <div className="flex  gap-2">
                <Link href={"/dashboard/colecao"}>
                  <UserCircle className="text-blue-500" size={30} />
                </Link>
                <button onClick={() => handleLogout()}>
                  <LogOutIcon className="text-slate-500" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-lg bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-blue-700"
              >
                Entrar
              </Link>
            )}
          </nav>
        </div>
      )}
    </div>
  );
}
