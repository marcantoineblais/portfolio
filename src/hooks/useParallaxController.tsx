import { ReactElement, useContext, useEffect } from "react";
import { ParallaxContext } from "./useParallax";
import { ParallaxScrollItemProps } from "../components/animations/ParallaxScrollItem";

export function useParallaxController({
  sections,
  snapTimeout,
  transitionRatio,
}: {
  sections?: ReactElement<ParallaxScrollItemProps>[];
  snapTimeout?: number;
  transitionRatio?: number;
}) {
  const context = useContext(ParallaxContext);
  if (!context) throw new Error("Must be used within ParallaxProvider");
  // Only return setters
  const { setSections, setSnapTimeout, setTransitionRatio } = context;

  useEffect(() => {
    if (sections) setSections(sections);
    if (snapTimeout !== undefined) setSnapTimeout(snapTimeout);
    if (transitionRatio !== undefined) setTransitionRatio(transitionRatio);
  }, [
    sections,
    snapTimeout,
    transitionRatio,
    setSections,
    setSnapTimeout,
    setTransitionRatio,
  ]);
}
