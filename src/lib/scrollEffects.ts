import { currentSection, getScenes } from "./scenes";
import {
  scrollToPosition,
  takeRememberedPosition,
  type ScrollPosition,
} from "./scrollMemory";
import { scrollToSection } from "./scrollToSection";
import type { Section } from "./sections";

/** How long a restored position is held while late content settles (ms) */
const SETTLE_TIME = 1000;

type Options = {
  /** Section named by the URL, scrolled to on load */
  section: Section | null;
  /** Localized path of a section, shown in the address bar while it's on screen */
  sectionPath: (section: Section | null) => string;
};

/** Sets a CSS variable only when it changes (each change restyles the element). */
function setVariable(el: HTMLElement, name: string, value: string) {
  if (el.style.getPropertyValue(name) !== value) {
    el.style.setProperty(name, value);
  }
}

function clamp(value: number) {
  return Math.min(Math.max(value, 0), 1);
}

/** Shows the elements already on screen (or above it) without animating them. */
function revealInstantly(elements: NodeListOf<HTMLElement>) {
  const root = document.documentElement;
  root.classList.add("reveal-instant");
  for (const el of Array.from(elements)) {
    if (el.getBoundingClientRect().top < window.innerHeight) {
      el.classList.add("is-visible");
    }
  }
  const restore = () => root.classList.remove("reveal-instant");
  requestAnimationFrame(() => requestAnimationFrame(restore));
}

/**
 * One global, lightweight scroll engine:
 *  - [data-reveal]  → gets `.is-visible` once it enters the viewport
 *  - [data-speed]   → parallax: receives `--py` based on its distance to the viewport center
 *  - [data-hero]    → receives `--hp` (0 → 1) as the hero scrolls out
 *  - [data-scene]   → stacked sections: receive `--scene-h` (for pinning) and `--cover` (0 → 1)
 *                     as the next scene slides over them, and `data-covered` once hidden
 *                     behind the scenes stacked over them
 *  - section links (`a[data-section]`, `a[href^="#"]`) scroll instead of navigating
 *  - the address bar follows the section on screen
 * Motion is skipped when the user prefers reduced motion. Returns a cleanup function.
 */
