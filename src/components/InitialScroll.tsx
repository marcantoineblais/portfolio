"use client";

import React from "react";

import type { Section } from "../lib/sections";

// Only the page as first loaded needs the script: later renders (a language
// switch) are positioned by ScrollEffects, and React can't run a script it
// creates on the client anyway.
let pageHydrated = false;

/**
 * Opens the page on a section (/a-propos, /projects…) before it's first
 * painted, instead of showing the hero and jumping once React has loaded.
 * Scenes aren't pinned yet at that point, so their box is where they start.
 */
export default function InitialScroll({
  section,
}: {
  section: Section | null;
}) {
  const [firstLoad] = React.useState(!pageHydrated);

  React.useEffect(() => {
    pageHydrated = true;
  }, []);

  if (!firstLoad || !section) return null;

  const script = `(() => {
    const el = document.getElementById(${JSON.stringify(section)});
    if (!el || location.hash || window.scrollY > 0) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY, behavior: "instant" });
  })();`;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
