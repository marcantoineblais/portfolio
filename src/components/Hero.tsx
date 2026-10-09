"use client";

import { useTranslations } from "next-intl";
import React from "react";

import { scrollToSection } from "../lib/scrollToSection";
import RackIllustration from "./RackIllustration";

const SYMBOLS = "!@#$%&[]{}<>/".split("");

/** Types a string one character at a time with a scrambling last character. */
function useGlitchText(text: string, startDelay: number) {
  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let typing: ReturnType<typeof setInterval>;
    let scramble: ReturnType<typeof setInterval>;
    let typed = "";
    let i = 0;

    const start = setTimeout(
      () => {
        if (reduced) return setValue(text);

        typing = setInterval(() => {
          if (i < text.length) typed += text[i++];
          else {
            clearInterval(typing);
            clearInterval(scramble);
            setValue(text);
          }
        }, 70);

        scramble = setInterval(() => {
          const random = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
          setValue(typed + random);
        }, 16);
      },
      reduced ? 0 : startDelay,
    );

    return () => {
      clearTimeout(start);
      clearInterval(typing);
      clearInterval(scramble);
    };
  }, [text, startDelay]);

  return value;
}

export default function Hero() {
  const t = useTranslations("hero");
  const name = "Marc Antoine Blais";

  const [visibleLetters, setVisibleLetters] = React.useState(0);
  const [stage, setStage] = React.useState(0); // 0: name, 1: subtitle in, 2: subtitle flipped, 3: slogan
  const [mirrored, setMirrored] = React.useState(false);

  const slogan1 = useGlitchText(t("slogan1"), 3000);
  const slogan2 = useGlitchText(t("slogan2"), 4200);

  React.useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      React.startTransition(() => {
        setVisibleLetters(name.length);
        setStage(3);
      });
      return;
    }

    let i = 0;
    const letters = setInterval(() => {
      setVisibleLetters(++i);
      if (i >= name.length) clearInterval(letters);
    }, 60);
    const timers = [
      setTimeout(() => setStage(1), 1400),
      setTimeout(() => setStage(2), 2200),
      setTimeout(() => setStage(3), 2800),
    ];

    return () => {
      clearInterval(letters);
      timers.forEach(clearTimeout);
    };
  }, []);

  // "Marc Antoine" / "Blais" on two lines
  const parts = name.split(" ");
  const lines = [parts.slice(0, -1).join(" "), parts[parts.length - 1]];
  let index = 0;
  const words = lines.map((line, l) => (
    <span key={l} className="block whitespace-nowrap">
      {line.split("").map((char) => {
        const n = index++;
        return (
          <span
            key={n}
            className={`transition-opacity duration-700 ${n < visibleLetters ? "opacity-100" : "opacity-0"}`}
          >
            {char}
          </span>
        );
      })}
    </span>
  ));

  const subtitleIn = stage >= 1;
  const flipped = stage < 2 || mirrored;

  const scrollTo = scrollToSection;

  return (
    <header
      id="top"
      data-hero
      className="sticky top-0 h-svh min-h-[36rem] overflow-hidden bg-gray-950 text-gray-300"
    >
      {/* Background: grid, glows, scanlines */}
      <div
        aria-hidden="true"
        className="rack-grid pointer-events-none absolute inset-0 text-white/[0.05]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[10vw] top-[15%] h-[70vmin] w-[70vmin] rounded-full bg-emerald-500/10 blur-[110px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[15vw] bottom-0 h-[60vmin] w-[80vmin] rounded-full bg-stone-400/10 blur-[110px]"
      />
      <div
        aria-hidden="true"
        className="scanlines pointer-events-none absolute inset-0"
      />

      <div className="hero-content relative mx-auto grid h-full max-w-7xl grid-rows-[auto_1fr_auto] px-4 pb-5 pt-16 sm:px-6 lg:pt-20">
        <div />

        <div className="grid items-center gap-6 lg:grid-cols-[1.35fr_0.65fr] lg:gap-10">
          {/* Animated rack (parallax: drifts down slower than the page) */}
          <div
            aria-hidden="true"
            style={{ translate: "0 calc(var(--hp, 0) * 14vh)" }}
            className="order-first flex justify-center lg:order-last"
          >
            <div className="rack-float relative">
              <div className="absolute inset-x-[10%] -bottom-4 h-8 rounded-[50%] bg-black/60 blur-xl" />
              <RackIllustration className="relative h-[24vh] w-auto drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)] sm:h-[30vh] lg:h-[min(62vh,36rem)]" />
            </div>
          </div>

          <div className="flex flex-col items-start gap-6 lg:gap-8">
            {/* Status chip */}
            <p
              className={`font-mono flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs text-gray-300 transition-all duration-700 sm:text-sm ${
                visibleLetters > 0 ? "opacity-100" : "translate-y-2 opacity-0"
              }`}
            >
              <span className="relative flex h-2.5 w-2.5 items-center justify-center">
                <span className="animate-ping-soft absolute h-2 w-2 rounded-full bg-emerald-400" />
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              {t("status")}
            </p>

            <div
              onMouseEnter={() => stage >= 2 && setMirrored(true)}
              onMouseLeave={() => setMirrored(false)}
              className="flex w-fit flex-col"
            >
              <h1
                aria-label={name}
                className="glow font-display text-[12.5vw] leading-[0.98] tracking-[0.06em] text-white sm:text-[9vw] lg:text-[6.2vw] xl:text-[5.6rem]"
              >
                {words}
              </h1>

              {/* Mirrored subtitle — flips into place, flips back on hover */}
              <div
                className={`font-mono mt-4 flex items-stretch justify-between gap-3 text-[4.4vw] leading-tight transition-all duration-1000 sm:text-[3vw] lg:text-[2vw] xl:text-[1.8rem] ${
                  subtitleIn
                    ? "translate-y-0 opacity-100"
                    : "-translate-y-full opacity-0"
                } ${flipped ? "-scale-x-100" : ""}`}
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
              className={`font-mono flex min-h-[2.6em] w-full max-w-xl justify-between gap-3 whitespace-nowrap text-[4.2vw] text-emerald-300/90 transition-opacity duration-1000 sm:text-[2.6vw] lg:text-[1.6vw] xl:text-[1.5rem] ${
                stage >= 3 ? "opacity-100" : "opacity-0"
              }`}
            >
              <span>
                <span className="text-gray-500">&gt; </span>
                {slogan1}
              </span>
              <span className="self-end">{slogan2}</span>
            </p>

            <div
              className={`flex w-full flex-col gap-3 transition-all duration-700 sm:w-auto sm:flex-row ${
                stage >= 3 ? "opacity-100" : "translate-y-3 opacity-0"
              }`}
            >
              <button
                onClick={() => scrollTo("projects")}
                className="font-mono group flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 text-base font-bold text-gray-950 shadow-[0_0_40px_rgba(255,255,255,0.25)] transition-all duration-200 hover:bg-emerald-300 hover:shadow-[0_0_50px_rgba(52,211,153,0.45)] sm:text-lg"
              >
                {t("ctaProjects")}
                <span
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </button>
              <button
                onClick={() => scrollTo("contact")}
                className="font-mono flex cursor-pointer items-center justify-center rounded-xl border border-white/20 bg-white/[0.03] px-7 py-3.5 text-base font-bold text-gray-200 transition-colors duration-200 hover:border-white/50 hover:bg-white/10 sm:text-lg"
              >
                {t("ctaContact")}
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={() => scrollTo("about")}
          aria-label={t("scroll")}
          className="mx-auto mt-4 flex cursor-pointer flex-col items-center gap-1 text-xs font-bold uppercase tracking-[0.2em] text-gray-500 transition-colors hover:text-gray-300"
        >
          <span className="font-mono hidden sm:block">{t("scroll")}</span>
          <svg
            className="animate-cue h-5 w-8"
            viewBox="0 0 40 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M4 4l16 14L36 4" />
          </svg>
        </button>
      </div>
    </header>
  );
}
