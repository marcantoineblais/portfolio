import { getLocale, getTranslations } from "next-intl/server";
import type { CSSProperties } from "react";

import { sectionHref } from "../lib/sectionHref";
import NextCue from "./NextCue";
import RackLogo from "./RackLogo";
import Scene from "./Scene";
import SectionHeader from "./SectionHeader";

export default async function About() {
  const t = await getTranslations("about");
  const tHero = await getTranslations("hero");
  const tNav = await getTranslations("nav");
  const tCta = await getTranslations("cta");
  const locale = await getLocale();

  return (
    <Scene id="about" className="overflow-clip bg-stone-200 text-gray-900">
      {/* Decorative parallax rack */}
      <div className="pointer-events-none absolute top-10 -right-24 w-md opacity-[0.04] sm:w-160">
        <div data-speed="0.25">
          <RackLogo className="w-full" leds={false} />
        </div>
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 pt-20 *:min-w-0 sm:px-6 sm:pt-28 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
        {/* ID badge */}
        <div className="order-2 lg:order-1">
          <div data-speed="0.06">
            <div
              data-reveal="zoom"
              className="relative mx-auto max-w-sm overflow-hidden rounded-3xl bg-stone-900 p-6 text-gray-300 shadow-2xl shadow-stone-900/40 sm:p-8"
            >
              <div className="pointer-events-none absolute inset-0 rack-grid text-white/5" />
              <div className="relative flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <RackLogo className="size-9 text-gray-400" />
                  <span className="font-mono text-xs tracking-widest text-gray-500">
                    ID / MAB-01
                  </span>
                </div>

                <div className="flex aspect-square items-center justify-center rounded-2xl border border-white/10 bg-gray-950 font-display text-7xl tracking-[0.15em] text-white glow sm:text-8xl">
                  MAB
                </div>

                <div>
                  <p className="font-display text-2xl tracking-wider text-white">
                    Marc Antoine Blais
                  </p>
                  <p className="font-mono text-sm text-gray-400">
                    {tHero("role1")} {tHero("role2")}
                  </p>
                </div>

                <ul className="flex flex-col gap-2 font-mono text-sm">
                  <li className="flex items-center gap-3">
                    <svg
                      viewBox="0 0 24 24"
                      className="size-4 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <path d="M12 21s-7-6.2-7-11.5a7 7 0 1 1 14 0C19 14.8 12 21 12 21z" />
                      <circle cx="12" cy="9.5" r="2.5" />
                    </svg>
                    {t("location")}
                  </li>
                  <li className="flex items-center gap-3">
                    <svg
                      viewBox="0 0 24 24"
                      className="size-4 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="9" />
                      <path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z" />
                    </svg>
                    {t("languages")}
                  </li>
                  <li className="flex items-center gap-3 text-emerald-400">
                    <span className="relative flex size-4 items-center justify-center">
                      <span className="absolute size-2 animate-ping-soft rounded-full bg-emerald-400" />
                      <span className="size-2 rounded-full bg-emerald-400" />
                    </span>
                    {t("available")}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="order-1 flex flex-col gap-8 lg:order-2 lg:pt-6">
          <SectionHeader index="01" label={t("label")} title={t("title")} />

          <p data-reveal className="text-xl/relaxed font-semibold sm:text-2xl">
            {t("intro")}
          </p>
          <div
            data-reveal
            style={{ "--delay": "120ms" } as CSSProperties}
            className="flex flex-col gap-4 text-base/relaxed text-gray-700 sm:text-lg"
          >
            <p>{t("body")}</p>
            <p>{t("body2")}</p>
          </div>

          <div
            data-reveal
            style={{ "--delay": "220ms" } as CSSProperties}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <a
              href={sectionHref(locale, "contact")}
              data-section="contact"
              className="group inline-flex items-center justify-center gap-2 rounded-lg border-2 border-stone-900 px-6 py-3 font-mono font-bold transition-colors hover:bg-stone-900 hover:text-gray-200"
            >
              {tCta("write")}
              <span
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          </div>
        </div>
      </div>
      <div className="relative pb-10">
        <NextCue
          href={sectionHref(locale, "projects")}
          section="projects"
          label={tNav("projects")}
        />
      </div>
    </Scene>
  );
}
