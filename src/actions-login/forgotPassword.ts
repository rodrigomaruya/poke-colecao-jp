"use server";

import crypto from "crypto";
import { Resend } from "resend";

import { prisma } from "@/lib/prisma";

const resend = new Resend(process.env.RESEND_API_KEY);
export async function forgotPassword(email: string) {
  if (!email) {
    return {
      error: "Digite seu email.",
    };
  }

  const normalizedEmail = email.trim().toLowerCase();

  const user = await prisma.user.findUnique({
    where: {
      email: normalizedEmail,
    },
  });

  // Não revelamos se o email existe
  if (!user) {
    return {
      success:
        "Se esse email estiver cadastrado, você receberá um link para redefinir sua senha.",
    };
  }

  const token = crypto.randomBytes(32).toString("hex");

  const expiresAt = new Date();

  expiresAt.setMinutes(expiresAt.getMinutes() + 30);

  await prisma.passwordResetToken.deleteMany({
    where: {
      userId: user.id,
    },
  });

  await prisma.passwordResetToken.create({
    data: {
      token,
      userId: user.id,
      expiresAt,
    },
  });

  const resetUrl = `${process.env.APP_URL}/reset-password?token=${token}`;

  // Aqui vamos enviar o email
  try {
    const { data, error } = await resend.emails.send({
      from: "delivered@resend.dev",
      to: normalizedEmail,
      subject: "Redefinição de senha",
      html: ` <h1>Redefinir sua senha</h1> <p>Você solicitou a redefinição da sua senha.</p> <p> Clique no botão abaixo para criar uma nova senha: </p> <p> <a href="${resetUrl}" style=" display: inline-block; padding: 12px 20px; background: #000; color: #fff; text-decoration: none; border-radius: 6px; " > Redefinir minha senha </a> </p> <p>Esse link é válido por 30 minutos.</p> <p> Se você não solicitou essa alteração, ignore este email. </p> `,
    });
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    // Se o email não foi enviado, remove o token criado.
    await prisma.passwordResetToken.delete({
      where: { token },
    });
    return { error: "Não foi possível enviar o email. Tente novamente." };
  }
  return {
    success:
      "Se esse email estiver cadastrado, você receberá um link para redefinir sua senha.",
  };
}
