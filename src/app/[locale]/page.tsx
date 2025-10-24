"use client";

import ParallaxScroll from "@/src/components/animations/ParallaxScroll";
import Hero from "./Hero";
import ParallaxScrollItem from "@/src/components/animations/ParallaxScrollItem";

export default function MainPage() {
  return (
    <main className="h-full w-full items-center">
      <ParallaxScroll transitionRatio={2}>
        <ParallaxScrollItem key="hero">
          <Hero />
        </ParallaxScrollItem>

        <ParallaxScrollItem key="contact">
          <div className="p-14 bg-white h-full">This is empty</div>
        </ParallaxScrollItem>

        <ParallaxScrollItem key="about">
          <div className="p-14 bg-black h-full">This is empty</div>
        </ParallaxScrollItem>
      </ParallaxScroll>
    </main>
  );
}
