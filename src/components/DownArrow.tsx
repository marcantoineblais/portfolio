"use client";

import React from "react";

export default function DownArrow({
  action,
  text,
  disabled,
}: {
  action: () => void;
  text: string;
  disabled: boolean;
}) {
  const [classList, setClassList] = React.useState<string>(
    "-translate-y-full opacity-0",
  );
  const arrowRef = React.useRef<SVGSVGElement | null>(null);

  React.useEffect(() => {
    if (disabled) setClassList("-translate-y-full opacity-0");
    else setClassList("cursor-pointer hover:opacity-75");
  }, [disabled]);

  return (
    <div
      onClick={disabled ? undefined : () => action()}
      className={`py-5 flex flex-col items-center duration-500 ${classList}`}
    >
      <svg
        className="h-10"
        ref={arrowRef}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 100 500 300"
      >
        <rect
          fill="currentColor"
          x="221.85"
          y="230.65"
          width="252"
          height="39.88"
          rx="4.17"
          transform="translate(774.26 294.99) rotate(150.17)"
        />
        <rect
          fill="currentColor"
          x="25.86"
          y="230.06"
          width="252"
          height="39.88"
          rx="4.17"
          transform="translate(146.24 -42.46) rotate(30.17)"
        />
      </svg>
      <h3 className="text-center font-bold">{text}</h3>
    </div>
  );
}
