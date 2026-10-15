"use client";

import { login } from "@/actions-login/login";
import { useState } from "react";
import { useRouter } from "next/navigation";
export function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  async function handleLogin(formData: FormData) {
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));
    setLoading(true);
    setError("");
    if (!email || !password) {
      setLoading(false);
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
    } finally {
      setLoading(false);
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
      <button
        type="submit"
        disabled={loading}
        className={`rounded-md bg-blue-200 p-2 font-medium transition hover:bg-blue-50 ${loading ? "bg-blue-200" : "bg-blue-50"}`}
      >
        {loading && (
          <span className="size-4 animate-spin rounded-full border-2 border-blue-700 border-t-transparent" />
        )}
        {loading ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}
