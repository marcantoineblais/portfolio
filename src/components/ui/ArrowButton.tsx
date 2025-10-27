"use client";

import React, { ReactNode } from "react";
import { twJoin, twMerge } from "tailwind-merge";

type ArrowButtonProps = {
  orientation?: "left" | "right" | "up" | "down";
  children?: ReactNode;
} & React.ComponentProps<"button">;

export default function ArrowButton({
  orientation = "down",
  className,
  children,
  ...props
}: ArrowButtonProps) {
  return (
    <button
      className={twMerge(
        "py-5 flex flex-col items-center cursor-pointer duration-200 hover:opacity-50",
        "disabled:cursor-default disabled:opacity-50",        
        className
      )}
      {...props}
    >
      <svg
        className={twJoin(
          "h-full w-full",
          "data-[orientation='left']:rotate-90",
          "data-[orientation='right']:rotate-270",
          "data-[orientation='up']:rotate-180",
          "data-[orientation='down']:rotate-0"
        )}
        data-orientation={orientation}
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
      {children}
    </button>
  );
}
