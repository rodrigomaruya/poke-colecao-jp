"use server";

import argon2 from "argon2";

import { prisma } from "@/lib/prisma";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().optional(),
  email: z.email("Email inválido"),
  password: z.string().min(6, "A senha deve ter menos 6 caracteres."),
});

interface FormDataInterface {
  name?: string;
  email: string;
  password: string;
}

export async function register(formData: FormDataInterface) {
  const result = registerSchema.safeParse({
    name: formData.name,
    email: formData.email,
    password: formData.password,
  });
  if (!result.success) {
    return {
      error: result.error.issues[0].message,
    };
  }
  const name = result.data.name?.trim() || "";
  const email = result.data.email.trim().toLowerCase();
  const password = result.data.password;
  const userExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userExist) {
    return {
      error: "Este email já está cadastrado.",
    };
  }

  const passwordHash = await argon2.hash(password);

  try {
    await prisma.user.create({
      data: {
        name,
        email,
        password: passwordHash,
      },
    });
    return {
      success: "Usuário criado com sucesso!",
    };
  } catch (error) {
    return {
      error: "Não foi possível criar usuário.",
    };
  }
}
