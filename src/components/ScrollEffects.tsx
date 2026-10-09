"use client";

import React from "react";

/**
 * One global, lightweight scroll engine:
 *  - [data-reveal]  → gets `.is-visible` once it enters the viewport
 *  - [data-speed]   → parallax: receives `--py` based on its distance to the viewport center
 *  - [data-hero]    → receives `--hp` (0 → 1) as the hero scrolls out
 *  - [data-progress]→ receives `--progress` (0 → 1) as it scrolls through the viewport
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
    let frame = 0;

    const update = () => {
      frame = 0;
      if (reduced.matches) return;

      const vh = window.innerHeight;
      const mobile = window.innerWidth < 768;

      if (hero) {
        const progress = Math.min(Math.max(window.scrollY / vh, 0), 1);
        hero.style.setProperty("--hp", progress.toFixed(3));
      }

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

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return null;
}
