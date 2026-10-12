import { defineRouting } from "next-intl/routing";

/**
 * Remembers the visitor's language for a year (next-intl's default cookie
 * only lasts until the browser is closed).
 */
export const LOCALE_COOKIE = {
  name: "NEXT_LOCALE",
  maxAge: 60 * 60 * 24 * 365,
  sameSite: "lax",
} as const;

/**
 * The locale never shows in the URL: it comes from the NEXT_LOCALE cookie
 * (or the browser's language on a first visit). Each section has its own
 * localized path, so /a-propos and /about render the same page in French
 * and in English.
 */
export const routing = defineRouting({
  locales: ["fr", "en"],
  defaultLocale: "en",
  localePrefix: "never",
  localeDetection: true,
  localeCookie: LOCALE_COOKIE,
  pathnames: {
    "/": "/",
    "/about": { en: "/about", fr: "/a-propos" },
    "/projects": { en: "/projects", fr: "/realisations" },
    "/skills": { en: "/skills", fr: "/competences" },
    "/contact": "/contact",
  },
});

export type Locale = (typeof routing.locales)[number];
export type Pathname = keyof typeof routing.pathnames;
