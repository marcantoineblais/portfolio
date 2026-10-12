import { sceneTop } from "./scenes";

/** Longest distance animated, in screen heights: longer trips jump first */
const MAX_TRAVEL = 0.9;
const MIN_DURATION = 350;
const MAX_DURATION = 750;

const INTERRUPTIONS = ["wheel", "touchstart", "pointerdown", "keydown"];

let frame = 0;

function easeInOutCubic(t: number) {
  if (t < 0.5) return 4 * t * t * t;
  return 1 - (-2 * t + 2) ** 3 / 2;
}

export function stopScrolling() {
  cancelAnimationFrame(frame);
  frame = 0;
  for (const type of INTERRUPTIONS) {
    window.removeEventListener(type, stopScrolling);
  }
}

function animateScroll(to: number) {
  const from = window.scrollY;
  const distance = to - from;
  const maxTravel = window.innerHeight * MAX_TRAVEL;
  const ratio = Math.min(Math.abs(distance) / maxTravel, 1);
  const duration = MIN_DURATION + (MAX_DURATION - MIN_DURATION) * ratio;
  const start = performance.now();

  // The visitor takes over as soon as they scroll, tap or press a key
  for (const type of INTERRUPTIONS) {
    window.addEventListener(type, stopScrolling, { passive: true });
  }

  const step = (now: number) => {
    const t = Math.min((now - start) / duration, 1);
    const top = from + distance * easeInOutCubic(t);
    window.scrollTo({ top, behavior: "instant" });

    if (t < 1) frame = requestAnimationFrame(step);
    else stopScrolling();
  };
  frame = requestAnimationFrame(step);
}

/**
 * Scrolls to a section by id ("top" for the hero).
 *
 * Gliding through every stacked scene on the way is long and heavy, so a
 * far section is reached by jumping to just before it, then gliding over
 * the last screen: the section still slides into place.
 */
export function scrollToSection(id: string, instant = false) {
  const target = sceneTop(id);
  if (target === null) return;

  stopScrolling();
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const top = Math.min(target, maxScroll);

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (instant || reduced.matches) {
    window.scrollTo({ top, behavior: "instant" });
    return;
  }

  const maxTravel = window.innerHeight * MAX_TRAVEL;
  const distance = top - window.scrollY;
  if (Math.abs(distance) > maxTravel) {
    const jumpTo = top - Math.sign(distance) * maxTravel;
    window.scrollTo({ top: jumpTo, behavior: "instant" });
  }
  animateScroll(top);
}
