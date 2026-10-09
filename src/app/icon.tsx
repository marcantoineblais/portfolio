import { ImageResponse } from "next/og";

// Image metadata
export const size = {
  width: 320,
  height: 320,
};
export const contentType = "image/png";

const UNITS = [9.5, 20, 30.5];

// Favicon: the server-rack mark on a dark rounded tile
export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        borderRadius: 72,
        background: "#0c0a09",
      }}
    >
      <svg
        width="240"
        height="240"
        viewBox="0 0 48 48"
        fill="none"
        stroke="#e7e5e4"
        strokeLinecap="round"
      >
        <rect x="4" y="3.5" width="40" height="41" rx="6" strokeWidth="3" />
        {UNITS.map((y, i) => (
          <g key={y}>
            <rect x="10" y={y} width="28" height="8" rx="2" strokeWidth="2.2" />
            <path
              d={`M27 ${y + 2.6}v2.8M30.5 ${y + 2.6}v2.8M34 ${y + 2.6}v2.8`}
              strokeWidth="1.8"
            />
            <circle
              cx="15"
              cy={y + 4}
              r="1.9"
              stroke="none"
              fill={i === 1 ? "#fbbf24" : "#34d399"}
            />
          </g>
        ))}
      </svg>
    </div>,
    { ...size },
  );
}
