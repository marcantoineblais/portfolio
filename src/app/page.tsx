"use client"

import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import LiveStream from "./components/catcam/LiveStream";
import Catcam from "./components/Catcam";

export default function Home() {

  const [navbarVisible, setNavbarVisible] = React.useState<boolean>(false)
  const [heroOpacity, setHeroOpacity] = React.useState<number>(100)
  const [catcamOpacity, setCatcamOpacity] = React.useState<number>(0)
  const [heroHeight, setHeroHeight] = React.useState<number>(0)
  const [catcamHeight, setCatcamHeight] = React.useState<number>(0)
  const [catcamStart, setCatcamStart] = React.useState<number>(0)
  const heroContainerRef = React.useRef<HTMLDivElement|null>(null)
  const catcamContainerRef = React.useRef<HTMLDivElement|null>(null)

  React.useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [])

  React.useEffect(() => {
    const calculateScrollHeight = () => {
      const currentHeight = window.scrollY   
      
      if (currentHeight < heroHeight) {
        setHeroOpacity(1 - (currentHeight / heroHeight))
        setCatcamOpacity(0)
        setNavbarVisible(false)
      } else if (currentHeight < catcamStart) {
        setHeroOpacity(0)
        setCatcamOpacity((currentHeight - heroHeight) / (catcamStart - heroHeight))
        setNavbarVisible(true)
      } else {
        setCatcamOpacity(1)
      }
    }

    window.addEventListener("scroll", calculateScrollHeight)

    return () => {
      window.removeEventListener("scroll", calculateScrollHeight)
    }
  }, [heroHeight, catcamStart, catcamHeight])

  React.useEffect(() => {
    const calculateElementPositions = () => {
      if (!heroContainerRef.current || !catcamContainerRef.current)
        return

      const hero = heroContainerRef.current
      const catcam = catcamContainerRef.current
      const heroHeight = hero.parentElement?.clientHeight || 0
      const catcamHeight = catcam.parentElement?.clientHeight || 0
      const catcamStart = heroHeight + (catcamHeight / 4)
      
      setHeroHeight(heroHeight)
      setCatcamHeight(catcamHeight)
      setCatcamStart(catcamStart)
    }

    calculateElementPositions()
    window.addEventListener("resize", calculateElementPositions)

    return () => {
      window.removeEventListener("resize", calculateElementPositions)
    }
  }, [heroContainerRef, catcamContainerRef])

  function scrollAfterHero() {
    if (!catcamContainerRef.current)
      return

    window.scrollTo({ top: catcamStart, behavior: "smooth" })
  }

  return (
    <>
      <Navbar visible={navbarVisible} />
      <main className="flex flex-col items-center">
        <Hero containerRef={heroContainerRef} opacity={heroOpacity} scrollDown={scrollAfterHero} />
        <Catcam containerRef={catcamContainerRef} opacity={catcamOpacity} />
      </main>
    </>
  );
}
