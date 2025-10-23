"use client";

import React, { ReactNode } from "react";

export default function ProjectDescription({
  children,
}: {
  children: ReactNode;
}) {

  return (
    <div
      className="p-0.5 h-full flex flex-col justify-between items-center gap-3 text-sm md:text-base">
      {children}
    </div>
  );
}
