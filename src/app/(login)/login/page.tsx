import { CircleDollarSign, NotepadText } from "lucide-react";
import Link from "next/link";
import { LoginPage } from "./loginPage";
import { AuthHeader } from "@/components/auth-header";

export default function Login() {
  return (
    <main className="">
      <div className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
        <AuthHeader />

        <LoginPage />

        <div className="mt-2 flex flex-col items-center gap-1">
          <Link
            href="/register"
            className="p-2 text-blue-300 hover:text-blue-500"
          >
            Não possui uma conta? Cadastre-se
          </Link>
          <Link
            href="/forgot-password"
            className="p-2 text-blue-300 hover:text-blue-500"
          >
            Esqueci minha senha
          </Link>
        </div>
      </div>
    </main>
  );
}
