"use client";

import { useLocale, useTranslations } from "next-intl";
import React from "react";

import { currentSection } from "../lib/scenes";
import { sectionHref } from "../lib/sectionHref";
import { SECTIONS, type Section } from "../lib/sections";
import LanguageSwitch from "./LanguageSwitch";
import MobileMenu from "./MobileMenu";
import RackLogo from "./RackLogo";

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();

  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState<Section | null>(null);

  // Solid background once we've left the hero, and highlight the section
  // currently in view
  React.useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.6);
      setActive(currentSection());
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock page scroll + close with Escape while the mobile menu is open
  React.useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const openMenu = () => setOpen(true);
  const closeMenu = () => setOpen(false);

  return (
    <>
      <nav
        data-scrolled={scrolled || undefined}
        className="fixed inset-x-0 top-0 z-50 bg-transparent text-gray-300 transition-all duration-500 data-scrolled:border-b data-scrolled:border-white/5 data-scrolled:bg-stone-900/85 data-scrolled:shadow-lg data-scrolled:shadow-black/20 data-scrolled:backdrop-blur-md"
      >
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
          <a
            href={sectionHref(locale, null)}
            data-section="top"
            data-scrolled={scrolled || undefined}
            aria-label={t("home")}
            className="pointer-events-none size-9 opacity-0 transition-all duration-500 hover:text-white data-scrolled:pointer-events-auto data-scrolled:opacity-100"
          >
            <RackLogo className="size-full" />
          </a>

          <div className="flex items-center gap-2">
            <ul className="hidden items-center gap-1 font-mono font-bold md:flex">
              {SECTIONS.map((id) => (
                <li key={id}>
                  <a
                    href={sectionHref(locale, id)}
                    data-section={id}
                    data-active={active === id || undefined}
                    className="group relative rounded-md px-3 py-1.5 transition-colors duration-200 hover:text-white data-active:text-white"
                  >
                    {t(id)}
                    <span className="absolute inset-x-3 -bottom-0.5 h-px origin-left scale-x-0 bg-current transition-transform duration-300 group-data-active:scale-x-100" />
                  </a>
                </li>
              ))}
            </ul>

            <LanguageSwitch className="flex items-center gap-1 rounded-md border border-white/15 px-2.5 py-1 font-mono text-sm font-bold transition-colors hover:border-white/40" />

            <button
              onClick={openMenu}
              aria-label={t("menu")}
              aria-expanded={open}
              className="-mr-2 flex size-10 cursor-pointer items-center justify-center md:hidden"
            >
              <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true">
                <path
                  d="M3 6h18M3 12h18M3 18h18"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <MobileMenu open={open} active={active} onClose={closeMenu} />
    </>
  );
}
