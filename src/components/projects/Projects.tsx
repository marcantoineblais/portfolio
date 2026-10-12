import { getLocale, getTranslations } from "next-intl/server";

import { PROJECTS } from "../../data/projects";
import { sectionHref } from "../../lib/sectionHref";
import NextCue from "../NextCue";
import Scene from "../Scene";
import SectionHeader from "../SectionHeader";
import ProjectShowcase from "./ProjectShowcase";

type Feature = { title: string; text: string };

/**
 * One stacked "scene" per project. The first scene carries the section
 * header and the #projects anchor; the others are anchored by their slug.
 */
export default async function Projects() {
  const t = await getTranslations("projects");
  const tNav = await getTranslations("nav");
  const locale = await getLocale();

  const labels = {
    features: t("features"),
    stack: t("stack"),
    architecture: t("architecture"),
    gallery: t("gallery"),
    prev: t("prev"),
    next: t("next"),
  };

  return (
    <>
      {PROJECTS.map((project, i) => {
        const key = `items.${project.slug}`;
        const captions = t.raw(`${key}.captions`) as Record<string, string>;
        const next = PROJECTS[i + 1];

        return (
          <Scene
            key={project.slug}
            id={i === 0 ? "projects" : project.slug}
            nav="projects"
            className={`text-gray-950 ${project.bg}`}
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-16 px-4 pt-20 pb-10 sm:px-6 sm:pt-28">
              {i === 0 && (
                <SectionHeader
                  index="02"
                  label={t("label")}
                  title={t("title")}
                  intro={t("intro")}
                />
              )}
              <ProjectShowcase
                number={`02.${i + 1}`}
                name={t(`${key}.name`)}
                kind={
                  project.kind === "client"
                    ? t("kindClient")
                    : t("kindPersonal")
                }
                meta={t(`${key}.meta`)}
                tagline={t(`${key}.tagline`)}
                description={t(`${key}.description`)}
                features={t.raw(`${key}.features`) as Feature[]}
                architecture={t(`${key}.architecture`)}
                stack={project.stack}
                desktop={project.desktop.map((shot) => ({
                  src: shot.src,
                  caption: captions[shot.key] ?? "",
                }))}
                mobile={project.mobile.map((shot) => ({
                  src: shot.src,
                  caption: captions[shot.key] ?? "",
                }))}
                reversed={i % 2 === 1}
                accent={project.accent}
                accentText={project.accentText}
                cardClass={project.card}
                labels={labels}
              />
              {next ? (
                <NextCue href={`#${next.slug}`} label={t("nextProject")} />
              ) : (
                <NextCue
                  href={sectionHref(locale, "skills")}
                  section="skills"
                  label={tNav("skills")}
                />
              )}
            </div>
          </Scene>
        );
      })}
    </>
  );
}
