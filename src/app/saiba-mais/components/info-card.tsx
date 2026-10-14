type InfoCardProps = {
  title: string;
  icon: string;
  iconClass: string;
  children: React.ReactNode;
  highlighted?: boolean;
};

export function InfoCard({
  title,
  icon,
  iconClass,
  children,
  highlighted = false,
}: InfoCardProps) {
  return (
    <article
      className={`rounded-2xl border p-6 transition-shadow hover:shadow-md ${
        highlighted
          ? "border-blue-100 bg-blue-50/70"
          : "border-slate-200 bg-white"
      }`}
    >
      <div
        className={`mb-5 flex h-11 w-11 items-center justify-center rounded-xl text-xl text-white ${iconClass}`}
      >
        {icon}
      </div>

      <h2 className="text-xl font-bold tracking-tight text-slate-900">
        {title}
      </h2>

      <div className="mt-3 text-sm leading-7 text-slate-600">{children}</div>
    </article>
  );
}
