import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["fr", "en"],
  defaultLocale: "en",
  localePrefix: "always",
  localeDetection: true,
  pathnames: {
    "/": "/",
    "/#": "/#",
    "/#about": {
      fr: "/#a-propos",
      en: "/#about",
    },
    "/#contact": {
      fr: "/#contact",
      en: "/#contact",
    },
    "/#projects": {
      fr: "/#projets",
      en: "/#projects",
    }
  },
});
