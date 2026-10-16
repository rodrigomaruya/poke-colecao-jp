import { LogOutIcon, UserCircle } from "lucide-react";
import Link from "next/link";
import { logout } from "@/actions-login/logout";
import { CollectionSubmitButton } from "@/app/dashboard/components/collection-submit-button";

const links = [
  { href: "/", label: "Início" },
  { href: "/dashboard/explorar", label: "Explorar" },
  { href: "/dashboard/colecao", label: "Minha coleção" },
  { href: "/dashboard/wishlist", label: "Wishlist" },
  { href: "/instalar", label: "Instalar app" },
];

export function NavDesktop({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <nav className="hidden items-center gap-6 md:flex">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-600"
        >
          {link.label}{" "}
        </Link>
      ))}

      <div className="flex gap-2">
        {isLoggedIn ? (
          <div className="flex gap-2">
            <Link href={"/dashboard/colecao"}>
              <UserCircle className="text-blue-500" size={30} />
            </Link>
            <form
              action={async () => {
                await logout();
              }}
            >
              <CollectionSubmitButton
                type="submit"
                aria-label="Sair"
                title="Sair"
                className="inline-flex size-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 disabled:cursor-wait disabled:opacity-60"
              >
                <LogOutIcon className="text-slate-500" />
              </CollectionSubmitButton>
            </form>
          </div>
        ) : (
          <>
            <Link
              href="/login"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Entrar
            </Link>
            <Link
              href="/register"
              className="rounded-lg border border-blue-500 px-4 py-2 text-sm font-semibold text-blue-500 transition-colors hover:bg-blue-100"
            >
              Cadastrar
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
