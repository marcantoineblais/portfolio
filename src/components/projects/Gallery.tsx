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
  const [overflowing, setOverflowing] = React.useState(true);

  React.useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const check = () =>
      setOverflowing(track.scrollWidth > track.clientWidth + 4);
    const observer = new ResizeObserver(check);
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const children = Array.from(track.children) as HTMLElement[];
    const left = track.scrollLeft + track.clientWidth / 2;
    let current = 0;
    children.forEach((child, i) => {
      if (child.offsetLeft <= left) current = i;
    });
    setIndex(current);
  };

  const go = (dir: number) => {
    const track = trackRef.current;
    if (!track) return;
    const target = Math.min(Math.max(index + dir, 0), shots.length - 1);
    const child = track.children[target] as HTMLElement | undefined;
    if (child)
      track.scrollTo({
        left:
          child.offsetLeft - parseFloat(getComputedStyle(track).paddingLeft),
        behavior: "smooth",
      });
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
        className={`flex items-center justify-between gap-4 ${overflowing ? "" : "hidden"}`}
      >
        <div className="flex gap-2" aria-hidden="true">
          {shots.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === index ? `w-8 ${accent}` : "w-1.5 bg-black/20"
              }`}
            />
          ))}
        </div>
        <div className="hidden gap-2 sm:flex">
          {[
            { dir: -1, label: prevLabel, d: "M15 5l-7 7 7 7" },
            { dir: 1, label: nextLabel, d: "M9 5l7 7-7 7" },
          ].map(({ dir, label, d }) => (
            <button
              key={dir}
              onClick={() => go(dir)}
              aria-label={label}
              disabled={dir < 0 ? index === 0 : index === shots.length - 1}
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
