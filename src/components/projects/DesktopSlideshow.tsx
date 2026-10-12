"use client";

import Image, { type StaticImageData } from "next/image";
import React from "react";

import { useInView } from "../../lib/useInView";

export type Shot = { src: StaticImageData; caption: string };

/**
 * Desktop screenshots in a browser-style frame, cross-fading on a timer.
 * The timer only runs near the screen, and a screenshot is only loaded once
 * it's shown or next in line.
 */
export default function DesktopSlideshow({
  shots,
  title,
  accent,
}: {
  shots: Shot[];
  title: string;
  accent: string;
}) {
  const count = shots.length;
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const [mounted, setMounted] = React.useState(() => new Set([0, 1 % count]));
  const [frameRef, inView] = useInView<HTMLDivElement>("200px");
  const touch = React.useRef<{ x: number; y: number } | null>(null);

  // Show a screenshot, and get the one after it ready for the cross-fade
  const show = React.useCallback(
    (i: number) => {
      setIndex(i);
      setMounted((current) => {
        const next = new Set(current);
        next.add(i);
        next.add((i + 1) % count);
        return next;
      });
    },
    [count],
  );

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

    let step = -1;
    if (dx < 0) step = 1;
    show((index + step + count) % count);
  };

  React.useEffect(() => {
    if (paused || !inView || count < 2) return;
    const advance = () => show((index + 1) % count);
    const timer = setTimeout(advance, 5000);
    return () => clearTimeout(timer);
  }, [index, paused, inView, count, show]);

  const pause = () => setPaused(true);
  const resume = () => setPaused(false);

  return (
    <div
      onMouseEnter={pause}
      onMouseLeave={resume}
      className="flex flex-col gap-3"
    >
      <div className="overflow-hidden rounded-xl border border-black/10 bg-white shadow-2xl shadow-black/25 sm:rounded-2xl">
        {/* Browser chrome */}
        <div className="flex items-center gap-3 border-b border-black/10 bg-stone-100 px-3 py-2 sm:px-4">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-[#ff5f57]" />
            <span className="size-2.5 rounded-full bg-[#febc2e]" />
            <span className="size-2.5 rounded-full bg-[#28c840]" />
          </span>
          <span className="mx-auto max-w-[60%] truncate rounded-md bg-white px-3 py-0.5 text-center font-mono text-[0.7rem] text-gray-500 sm:text-xs">
            {title}
          </span>
          <span className="w-[42px]" aria-hidden="true" />
        </div>

        <div
          ref={frameRef}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          className="relative aspect-16/10 touch-pan-y bg-stone-900"
        >
          {shots.map((shot, i) => {
            if (!mounted.has(i)) return null;
            return (
              <Image
                key={i}
                src={shot.src}
                alt={shot.caption}
                sizes="(min-width: 1024px) 50vw, 95vw"
                data-active={i === index || undefined}
                className="absolute inset-0 size-full object-cover object-top opacity-0 transition-opacity duration-1000 data-active:opacity-100"
              />
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-3 pr-[30%] pl-1">
        <div className="flex shrink-0 gap-1.5">
          {shots.map((shot, i) => {
            const showShot = () => show(i);
            return (
              <button
                key={i}
                onClick={showShot}
                aria-label={shot.caption}
                aria-current={i === index}
                data-active={i === index || undefined}
                className={`size-1.5 cursor-pointer rounded-full transition-all duration-500 not-data-active:bg-black/20 not-data-active:hover:bg-black/40 data-active:w-7 ${accent}`}
              />
            );
          })}
        </div>
        <p
          key={index}
          className="animate-fade-in truncate text-sm text-gray-600"
        >
          {shots[index]?.caption}
        </p>
      </div>
    </div>
  );
}
