"use client";

import { useLocale } from "next-intl";
import React from "react";

import { startScrollEffects } from "../lib/scrollEffects";
import { sectionHref } from "../lib/sectionHref";
import type { Section } from "../lib/sections";

/** Runs the scroll engine (see lib/scrollEffects) once the page is on screen. */
export default function ScrollEffects({
  section,
}: {
  section: Section | null;
}) {
  const locale = useLocale();

  // Layout effect: after a language switch, the new page is put back at the
  // same scroll position before it's painted
  React.useLayoutEffect(() => {
    const sectionPath = (current: Section | null) =>
      sectionHref(locale, current);

    return startScrollEffects({ section, sectionPath });
  }, [locale, section]);

  return null;
}
