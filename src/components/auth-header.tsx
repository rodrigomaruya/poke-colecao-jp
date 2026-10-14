import Image from "next/image";
import Link from "next/link";

import logo from "../../public/logo-poke.png";

type AuthHeaderProps = {
  title?: string;
  description?: string;
};

export function AuthHeader({ title, description }: AuthHeaderProps) {
  return (
    <div className="mb-2 text-center flex">
      {" "}
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-2 transition-opacity hover:opacity-80"
      >
        {" "}
        <div className="relative h-9 w-9">
          {" "}
          <Image
            src={logo}
            alt="Poke Coleção JP"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />{" "}
        </div>
        <span className="text-xl font-bold tracking-tight text-slate-900">
          Poke <span className="text-blue-600">Coleção</span>{" "}
          <span className="text-sm font-medium text-slate-500">JP</span>
        </span>
      </Link>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900">
        {title}
      </h1>
      {description && (
        <p className="mt-2 text-sm text-slate-500">{description}</p>
      )}
    </div>
  );
}
