"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import React from "react";

import type { Shot } from "./DesktopSlideshow";

/**
 * Row of phone screenshots, powered by Embla. Dots are the positions the row
 * can scroll to (one per picture on phones); controls hide when everything
 * fits on screen.
 */
export default function Gallery({
  shots,
  prevLabel,
  nextLabel,
  accent,
}: {
  shots: Shot[];
  prevLabel: string;
  nextLabel: string;
  accent: string;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    skipSnaps: false,
  });
  const [snaps, setSnaps] = React.useState<number[]>([]);
  const [index, setIndex] = React.useState(0);
  const [canPrev, setCanPrev] = React.useState(false);
  const [canNext, setCanNext] = React.useState(false);

  React.useEffect(() => {
    if (!emblaApi) return;
    const update = () => {
      setSnaps(emblaApi.scrollSnapList());
      setIndex(emblaApi.selectedScrollSnap());
      setCanPrev(emblaApi.canScrollPrev());
      setCanNext(emblaApi.canScrollNext());
    };
    update();
    emblaApi.on("select", update).on("reInit", update);
    return () => {
      emblaApi.off("select", update).off("reInit", update);
    };
  }, [emblaApi]);

  return (
    <div className="flex flex-col gap-4">
      <div
        ref={emblaRef}
        data-gallery
        className="-mx-4 overflow-hidden px-4 pb-4 pt-2 sm:-mx-6 sm:px-6"
      >
        <div className="flex touch-pan-y gap-5">
          {shots.map((shot, i) => (
            <figure
              key={i}
              className="flex w-56 shrink-0 select-none flex-col gap-3 sm:w-60"
            >
              <div className="overflow-hidden rounded-[1.6rem] border-[5px] border-stone-900 bg-stone-900 shadow-xl shadow-black/15">
                <Image
                  src={shot.src}
                  alt={shot.caption}
                  sizes="240px"
                  draggable={false}
                  className="pointer-events-none h-auto w-full rounded-[1.2rem]"
                />
              </div>
              <figcaption className="px-1 text-sm leading-snug text-gray-600">
                {shot.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {snaps.length > 1 && (
        <div className="flex items-center justify-between gap-4">
          <div className="flex gap-1">
            {snaps.map((_, i) => (
              <button
                key={i}
                onClick={() => emblaApi?.scrollTo(i)}
                aria-label={`${i + 1} / ${snaps.length}`}
                aria-current={i === index}
                className="flex h-6 cursor-pointer items-center px-0.5"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all duration-500 ${
                    i === index ? `w-8 ${accent}` : "w-1.5 bg-black/20"
                  }`}
                />
              </button>
            ))}
          </div>
          <div className="hidden gap-2 sm:flex">
            {[
              { dir: -1, label: prevLabel, d: "M15 5l-7 7 7 7" },
              { dir: 1, label: nextLabel, d: "M9 5l7 7-7 7" },
            ].map(({ dir, label, d }) => (
              <button
                key={dir}
                onClick={() =>
                  dir < 0 ? emblaApi?.scrollPrev() : emblaApi?.scrollNext()
                }
                aria-label={label}
                disabled={dir < 0 ? !canPrev : !canNext}
                className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border-2 border-current transition-all hover:bg-gray-900 hover:text-white disabled:cursor-default disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-current"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d={d} />
                </svg>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
