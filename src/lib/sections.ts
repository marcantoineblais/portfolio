import { routing, type Locale, type Pathname } from "../i18n/routing";

/** Page sections, in order. Each one has its own (localized) path. */
export const SECTIONS = ["about", "projects", "skills", "contact"] as const;

export type Section = (typeof SECTIONS)[number];

export function isSection(value: string | undefined): value is Section {
  return SECTIONS.includes(value as Section);
}

/** Internal pathname of a section ("/" for the hero). */
export function sectionPathname(section: Section | null): Pathname {
  if (!section) return "/";
  return `/${section}`;
}

/**
 * The locale a localized path belongs to, when only one locale uses it
 * (/a-propos is French, /about is English, /contact is both: null).
 */
export function localeFromPathname(pathname: string): Locale | null {
  const matches = new Set<Locale>();

  for (const config of Object.values(routing.pathnames)) {
    if (typeof config === "string") continue;
    for (const locale of routing.locales) {
      if (config[locale] === pathname) matches.add(locale);
    }
  }

  if (matches.size !== 1) return null;
  const [locale] = matches;
  return locale;
}
