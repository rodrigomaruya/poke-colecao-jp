"use client";

import { login } from "@/actions-login/login";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CollectionSubmitButton } from "@/app/dashboard/components/collection-submit-button";
export function LoginPage() {
  const [error, setError] = useState("");
  const router = useRouter();
  async function handleLogin(formData: FormData) {
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));
    setError("");
    if (!email || !password) {
      return alert("Digite todos os campos");
    }
    const data = {
      email,
      password,
    };
    try {
      const result = await login(data);
      if (result.error) {
        setError(result.error);
      }
      if (result.success) {
        router.push("/dashboard/colecao");
      }
    } catch (error) {
      setError("Error ao logar");
    }
  }
  return (
    <form
      action={handleLogin}
      className="flex w-full max-w-md flex-col gap-4 rounded-md bg-linear-to-br from-blue-300 via-white to-blue-400 p-5 shadow-sm"
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Digite seu email"
          required
          autoComplete="email"
          className="rounded-md bg-amber-50 p-2 outline-none ring-amber-700 focus:ring-2"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="password">Senha</label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Digite sua senha"
          required
          autoComplete="current-password"
          className="rounded-md bg-amber-50 p-2 outline-none ring-amber-700 focus:ring-2"
        />
      </div>
      {error && <p className="text-red-600">{error}</p>}
      <CollectionSubmitButton
        type="submit"
        pendingText="Entrando..."
        className="rounded-md bg-blue-50 p-2 font-medium transition hover:bg-blue-100 disabled:cursor-wait disabled:opacity-70"
      >
        Entrar
      </CollectionSubmitButton>
    </form>
  );
}
