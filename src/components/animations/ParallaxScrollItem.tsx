import { ParallaxKey } from "@/src/hooks/useParallax";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export type ParallaxScrollItemProps = {
  key: ParallaxKey;
  opacity?: number;
  children: ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export default function ParallaxScrollItem({
  key,
  opacity = 1,
  children,
  className,
  ...props
}: ParallaxScrollItemProps) {
  return (
    <div
      key={key}
      style={{
        opacity: opacity,
        pointerEvents: opacity === 1 ? "auto" : "none",
      }}
      className={twMerge("fixed inset-0", className)}
      {...props}
    >
      {children}
    </div>
  );
}
