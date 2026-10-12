"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import React from "react";

import ArrowButton from "./ArrowButton";
import type { Shot } from "./DesktopSlideshow";

/**
 * Row of phone screenshots, powered by Embla. Dots are the positions the row
 * can scroll to (one per picture on phones); controls hide when everything
 * fits on screen. Their row always keeps its height, so the page doesn't
 * shift once Embla has measured it.
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
    emblaApi.on("select", update);
    emblaApi.on("reInit", update);
    return () => {
      emblaApi.off("select", update);
      emblaApi.off("reInit", update);
    };
  }, [emblaApi]);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <div className="flex flex-col gap-4">
      <div
        ref={emblaRef}
        data-gallery
        className="-mx-4 overflow-hidden px-4 pt-2 pb-4 sm:-mx-6 sm:px-6"
      >
        <div className="flex touch-pan-y gap-5">
          {shots.map((shot, i) => (
            <figure
              key={i}
              className="flex w-56 shrink-0 flex-col gap-3 select-none sm:w-60"
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
              <figcaption className="px-1 text-sm/snug text-gray-600">
                {shot.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div
        data-hidden={snaps.length < 2 || undefined}
        className="flex min-h-6 items-center justify-between gap-4 data-hidden:invisible sm:min-h-11"
      >
        <div className="flex gap-1">
          {snaps.map((_, i) => {
            const scrollTo = () => emblaApi?.scrollTo(i);
            return (
              <button
                key={i}
                onClick={scrollTo}
                aria-label={`${i + 1} / ${snaps.length}`}
                aria-current={i === index}
                className="flex h-6 cursor-pointer items-center px-0.5"
              >
                <span
                  data-active={i === index || undefined}
                  className={`block size-1.5 rounded-full transition-all duration-500 not-data-active:bg-black/20 data-active:w-8 ${accent}`}
                />
              </button>
            );
          })}
        </div>
        <div className="hidden gap-2 sm:flex">
          <ArrowButton
            label={prevLabel}
            path="M15 5l-7 7 7 7"
            disabled={!canPrev}
            onClick={scrollPrev}
          />
          <ArrowButton
            label={nextLabel}
            path="M9 5l7 7-7 7"
            disabled={!canNext}
            onClick={scrollNext}
          />
        </div>
      </div>
    </div>
  );
}
