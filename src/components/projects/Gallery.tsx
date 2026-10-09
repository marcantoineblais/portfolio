"use client";

import Image from "next/image";
import React from "react";

import type { Shot } from "./DesktopSlideshow";

/** Native, touch-friendly scroll-snap gallery of phone screenshots. */
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
  const trackRef = React.useRef<HTMLDivElement | null>(null);
  const [index, setIndex] = React.useState(0);
  // Scroll positions the track can actually stop at. When several phones
  // fit on screen, the last ones can't reach the left edge, so they share
  // the final stop (the end of the track) instead of each getting a step.
  const [stops, setStops] = React.useState<number[]>([0]);

  const measure = React.useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const pad = parseFloat(getComputedStyle(track).paddingLeft);
    const max = track.scrollWidth - track.clientWidth;
    const next: number[] = [];
    for (const child of Array.from(track.children) as HTMLElement[]) {
      const stop = Math.min(Math.max(child.offsetLeft - pad, 0), max);
      const last = next[next.length - 1];
      if (last === undefined) next.push(stop);
      // Merge near-identical stops (keep the later one, but never lose 0)
      else if (stop - last <= 60 && next.length > 1)
        next[next.length - 1] = stop;
      else if (stop - last > 4) next.push(stop);
    }
    setStops(next.length ? next : [0]);
  }, []);

  const current = React.useCallback(
    (scrollLeft: number) => {
      let best = 0;
      stops.forEach((stop, i) => {
        if (Math.abs(stop - scrollLeft) < Math.abs(stops[best] - scrollLeft))
          best = i;
      });
      return best;
    },
    [stops],
  );

  React.useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => observer.disconnect();
  }, [measure]);

  const onScroll = () => {
    const track = trackRef.current;
    if (track) setIndex(current(track.scrollLeft));
  };

  const goTo = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const target = Math.min(Math.max(i, 0), stops.length - 1);
    setIndex(target);
    track.scrollTo({ left: stops[target], behavior: "smooth" });
  };

  return (
    <div className="flex flex-col gap-4">
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="no-scrollbar relative -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-4 px-4 pb-4 sm:-mx-6 sm:scroll-px-6 sm:px-6"
      >
        {shots.map((shot, i) => (
          <figure
            key={i}
            className="flex w-56 shrink-0 snap-start flex-col gap-3 sm:w-60"
          >
            <div className="overflow-hidden rounded-[1.6rem] border-[5px] border-stone-900 bg-stone-900 shadow-xl shadow-black/15">
              <Image
                src={shot.src}
                alt={shot.caption}
                sizes="240px"
                className="h-auto w-full rounded-[1.2rem]"
              />
            </div>
            <figcaption className="px-1 text-sm leading-snug text-gray-600">
              {shot.caption}
            </figcaption>
          </figure>
        ))}
      </div>

      <div
        className={`flex items-center justify-between gap-4 ${stops.length > 1 ? "" : "hidden"}`}
      >
        <div className="flex gap-1">
          {stops.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`${i + 1} / ${stops.length}`}
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
              onClick={() => goTo(index + dir)}
              aria-label={label}
              disabled={dir < 0 ? index === 0 : index === stops.length - 1}
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
    </div>
  );
}
