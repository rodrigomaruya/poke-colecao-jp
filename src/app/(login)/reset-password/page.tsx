import { CircleDollarSign, NotepadText } from "lucide-react";
import Link from "next/link";

import ResetPasswordForm from "./reset-password-form";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const params = await searchParams;
  const token = params.token;
  if (!token) {
    return <p>Link invalido</p>;
  }
  return (
    <main>
      <div className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
        <div className="flex items-center justify-center gap-2 p-4">
          <CircleDollarSign color="green" size={32} />
          <h1 className="text-xl lg:text-3xl">
            Controle de gasto - Nova senha
          </h1>
          <NotepadText color="#5f59c0" size={32} />
        </div>

        <ResetPasswordForm token={token} />

        <Link href="/" className="p-2 text-blue-300 hover:text-blue-500">
          Voltar para o login
        </Link>
      </div>
    </main>
  );
}
