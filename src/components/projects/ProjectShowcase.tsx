import Image, { type StaticImageData } from "next/image";
import type { CSSProperties, ReactNode } from "react";

import { TECH, type TechKey } from "../../data/tech";
import Gallery from "./Gallery";

type Feature = { title: string; text: string };

export default function ProjectShowcase({
  number,
  name,
  tagline,
  description,
  features,
  stack,
  visual,
  floating,
  gallery,
  reversed = false,
  accent,
  accentText,
  cardClass,
  labels,
}: {
  number: string;
  name: string;
  tagline: string;
  description: string;
  features: Feature[];
  stack: TechKey[];
  /** Main animated visual (light/dark crossfade, board animation...) */
  visual: ReactNode;
  /** A phone screenshot floating over the visual with a different parallax speed */
  floating: StaticImageData;
  gallery: StaticImageData[];
  reversed?: boolean;
  accent: string;
  accentText: string;
  cardClass: string;
  labels: {
    features: string;
    stack: string;
    gallery: string;
    prev: string;
    next: string;
  };
}) {
  return (
    <article className="relative flex flex-col gap-14">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 [&>*]:min-w-0">
        {/* Visual with layered parallax */}
        <div
          className={`relative mx-auto w-full max-w-md lg:max-w-[34rem] ${reversed ? "lg:order-2" : ""}`}
        >
          <div
            aria-hidden="true"
            className={`absolute -inset-6 rounded-[2.5rem] opacity-15 blur-2xl ${accent}`}
          />
          <div data-speed="0.05">
            <div
              data-reveal="zoom"
              className="relative mr-10 overflow-hidden rounded-2xl border border-black/10 bg-white shadow-2xl shadow-black/20 sm:mr-16"
            >
              {visual}
            </div>
          </div>
          <div className="absolute -bottom-8 right-0 w-[34%] max-w-44">
            <div data-speed="-0.12">
              <div
                data-reveal="right"
                style={{ "--delay": "250ms" } as CSSProperties}
                className="overflow-hidden rounded-[1.4rem] border-4 border-stone-900 bg-stone-900 shadow-2xl shadow-black/40"
              >
                <Image
                  src={floating}
                  alt=""
                  aria-hidden="true"
                  sizes="180px"
                  className="h-auto w-full rounded-[1rem]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="flex flex-col gap-6">
          <div data-reveal className="flex items-center gap-4">
            <span className={`font-mono text-sm font-bold ${accentText}`}>
              {number}
            </span>
            <span className={`h-0.5 w-12 ${accent}`} />
          </div>
          <h3
            data-reveal
            className="font-display text-4xl leading-tight sm:text-5xl"
          >
            {name}
          </h3>
          <p
            data-reveal
            style={{ "--delay": "80ms" } as CSSProperties}
            className="text-xl font-semibold sm:text-2xl"
          >
            {tagline}
          </p>
          <p
            data-reveal
            style={{ "--delay": "140ms" } as CSSProperties}
            className="text-base leading-relaxed text-gray-700 sm:text-lg"
          >
            {description}
          </p>

          <h4 className="sr-only">{labels.features}</h4>
          <ul className="grid gap-3 sm:grid-cols-2">
            {features.map((feature, i) => (
              <li
                key={i}
                data-reveal
                style={{ "--delay": `${180 + i * 80}ms` } as CSSProperties}
                className={`rounded-xl p-4 shadow-md shadow-black/5 transition-shadow duration-300 hover:shadow-xl ${cardClass}`}
              >
                <p className="font-mono mb-1 flex items-center gap-2 text-sm font-bold">
                  <span className={`h-2 w-2 rounded-full ${accent}`} />
                  {feature.title}
                </p>
                <p className="text-sm leading-relaxed text-gray-700">
                  {feature.text}
                </p>
              </li>
            ))}
          </ul>

          <div data-reveal className="flex flex-col gap-3">
            <h4 className="font-mono text-sm font-bold uppercase tracking-widest opacity-70">
              {labels.stack}
            </h4>
            <ul className="flex flex-wrap gap-2">
              {stack.map((key) => (
                <li
                  key={key}
                  className="flex items-center gap-2 rounded-full border border-black/10 bg-white/70 py-1 pl-1.5 pr-3 text-sm font-semibold shadow-sm"
                >
                  <Image
                    src={TECH[key].logo}
                    alt=""
                    sizes="40px"
                    className="h-5 w-5 object-contain"
                  />
                  {TECH[key].name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div data-reveal className="flex flex-col gap-4">
        <h4 className="font-mono text-sm font-bold uppercase tracking-widest opacity-70">
          {labels.gallery}
        </h4>
        <Gallery
          images={gallery}
          alt={name}
          prevLabel={labels.prev}
          nextLabel={labels.next}
          accent={accent}
        />
      </div>
    </article>
  );
}
