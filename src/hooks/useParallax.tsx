"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  useRef,
  ReactElement,
  useCallback,
  useEffect,
  cloneElement,
  useMemo,
} from "react";
import { ParallaxScrollItemProps } from "../components/animations/ParallaxScrollItem";

type ParallaxContextType = {
  selectedKey: string;
  scrollHeight: number;
  scrollTo: (key: string) => void;
  elements: ReactNode[];
  setSections: Dispatch<
    React.SetStateAction<ReactElement<ParallaxScrollItemProps>[]>
  >;
  setSnapTimeout: Dispatch<React.SetStateAction<number>>;
  setTransitionRatio: Dispatch<React.SetStateAction<number>>;
};

export const ParallaxContext = createContext<ParallaxContextType | undefined>(
  undefined
);

export function ParallaxProvider({ children }: { children: ReactNode }) {
  const [selectedKey, setSelectedKey] = useState<string>("hero");
  const [scrollHeight, setScrollHeight] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const [snapTimeout, setSnapTimeout] = useState(500);
  const [sections, setSections] = useState<
    ReactElement<ParallaxScrollItemProps>[]
  >([]);
  const [transitionRatio, setTransitionRatio] = useState(2);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | number>(0);
  const isScrollingRef = useRef(false);
  const rafRef = useRef<number>(0);

  const scrollTo = useCallback(
    (key: string) => {
      const index = sections.findIndex((section) => section.key === key);
      if (index === -1) return;

      const innerHeight = window.innerHeight;
      const sectionHeight = innerHeight * transitionRatio;
      const targetScrollY = sectionHeight * index;
      setSelectedKey(key);

      window.scrollTo({
        top: targetScrollY,
        behavior: "smooth",
      });
    },
    [sections, transitionRatio]
  );

  // Return elements with calculated opacity
  const elements = useMemo(() => {
    const calculateOpacity = (index: number) => {
      const innerHeight = window.innerHeight;
      const sectionHeight = innerHeight * transitionRatio;
      const center = sectionHeight * index;
      const offset = Math.abs(center - scrollTop);

      const ratio = Math.min(sectionHeight, offset) / sectionHeight;
      return Math.max(0, 1 - ratio);
    };

    return sections.map((section, index) => {
      const opacity = calculateOpacity(index);
      if (opacity === 0) return null;

      return cloneElement(section, {
        opacity: calculateOpacity(index),
      });
    });
  }, [scrollTop, sections, transitionRatio]);

  // Calculate scroll height and snap on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) return;

      const updateSelectedKey = (prev: string) => {
        const innerHeight = window.innerHeight;
        const sectionHeight = innerHeight * transitionRatio;
        const index = Math.round(scrollY / sectionHeight);
        const newKey = sections[index]?.key as string;

        return newKey || prev;
      };

      const snapAfterScroll = (key: string) => {
        isScrollingRef.current = true;
        clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = setTimeout(() => {
          isScrollingRef.current = false;
          scrollTo(key);
        }, snapTimeout);
      };

      rafRef.current = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        setScrollTop(scrollY);
        setSelectedKey((prev) => {
          const newKey = updateSelectedKey(prev);
          snapAfterScroll(newKey);

          return newKey;
        });
        rafRef.current = 0;
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollTo, snapTimeout, sections, transitionRatio]);

  // Set scrollable height based on number of children
  useEffect(() => {
    const onResize = () => {
      const baseHeight = window.innerHeight;
      const calculatedHeight =
        baseHeight * (sections.length - 1) * transitionRatio;
      setScrollHeight(baseHeight + calculatedHeight);
    };

    window.addEventListener("resize", onResize);
    onResize(); // Initial call

    return () => window.removeEventListener("resize", onResize);
  }, [sections.length, transitionRatio]);

  // Scroll to selected section on mount or selectedKey change
  useEffect(() => {
    if (isScrollingRef.current) return;
    scrollTo(selectedKey);
  }, [selectedKey, scrollTo]);

  return (
    <ParallaxContext.Provider
      value={{
        selectedKey,
        scrollHeight,
        elements,
        scrollTo,
        setSections,
        setSnapTimeout,
        setTransitionRatio,
      }}
    >
      {children}
    </ParallaxContext.Provider>
  );
}

export default function useParallax() {
  const context = useContext(ParallaxContext);
  if (!context) throw new Error("Must be used within ParallaxProvider");

  // Only return read-only values
  const { selectedKey, scrollHeight, scrollTo, elements } = context;
  return { selectedKey, scrollHeight, scrollTo, elements };
}
