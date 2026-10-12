import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import type { CSSProperties } from "react";

import { SKILL_GROUPS, TECH } from "../data/tech";
import { sectionHref } from "../lib/sectionHref";
import NextCue from "./NextCue";
import RackLogo from "./RackLogo";
import Scene from "./Scene";
import SectionHeader from "./SectionHeader";

export default async function Skills() {
  const t = await getTranslations("skills");
  const tNav = await getTranslations("nav");
  const locale = await getLocale();

  return (
    <Scene id="skills" className="overflow-clip bg-stone-200 text-gray-900">
      <div className="pointer-events-none absolute bottom-0 -left-32 w-120 opacity-[0.06] sm:w-176">
        <div data-speed="-0.2">
          <RackLogo className="w-full" leds={false} />
        </div>
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col gap-14 px-4 pt-20 pb-10 sm:px-6 sm:pt-28">
        <SectionHeader
          index="03"
          label={t("label")}
          title={t("title")}
          intro={t("intro")}
        />

        <div className="grid gap-6 md:grid-cols-2">
          {SKILL_GROUPS.map((group, g) => (
            <div
              key={group.key}
              data-reveal
              style={{ "--delay": `${(g % 2) * 120}ms` } as CSSProperties}
              className="rounded-3xl border border-stone-300 bg-stone-100 p-6 shadow-sm sm:p-8"
            >
              <h3 className="mb-6 flex items-center justify-between font-mono text-lg font-bold tracking-widest sm:text-xl">
                {t(group.key)}
                <span className="text-sm text-gray-500">
                  {String(group.items.length).padStart(2, "0")}
                </span>
              </h3>
              <ul className="grid grid-cols-3 gap-3 sm:gap-4">
                {group.items.map((key) => (
                  <li
                    key={key}
                    className="group flex flex-col items-center justify-center gap-2 rounded-2xl bg-white p-3 shadow-sm transition-all duration-300 hover:shadow-lg sm:p-4"
                  >
                    <div className="flex h-12 w-full items-center justify-center sm:h-14">
                      <Image
                        src={TECH[key].logo}
                        alt=""
                        sizes="120px"
                        className="max-h-full w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <span className="text-center text-xs font-semibold text-gray-700 sm:text-sm">
                      {TECH[key].name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <NextCue
          href={sectionHref(locale, "contact")}
          section="contact"
          label={tNav("contact")}
        />
      </div>
    </Scene>
  );
}
