import { getTranslations } from "next-intl/server";

import catcam1 from "../../images/catcam/catcam1.png";
import catcam2 from "../../images/catcam/catcam2.png";
import catcam3 from "../../images/catcam/catcam3.png";
import catcam4 from "../../images/catcam/catcam4.png";
import scrabble2 from "../../images/scrabble/scrabble2.png";
import scrabble3 from "../../images/scrabble/scrabble3.png";
import scrabble4 from "../../images/scrabble/scrabble4.png";
import scrabble5 from "../../images/scrabble/scrabble5.png";
import CatcamImages from "../catcam/CatcamImages";
import NextCue from "../NextCue";
import ScrabbleImages from "../scrabble/ScrabbleImages";
import SectionHeader from "../SectionHeader";
import ProjectShowcase from "./ProjectShowcase";

type Feature = { title: string; text: string };

export default async function Projects() {
  const t = await getTranslations("projects");
  const tNav = await getTranslations("nav");

  const labels = {
    features: t("features"),
    stack: t("stack"),
    gallery: t("gallery"),
    prev: t("prev"),
    next: t("next"),
  };

  return (
    <>
      {/* La Catcam — keeps its original light gray / sky palette */}
      <section
        id="projects"
        data-scene
        className="scene relative bg-gray-100 text-gray-950"
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-16 px-4 pb-10 pt-20 sm:px-6 sm:pt-28">
          <SectionHeader index="02" label={t("label")} title={t("title")} />
          <ProjectShowcase
            number="02.1"
            name={t("catcam.name")}
            tagline={t("catcam.tagline")}
            description={t("catcam.description")}
            features={t.raw("catcam.features") as Feature[]}
            stack={[
              "nodejs",
              "typescript",
              "nextjs",
              "html",
              "css",
              "javascript",
              "tailwind",
            ]}
            visual={<CatcamImages alt={t("catcam.name")} />}
            floating={catcam1}
            gallery={[catcam3, catcam4, catcam1, catcam2]}
            accent="bg-sky-700"
            accentText="text-sky-700"
            cardClass="bg-white"
            labels={labels}
          />
          <NextCue href="#scrabble" label={t("nextProject")} />
        </div>
      </section>

      {/* Scrabble Cheetah — keeps its warm orange / emerald palette */}
      <section
        id="scrabble"
        data-scene
        className="scene relative bg-orange-50 text-gray-950"
      >
        <div className="mx-auto max-w-7xl px-4 pb-10 pt-20 sm:px-6 sm:pt-28">
          <ProjectShowcase
            number="02.2"
            name={t("scrabble.name")}
            tagline={t("scrabble.tagline")}
            description={t("scrabble.description")}
            features={t.raw("scrabble.features") as Feature[]}
            stack={[
              "spring",
              "springboot",
              "nodejs",
              "typescript",
              "nextjs",
              "html",
              "css",
              "javascript",
              "tailwind",
              "plsql",
            ]}
            visual={<ScrabbleImages alt={t("scrabble.name")} />}
            floating={scrabble2}
            gallery={[scrabble2, scrabble3, scrabble4, scrabble5]}
            reversed
            accent="bg-emerald-900"
            accentText="text-emerald-900"
            cardClass="bg-orange-100"
            labels={labels}
          />
          <NextCue href="#skills" label={tNav("skills")} />
        </div>
      </section>
    </>
  );
}
