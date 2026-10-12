export default function SectionHeader({
  index,
  label,
  title,
  intro,
}: {
  index: string;
  label: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="flex flex-col gap-3 border-inherit">
      <p
        data-reveal="left"
        className="flex items-center gap-3 font-mono text-sm font-bold tracking-[0.2em] uppercase opacity-70 sm:text-base"
      >
        <span>{index}</span>
        <span className="h-px w-8 bg-current" />
        <span>{label}</span>
      </p>
      <h2
        data-reveal
        style={{ "--delay": "100ms" } as React.CSSProperties}
        className="font-display text-4xl/tight sm:text-5xl lg:text-6xl"
      >
        {title}
      </h2>
      {intro && (
        <p
          data-reveal
          style={{ "--delay": "200ms" } as React.CSSProperties}
          className="max-w-2xl text-base opacity-80 sm:text-lg"
        >
          {intro}
        </p>
      )}
    </div>
  );
}
