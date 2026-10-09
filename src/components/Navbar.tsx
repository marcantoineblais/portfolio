"use client";

import { useLocale, useTranslations } from "next-intl";
import React from "react";

import { Link } from "../i18n/navigation";
import RackLogo from "./RackLogo";

const SECTIONS = [
  "about",
  "projects",
  "skills",
  "experience",
  "contact",
] as const;

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const otherLocale = locale === "fr" ? "en" : "fr";

  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState<string | null>(null);

  // Solid background once we've left the hero
  React.useEffect(() => {
    const onScroll = () =>
      setScrolled(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently in view
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    const top = document.getElementById("top");
    if (top) observer.observe(top);
    return () => observer.disconnect();
  }, []);

  // Lock page scroll + close with Escape while the mobile menu is open
  React.useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const languageLink = (className: string) => (
    <Link
      href="/"
      locale={otherLocale}
      aria-label={t("switchLanguage")}
      title={t("switchLanguage")}
      className={className}
    >
      <span className={locale === "fr" ? "text-white" : "opacity-50"}>FR</span>
      <span className="opacity-40">/</span>
      <span className={locale === "en" ? "text-white" : "opacity-50"}>EN</span>
    </Link>
  );

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-50 text-gray-300 transition-all duration-500 ${
          scrolled
            ? "border-b border-white/5 bg-stone-900/85 shadow-lg shadow-black/20 backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
          <a
            href="#top"
            aria-label={t("home")}
            className={`h-8 w-16 transition-all duration-500 hover:text-gray-500 ${
              scrolled ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <RackLogo double className="h-full w-full" />
          </a>

          <div className="flex items-center gap-2">
            <ul className="font-mono hidden items-center gap-1 font-bold md:flex">
              {SECTIONS.map((id) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className={`relative rounded-md px-3 py-1.5 transition-colors duration-200 hover:text-white ${
                      active === id ? "text-white" : ""
                    }`}
                  >
                    {t(id)}
                    <span
                      className={`absolute inset-x-3 -bottom-0.5 h-px origin-left bg-current transition-transform duration-300 ${
                        active === id ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </a>
                </li>
              ))}
            </ul>

            {languageLink(
              "font-mono flex items-center gap-1 rounded-md border border-white/15 px-2.5 py-1 text-sm font-bold transition-colors hover:border-white/40",
            )}

            <button
              onClick={() => setOpen(true)}
              aria-label={t("menu")}
              aria-expanded={open}
              className="-mr-2 flex h-10 w-10 cursor-pointer items-center justify-center md:hidden"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
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

      {/* Mobile full-screen menu */}
      <div
        className={`fixed inset-0 z-[60] flex flex-col bg-stone-900/95 text-gray-300 backdrop-blur-lg transition-all duration-500 md:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
        aria-hidden={!open}
      >
        <div className="flex h-14 items-center justify-between px-4">
          <RackLogo double className="h-8 w-16" />
          <button
            onClick={() => setOpen(false)}
            aria-label={t("close")}
            className="-mr-2 flex h-10 w-10 cursor-pointer items-center justify-center"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
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
              className={`transition-all duration-500 ${
                open ? "translate-x-0 opacity-100" : "-translate-x-6 opacity-0"
              }`}
            >
              <a
                href={`#${id}`}
                tabIndex={open ? 0 : -1}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-4 border-b border-white/10 py-4"
              >
                <span className="font-mono text-sm text-gray-500">
                  0{i + 1}
                </span>
                <span
                  className={`font-display text-3xl ${active === id ? "text-white" : ""}`}
                >
                  {t(id)}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
          {languageLink(
            "font-mono flex items-center gap-2 rounded-md border border-white/15 px-4 py-2 font-bold",
          )}
          <span className="font-mono text-sm text-gray-500">marcblais.xyz</span>
        </div>
      </div>
    </>
  );
}
