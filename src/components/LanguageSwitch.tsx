"use client";

import { useLocale, useTranslations } from "next-intl";

import { Link, usePathname } from "../i18n/navigation";
import type { Locale } from "../i18n/routing";
import { rememberScrollPosition } from "../lib/scrollMemory";

/**
 * FR / EN toggle. Keeps the visitor on the same section: the page is
 * re-rendered in the other language at the same scroll position.
 */
export default function LanguageSwitch({ className }: { className: string }) {
  const t = useTranslations("nav");
  const locale = useLocale();
  // Follows the section on screen (the address bar is kept in sync)
  const pathname = usePathname();

  let otherLocale: Locale = "fr";
  if (locale === "fr") otherLocale = "en";

  return (
    <Link
      href={pathname}
      locale={otherLocale}
      scroll={false}
      onClick={rememberScrollPosition}
      aria-label={t("switchLanguage")}
      title={t("switchLanguage")}
      className={className}
    >
      <span
        data-current={locale === "fr" || undefined}
        className="opacity-50 data-current:text-white data-current:opacity-100"
      >
        FR
      </span>
      <span className="opacity-40">/</span>
      <span
        data-current={locale === "en" || undefined}
        className="opacity-50 data-current:text-white data-current:opacity-100"
      >
        EN
      </span>
    </Link>
  );
}
