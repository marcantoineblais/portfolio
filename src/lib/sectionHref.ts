import { hasLocale } from "next-intl";

import { getPathname } from "../i18n/navigation";
import { routing } from "../i18n/routing";
import { sectionPathname, type Section } from "./sections";

/** Localized path of a section in `locale` ("/" for the hero). */
export function sectionHref(locale: string, section: Section | null) {
  let resolved = routing.defaultLocale;
  if (hasLocale(routing.locales, locale)) resolved = locale;

  return getPathname({ locale: resolved, href: sectionPathname(section) });
}
