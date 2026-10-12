"use client";

import { useLocale, useTranslations } from "next-intl";

import { sectionHref } from "../lib/sectionHref";
import { SECTIONS, type Section } from "../lib/sections";
import LanguageSwitch from "./LanguageSwitch";
import RackLogo from "./RackLogo";

/** Full-screen menu on phones. */
export default function MobileMenu({
  open,
  active,
  onClose,
}: {
  open: boolean;
  active: Section | null;
  onClose: () => void;
}) {
  const t = useTranslations("nav");
  const locale = useLocale();

  return (
    <div
      data-open={open || undefined}
      inert={!open}
      className="group invisible fixed inset-0 z-60 flex flex-col bg-stone-900/95 text-gray-300 opacity-0 backdrop-blur-lg transition-all duration-500 data-open:visible data-open:opacity-100 md:hidden"
    >
      <div className="flex h-14 items-center justify-between px-4">
        <RackLogo className="size-9" />
        <button
          onClick={onClose}
          aria-label={t("close")}
          className="-mr-2 flex size-10 cursor-pointer items-center justify-center"
        >
          <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true">
            <path
              d="M5 5l14 14M19 5L5 19"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      <ul className="flex grow flex-col justify-center gap-2 px-6">
        {SECTIONS.map((id, i) => (
          <li
            key={id}
            style={{ transitionDelay: open ? `${100 + i * 60}ms` : "0ms" }}
            className="-translate-x-6 opacity-0 transition-all duration-500 group-data-open:translate-x-0 group-data-open:opacity-100"
          >
            <a
              href={sectionHref(locale, id)}
              data-section={id}
              data-active={active === id || undefined}
              onClick={onClose}
              className="group/link flex items-baseline gap-4 border-b border-white/10 py-4"
            >
              <span className="font-mono text-sm text-gray-500">0{i + 1}</span>
              <span className="font-display text-3xl group-data-active/link:text-white">
                {t(id)}
              </span>
            </a>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        <LanguageSwitch className="flex items-center gap-2 rounded-md border border-white/15 px-4 py-2 font-mono font-bold" />
        <span className="font-mono text-sm text-gray-500">marcblais.net</span>
      </div>
    </div>
  );
}
