import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Poke Coleção JP",
    short_name: "Poke Coleção",
    description: "Organize sua coleção de cartas Pokémon.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#111827",
    icons: [
      {
        src: "/logo-poke-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/logo-poke-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
