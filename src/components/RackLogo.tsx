// The server-rack mark: a cabinet holding three 1U servers.
// Lines use currentColor; the status LEDs keep their own colours.
// Drawn on a 48×48 grid so it stays crisp from favicon size up.

export const RACK_UNITS = [9.5, 20, 30.5];

export default function RackLogo({
  className,
  leds = true,
}: {
  className?: string;
  /** Coloured status LEDs (turn off for single-colour uses) */
  leds?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
    >
      {/* Cabinet */}
      <rect x="4" y="3.5" width="40" height="41" rx="6" strokeWidth="3" />
      {/* Feet */}
      <path d="M12 44.5v1.5M36 44.5v1.5" strokeWidth="3" />

      {RACK_UNITS.map((y, i) => {
        // The middle server's LED is amber, the others green
        let ledColor = "currentColor";
        if (leds && i === 1) ledColor = "#fbbf24";
        else if (leds) ledColor = "#34d399";

        return (
          <g key={y}>
            <rect x="10" y={y} width="28" height="8" rx="2" strokeWidth="2.2" />
            {/* Vents */}
            <path
              d={`M27 ${y + 2.6}v2.8M30.5 ${y + 2.6}v2.8M34 ${y + 2.6}v2.8`}
              strokeWidth="1.8"
            />
            {/* Status LEDs */}
            <circle cx="15" cy={y + 4} r="1.7" stroke="none" fill={ledColor} />
            <circle
              cx="20"
              cy={y + 4}
              r="1.7"
              stroke="none"
              fill="currentColor"
              opacity="0.45"
            />
          </g>
        );
      })}
    </svg>
  );
}
