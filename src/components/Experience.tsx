import { getTranslations } from "next-intl/server";
import type { CSSProperties } from "react";

import NextCue from "./NextCue";
import SectionHeader from "./SectionHeader";

type Item = {
  type: "work" | "education";
  period: string;
  role: string;
  place: string;
  text: string;
};

export default async function Experience() {
  const t = await getTranslations("experience");
  const tNav = await getTranslations("nav");
  const items = t.raw("items") as Item[];

  return (
    <section
      id="experience"
      data-scene
      className="scene relative overflow-clip bg-stone-900 text-gray-300"
    >
      <div
        aria-hidden="true"
        className="rack-grid pointer-events-none absolute inset-0 text-white/[0.035]"
      />
      <div className="relative mx-auto grid max-w-7xl gap-14 [&>*]:min-w-0 px-4 pt-20 sm:px-6 sm:pt-28 lg:grid-cols-[1fr_1.6fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeader index="04" label={t("label")} title={t("title")} />
        </div>

        <ol
          data-progress
          className="relative flex flex-col gap-10 pl-8 sm:pl-12"
        >
          {/* Track + fill */}
          <span className="absolute bottom-2 left-[0.6875rem] top-2 w-px bg-white/10 sm:left-[1.1875rem]" />
          <span className="timeline-fill absolute bottom-2 left-[0.6875rem] top-2 w-px bg-gradient-to-b from-white via-gray-300 to-gray-500 sm:left-[1.1875rem]" />

          {items.map((item, i) => (
            <li
              key={i}
              data-reveal="right"
              style={{ "--delay": `${i * 100}ms` } as CSSProperties}
              className="relative"
            >
              <span className="absolute -left-8 top-1.5 flex h-6 w-6 items-center justify-center rounded-full border border-white/20 bg-stone-900 sm:-left-12 sm:h-10 sm:w-10 sm:top-0">
                {item.type === "education" ? (
                  <svg
                    viewBox="0 0 24 24"
                    className="h-3.5 w-3.5 sm:h-5 sm:w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M2 9l10-5 10 5-10 5L2 9z" />
                    <path d="M6 11v5c3 2 9 2 12 0v-5" />
                  </svg>
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    className="h-3.5 w-3.5 sm:h-5 sm:w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect x="3" y="7" width="18" height="13" rx="2" />
                    <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                )}
              </span>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.06] sm:p-7">
                <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                  <span className="font-mono rounded-md bg-white/10 px-2.5 py-1 text-xs font-bold text-gray-200 sm:text-sm">
                    {item.period}
                  </span>
                  <span className="font-mono text-xs uppercase tracking-widest text-gray-500">
                    {item.type === "education" ? t("education") : t("work")}
                  </span>
                </div>
                <h3 className="font-display text-2xl text-white sm:text-3xl">
                  {item.role}
                </h3>
                <p className="font-mono mb-3 text-sm text-gray-400 sm:text-base">
                  {item.place}
                </p>
                <p className="leading-relaxed text-gray-400">{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <div className="relative pb-10">
        <NextCue href="#contact" label={tNav("contact")} />
      </div>
    </section>
  );
}
