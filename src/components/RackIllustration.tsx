import {
  RACK_DETAIL as DETAIL,
  LED_AMBER,
  LED_BLUE,
  LED_GREEN,
  RACK_LINE as LINE,
  RACK_UNIT as UNIT,
  RACK_WIDTH as W,
} from "../data/rack";
import { pseudoRandom } from "../lib/pseudoRandom";
import { rackLayout } from "../lib/rackLayout";
import RackLed from "./rack/RackLed";
import RackServer from "./rack/RackServer";

const LAYOUT = rackLayout();

/**
 * Detailed server cabinet for the hero: switch, patch panel, servers,
 * storage and a UPS, with status LEDs that blink at their own pace.
 * Pure SVG + CSS animations (see .led in globals.css).
 */
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
            {pseudoRandom(i + 3) > 0.25 && (
              <RackLed
                x={px + 4}
                y={py - 1.6}
                r={1.1}
                color={pseudoRandom(i) > 0.8 ? LED_AMBER : LED_GREEN}
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
        stroke={LED_BLUE}
        strokeOpacity="0.55"
        strokeWidth="2"
        fill="none"
      />
      <path
        d={`M${40 + 5 * 9.4} ${patch + 9} C ${90} ${patch + 24}, ${120} ${patch + 24}, ${40 + 9 * 9.4} ${patch + 9}`}
        stroke={LED_GREEN}
        strokeOpacity="0.45"
        strokeWidth="2"
        fill="none"
      />

      <RackServer y={s1} seed={11} />
      <RackServer y={s2} seed={21} />

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
            <RackLed
              x={bx + 10}
              y={storage + 14}
              color={i === 4 ? LED_BLUE : LED_GREEN}
              seed={60 + i}
              r={1.8}
            />
          </g>
        );
      })}

      <RackServer y={s3} seed={33} />

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
        fill={LED_GREEN}
      >
        100%
      </text>
      <RackLed
        x={110}
        y={ups + 22}
        color={LED_GREEN}
        seed={90}
        steady
        r={2.4}
      />
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
