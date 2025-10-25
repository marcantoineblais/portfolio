import React, { ReactElement, useEffect } from "react";
import ParallaxScrollItem, {
  ParallaxScrollItemProps,
} from "./ParallaxScrollItem";
import useParallax from "@/src/hooks/useParallax";
import { useParallaxController } from "@/src/hooks/useParallaxController";

type ParallaxScrollProps = {
  transitionRatio?: number;
  snapTimeout?: number;
  children: ReactElement<ParallaxScrollItemProps>[];
} & React.HTMLAttributes<HTMLDivElement>;

export default function ParallaxScroll({
  transitionRatio = 2,
  snapTimeout = 500,
  children,
}: ParallaxScrollProps) {
  const { scrollHeight, elements } = useParallax();
  useParallaxController({
    sections: children,
    snapTimeout,
    transitionRatio,
  });

  // Validate children
  useEffect(() => {
    if (children.some((child) => !(child.type === ParallaxScrollItem))) {
      throw new Error(
        "Children of ParallaxScroll must be ParallaxScrollItem components"
      );
    }

    if (new Set(children.map((child) => child.key)).size !== children.length) {
      throw new Error("Children of ParallaxScroll must have unique keys");
    }
  }, [children]);

  return (
    <div className="w-full h-full">
      <div className="w-full" style={{ height: `${scrollHeight}px` }}></div>

      {elements}
    </div>
  );
}
