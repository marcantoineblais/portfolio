import Image from "next/image";
import type { CSSProperties } from "react";

import { STACK_ICONS } from "../../data/stackIcons";
import DesktopSlideshow, { type Shot } from "./DesktopSlideshow";
import Gallery from "./Gallery";

type Feature = { title: string; text: string };

export type ShowcaseLabels = {
  features: string;
  stack: string;
  architecture: string;
  gallery: string;
  prev: string;
  next: string;
};

export default function ProjectShowcase({
  number,
  name,
  kind,
  meta,
  tagline,
  description,
  link,
  features,
  architecture,
  stack,
  desktop,
  mobile,
  reversed = false,
  accent,
  accentText,
  cardClass,
  labels,
}: {
  number: string;
  name: string;
  /** "Client project" / "Personal project" badge */
  kind: string;
  /** Short context line under the badge, e.g. "Self-hosted · 2026" */
  meta?: string;
  tagline: string;
  description: string;
  /** The live app, e.g. "Visit lookaloft.com" */
  link?: { href: string; label: string };
  features: Feature[];
  architecture: string;
  stack: string[];
  desktop: Shot[];
  mobile: Shot[];
  reversed?: boolean;
  accent: string;
  accentText: string;
  cardClass: string;
  labels: ShowcaseLabels;
}) {
  const floating = mobile[0];

  return (
    <article className="relative flex flex-col gap-14 lg:gap-20">
      {/* Intro + visual */}
      <div className="grid items-center gap-12 *:min-w-0 lg:grid-cols-[1fr_1.35fr] lg:gap-16">
        <div
          data-reversed={reversed || undefined}
          className="flex flex-col gap-6 data-reversed:lg:order-2"
        >
          <div data-reveal className="flex flex-wrap items-center gap-3">
            <span className={`font-mono text-sm font-bold ${accentText}`}>
              {number}
            </span>
            <span className={`h-0.5 w-10 ${accent}`} />
            <span
              className={`rounded-full border border-current px-3 py-0.5 font-mono text-xs font-bold tracking-widest uppercase ${accentText}`}
            >
              {kind}
            </span>
          </div>
          <h3 data-reveal className="font-display text-4xl/tight sm:text-5xl">
            {name}
          </h3>
          {meta && (
            <p
              data-reveal
              className="-mt-3 font-mono text-sm text-gray-500 sm:text-base"
            >
              {meta}
            </p>
          )}
          <p
            data-reveal
            style={{ "--delay": "80ms" } as CSSProperties}
            className="text-xl/snug font-semibold sm:text-2xl"
          >
            {tagline}
          </p>
          <p
            data-reveal
            style={{ "--delay": "140ms" } as CSSProperties}
            className="text-base/relaxed text-gray-700 sm:text-lg"
          >
            {description}
          </p>
          {link && (
            <a
              data-reveal
              style={{ "--delay": "200ms" } as CSSProperties}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex w-full items-center justify-center gap-3 self-start rounded-xl bg-gray-900 px-6 py-3.5 font-mono text-base font-bold text-white shadow-xl shadow-gray-900/20 transition-colors hover:bg-stone-800 sm:w-auto"
            >
              {link.label}
              <span
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              >
                ↗
              </span>
            </a>
          )}
        </div>

        {/* Desktop slideshow with a floating phone (layered parallax) */}
        <div className="relative">
          <div
            aria-hidden="true"
            className={`absolute -inset-8 rounded-[3rem] opacity-15 blur-3xl ${accent}`}
          />
          <div data-speed="0.04">
            <div data-reveal="zoom" className="relative mr-8 sm:mr-14">
              <DesktopSlideshow shots={desktop} title={name} accent={accent} />
            </div>
          </div>
          {floating && (
            <div className="pointer-events-none absolute right-0 -bottom-6 w-[27%] max-w-40 sm:-bottom-10">
              <div data-speed="-0.1">
                <div
                  data-reveal="right"
                  style={{ "--delay": "250ms" } as CSSProperties}
                  className="overflow-hidden rounded-[1.3rem] border-4 border-stone-900 bg-stone-900 shadow-2xl shadow-black/40"
                >
                  <Image
                    src={floating.src}
                    alt=""
                    aria-hidden="true"
                    sizes="160px"
                    className="h-auto w-full rounded-[0.95rem]"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Features */}
      <div className="flex flex-col gap-4">
        <h4 className="font-mono text-sm font-bold tracking-widest uppercase opacity-70">
          {labels.features}
        </h4>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <li
              key={i}
              data-reveal
              style={{ "--delay": `${i * 80}ms` } as CSSProperties}
              className={`rounded-2xl p-5 shadow-md shadow-black/5 transition-shadow duration-300 hover:shadow-xl ${cardClass}`}
            >
              <p className="mb-2 flex items-center gap-2 font-mono text-sm font-bold">
                <span className={`size-2 shrink-0 rounded-full ${accent}`} />
                {feature.title}
              </p>
              <p className="text-sm/relaxed text-gray-700">{feature.text}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* How it's built + stack */}
      <div className="grid gap-8 *:min-w-0 lg:grid-cols-2 lg:gap-16">
        <div data-reveal className="flex flex-col gap-3">
          <h4 className="font-mono text-sm font-bold tracking-widest uppercase opacity-70">
            {labels.architecture}
          </h4>
          <p className="leading-relaxed text-gray-700">{architecture}</p>
        </div>
        <div
          data-reveal
          style={{ "--delay": "100ms" } as CSSProperties}
          className="flex flex-col gap-3"
        >
          <h4 className="font-mono text-sm font-bold tracking-widest uppercase opacity-70">
            {labels.stack}
          </h4>
          <ul className="flex flex-wrap gap-2">
            {stack.map((tech) => {
              const icon = STACK_ICONS[tech];
              return (
                <li
                  key={tech}
                  className="flex items-center gap-2 rounded-full border border-black/10 bg-white/80 py-1 pr-3 pl-2 text-sm font-semibold shadow-sm"
                >
                  {icon ? (
                    <svg
                      viewBox="0 0 24 24"
                      className="size-4"
                      fill={icon.hex}
                      aria-hidden="true"
                    >
                      <path d={icon.path} />
                    </svg>
                  ) : (
                    <span
                      className={`size-2 rounded-full ${accent}`}
                      aria-hidden="true"
                    />
                  )}
                  {tech}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Phone screenshots */}
      <div data-reveal className="flex flex-col gap-4">
        <h4 className="font-mono text-sm font-bold tracking-widest uppercase opacity-70">
          {labels.gallery}
        </h4>
        <Gallery
          shots={mobile}
          prevLabel={labels.prev}
          nextLabel={labels.next}
          accent={accent}
        />
      </div>
    </article>
  );
}
