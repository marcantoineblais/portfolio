/** "Next section" arrow, same spirit as the original DownArrow. */
export default function NextCue({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <a
      href={href}
      className="group mx-auto flex flex-col items-center gap-1 pt-16 font-bold opacity-70 transition-opacity hover:opacity-100"
    >
      <span className="font-mono text-sm uppercase tracking-[0.2em]">
        {label}
      </span>
      <svg
        className="animate-cue h-6 w-10"
        viewBox="0 0 40 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <path d="M4 4l16 14L36 4" />
      </svg>
    </a>
  );
}
