import React, {
  cloneElement,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ParallaxScrollItem, {
  ParallaxScrollItemProps,
} from "./ParallaxScrollItem";
import useParallax, { ParallaxKey } from "@/src/hooks/useParallax";

type ParallaxScrollProps = {
  transitionHeight?: number;
  snapToSection?: boolean;
  snapTimeout?: number;
  children: ReactElement<ParallaxScrollItemProps>[];
} & React.HTMLAttributes<HTMLDivElement>;

export default function ParallaxScroll({
  transitionHeight = 200,
  snapToSection = true,
  snapTimeout = 500,
  children,
}: ParallaxScrollProps) {
  const { selectedKey, setSelectedKey } = useParallax();
  const [scrollPercentage, setScrollPercentage] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | number>(0);

  const scrollableHeightPercent = useMemo(
    () => (children.length - 1) * transitionHeight,
    [children.length, transitionHeight]
  );

  console.log(scrollableHeightPercent);
  

  const findIndex = useCallback(
    (section: string) => children.findIndex((child) => child.key === section),
    [children]
  );

  const indexedKeys = useMemo(() => {
    return children.reduce((obj, child, i) => {
      obj[child.key as ParallaxKey] = i;
      return obj;
    }, {} as Record<ParallaxKey, number>);
  }, [children]);

  const getOpacity = useCallback(
    (index: number) => {
      const center = transitionHeight * index;
      const offset = Math.abs(
        center - (scrollPercentage * scrollableHeightPercent) / 100
      );
      const ratio = Math.min(transitionHeight, offset) / transitionHeight;
      return Math.max(0, 1 - ratio);
    },
    [transitionHeight, scrollPercentage, scrollableHeightPercent]
  );

  const calcScrollPercentage = useCallback((e: React.UIEvent) => {
    const target = e.currentTarget;
    const scrollTop = target.scrollTop;
    const scrollHeight = target.scrollHeight - target.clientHeight;
    const percentage = (scrollTop / scrollHeight) * 100;

    setScrollPercentage(percentage);
  }, []);

  const scrollToSelection = useCallback(
    (key: ParallaxKey) => {
      const container = containerRef.current;
      if (!container) return;

      const index = indexedKeys[key];
      if (index === undefined) return;

      const center = transitionHeight * index;
      const targetPercentage = (center / scrollableHeightPercent) * 100;
      const scrollHeight = container.scrollHeight - container.clientHeight;
      const targetScrollTop = (targetPercentage / 100) * scrollHeight;
      container.scrollTo({
        top: targetScrollTop,
        behavior: "smooth",
      });
    },
    [indexedKeys, selectedKey, scrollableHeightPercent, findIndex, transitionHeight]
  );

  const handleScroll = useCallback(
    (e: React.UIEvent) => {
      calcScrollPercentage(e);

      if (!snapToSection) return;
      clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        const index = children.findIndex((_, i) => getOpacity(i) > 0.5);
        setSelectedKey((prev) => {
          if (selectedKey !== prev) return selectedKey;

          const newKey = children[index].key as ParallaxKey;
          if (newKey) scrollToSelection(newKey);
          return newKey;
        });
      }, snapTimeout);
    },
    [
      calcScrollPercentage,
      snapToSection,
      snapTimeout,
      children,
      getOpacity,
      scrollToSelection,
      selectedKey,
      setSelectedKey,
    ]
  );

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

  useEffect(() => {
    if (scrollTimeoutRef.current) return;
    scrollToSelection(selectedKey);
  }, [selectedKey, scrollToSelection]);

  return (
    <div 
      className="flex flex-col w-full h-full overflow-hidden"
    >
      <div
        ref={containerRef}
        className="w-full h-full overflow-y-auto"
        onScroll={handleScroll}
      >
        <div
          className="w-full"
          style={{ height: `${scrollableHeightPercent}%` }}
          ></div>
      </div>

      {children.map((child, i) => {
        const opacity = getOpacity(i);
        const zIndex = opacity > 0.5 ? 1 : -1;
        if (opacity === 0) return null;

        return cloneElement(child, { opacity, zIndex });
      })}
    </div>
  );
}
