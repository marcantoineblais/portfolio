import type { CSSProperties } from "react";

/**
 * Detailed server cabinet for the hero: switch, patch panel, servers,
 * storage and a UPS, with status LEDs that blink at their own pace.
 * Pure SVG + CSS animations (see .led in globals.css).
 */

const W = 220;
const LINE = "rgba(255,255,255,0.14)";
const DETAIL = "rgba(255,255,255,0.28)";
const UNIT = "#1c1917";
const GREEN = "#34d399";
const AMBER = "#fbbf24";
const BLUE = "#38bdf8";

// Deterministic pseudo-random so server and client render the same thing
function rand(seed: number) {
  const x = Math.sin(seed * 999.13) * 10000;
  return x - Math.floor(x);
}

function Led({
  x,
  y,
  color,
  seed,
  r = 2,
  steady = false,
}: {
  x: number;
  y: number;
  color: string;
  seed: number;
  r?: number;
  steady?: boolean;
}) {
  const style = steady
    ? undefined
    : ({
        "--d": `${(0.6 + rand(seed) * 2.8).toFixed(2)}s`,
        "--dl": `${(-rand(seed + 7) * 3).toFixed(2)}s`,
      } as CSSProperties);
  return (
    <circle
      cx={x}
      cy={y}
      r={r}
      fill={color}
      className={steady ? "led-glow" : "led led-glow"}
      style={style}
    />
  );
}

// Vertical layout of the units (computed once)
const LAYOUT = (() => {
  const heights = {
    sw: 26,
    patch: 18,
    s1: 24,
    s2: 24,
    storage: 56,
    s3: 24,
    blank: 16,
    ups: 44,
  };
  let y = 40;
  const tops = {} as Record<keyof typeof heights, number>;
  for (const [key, h] of Object.entries(heights)) {
    tops[key as keyof typeof heights] = y;
    y += h + 6;
  }
  return { ...tops, H: y + 26 };
})();

function Server({ y, seed }: { y: number; seed: number }) {
  return (
    <g>
      <rect
        x="30"
        y={y}
        width="160"
        height="24"
        rx="3"
        fill={UNIT}
        stroke={LINE}
      />
      <Led x={42} y={y + 12} color={GREEN} seed={seed} steady />
      <Led
        x={51}
        y={y + 12}
        color={seed % 3 === 0 ? AMBER : GREEN}
        seed={seed + 1}
      />
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x={64 + i * 18}
          y={y + 6}
          width="14"
          height="12"
          rx="1.5"
          fill="none"
          stroke={DETAIL}
        />
      ))}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <line
          key={i}
          x1={142 + i * 7}
          x2={142 + i * 7}
          y1={y + 7}
          y2={y + 17}
          stroke={DETAIL}
          strokeWidth="2"
          strokeLinecap="round"
        />
      ))}
    </g>
  );
}

