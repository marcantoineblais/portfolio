"use client";

import ParallaxScroll from "@/src/components/animations/ParallaxScroll";
import Hero from "../../components/Hero";

export default function MainPage() {
  return (
    <main className="h-full w-full flex flex-col items-center">
      <ParallaxScroll>
        <div className="bg-black h-full text-white">This is empty</div>
        <Hero />
        <div>This is empty</div>
      </ParallaxScroll>
    </main>
  );
}
