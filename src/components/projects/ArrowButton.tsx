/** Round previous/next button of the phone gallery. */
export default function ArrowButton({
  label,
  path,
  disabled,
  onClick,
}: {
  label: string;
  /** SVG path of the chevron */
  path: string;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      disabled={disabled}
      className="flex size-11 cursor-pointer items-center justify-center rounded-full border-2 border-current transition-all hover:bg-gray-900 hover:text-white disabled:cursor-default disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-current"
    >
      <svg
        viewBox="0 0 24 24"
        className="size-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d={path} />
      </svg>
    </button>
  );
}
