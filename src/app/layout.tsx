import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SwRegister } from "@/components/sw-register";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ),
  title: {
    default: "Poke Coleção JP",
    template: "%s | Poke Coleção JP",
  },
  applicationName: "Poke Coleção JP",
  description:
    "Organize sua coleção de cartas Pokémon TCG, acompanhe os sets e descubra o valor das suas cartas.",
  icons: {
    icon: "/logo-poke.png",
    shortcut: "/logo-poke.png",
    apple: "/logo-poke.png",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Poke Coleção JP",
    title: "Poke Coleção JP",
    description:
      "Organize sua coleção de cartas Pokémon TCG, acompanhe os sets e descubra o valor das suas cartas.",
    url: "/",
    images: [
      {
        url: "/logo-poke.png",
        width: 316,
        height: 321,
        alt: "Logo Poke Coleção JP",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Poke Coleção JP",
    description:
      "Organize sua coleção de cartas Pokémon TCG, acompanhe os sets e descubra o valor das suas cartas.",
    images: [
      {
        url: "/logo-poke.png",
        alt: "Logo Poke Coleção JP",
      },
    ],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {children}
        <SwRegister />
      </body>
    </html>
  );
}
