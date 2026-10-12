import React from "react";

/**
 * Whether the element is on screen, or within `margin` of it (a CSS margin,
 * e.g. "200px"). False until it has been measured.
 */
export function useInView<T extends Element>(margin = "0px") {
  const ref = React.useRef<T>(null);
  const [inView, setInView] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onChange = (entries: IntersectionObserverEntry[]) => {
      setInView(entries[0].isIntersecting);
    };
    const observer = new IntersectionObserver(onChange, { rootMargin: margin });
    observer.observe(el);
    return () => observer.disconnect();
  }, [margin]);

  return [ref, inView] as const;
}
