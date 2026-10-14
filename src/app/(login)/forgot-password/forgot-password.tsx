"use client";

import { forgotPassword } from "@/actions-login/forgotPassword";
import { useState } from "react";

export function ForgotPassword() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setError("");
    setMessage("");
    setLoading(true);

    const email = String(formData.get("email") ?? "");

    try {
      const result = await forgotPassword(email);

      if (result.error) {
        setError(result.error);
      }

      if (result.success) {
        setMessage(result.success);
      }
    } catch {
      setError("Ocorreu um erro. Tente novamente.");
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
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Digite seu email"
          name="email"
          required
          autoComplete="email"
          className="rounded-md bg-amber-50 p-2 outline-none ring-amber-700 focus:ring-2"
        />
      </div>

      {error && <p className="text-sm font-medium text-red-800">{error}</p>}
      {message && (
        <p className="text-sm font-medium text-green-800">{message}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className={`rounded-md p-2 font-medium transition hover:bg-blue-100 ${loading ? "bg-blue-200" : "bg-blue-50"}`}
      >
        {loading ? "Enviando..." : "Enviar link"}
      </button>
    </form>
  );
}
