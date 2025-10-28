import { ReactElement, useEffect, useMemo, useState } from "react";
import React from "react";
import ArrowButton from "../ui/ArrowButton";
import useCarousel from "@/src/hooks/useCarousel";

type CarouselProps = {
  children: ReactElement[];
  isLocked?: boolean;
} & React.ComponentProps<"div">;

export default function Carousel({ children, ...props }: CarouselProps) {
  const {
    width,
    itemsPerView,
    isResizing,
    selectedIndex,
    position,
    isScrolling,
    selectIndex,
    handleTouchStart,
    handleTouchEnd,
    handleTouchMove,
    containerRef,
  } = useCarousel({ children });

  // Chunk children based on itemsPerView
  const chunks = useMemo(() => {
    const result = [];
    for (let i = 0; i < children.length; i += itemsPerView) {
      result.push(children.slice(i, i + itemsPerView));
    }
    return result;
  }, [children, itemsPerView]);

  const widthPerChunk = useMemo(() => width / chunks.length, [width, chunks.length]);

  return (
    <div {...props}>
      <div
        ref={containerRef}
        className="relative pt-3 w-full h-full overflow-hidden"
      >
        <div
          className="relative h-full flex duration-500 data-scrolling:duration-0"
          style={{ width: `${width}px`, left: `${-position}px` }}
          data-scrolling={isResizing || isScrolling || undefined}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {chunks.map((chunk, i) => (
            <div
              key={i}
              className="px-24 h-full flex justify-center items-center gap-3"
              style={{ width: widthPerChunk, maxWidth: widthPerChunk }}
            >
              {chunk}
            </div>
          ))}
        </div>

        <div className="absolute left-0 bottom-1/2">
          <ArrowButton
            orientation="left"
            className="text-primary size-24"
            onClick={() => selectIndex(selectedIndex - 1)}
          />
        </div>

        <div className="absolute right-0 bottom-1/2">
          <ArrowButton
            orientation="right"
            className="text-primary size-24"
            onClick={() => selectIndex(selectedIndex + 1)}
          />
        </div>
      </div>

      <div className="py-3 w-full flex justify-center gap-3">
        {children.slice(0, children.length / itemsPerView).map((_, i) => (
          <button
            key={i}
            className="bg-default-foreground/15 size-5 rounded-full cursor-pointer hover:opacity-50 data-selected:bg-primary data-selected:hover:opacity-100"
            data-selected={selectedIndex === i || undefined}
            onClick={() => selectIndex(i)}
          ></button>
        ))}
      </div>
    </div>
  );
}
