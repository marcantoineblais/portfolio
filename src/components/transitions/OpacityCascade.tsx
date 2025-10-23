import { ReactNode, useEffect, useMemo, useState } from "react";
import { twJoin } from "tailwind-merge";

type useOpacityCascadeProps = {
  initialDelay?: number;
  transistionDuration?: number;
  stepDelay?: number;
  children?: ReactNode | ReactNode[];
};

export default function OpacityCascade({
  initialDelay = 0,
  transistionDuration = 1000,
  stepDelay = 100,
  children,
}: useOpacityCascadeProps) {
  const [beforeFadeIn, setBeforeFadeIn] = useState(true);

  const nodes = useMemo(() => {
    if (!Array.isArray(children)) return [children];
    return children;
  }, [children]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setBeforeFadeIn(false);
    }, initialDelay);

    return () => {
      clearTimeout(timeout);
    };
  }, [initialDelay]);

  return (
    <>
      {nodes.map((child, index) => (
        <span
          key={index}
          style={{
            transitionDelay: `${initialDelay + index * stepDelay}ms`,
            transitionDuration: `${transistionDuration}ms`,
          }}
          className={twJoin("whitespace-pre", "data-before-fade-in:opacity-0")}
          data-before-fade-in={beforeFadeIn || undefined}
        >
          {child === " " ? "\u00A0" : child}
        </span>
      ))}
    </>
  );
}
