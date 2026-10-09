"use client";

import Image, { type StaticImageData } from "next/image";
import React from "react";

export type Shot = { src: StaticImageData; caption: string };

/** Desktop screenshots in a browser-style frame, cross-fading on a timer. */
export default function DesktopSlideshow({
  shots,
  title,
  accent,
}: {
  shots: Shot[];
  title: string;
  accent: string;
}) {
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const touch = React.useRef<{ x: number; y: number } | null>(null);

  // Swipe left/right on touch screens to change screenshot
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touch.current = { x: t.clientX, y: t.clientY };
    setPaused(true);
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touch.current;
    touch.current = null;
    setPaused(false);
    if (!start) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;
    setIndex((i) => (i + (dx < 0 ? 1 : -1) + shots.length) % shots.length);
  };

  React.useEffect(() => {
    if (paused || shots.length < 2) return;
    const timer = setTimeout(
      () => setIndex((i) => (i + 1) % shots.length),
      5000,
    );
    return () => clearTimeout(timer);
  }, [index, paused, shots.length]);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="flex flex-col gap-3"
    >
      <div className="overflow-hidden rounded-xl border border-black/10 bg-white shadow-2xl shadow-black/25 sm:rounded-2xl">
        {/* Browser chrome */}
        <div className="flex items-center gap-3 border-b border-black/10 bg-stone-100 px-3 py-2 sm:px-4">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </span>
          <span className="font-mono mx-auto max-w-[60%] truncate rounded-md bg-white px-3 py-0.5 text-center text-[0.7rem] text-gray-500 sm:text-xs">
            {title}
          </span>
          <span className="w-[42px]" aria-hidden="true" />
        </div>

        <div
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          className="relative aspect-[16/10] touch-pan-y bg-stone-900"
        >
          {shots.map((shot, i) => (
            <Image
              key={i}
              src={shot.src}
              alt={shot.caption}
              sizes="(min-width: 1024px) 50vw, 95vw"
              className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-1000 ${
                i === index ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 pl-1 pr-[30%]">
        <div className="flex shrink-0 gap-1.5">
          {shots.map((shot, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={shot.caption}
              aria-current={i === index}
              className={`h-1.5 cursor-pointer rounded-full transition-all duration-500 ${
                i === index
                  ? `w-7 ${accent}`
                  : "w-1.5 bg-black/20 hover:bg-black/40"
              }`}
            />
          ))}
        </div>
        <p
          key={index}
          className="truncate text-sm text-gray-600 animate-[fade-in_600ms_ease]"
        >
          {shots[index]?.caption}
        </p>
      </div>
    </div>
  );
}
