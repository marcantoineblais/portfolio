import { kode_mono } from "@/src/fonts";
import { useEffect, useState } from "react";
import { twJoin } from "tailwind-merge";

type DropAndMirrorProps = {
  initialDelay?: number;
  transitionDuration?: number;
  stepDelay?: number;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;
export default function DropAndMirror({
  initialDelay = 0,
  transitionDuration = 1000,
  stepDelay = 1000,
  children,
  ...props
}: DropAndMirrorProps) {
  const [isRotated, setIsRotated] = useState(true);
  const [beforeDrop, setBeforeDrop] = useState(true);
  const [animationOver, setAnimationOver] = useState(false);

  useEffect(() => {
    // Drop component first
    const dropTimeout = setTimeout(() => {
      setBeforeDrop(false);
    }, initialDelay);

    // Then rotate component
    const rotateTimeout = setTimeout(() => {
      setIsRotated(false);
      setAnimationOver(true);
    }, initialDelay + stepDelay);

    return () => {
      clearTimeout(rotateTimeout);
      clearTimeout(dropTimeout);
    };
  }, [initialDelay, stepDelay]);

  function handleMouseEnter() {
    if (!animationOver) return;
    setIsRotated(true);
  }

  function handleMouseLeave() {
    if (!animationOver) return;
    setIsRotated(false);
  }

  return (
    <div
      className={twJoin(
        "h-full flex justify-between gap-12 text-right",
        kode_mono.className,
        "data-rotated:-rotate-y-180",
        "data-before-drop:-translate-y-full"
      )}
      style={{
        transitionDuration: `${transitionDuration}ms`,
      }}
      data-rotated={isRotated || undefined}
      data-before-drop={beforeDrop || undefined}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <div className="flex flex-col blur-[0.1em] -scale-x-100">{children}</div>

      <div className="h-full w-0.5 bg-white blur-[px]"></div>

      <div className="flex flex-col">{children}</div>
    </div>
  );
}
