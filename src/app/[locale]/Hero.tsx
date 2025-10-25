"use client";

import { anta, kode_mono } from "../../fonts";
import { twJoin, twMerge } from "tailwind-merge";
import Logo from "../../components/navbar/Logo";
import { useTranslations } from "next-intl";
import OpacityCascade from "../../components/animations/OpacityCascade";
import DropAndMirror from "../../components/animations/DropAndMirror";
import HackTyping from "../../components/animations/HackTyping";
import CustomButton from "../../components/ui/CustomButtom";
import { useMemo } from "react";
import useParallax from "@/src/hooks/useParallax";

export default function Hero({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const t = useTranslations("Hero");
  const { scrollTo } = useParallax();

  const name = useMemo(() => t("name"), [t]);
  const statement1 = useMemo(() => t("statement1"), [t]);
  const statement2 = useMemo(() => t("statement2"), [t]);
  const nameOpacityStepDelay = useMemo(() => 100, []);
  const titleDelay = useMemo(
    () => name.length * nameOpacityStepDelay + 500,
    [name, nameOpacityStepDelay]
  );
  const hackTypingStepDuration = useMemo(() => 100, []);
  const hackTypingDelay = useMemo(() => titleDelay + 2000, [titleDelay]);
  const hackTypingDelay2 = useMemo(
    () => hackTypingDelay + statement1.length * hackTypingStepDuration + 500,
    [hackTypingDelay, statement1, hackTypingStepDuration]
  );

  return (
    <div
      className={twMerge(
        "flex w-full h-full select-none bg-linear-to-br from-default to-default-foreground to-10%",
        className
      )}
      {...props}
    >
      <div className="container px-1 w-full mx-auto flex flex-col items-center gap-12">
        <div className="relative w-full flex flex-col gap-10 overflow-hidden">
          <div className="w-full flex justify-center">
            <Logo className="w-full text-default/10" />
          </div>

          <div className="absolute inset-0 flex flex-col justify-evenly items-center">
            <div className="flex flex-col">
              <h1
                className={twJoin(
                  "pb-1 h-full text-white text-center flex justify-between drop-shadow-[0_2px_8px_rgba(255,255,255,0.5)]",
                  "text-3xl sm:text-5xl lg:text-6xl xl:text-7xl",
                  anta.className
                )}
              >
                <OpacityCascade stepDelay={nameOpacityStepDelay}>
                  {name.split("")}
                </OpacityCascade>
              </h1>

              <OpacityCascade initialDelay={titleDelay}>
                <DropAndMirror initialDelay={titleDelay}>
                  <h2 className="flex flex-col gap-1.5 sm:text-3xl lg:text-4xl xl:text-5xl">
                    <div>{t("title1")}</div>
                    <div>{t("title2")}</div>
                  </h2>
                </DropAndMirror>
              </OpacityCascade>
            </div>

            <div
              className={twJoin(
                "flex flex-col justify-between items-center",
                kode_mono.className
              )}
            >
              <h2 className="h-[2.2em] flex justify-between gap-3 grow text-xl sm:text-2xl lg:text-3xl xl:text-4xl">
                <HackTyping
                  initialDelay={hackTypingDelay}
                  typingStepDuration={hackTypingStepDuration}
                >
                  {statement1}
                </HackTyping>
                <HackTyping
                  className="self-end"
                  initialDelay={hackTypingDelay2}
                  typingStepDuration={hackTypingStepDuration}
                >
                  {statement2}
                </HackTyping>
              </h2>
            </div>
          </div>
        </div>

        <div className="w-full px-3 flex flex-col gap-3">
          <h2 className={`text-lg sm:text-3xl ${kode_mono.className}`}>
            {t("learnMore")}
          </h2>
          <div className="w-full flex justify-start items-center gap-7">
            <CustomButton
              className="w-32 sm:w-40 shadow-lg shadow-white/10"
              onClick={() => scrollTo("projects")}
            >
              {t("btn.projects")}
            </CustomButton>
            <CustomButton
              color="secondary"
              className="w-32 sm:w-40 shadow-lg shadow-white/10"
              onClick={() => scrollTo("about")}
            >
              {t("btn.about")}
            </CustomButton>
            <CustomButton
              color="secondary"
              className="w-32 sm:w-40 shadow-lg shadow-white/10"
              onClick={() => scrollTo("contact")}
            >
              {t("btn.contact")}
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
}
