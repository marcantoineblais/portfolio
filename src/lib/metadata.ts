import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

import { getPathname } from "../i18n/navigation";
import { routing } from "../i18n/routing";
import { sectionPathname, type Section } from "./sections";

const SITE_URL = "https://marcblais.net";

/**
 * Metadata of the home page or one of its sections. Paths shared by every
 * locale (/ and /contact) can't point to one language, so they only get a
 * canonical URL, without language alternates.
 */
export async function pageMetadata(
  locale: string,
  section: Section | null,
): Promise<Metadata> {
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations({ locale, namespace: "meta" });
  const href = sectionPathname(section);
  const canonical = getPathname({ locale, href });

  const languages: Record<string, string> = {};
  for (const other of routing.locales) {
    languages[other] = getPathname({ locale: other, href });
  }
  const isShared = new Set(Object.values(languages)).size === 1;
  languages["x-default"] = getPathname({ locale: routing.defaultLocale, href });

  const alternates: Metadata["alternates"] = { canonical };
  if (!isShared) alternates.languages = languages;

  let ogLocale = "en_CA";
  if (locale === "fr") ogLocale = "fr_CA";

  return {
    metadataBase: new URL(SITE_URL),
    title: t("title"),
    description: t("description"),
    alternates,
    openGraph: {
      type: "website",
      url: canonical,
      title: t("title"),
      description: t("description"),
      siteName: "Marc Antoine Blais",
      locale: ogLocale,
      images: [{ url: "/logo.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["/logo.png"],
    },
  };
}
