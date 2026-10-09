"use client";

import { useTranslations } from "next-intl";
import React from "react";

import { scrollToSection } from "../lib/scrollToSection";
import RackLogo from "./RackLogo";

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
  const name = "Marc-Antoine Blais";

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

  let index = 0;
  const words = name.split(" ").map((word, w) => (
    <span key={w} className="block whitespace-nowrap sm:inline">
      {word.split("").map((letter) => {
        const n = index++;
        return (
          <span
            key={n}
            className={`transition-opacity duration-700 ${n < visibleLetters ? "opacity-100" : "opacity-0"}`}
          >
            {letter}
          </span>
        );
      })}
      {w === 0 && (
        <span className="hidden sm:inline">
          {/* keep the space counted in the reveal */}
          <span
            className={`transition-opacity duration-700 ${index++ < visibleLetters ? "opacity-100" : "opacity-0"}`}
          >
            {" "}
          </span>
        </span>
      )}
    </span>
  ));

  const subtitleIn = stage >= 1;
  const flipped = stage < 2 || mirrored;

  const scrollTo = scrollToSection;

  return (
    <header
      id="top"
      data-hero
      className="sticky top-0 h-svh min-h-[34rem] overflow-hidden bg-gray-950 text-gray-300"
    >
      {/* Background layers */}
      <div
        aria-hidden="true"
        className="rack-grid pointer-events-none absolute inset-0 text-white/[0.04]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[60vmin] w-[90vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-stone-500/10 blur-3xl"
      />

      <div className="hero-content relative mx-auto flex h-full max-w-7xl flex-col justify-between px-4 pb-6 pt-20 sm:px-6">
        <div className="relative flex grow items-center justify-center">
          {/* The racks, drifting slower than the page (parallax) */}
          <div
            aria-hidden="true"
            style={{ translate: "0 calc(var(--hp, 0) * 18vh)" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <RackLogo
              double
              className="mx-auto w-[170%] max-w-none shrink-0 text-stone-900 sm:w-full sm:max-w-[min(100%,135vh)]"
            />
          </div>

          <div className="relative flex flex-col items-center gap-[6vh]">
            <div
              onMouseEnter={() => stage >= 2 && setMirrored(true)}
              onMouseLeave={() => setMirrored(false)}
              className="flex flex-col"
            >
              <h1
                aria-label={name}
                className="glow font-display text-center text-[10.5vw] leading-[1.05] tracking-[0.2em] text-white sm:text-[5.2vw] sm:tracking-[0.25em] xl:text-[4.3rem]"
              >
                {words}
              </h1>

              {/* Mirrored subtitle — flips into place, flips back on hover */}
              <div
                className={`font-mono mt-3 flex items-stretch justify-between gap-3 text-[4.6vw] leading-tight transition-all duration-1000 sm:text-[2.9vw] xl:text-[2.45rem] ${
                  subtitleIn
                    ? "translate-y-0 opacity-100"
                    : "-translate-y-full opacity-0"
                } ${flipped ? "-scale-x-100" : ""}`}
              >
                <div
                  aria-hidden="true"
                  className="grow -scale-x-100 text-right blur-[0.08em]"
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
              className={`font-mono flex min-h-[2.4em] w-full max-w-[42rem] justify-between gap-3 whitespace-nowrap text-[4.6vw] transition-opacity duration-1000 sm:text-[2.4vw] xl:text-[2rem] ${
                stage >= 3 ? "opacity-100" : "opacity-0"
              }`}
            >
              <span>{slogan1}</span>
              <span className="self-end">{slogan2}</span>
            </p>
          </div>
        </div>

        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-3">
            <p className="font-mono text-base sm:text-2xl">{t("learnMore")}</p>
            <div className="flex gap-3 sm:gap-5">
              <button
                onClick={() => scrollTo("about")}
                className="font-mono grow cursor-pointer rounded-lg border border-white/10 bg-stone-900 px-6 py-3 text-base shadow shadow-white/40 transition-colors duration-200 hover:bg-gray-300 hover:text-stone-900 sm:grow-0 sm:px-8 sm:text-xl"
              >
                {t("about")}
              </button>
              <button
                onClick={() => scrollTo("contact")}
                className="font-mono grow cursor-pointer rounded-lg border border-white/10 bg-stone-900 px-6 py-3 text-base shadow shadow-white/40 transition-colors duration-200 hover:bg-gray-300 hover:text-stone-900 sm:grow-0 sm:px-10 sm:text-xl"
              >
                {t("contact")}
              </button>
            </div>
          </div>

          <button
            onClick={() => scrollTo("projects")}
            className="group flex cursor-pointer flex-col items-center gap-1 self-center font-bold transition-opacity hover:opacity-75 sm:self-end"
          >
            <span className="text-sm sm:text-base">{t("scroll")}</span>
            <svg
              className="animate-cue h-6 w-10"
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
      </div>
    </header>
  );
}
