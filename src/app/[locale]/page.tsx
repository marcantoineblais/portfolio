"use client";

import ParallaxScroll from "@/src/components/animations/ParallaxScroll";
import Hero from "./Hero";
import ParallaxScrollItem from "@/src/components/animations/ParallaxScrollItem";

export default function MainPage() {
  return (
    <main className="h-full w-full items-center">
      <ParallaxScroll>
        <ParallaxScrollItem key="hero">
          <Hero />
        </ParallaxScrollItem>
        <ParallaxScrollItem key="contact">
          <div className="bg-white h-full">This is empty</div>
        </ParallaxScrollItem>
      </ParallaxScroll>
    </main>
  );
}
