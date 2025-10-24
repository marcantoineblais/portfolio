import { usePathname, useRouter } from "@/src/i18n/navigation";
import { routing } from "@/src/i18n/routing";
import {
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type ParallaxScrollProps = {
  transitionHeight?: number;
  children: ReactElement[];
} & React.HTMLAttributes<HTMLDivElement>;

export default function ParallaxScroll({
  transitionHeight = 100,
  children,
}: ParallaxScrollProps) {
  const [scrollPercentage, setScrollPercescrollPercentage] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollableHeightPercent = useMemo(
    // 100% per section + transitionHeight before each section
    () => children.length * transitionHeight,
    [children.length, transitionHeight]
  );

  const getOpacity = useCallback(
    (index: number) => {
      const center = index * transitionHeight;
      const offset = Math.abs(center - scrollPercentage);
      const ratio = Math.min(transitionHeight, offset) / transitionHeight;

      return Math.max(0, 1 - ratio);
    },
    [children.length, scrollPercentage, transitionHeight]
  );

  const calcScrollPercentage = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const target = e.currentTarget;
      const scrollTop = target.scrollTop;
      const scrollHeight = target.scrollHeight - target.clientHeight;
      const percentage = (scrollTop / scrollHeight) * 100;
      setScrollPercescrollPercentage(percentage);
    },
    []
  );

  return (
    <div className="w-full h-full max-h-full overflow-hidden">
      <div
        ref={containerRef}
        className="w-full h-full overflow-y-auto"
        onScroll={calcScrollPercentage}
      >
        <div
          className="relative w-full"
          style={{ height: `${scrollableHeightPercent}%` }}
        >
          {children.map((child, i) => {
            const opacity = getOpacity(i);
            const top = `${(children.length - (children.length - i) - 1) / children.length * 100}%`;

            return (
              <div
                key={i}
                className="absolute w-full transition-opacity duration-75"
                style={{
                  opacity: opacity,
                  top: top,
                  height: transitionHeight + "%",
                  pointerEvents: opacity === 1 ? "auto" : "none",
                }}
              >
                {child}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
