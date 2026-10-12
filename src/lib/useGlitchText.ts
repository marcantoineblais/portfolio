import React from "react";

const SYMBOLS = "!@#$%&[]{}<>/".split("");

/**
 * Types a string one character at a time with a scrambling last character.
 * Cleared while `active` is false, and typed again on each new `run`.
 */
export function useGlitchText(
  text: string,
  startDelay: number,
  active: boolean,
  run: number,
) {
  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    // Hidden (scrolled away): clear the text so it types again on return
    if (!active) {
      const clear = setTimeout(() => setValue(""), 0);
      return () => clearTimeout(clear);
    }
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let typing: ReturnType<typeof setInterval>;
    let scramble: ReturnType<typeof setInterval>;
    let typed = "";
    let i = 0;

    const type = () => {
      if (i < text.length) {
        typed += text[i++];
        return;
      }
      clearInterval(typing);
      clearInterval(scramble);
      setValue(text);
    };
    const scrambleLast = () => {
      const random = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
      setValue(typed + random);
    };
    const begin = () => {
      if (reduced) return setValue(text);
      typing = setInterval(type, 70);
      scramble = setInterval(scrambleLast, 16);
    };

    let delay = startDelay;
    if (reduced) delay = 0;
    const start = setTimeout(begin, delay);

    return () => {
      clearTimeout(start);
      clearInterval(typing);
      clearInterval(scramble);
    };
  }, [text, startDelay, active, run]);

  return value;
}
