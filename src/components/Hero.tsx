"use client";

import { useLocale, useTranslations } from "next-intl";
import React from "react";

import { sectionHref } from "../lib/sectionHref";
import { useGlitchText } from "../lib/useGlitchText";
import HeroName from "./HeroName";
import RackIllustration from "./RackIllustration";

const NAME = "Marc Antoine Blais";

export default function Hero() {
  const t = useTranslations("hero");
  const tCta = useTranslations("cta");
  const locale = useLocale();

  const [visibleLetters, setVisibleLetters] = React.useState(0);
  const [stage, setStage] = React.useState(0); // 0: name, 1: subtitle in, 2: subtitle flipped, 3: slogan
  const [mirrored, setMirrored] = React.useState(false);
  // The intro replays each time you scroll back up to the hero
  const [active, setActive] = React.useState(true);
  const [run, setRun] = React.useState(0);

  const slogan1 = useGlitchText(t("slogan1"), 3000, active, run);
  const slogan2 = useGlitchText(t("slogan2"), 4200, active, run);

  React.useEffect(() => {
    let away = false;
    const onScroll = () => {
      const vh = window.innerHeight;
      if (!away && window.scrollY > vh * 0.9) {
        // Hero is out of view: reset, ready to replay
        away = true;
        setActive(false);
        setVisibleLetters(0);
        setStage(0);
      } else if (away && window.scrollY < vh * 0.25) {
        away = false;
        setActive(true);
        setRun((r) => r + 1);
      }
    };
    // The page can open further down (/projects…): start away from the hero
    const initial = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(initial);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  React.useEffect(() => {
    if (!active) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      React.startTransition(() => {
        setVisibleLetters(NAME.length);
        setStage(3);
      });
      return;
    }

    let i = 0;
    const showLetter = () => {
      setVisibleLetters(++i);
      if (i >= NAME.length) clearInterval(letters);
    };
    const letters = setInterval(showLetter, 60);
    const timers = [
      setTimeout(() => setStage(1), 1400),
      setTimeout(() => setStage(2), 2200),
      setTimeout(() => setStage(3), 2800),
    ];

    return () => {
      clearInterval(letters);
      timers.forEach(clearTimeout);
    };
  }, [active, run]);

  const subtitleIn = stage >= 1;
  const flipped = stage < 2 || mirrored;
  const sloganShown = stage >= 3;

  const mirror = () => {
    if (stage >= 2) setMirrored(true);
  };
  const unmirror = () => setMirrored(false);

  return (
    <header
      id="top"
      data-hero
      className="sticky top-0 h-svh min-h-144 overflow-hidden bg-gray-950 text-gray-300"
    >
      {/* Background: grid, glows, scanlines */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rack-grid text-white/5"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[15%] right-[-10vw] size-[70vmin] rounded-full bg-emerald-500/10 blur-[110px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-[-15vw] h-[60vmin] w-[80vmin] rounded-full bg-stone-400/10 blur-[110px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 scanlines"
      />

      <div className="relative mx-auto grid h-full max-w-7xl hero-content grid-rows-[auto_1fr_auto] px-4 pt-16 pb-5 sm:px-6 lg:pt-20">
        <div />

        <div className="grid items-center gap-6 lg:grid-cols-[1.35fr_0.65fr] lg:gap-10">
          {/* Animated rack (parallax: drifts down slower than the page) */}
          <div
            aria-hidden="true"
            style={{ translate: "0 calc(var(--hp, 0) * 14vh)" }}
            className="order-first flex justify-center lg:order-last"
          >
            <div className="relative animate-rack-float">
              <div className="absolute inset-x-[10%] -bottom-4 h-8 rounded-[50%] bg-black/60 blur-xl" />
              <RackIllustration className="relative h-[24vh] w-auto drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)] sm:h-[30vh] lg:h-[min(62vh,36rem)]" />
            </div>
          </div>

          <div className="flex flex-col items-start gap-6 lg:gap-8">
            {/* Status chip */}
            <p
              data-shown={visibleLetters > 0 || undefined}
              className="flex translate-y-2 items-center gap-2.5 rounded-full border border-white/10 bg-white/4 px-3.5 py-1.5 font-mono text-xs text-gray-300 opacity-0 transition-all duration-700 data-shown:translate-y-0 data-shown:opacity-100 sm:text-sm"
            >
              <span className="relative flex size-2.5 items-center justify-center">
                <span className="absolute size-2 animate-ping-soft rounded-full bg-emerald-400" />
                <span className="size-2 rounded-full bg-emerald-400" />
              </span>
              {t("status")}
            </p>

            <div
              onMouseEnter={mirror}
              onMouseLeave={unmirror}
              className="flex w-fit flex-col"
            >
              <HeroName name={NAME} visibleLetters={visibleLetters} />

              {/* Mirrored subtitle — flips into place, flips back on hover */}
              <div
                data-in={subtitleIn || undefined}
                data-flipped={flipped || undefined}
                className="mt-4 flex -translate-y-full items-stretch justify-between gap-3 font-mono text-[4.4vw] leading-tight opacity-0 transition-all duration-1000 data-flipped:-scale-x-100 data-in:translate-y-0 data-in:opacity-100 sm:text-[3vw] lg:text-[2vw] xl:text-[1.8rem]"
              >
                <div
                  aria-hidden="true"
                  className="grow -scale-x-100 text-right text-gray-500 blur-[0.08em]"
                >
                  <p>{t("role1")}</p>
                  <p>{t("role2")}</p>
                </div>
                <div className="w-0.5 shrink-0 bg-white blur-[1px]" />
                <h2 className="grow text-right">
                  <span className="block">{t("role1")}</span>
                  <span className="block">{t("role2")}</span>
                </h2>
              </div>
            </div>

            <p
              data-shown={sloganShown || undefined}
              className="flex min-h-[2.6em] w-fit gap-6 font-mono text-[4.2vw] whitespace-nowrap text-emerald-300/90 opacity-0 transition-opacity duration-1000 data-shown:opacity-100 sm:gap-10 sm:text-[2.6vw] lg:text-[1.6vw] xl:text-[1.5rem]"
            >
              <span>
                <span className="text-gray-500">&gt; </span>
                {slogan1}
              </span>
              <span className="self-end">{slogan2}</span>
            </p>

            <div
              data-shown={sloganShown || undefined}
              className="flex w-full translate-y-3 flex-col gap-3 opacity-0 transition-all duration-700 data-shown:translate-y-0 data-shown:opacity-100 sm:w-auto sm:flex-row"
            >
              <a
                href={sectionHref(locale, "projects")}
                data-section="projects"
                className="group flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 font-mono text-base font-bold text-gray-950 shadow-[0_0_40px_rgba(255,255,255,0.25)] transition-all duration-200 hover:bg-emerald-300 hover:shadow-[0_0_50px_rgba(52,211,153,0.45)] sm:text-lg"
              >
                {t("ctaProjects")}
                <span
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </a>
              <a
                href={sectionHref(locale, "contact")}
                data-section="contact"
                className="group flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/3 px-7 py-3.5 font-mono text-base font-bold text-gray-200 transition-colors duration-200 hover:border-white/50 hover:bg-white/10 sm:text-lg"
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

        <a
          href={sectionHref(locale, "about")}
          data-section="about"
          aria-label={t("scroll")}
          className="mx-auto mt-4 flex cursor-pointer flex-col items-center gap-1 text-xs font-bold tracking-[0.2em] text-gray-500 uppercase transition-colors hover:text-gray-300"
        >
          <span className="hidden font-mono sm:block">{t("scroll")}</span>
          <svg
            className="h-5 w-8 animate-cue"
            viewBox="0 0 40 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M4 4l16 14L36 4" />
          </svg>
        </a>
      </div>
    </header>
  );
}