export function startScrollEffects({ section, sectionPath }: Options) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const root = document.documentElement;

  // Reveal
  const revealed = document.querySelectorAll<HTMLElement>("[data-reveal]");
  const onIntersect = (entries: IntersectionObserverEntry[]) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  };
  const observer = new IntersectionObserver(onIntersect, {
    threshold: 0.15,
    rootMargin: "0px 0px -5% 0px",
  });

  const parallaxNodes = document.querySelectorAll<HTMLElement>("[data-speed]");
  const parallax = Array.from(parallaxNodes);
  const hero = document.querySelector<HTMLElement>("[data-hero]");
  const scenes = getScenes();
  // Everything that stacks: the hero, then each scene
  const layers = scenes.slice();
  if (hero) layers.unshift(hero);

  let frame = 0;
  let syncUrl = false;
  let shownSection: Section | null | undefined;
  // Position restored after a language switch, held until the layout settles
  let held: ScrollPosition | null = takeRememberedPosition();
  const releaseHold = () => {
    held = null;
  };
  const holdTimer = setTimeout(releaseHold, SETTLE_TIME);
  window.addEventListener("wheel", releaseHold, { passive: true, once: true });
  window.addEventListener("touchstart", releaseHold, {
    passive: true,
    once: true,
  });

  // Each scene pins when its bottom edge reaches the bottom of the screen.
  // We only publish its height (--scene-h); the CSS computes the pin offset
  // against 100svh, so it doesn't jump when a phone's address bar shows/hides.
  // The last scene has nothing sliding over it, so it never pins. A scene
  // taller than the screen (data-scene-tall) also pauses at the top.
  // Measured once pinning is on, so heights include each scene's dwell
  // spaces (the empty parts that keep it still for a while, see globals.css).
  let sceneHeights: number[] = [];
  let contentHeights: number[] = [];
  const layoutScenes = () => {
    const vh = window.innerHeight;
    contentHeights = scenes.map((scene) => {
      const content = scene.querySelector<HTMLElement>("[data-scene-content]");
      return (content ?? scene).offsetHeight;
    });
    scenes.forEach((scene, i) => {
      const last = i === scenes.length - 1;
      scene.toggleAttribute("data-scene-last", last);
      scene.toggleAttribute("data-scene-tall", !last && contentHeights[i] > vh);
    });
    root.classList.add("scenes-ready");

    sceneHeights = scenes.map((scene) => scene.offsetHeight);
    scenes.forEach((scene, i) => {
      setVariable(scene, "--scene-h", `${sceneHeights[i]}px`);
    });
  };

  // Layers fully hidden behind the ones stacked over them stop being drawn:
  // a phone compositing every pinned section at once falls behind and
  // flickers, worst at the bottom of the page where they all pile up. The
  // layer right under the top one stays drawn, so it's ready when scrolling
  // back up.
  const hideCoveredLayers = () => {
    let top = 0;
    layers.forEach((layer, i) => {
      if (layer.getBoundingClientRect().top <= 0) top = i;
    });
    layers.forEach((layer, i) => {
      layer.toggleAttribute("data-covered", i < top - 1);
    });
  };

  const updateUrl = () => {
    if (!syncUrl) return;
    const current = currentSection();
    if (current === shownSection) return;

    shownSection = current;
    const path = sectionPath(current);
    if (window.location.pathname !== path) {
      window.history.replaceState(null, "", path);
    }
  };

  const update = () => {
    frame = 0;
    updateUrl();
    if (reduced.matches) return;

    const vh = window.innerHeight;
    const mobile = window.innerWidth < 768;

    if (hero) {
      const progress = clamp(window.scrollY / vh);
      setVariable(hero, "--hp", progress.toFixed(3));
    }

    // A pinned scene shows at most one screen of itself: its content ends at
    // the bottom of the screen, or higher for a scene shorter than the
    // screen. It only dims once the next scene slides past that point.
    scenes.forEach((scene, i) => {
      const next = scenes[i + 1];
      let cover = 0;
      if (next) {
        const shown = Math.min(contentHeights[i], vh);
        const overlap = shown - next.getBoundingClientRect().top;
        cover = clamp(overlap / shown);
      }
      setVariable(scene, "--cover", cover.toFixed(3));
    });

    hideCoveredLayers();

    for (const el of parallax) {
      // Measure the parent so our own translation doesn't feed back
      const rect = (el.parentElement ?? el).getBoundingClientRect();
      if (rect.bottom < -vh || rect.top > vh * 2) continue;

      let speed = parseFloat(el.dataset.speed || "0");
      if (mobile) speed *= 0.5;
      const delta = rect.top + rect.height / 2 - vh / 2;
      setVariable(el, "--py", `${(-delta * speed).toFixed(1)}px`);
    }
  };

  const onScroll = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };

  const sceneObserver = new ResizeObserver(() => {
    layoutScenes();
    if (held) scrollToPosition(held);
    onScroll();
  });
  scenes.forEach((scene) => sceneObserver.observe(scene));
  layoutScenes();

  // Section links scroll to their section instead of navigating
  const onClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const link = target.closest<HTMLAnchorElement>(
      'a[data-section], a[href^="#"]',
    );
    if (!link || e.defaultPrevented || e.button !== 0) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    const id = link.dataset.section ?? link.getAttribute("href")!.slice(1);
    e.preventDefault();
    scrollToSection(id);
  };
  document.addEventListener("click", onClick);

  // Open where the visitor expects: back where they were before switching
  // language, on an old #hash link, or on the section named by the URL
  const hash = window.location.hash.slice(1);
  if (held) {
    scrollToPosition(held);
    revealInstantly(revealed);
  } else if (hash && document.getElementById(hash)) {
    scrollToSection(hash, true);
  } else if (section && window.scrollY === 0) {
    scrollToSection(section, true);
  }
  revealed.forEach((el) => observer.observe(el));

  syncUrl = true;
  update();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Mobile browsers fire "resize" while scrolling (address bar); only
  // re-layout when the width actually changes.
  let lastWidth = window.innerWidth;
  const onResize = () => {
    if (window.innerWidth !== lastWidth) {
      lastWidth = window.innerWidth;
      layoutScenes();
    }
    onScroll();
  };
  window.addEventListener("resize", onResize);

  return () => {
    observer.disconnect();
    sceneObserver.disconnect();
    document.removeEventListener("click", onClick);
    cancelAnimationFrame(frame);
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onResize);
    clearTimeout(holdTimer);
    window.removeEventListener("wheel", releaseHold);
    window.removeEventListener("touchstart", releaseHold);
  };
}
