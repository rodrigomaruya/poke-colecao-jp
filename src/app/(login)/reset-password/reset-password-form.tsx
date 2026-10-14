"use client";

import { resetPassword } from "@/actions-login/resetPassword";
import { useState } from "react";

interface ParamsProps {
  token: string;
}

export default function ResetPasswordForm(token: ParamsProps) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const tokenParams = token.token;
  async function handleSubmit(formData: FormData) {
    setLoading(true);
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
    try {
      const result = await resetPassword(
        tokenParams,
        password,
        passwordConfirmation,
      );
      if (result.error) {
        return setError(result.error);
      }
      if (result.success) {
        return setSuccess(result.success);
      }
    } catch (error) {
      setError("Error ao tentar cadastrar nova a senha");
    } finally {
      setLoading(false);
    }

    setError("");
  }

  return (
    <form
      action={handleSubmit}
      className="flex w-full max-w-md flex-col gap-4 rounded-md bg-linear-to-br from-blue-300 via-55 to-blue-400  p-5 shadow-sm"
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="password">Nova senha</label>
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
        <label htmlFor="passwordConfirmation">Confirmar nova senha</label>
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
        <p className="text-sm font-medium text-green-700">{success}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="rounded-md bg-blue-50 p-2 font-medium transition hover:bg-blue-100"
      >
        {loading ? "Carregando..." : "Redefinir senha"}
      </button>
    </form>
  );
}
