import { kode_mono } from "@/src/fonts";
import { useEffect, useState } from "react";
import { twJoin } from "tailwind-merge";

type DropAndMirrorProps = {
  initialDelay?: number;
  stepDelay?: number;
  children: React.ReactNode;
};
export default function DropAndMirror({
  initialDelay = 0,
  stepDelay = 3000,
  children,
}: DropAndMirrorProps) {
  const [isRotated, setIsRotated] = useState(true);
  const [beforeDrop, setBeforeDrop] = useState(true);

  useEffect(() => {
    // Drop component first
    const dropTimeout = setTimeout(() => {
      setBeforeDrop(false);
    }, initialDelay);

    // Then rotate component
    const rotateTimeout = setTimeout(() => {
      setIsRotated(false);
    }, initialDelay + stepDelay);

    return () => {
      clearTimeout(rotateTimeout);
      clearTimeout(dropTimeout);
    };
  }, [initialDelay, stepDelay]);
  
  return (
    <div
      className={twJoin(
        "flex justify-between gap-7 text-right duration-1000",
        kode_mono.className,
        "data-hover:-rotate-y-180",
        "data-before-drop:-scale-x-full data-before-drop:-translate-y-full",
      )}
      data-hover={isRotated || undefined}
      data-before-drop={beforeDrop || undefined}
    >
      <div className="grow flex flex-col blur-[0.1em] -scale-x-100">
        {children}
      </div>

      <div className="h-full w-0.5 bg-white blur-px"></div>

      <div className="grow flex flex-col">
        {children}
      </div>
    </div>
  );
}
