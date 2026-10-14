import { CircleDollarSign, NotepadText } from "lucide-react";
import Link from "next/link";
import RegisterForm from "./register-form";
import { AuthHeader } from "@/components/auth-header";

export default function Register() {
  return (
    <main className="">
      <div className="container mx-auto flex justify-center items-center flex-col min-h-screen p-4">
        <AuthHeader />
        <RegisterForm />
        <Link href={"/login"} className="p-2 text-blue-300 hover:text-blue-500">
          Já possui uma conta? Entrar
        </Link>
      </div>
    </main>
  );
}
