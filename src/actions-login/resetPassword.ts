"use server";

import argon2 from "argon2";

import { prisma } from "@/lib/prisma";

export async function resetPassword(
  token: string,
  password: string,
  confirmPassword: string,
) {
  // 1. Verifica os dados recebidos
  if (!token) {
    return {
      error: "Token inválido.",
    };
  }

  if (!password || !confirmPassword) {
    return {
      error: "Preencha todos os campos.",
    };
  }

  if (password.length < 6) {
    return {
      error: "A senha deve ter pelo menos 6 caracteres.",
    };
  }

  if (password !== confirmPassword) {
    return {
      error: "As senhas não são iguais.",
    };
  }

  // 2. Procura o token no banco
  const resetToken = await prisma.passwordResetToken.findUnique({
    where: {
      token,
    },
  });

  if (!resetToken) {
    return {
      error: "Token inválido ou expirado.",
    };
  }

  // 3. Verifica se o token expirou
  if (resetToken.expiresAt < new Date()) {
    // Remove o token expirado
    await prisma.passwordResetToken.delete({
      where: {
        id: resetToken.id,
      },
    });

    return {
      error: "Token inválido ou expirado.",
    };
  }

  // 4. Cria o hash da nova senha
  const hashedPassword = await argon2.hash(password);

  // 5. Atualiza a senha
  await prisma.user.update({
    where: {
      id: resetToken.userId,
    },
    data: {
      password: hashedPassword,
    },
  });

  // 6. Remove o token para ele não poder ser usado novamente
  await prisma.passwordResetToken.delete({
    where: {
      id: resetToken.id,
    },
  });

  // 7. Invalida todas as sessões antigas
  await prisma.session.deleteMany({
    where: {
      userId: resetToken.userId,
    },
  });

  return {
    success: "Senha alterada com sucesso!",
  };
}
