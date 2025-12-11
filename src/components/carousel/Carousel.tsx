"use client";

import React, { ReactNode } from "react";
import SideArrow from "./SideArrow";

export default function Carousel({
  children,
  accentColor,
  className,
  disabled,
}: {
  children: ReactNode[];
  accentColor: string;
  className?: string;
  disabled: boolean;
}) {
  const [selectedIndex, setSelectedIndex] = React.useState<number>(0);
  const [nbItems, setNbItems] = React.useState<number>(0);
  const [dots, setDots] = React.useState<ReactNode | null>(null);
  const [content, setContent] = React.useState<ReactNode[]>([]);
  const [carouselWidth, setCarouselWidth] = React.useState<number>(0);
  const [carouselPosition, setCarouselPosition] = React.useState<number>(0);
  const [touchStartPosition, setTouchStartPosition] = React.useState<
    number | null
  >(null);
  const [scrollingCarousel, setScrollingCarousel] = React.useState<
    boolean | null
  >(null);

  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const carouselRef = React.useRef<HTMLDivElement | null>(null);
  const leftArrowRef = React.useRef<HTMLDivElement | null>(null);
  const rightArrowRef = React.useRef<HTMLDivElement | null>(null);

  // Group element by pair when display is large enough
  React.useEffect(() => {
    function setBreakPoint() {
      let updatedNbItems;
      let content = [];
      const width = window.innerWidth;

      if (width < 1024) {
        updatedNbItems = children.length;
        content = children.map((child, i) => {
          return (
            <div
              key={i}
              className="p-1 h-full flex justify-center items-center"
            >
              <div className="h-full">{child}</div>
            </div>
          );
        });
      } else {
        updatedNbItems = Math.ceil(children.length / 2);

        for (let i = 0; i < updatedNbItems; i++) {
          const index = 2 * i;
          content.push(
            <div
              key={i}
              className="p-1 h-full w-full flex justify-center items-center gap-3"
            >
              <div className="h-full">{children[index]}</div>
              <div className="h-full">{children[index + 1]}</div>
            </div>,
          );
        }
      }

      setContent(content);
      setNbItems(updatedNbItems);

      if (selectedIndex > updatedNbItems - 1) setSelectedIndex(0);
    }

    window.addEventListener("resize", setBreakPoint);
    setBreakPoint();

    return () => {
      window.removeEventListener("resize", setBreakPoint);
    };
  }, [children, selectedIndex]);

  // Remove opacity 0 once the carousel elements are loaded
  React.useEffect(() => {
    setTimeout(() => {
      if (!carouselRef.current) return;

      const carousel = carouselRef.current;
      carousel.classList.remove("opacity-0");
    }, 1000);
  }, []);

  // Change carousel width on screen resize
  React.useEffect(() => {
    const resize = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const width = container.clientWidth;

      setCarouselWidth(width);
    };

    resize();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [children]);

  // Update carousel size when resizing window
  React.useEffect(() => {
    if (!carouselRef.current) return;

    const carousel = carouselRef.current;
    carousel.style.width = carouselWidth * nbItems + "px";

    for (let i = 0; i < carousel.children.length; i++) {
      const child = carousel.children[i] as HTMLElement;
      child.style.width = carouselWidth + "px";
    }
  }, [children, nbItems, carouselWidth]);

  // Update dots number and color when selecting an item or resizing
  React.useEffect(() => {
    const dots: ReactNode[] = [];

    for (let i = 0; i < nbItems; i++) {
      const bg = i === selectedIndex ? accentColor : "bg-gray-300";
      dots.push(
        <div
          key={i}
          onClick={() => setSelectedIndex(i)}
          className={`w-4 h-4 rounded-full cursor-pointer duration-500 hover:opacity-75 ${bg}`}
        ></div>,
      );
    }

    setDots(dots);
  }, [nbItems, selectedIndex, accentColor]);

  // Make the carousel move when its selection changes
  React.useEffect(() => {
    if (!carouselRef.current) return;

    const carousel = carouselRef.current;
    const position = -(selectedIndex * carouselWidth);
    carousel.style.left = position + "px";

    setCarouselPosition(position);
  }, [selectedIndex, nbItems, carouselWidth]);

  function scrollRight() {
    if (selectedIndex < nbItems - 1) setSelectedIndex(selectedIndex + 1);
    else setSelectedIndex(0);
  }

  function scrollLeft() {
    if (selectedIndex > 0) setSelectedIndex(selectedIndex - 1);
    else setSelectedIndex(nbItems - 1);
  }

  function onTouchStart(e: React.TouchEvent) {
    const carousel = carouselRef.current;

    if (e.touches.length > 1 || !carousel || disabled) return;

    const startPosition = e.touches[0].clientX;
    carousel.style.transitionDuration = "0ms";
    setTouchStartPosition(startPosition);
  }

  function onTouchMove(e: React.TouchEvent) {
    const carousel = carouselRef.current;

    if (
      !carousel ||
      !touchStartPosition ||
      e.touches.length > 1 ||
      disabled ||
      scrollingCarousel === false
    )
      return;

    if (scrollingCarousel === null) {
      const canScroll = setScrollAction(e);

      if (!canScroll) return;
    }

    const delta = e.touches[0].clientX - touchStartPosition;
    const updatedPosition = carouselPosition + delta;
    const maxOffset = 80;

    if (
      isWithinScrollRange(
        updatedPosition,
        maxOffset,
        carousel.clientWidth,
        delta,
      )
    )
      carousel.style.left = updatedPosition + "px";
  }

  function onTouchEnd() {
    const carousel = carouselRef.current;

    if (!carousel || !touchStartPosition) return;

    const currentPosition = parseInt(carousel.style.left);
    const finalDelta = Math.abs(carouselPosition - currentPosition);
    const minDelta = 80; // nb of pixels required to change page
    carousel.style.transitionDuration = "";

    if (finalDelta >= minDelta) {
      if (currentPosition > carouselPosition) scrollLeft()
      else scrollRight();
    } else {
      carousel.style.left = carouselPosition + "px";
    }

    window.onscroll = () => {};
    setTouchStartPosition(null);
    setScrollingCarousel(null);
  }

  function isWithinScrollRange(
    updatedPosition: number,
    maxOffset: number,
    carouselContainerWidth: number,
    delta: number,
  ): boolean {
    return (
      updatedPosition < maxOffset && // limit max left scroll
      updatedPosition > carouselWidth - carouselContainerWidth - maxOffset && // limit max left scroll
      Math.abs(delta) < carouselWidth // can't scroll more than 1 image at once
    );
  }

  function setScrollAction(e: React.TouchEvent): boolean {
    if (!touchStartPosition) return false;

    const deltaPosition = Math.abs(e.touches[0].clientX - touchStartPosition);
    if (deltaPosition > 5) {
      setScrollingCarousel(true);
      window.onscroll = () =>
        window.scrollTo({ top: document.documentElement.scrollTop });
      return true;
    } else {
      setScrollingCarousel(false);
      window.onscroll = () => {};
      return false;
    }
  }

  return (
    <div
      className={`w-full h-full flex flex-col justify-between items-center gap-3 ${className || ""}`}
    >
      <div className="w-full h-full flex justify-center items-center">
        <SideArrow
          containerRef={leftArrowRef}
          action={() => scrollLeft()}
          reversed={true}
          disabled={disabled}
        />
        <div
          ref={containerRef}
          className="relative w-full h-full flex flex-col justify-center items-center overflow-hidden"
        >
          <div
            ref={carouselRef}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            className="absolute top-0 left-0 bottom-0 flex justify-around items-center opacity-0 duration-1000"
          >
            {content}
          </div>
        </div>
        <SideArrow
          containerRef={rightArrowRef}
          action={() => scrollRight()}
          reversed={false}
          disabled={disabled}
        />
      </div>
      <div className="flex justify-center items-center gap-7">{dots}</div>
    </div>
  );
}
