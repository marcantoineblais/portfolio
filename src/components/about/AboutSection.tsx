"use client";

import React, { ReactNode } from "react";
import OpacityCascade from "../animations/OpacityCascade";

type AboutSectionProps = {
  title: string;
  children: ReactNode;
  initialDelay?: number;
  stepDelay?: number;
};

export default function AboutSection({
  title,
  children,
  initialDelay = 0,
  stepDelay = 100,
}: AboutSectionProps) {
  return (
    <div className="py-1 w-full flex flex-col justify-center items-center gap-3">
      <h3 className="w-full tracking-widest text-xl lg:text-3xl underline underline-offset-4">
        {title}
      </h3>

      <div className="py-1 flex justify-center items-center flex-wrap gap-3">
        <OpacityCascade initialDelay={initialDelay} stepDelay={stepDelay}>{children}</OpacityCascade>
      </div>
    </div>
  );
}
