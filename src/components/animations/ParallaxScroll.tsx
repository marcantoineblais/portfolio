import React, {
  cloneElement,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import ParallaxScrollItem, {
  ParallaxScrollItemProps,
} from "./ParallaxScrollItem";
import useParallax, { ParallaxKey } from "@/src/hooks/useParallax";

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
  const { selectedKey, setSelectedKey } = useParallax();

  const [scrollableHeight, setScrollableHeight] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [sectionOpacities, setSectionOpacities] = useState<number[]>(
    children.map(() => 0)
  );

  const scrollTimeoutRef = useRef<NodeJS.Timeout | number>(0);
  const isScrollingRef = useRef(false);

  const scrollToSelection = useCallback(
    (key: ParallaxKey = selectedKey) => {
      const index = children.findIndex((child) => child.key === key);
      if (index === -1) return;

      const innerHeight = window.innerHeight;
      const sectionHeight = innerHeight * transitionRatio;
      const targetScrollY = sectionHeight * index;
      window.scrollTo({
        top: targetScrollY,
        behavior: "smooth",
      });
    },
    [children, selectedKey, transitionRatio]
  );

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

  // Calculate scroll height
  useEffect(() => {
    const handleScroll = () => {
      setScrollHeight(window.scrollY);

      // Manage scroll state for snapping
      isScrollingRef.current = true;
      clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
        scrollToSelection();
      }, snapTimeout);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollToSelection]);

  // Set scrollable height based on number of children
  useEffect(() => {
    const baseHeight = window.innerHeight;
    const calculatedHeight =
      baseHeight * (children.length - 1) * transitionRatio;
    setScrollableHeight(baseHeight + calculatedHeight);
  }, [children.length, transitionRatio]);

  useEffect(() => {
    const calculateOpacity = (index: number) => {
      const innerHeight = window.innerHeight;
      const sectionHeight = innerHeight * transitionRatio;
      const center = sectionHeight * index;
      const offset = Math.abs(center - scrollHeight);

      const ratio = Math.min(sectionHeight, offset) / sectionHeight;
      return Math.max(0, 1 - ratio);
    };

    setSectionOpacities(children.map((_, i) => calculateOpacity(i)));
  }, [scrollHeight, scrollableHeight, children.length, transitionRatio]);

  // Scroll to selected section on mount or selectedKey change
  useEffect(() => {
    if (isScrollingRef.current) return;
    scrollToSelection(selectedKey);

    // NEED TO MOVE TIMEOUT IN THE HOOK TO AVOID CONFLICTS
  }, [selectedKey, scrollToSelection]);

  // Update selectedKey on scroll
  useEffect(() => {
    const index = sectionOpacities.findIndex((opacity) => opacity > 0.5);
    if (index === -1) return;

    setSelectedKey((prev) => {
      const newKey = children[index].key as ParallaxKey;
      if (newKey === prev) return prev;

      return newKey;
    });
  }, [sectionOpacities]);

  return (
    <div className="w-full h-full">
      <div className="w-full" style={{ height: `${scrollableHeight}px` }}></div>

      {children.map((child, i) => {
        const opacity = sectionOpacities[i];
        if (opacity === 0) return null;

        return cloneElement(child, { opacity });
      })}
    </div>
  );
}
