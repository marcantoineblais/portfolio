"use client";

import React from "react";

import { scrollToSection } from "../lib/scrollToSection";

/**
 * One global, lightweight scroll engine:
 *  - [data-reveal]  → gets `.is-visible` once it enters the viewport
 *  - [data-speed]   → parallax: receives `--py` based on its distance to the viewport center
 *  - [data-hero]    → receives `--hp` (0 → 1) as the hero scrolls out
 *  - [data-progress]→ receives `--progress` (0 → 1) as it scrolls through the viewport
 *  - [data-scene]   → stacked sections: receive `--scene-h` (for pinning) and `--cover` (0 → 1)
 *                     as the next scene slides over them
 * Everything is skipped when the user prefers reduced motion.
 */
export default function ScrollEffects() {
  React.useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Reveal
    const revealed = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -5% 0px" },
    );
    revealed.forEach((el) => observer.observe(el));

    // Parallax
    const parallax = Array.from(
      document.querySelectorAll<HTMLElement>("[data-speed]"),
    );
    const hero = document.querySelector<HTMLElement>("[data-hero]");
    const progressEls = Array.from(
      document.querySelectorAll<HTMLElement>("[data-progress]"),
    );
    const scenes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-scene]"),
    );
    let frame = 0;

    // Each scene pins when its bottom edge reaches the bottom of the screen.
    // We only publish its height (--scene-h); the CSS computes the pin offset
    // against 100svh, so it doesn't jump when a phone's address bar shows/hides.
    // The last scene has nothing sliding over it, so it never pins.
    const layoutScenes = () => {
      scenes.forEach((scene, i) => {
        scene.style.setProperty("--scene-h", `${scene.offsetHeight}px`);
        scene.toggleAttribute("data-scene-last", i === scenes.length - 1);
      });
      document.documentElement.classList.add("scenes-ready");
    };
    const sceneObserver = new ResizeObserver(() => {
      layoutScenes();
      onScroll();
    });
    scenes.forEach((scene) => sceneObserver.observe(scene));
    layoutScenes();

    const update = () => {
      frame = 0;
      if (reduced.matches) return;

      const vh = window.innerHeight;
      const mobile = window.innerWidth < 768;

      if (hero) {
        const progress = Math.min(Math.max(window.scrollY / vh, 0), 1);
        hero.style.setProperty("--hp", progress.toFixed(3));
      }

      scenes.forEach((scene, i) => {
        const next = scenes[i + 1];
        const cover = next
          ? Math.min(Math.max(1 - next.getBoundingClientRect().top / vh, 0), 1)
          : 0;
        scene.style.setProperty("--cover", cover.toFixed(3));
      });

      for (const el of progressEls) {
        const rect = el.getBoundingClientRect();
        const p = Math.min(Math.max((vh * 0.6 - rect.top) / rect.height, 0), 1);
        el.style.setProperty("--progress", p.toFixed(3));
      }

      for (const el of parallax) {
        // Measure the parent so our own translation doesn't feed back
        const rect = (el.parentElement ?? el).getBoundingClientRect();
        if (rect.bottom < -vh || rect.top > vh * 2) continue;

        const speed = parseFloat(el.dataset.speed || "0") * (mobile ? 0.5 : 1);
        const delta = rect.top + rect.height / 2 - vh / 2;
        el.style.setProperty("--py", `${(-delta * speed).toFixed(1)}px`);
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    // In-page links go through scrollToSection (sticky-aware)
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest<HTMLAnchorElement>(
        'a[href^="#"]',
      );
      if (!link || e.defaultPrevented || e.metaKey || e.ctrlKey) return;
      e.preventDefault();
      scrollToSection(link.getAttribute("href")!.slice(1));
    };
    document.addEventListener("click", onClick);

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
    };
  }, []);

  return null;
}
