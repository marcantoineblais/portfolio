/**
 * "Next section" arrow, same spirit as the original DownArrow. `section`
 * marks a link to one of the page's sections (its href is the section path).
 */
export default function NextCue({
  href,
  section,
  label,
}: {
  href: string;
  section?: string;
  label: string;
}) {
  return (
    <a
      href={href}
      data-section={section}
      className="group mx-auto flex flex-col items-center gap-1 pt-16 font-bold opacity-70 transition-opacity hover:opacity-100"
    >
      <span className="font-mono text-sm tracking-[0.2em] uppercase">
        {label}
      </span>
      <svg
        className="h-6 w-10 animate-cue"
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
