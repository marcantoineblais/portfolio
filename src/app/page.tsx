"use client"

import React from "react";
import About from "./components/About";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Hero from "./components/Hero";

export default function Home() {

  const [navbarVisible, setNavbarVisible] = React.useState<boolean>(false)
  const [titleOpacity, setTitleOpacity] = React.useState<number>(100)
  const titleContainerRef = React.useRef<HTMLDivElement|null>(null)

  React.useEffect(() => {
    window.addEventListener("scroll", calculateScrollHeight)

    return () => {
      window.removeEventListener("scroll", calculateScrollHeight)
    }
  }, [])

  function calculateScrollHeight() {
    if (!titleContainerRef.current)
      return

    const container = titleContainerRef.current
    const maxHeight = container.clientHeight
    const currentHeight = window.scrollY    

    if (maxHeight <= currentHeight) {
      setTitleOpacity(0)
      setNavbarVisible(true)
    } else {
      setTitleOpacity(1 - (currentHeight / maxHeight))
      setNavbarVisible(false)
    }
  }

  function scrollAfterHero() {
    if (!titleContainerRef.current)
      return

    const container = titleContainerRef.current
    const maxHeight = container.clientHeight

    window.scrollTo({ top: maxHeight, behavior: "smooth" })
  }

  return (
    <>
      <Navbar visible={navbarVisible} />
      <main className="container mx-auto px-3 flex flex-col items-center">
        <Hero containerRef={titleContainerRef} opacity={titleOpacity} scrollDown={scrollAfterHero} />
        <Projects />
        <About />
      </main>
    </>
  );
}
