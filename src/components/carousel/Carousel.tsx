import { ReactElement, useEffect, useState } from "react";
import React from "react";
import useScroller from "@/src/hooks/useCarousel";
import ArrowButton from "../ui/ArrowButton";

type CarouselProps = {
  children: ReactElement[];
  isLocked?: boolean;
} & React.ComponentProps<"div">;

export default function Carousel({ children, ...props }: CarouselProps) {
  const {
    width,
    isResizing,
    selectedIndex,
    position,
    isScrolling,
    selectIndex,
    handleTouchStart,
    handleTouchEnd,
    handleTouchMove,
    containerRef,
  } = useScroller({ children });
  console.log(position);
  
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
          {children.map((child, i) => (
            <div
              className="h-full"
              style={{ width: `${width / children.length}px` }}
              key={i}
            >
              {child}
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
        {children.map((_, i) => (
          <button
            key={i}
            className="bg-default-foreground/50 size-5 rounded-full cursor-pointer hover:opacity-50 data-selected:bg-primary"
            data-selected={selectedIndex === i || undefined}
            onClick={() => selectIndex(i)}
          ></button>
        ))}
      </div>
    </div>
  );
}
