import type { CSSProperties } from "react";

import { pseudoRandom } from "../../lib/pseudoRandom";

/** Status LED of the hero cabinet, blinking at its own pace unless `steady`. */
export default function RackLed({
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
  let style: CSSProperties | undefined;
  if (!steady) {
    style = {
      "--d": `${(0.6 + pseudoRandom(seed) * 2.8).toFixed(2)}s`,
      "--dl": `${(-pseudoRandom(seed + 7) * 3).toFixed(2)}s`,
    } as CSSProperties;
  }

  return (
    <circle
      cx={x}
      cy={y}
      r={r}
      fill={color}
      data-steady={steady || undefined}
      className="led led-glow"
      style={style}
    />
  );
}
