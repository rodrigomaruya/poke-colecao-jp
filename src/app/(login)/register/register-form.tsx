"use client";

import { register } from "@/actions-login/register";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setError("");
    setSuccess("");
    setLoading(true);
    const name = String(formData.get("name"));
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));
    const passwordConfirmation = String(formData.get("passwordConfirmation"));

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      setLoading(false);
      return;
    }

    if (password !== passwordConfirmation) {
      setError("As senhas precisam ser iguais.");
      setLoading(false);
      return;
    }

    const data = {
      name: name,
      email: email,
      password: password,
    };

    try {
      const result = await register(data);

      if (result.error) {
        setError(result.error);
      }
      if (result.success) {
        setSuccess(result.success);
        router.push("/login");
      }
    } catch (error) {
      setSuccess("Ops! Ocorreu um erro ao criar a conta.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      action={handleSubmit}
      className="flex w-full max-w-md flex-col gap-4 rounded-md bg-linear-to-br from-blue-300 via-white to-blue-400  p-5 shadow-sm"
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="name">Nome</label>
        <input
          id="name"
          type="text"
          name="name"
          placeholder="Digite seu nome"
          required
          autoComplete="name"
          className="rounded-md bg-amber-50 p-2 outline-none ring-amber-700 focus:ring-2"
        />
      </div>

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
          placeholder="Mínimo de 6 caracteres"
          required
          minLength={6}
          autoComplete="new-password"
          className="rounded-md bg-amber-50 p-2 outline-none ring-amber-700 focus:ring-2"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="passwordConfirmation">Confirmar senha</label>
        <input
          id="passwordConfirmation"
          type="password"
          name="passwordConfirmation"
          placeholder="Digite a senha novamente"
          required
          minLength={6}
          autoComplete="new-password"
          className="rounded-md bg-amber-50 p-2 outline-none ring-amber-700 focus:ring-2"
        />
      </div>

      {error && <p className="text-sm font-medium text-red-800">{error}</p>}
      {success && (
        <p className="text-sm font-medium text-green-800">{success}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className={`rounded-md  p-2 font-medium transition hover:bg-blue-100 ${loading ? "bg-blue-200" : "bg-blue-50"}`}
      >
        {loading && (
          <span className="size-4 animate-spin rounded-full border-2 border-blue-700 border-t-transparent" />
        )}
        {loading ? "Entrando..." : "Criar conta"}
      </button>
    </form>
  );
}
