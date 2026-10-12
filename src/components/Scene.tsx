import type { ReactNode } from "react";

/**
 * One stacked section of the page (see "Stacked scenes" in globals.css).
 *
 * Its content sits in its own wrapper, followed by an empty spacer: on a
 * scene taller than the screen, the wrapper stays still at the top of the
 * screen while the visitor scrolls through the spacer, so the scene pauses
 * once it has fully slid in, before scrolling on.
 */
export default function Scene({
  id,
  nav,
  className,
  children,
}: {
  id: string;
  /** Section highlighted in the menu, when it isn't `id` (project scenes) */
  nav?: string;
  className: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      data-scene
      data-nav={nav}
      className={`scene relative ${className}`}
    >
      <div data-scene-content>{children}</div>
      <div data-scene-hold aria-hidden="true" />
    </section>
  );
}
