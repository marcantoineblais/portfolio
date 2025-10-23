"use client";

import React, { ReactNode, useEffect, useRef, useState } from "react";
import { anta, kode_mono } from "../fonts";
import DownArrow from "./DownArrow";
import { twJoin } from "tailwind-merge";
import Logo from "./navbar/Logo";
import { Link } from "../i18n/navigation";
import { useTranslations } from "next-intl";
import OpacityCascade from "./transitions/OpacityCascade";
import DropAndMirror from "./transitions/DropAndMirror";

export default function Hero() {
  const [statementPart1, setStatementPart1] = useState<string>("");
  const [statementPart2, setStatementPart2] = useState<string>("");

  const t = useTranslations("Hero");
  const name = t("name");
  const title = t("title");
  const statement1 = t("statementPart1");
  const statement2 = t("statementPart2");
  const opacityStepDelay = 100;

  // useEffect(() => {
  //   const name = "Marc Antoine Blais";
  //   const letters = name.split("");
  //   const spans = letters.map((letter, i) => (
  //     <span
  //       key={i}
  //       className={`opacity-0 duration-1000 ${
  //         i === letters.length - 1 && "tracking-normal!"
  //       }`}
  //     >
  //       {letter}
  //     </span>
  //   ));

  //   setLettersSpan(spans);
  // }, []);

  // useEffect(() => {
  //   if (
  //     lettersSpan.length === 0
  //   )
  //     return;

  //   let i = 0;
  //   const statementPart1 = "Votre vision,".split("");
  //   const statementPart2 = "Notre réalisation.".split("");
  //   const symbols = "!@#$%&[]{}".split("");

    // const interval = setInterval((): void => {
    //   if (i < spans.length) spans[i++].classList.remove("opacity-0");
    //   else clearInterval(interval);
    // }, 100);

    // setTimeout((): void => {
    //   subtitle.classList.remove("opacity-0", "-translate-y-full");
    // }, 2500);

    // setTimeout((): void => {
    //   subtitle.classList.remove("-scale-x-100");
    // }, 3500);

    // setTimeout((): void => {
    //   slogan.classList.remove("opacity-0");
    // }, 5000);

    // setTimeout(() => {
    //   let i = 0;
    //   let text = "";

    //   const textUpdateInterval = setInterval(() => {
    //     if (i < textSlogan1.length) {
    //       text += textSlogan1[i++];
    //     } else {
    //       clearInterval(textUpdateInterval);
    //       clearInterval(symbolChangeInterval);
    //       setSlogan1(text);
    //     }
    //   }, 100);

    //   const symbolChangeInterval = setInterval(() => {
    //     const random = Math.floor(Math.random() * symbols.length);
    //     setSlogan1(text + symbols[random]);
    //   }, 10);
    // }, 6000);

  //   setTimeout(() => {
  //     let i = 0;
  //     let text = "";

  //     const textUpdateInterval = setInterval(() => {
  //       if (i < textSlogan2.length) {
  //         text += textSlogan2[i++];
  //       } else {
  //         clearInterval(textUpdateInterval);
  //         clearInterval(symbolChangeInterval);
  //         setSlogan2(text);
  //       }
  //     }, 100);

  //     const symbolChangeInterval = setInterval(() => {
  //       const random = Math.floor(Math.random() * symbols.length);
  //       setSlogan2(text + symbols[random]);
  //     }, 10);
  //   }, 8000);
  // }, [lettersSpan]);

  return (
    <div className="flex w-full h-full text-gray-300 overflow-y-auto">
      <div className="container px-1 w-full mx-auto flex flex-col justify-between items-center gap-12">
        <div className="relative w-full flex flex-col gap-10">
          <div className="-z-10 absolute top-0 w-full flex justify-center">
            <Logo className="w-full text-stone-900" />
          </div>

          <div className="flex flex-col justify-evenly items-center">
            <div className="flex flex-col">
              <h1
                className={twJoin(
                  "pb-1 h-full text-white text-center drop-shadow-[0_2px_8px_rgba(255,255,255,0.5)]",
                  "text-3xl sm:text-5xl lg:text-6xl xl:text-7xl",
                  anta.className
                )}
              >
                <OpacityCascade stepDelay={opacityStepDelay}>{name.split("")}</OpacityCascade>
              </h1>

              <OpacityCascade initialDelay={name.length * opacityStepDelay} transistionDuration={200}>
                <DropAndMirror initialDelay={name.length * opacityStepDelay}>
                  <h2 className="flex flex-col gap-1.5 sm:text-3xl lg:text-4xl xl:text-5xl">
                    <div>Développeur web</div>
                    <div>Full-Stack</div>
                  </h2>
                </DropAndMirror>
              </OpacityCascade>
            </div>

            <div
              className={twJoin(
                "flex flex-col justify-between items-center opacity-0 duration-1000",
                kode_mono.className
              )}
            >
              <h2 className="h-[2.2em] flex justify-between gap-3 grow">
                <span>{statementPart1}</span>
                <span className="self-end">{statementPart2}</span>
              </h2>
            </div>
          </div>
        </div>

        <div className="w-full px-3 flex flex-col gap-3">
          <h2 className={`text-lg sm:text-3xl ${kode_mono.className}`}>
            Pour en savoir plus
          </h2>
          <div className="w-full flex justify-start items-center gap-7">
            <button
              className={`py-3 px-8 text-base sm:text-xl bg-stone-900 rounded cursor-pointer duration-200 shadow shadow-white/50 hover:text-stone-900 hover:bg-gray-300 ${kode_mono.className}`}
            >
              <Link href={"/about"}>À propos</Link>
            </button>
            <button
              className={`py-3 px-10 text-base sm:text-xl bg-stone-900 rounded cursor-pointer duration-200 shadow shadow-white/50 hover:text-stone-900 hover:bg-gray-300 ${kode_mono.className}`}
            >
              <Link href="/contact">Contact</Link>
            </button>
          </div>
        </div>
      </div>

      {/* <DownArrow
        text="Voir les réalisations"
        action={() => scrollToProjects()}
        disabled={opacity < 1}
      /> */}
    </div>
  );
}
