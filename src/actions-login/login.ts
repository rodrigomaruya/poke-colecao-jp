"use server";

import argon2 from "argon2";
import crypto from "crypto";
import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";

interface LoginData {
  email: string;
  password: string;
}

export async function login(data: LoginData) {
  if (!data?.email || !data?.password) {
    return {
      error: "Email e senha são obrigatórios.",
    };
  }

  const email = data.email.trim().toLowerCase();

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return {
      error: "Email ou senha incorretos.",
    };
  }

  const passwordCorrect = await argon2.verify(user.password, data.password);

  if (!passwordCorrect) {
    return {
      error: "Email ou senha incorretos.",
    };
  }

  const token = crypto.randomBytes(32).toString("hex");

  const expiresAt = new Date();

  expiresAt.setDate(expiresAt.getDate() + 7);

  await prisma.session.create({
    data: {
      token,
      userId: user.id,
      expiresAt,
    },
  });

  const cookieStore = await cookies();

  cookieStore.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  });

  return {
    success: "Login realizado com sucesso!",
  };
}
