import {
  LED_AMBER,
  LED_GREEN,
  RACK_DETAIL,
  RACK_LINE,
  RACK_UNIT,
} from "../../data/rack";
import RackLed from "./RackLed";

/** A 1U server of the hero cabinet: two LEDs, drive bays and vents. */
export default function RackServer({ y, seed }: { y: number; seed: number }) {
  let secondLed = LED_GREEN;
  if (seed % 3 === 0) secondLed = LED_AMBER;

  return (
    <g>
      <rect
        x="30"
        y={y}
        width="160"
        height="24"
        rx="3"
        fill={RACK_UNIT}
        stroke={RACK_LINE}
      />
      <RackLed x={42} y={y + 12} color={LED_GREEN} seed={seed} steady />
      <RackLed x={51} y={y + 12} color={secondLed} seed={seed + 1} />
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x={64 + i * 18}
          y={y + 6}
          width="14"
          height="12"
          rx="1.5"
          fill="none"
          stroke={RACK_DETAIL}
        />
      ))}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <line
          key={i}
          x1={142 + i * 7}
          x2={142 + i * 7}
          y1={y + 7}
          y2={y + 17}
          stroke={RACK_DETAIL}
          strokeWidth="2"
          strokeLinecap="round"
        />
      ))}
    </g>
  );
}
