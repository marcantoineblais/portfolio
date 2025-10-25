"use client";

import ParallaxScroll from "@/src/components/animations/ParallaxScroll";
import Hero from "./Hero";
import ParallaxScrollItem from "@/src/components/animations/ParallaxScrollItem";
import Scrabble from "@/src/components/projects/scrabble/Scrabble";
import Catcam from "@/src/components/projects/catcam/Catcam";
import Skills from "@/src/components/about/Skills";

export default function MainPage() {
  return (
    <main className="h-full w-full items-center">
      <ParallaxScroll transitionRatio={2}>
        <ParallaxScrollItem key="hero">
          <Hero />
        </ParallaxScrollItem>

        <ParallaxScrollItem key="projects">
          <Scrabble />
        </ParallaxScrollItem>

        <ParallaxScrollItem key="projects2">
          <Catcam />
        </ParallaxScrollItem>

        <ParallaxScrollItem key="about">
          <Skills />          
        </ParallaxScrollItem>
      </ParallaxScroll>
    </main>
  );
}