export default function RackIllustration({
  className,
}: {
  className?: string;
}) {
  const { sw, patch, s1, s2, storage, s3, blank, ups, H } = LAYOUT;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <linearGradient id="rack-shine" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.07" />
          <stop offset="0.5" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Cabinet */}
      <rect
        x="6"
        y="6"
        width={W - 12}
        height={H - 12}
        rx="14"
        fill="#0c0a09"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="2"
      />
      <rect
        x="6"
        y="6"
        width={W - 12}
        height={H - 12}
        rx="14"
        fill="url(#rack-shine)"
      />
      {/* Top vent + badge */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <line
          key={i}
          x1={70 + i * 10}
          x2={70 + i * 10}
          y1="16"
          y2="26"
          stroke={LINE}
          strokeWidth="3"
          strokeLinecap="round"
        />
      ))}
      {/* Rails with mounting holes */}
      {[20, W - 20].map((x) => (
        <g key={x}>
          <line
            x1={x}
            x2={x}
            y1="34"
            y2={H - 20}
            stroke={LINE}
            strokeWidth="2"
          />
          {Array.from({ length: Math.floor((H - 60) / 12) }).map((_, i) => (
            <rect
              key={i}
              x={x - 2}
              y={38 + i * 12}
              width="4"
              height="4"
              rx="1"
              fill="rgba(255,255,255,0.12)"
            />
          ))}
        </g>
      ))}

      {/* Switch: 2 rows of ports with link LEDs */}
      <rect
        x="30"
        y={sw}
        width="160"
        height="26"
        rx="3"
        fill={UNIT}
        stroke={LINE}
      />
      {Array.from({ length: 24 }).map((_, i) => {
        const col = i % 12;
        const row = Math.floor(i / 12);
        const px = 38 + col * 12;
        const py = sw + 5 + row * 9;
        return (
          <g key={i}>
            <rect
              x={px}
              y={py}
              width="8"
              height="6"
              rx="1"
              fill="#0a0a0a"
              stroke={DETAIL}
              strokeWidth="0.8"
            />
            {rand(i + 3) > 0.25 && (
              <Led
                x={px + 4}
                y={py - 1.6}
                r={1.1}
                color={rand(i) > 0.8 ? AMBER : GREEN}
                seed={i + 40}
              />
            )}
          </g>
        );
      })}

      {/* Patch panel */}
      <rect
        x="30"
        y={patch}
        width="160"
        height="18"
        rx="3"
        fill={UNIT}
        stroke={LINE}
      />
      {Array.from({ length: 16 }).map((_, i) => (
        <circle
          key={i}
          cx={40 + i * 9.4}
          cy={patch + 9}
          r="2.6"
          fill="#0a0a0a"
          stroke={DETAIL}
          strokeWidth="0.8"
        />
      ))}
      {/* A few patch cables */}
      <path
        d={`M${40 + 2 * 9.4} ${patch + 9} C ${60} ${patch + 30}, ${150} ${patch - 10}, ${40 + 13 * 9.4} ${patch + 9}`}
        stroke={BLUE}
        strokeOpacity="0.55"
        strokeWidth="2"
        fill="none"
      />
      <path
        d={`M${40 + 5 * 9.4} ${patch + 9} C ${90} ${patch + 24}, ${120} ${patch + 24}, ${40 + 9 * 9.4} ${patch + 9}`}
        stroke={GREEN}
        strokeOpacity="0.45"
        strokeWidth="2"
        fill="none"
      />

      <Server y={s1} seed={11} />
      <Server y={s2} seed={21} />

      {/* Storage: 2U with 6 drive bays */}
      <rect
        x="30"
        y={storage}
        width="160"
        height="56"
        rx="3"
        fill={UNIT}
        stroke={LINE}
      />
      {Array.from({ length: 6 }).map((_, i) => {
        const bx = 38 + i * 25;
        return (
          <g key={i}>
            <rect
              x={bx}
              y={storage + 7}
              width="20"
              height="42"
              rx="2"
              fill="#0f0e0d"
              stroke={DETAIL}
            />
            <line
              x1={bx + 5}
              x2={bx + 15}
              y1={storage + 40}
              y2={storage + 40}
              stroke={DETAIL}
              strokeWidth="2"
              strokeLinecap="round"
            />
            <Led
              x={bx + 10}
              y={storage + 14}
              color={i === 4 ? BLUE : GREEN}
              seed={60 + i}
              r={1.8}
            />
          </g>
        );
      })}

      <Server y={s3} seed={33} />

      {/* Blank panel */}
      <rect
        x="30"
        y={blank}
        width="160"
        height="16"
        rx="3"
        fill={UNIT}
        stroke={LINE}
        strokeDasharray="4 4"
      />

      {/* UPS with a tiny display */}
      <rect
        x="30"
        y={ups}
        width="160"
        height="44"
        rx="3"
        fill={UNIT}
        stroke={LINE}
      />
      <rect
        x="42"
        y={ups + 10}
        width="52"
        height="24"
        rx="3"
        fill="#052e1f"
        stroke="rgba(52,211,153,0.4)"
      />
      <text
        x="68"
        y={ups + 27}
        textAnchor="middle"
        fontSize="13"
        fontFamily="var(--font-kode-mono), monospace"
        fill={GREEN}
      >
        100%
      </text>
      <Led x={110} y={ups + 22} color={GREEN} seed={90} steady r={2.4} />
      <circle
        cx="128"
        cy={ups + 22}
        r="6"
        fill="none"
        stroke={DETAIL}
        strokeWidth="1.5"
      />
      <circle
        cx="146"
        cy={ups + 22}
        r="6"
        fill="none"
        stroke={DETAIL}
        strokeWidth="1.5"
      />
      {[0, 1, 2].map((i) => (
        <line
          key={i}
          x1={162 + i * 7}
          x2={162 + i * 7}
          y1={ups + 14}
          y2={ups + 30}
          stroke={DETAIL}
          strokeWidth="2"
          strokeLinecap="round"
        />
      ))}

      {/* Feet */}
      <rect
        x="22"
        y={H - 8}
        width="22"
        height="6"
        rx="2"
        fill="rgba(255,255,255,0.18)"
      />
      <rect
        x={W - 44}
        y={H - 8}
        width="22"
        height="6"
        rx="2"
        fill="rgba(255,255,255,0.18)"
      />
    </svg>
  );
}
