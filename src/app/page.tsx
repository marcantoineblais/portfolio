"use client"

import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Catcam from "./components/Catcam";
import Project from "./components/Project";
import Scrabble from "./components/Scrabble";
import CatcamDescription from "./components/CatcamDescription";

export default function Home() {
  const [windowHeight, setWindowHeight] = React.useState<number>(0)
  const [navbarVisible, setNavbarVisible] = React.useState<boolean>(false)
  const [heroOpacity, setHeroOpacity] = React.useState<number>(100)
  const [catcamOpacity, setCatcamOpacity] = React.useState<number>(0)
  const [scrabbleOpacity, setScrabbleOpacity] = React.useState<number>(0)
  const [heroLoaded, setHeroLoaded] = React.useState<boolean>(true)
  const [catcamLoaded, setCatcamLoaded] = React.useState<boolean>(false)
  const [scrabbleLoaded, setScrabbleLoaded] = React.useState<boolean>(false)
  const [heroEnd, setHeroEnd] = React.useState<number>(0)
  const [catcamStart, setCatcamStart] = React.useState<number>(0)
  const [catcamPeak, setCatcamPeak] = React.useState<number>(0)
  const [catcamDemoStart, setCatcamDemoStart] = React.useState<number>(0)
  const [catcamDemo, setCatcamDemo] = React.useState<boolean>(false)
  const [catcamEnd, setCatcamEnd] = React.useState<number>(0)
  const [scrabbleStart, setScrabbleStart] = React.useState<number>(0)
  const [scrabblePeak, setScrabblePeak] = React.useState<number>(0)
  const [scrabbleEnd, setScrabbleEnd] = React.useState<number>(0)

  React.useEffect(() => {
    const scrollUp = () => {
      window.scrollTo({top: 0})
    }

    window.addEventListener("load", scrollUp)

    return () => {
      window.removeEventListener("load", scrollUp)
    }
  }, [])

  React.useEffect(() => {
    const resize = () => {
      const height = window.innerHeight
      const step1 = 2 * height
      const step2 = 2 * step1
      const step3 = step2 + height
      const step4 = step3 + height
      const step5 = step4 + step1
      const step6 = step5 + step1
      const step7 = step6 + height
      const step8 = step7 + step1

      setHeroEnd(step1)
      setCatcamStart(step2)
      setCatcamPeak(step3)
      setCatcamDemoStart(step4)
      setCatcamEnd(step5)
      setScrabbleStart(step6)
      setScrabblePeak(step7)
      setScrabbleEnd(step8)
      setWindowHeight(height)
    }

    window.scrollTo({ top: 0 })
    window.addEventListener("resize", resize)
    window.addEventListener("load", resize)
    resize()

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("load", resize)
    }
  }, [])

  React.useEffect(() => {
    const calculateScrollHeight = () => {
      const currentHeight = window.scrollY
      
      if (currentHeight < heroEnd) {
        setNavbarVisible(false)
        setHeroOpacity(1- (currentHeight / heroEnd))
        setHeroLoaded(true)
        setCatcamLoaded(false)
        setScrabbleLoaded(false)
        setCatcamDemo(false)
      } else if (currentHeight < catcamStart) {
        setNavbarVisible(true)
        setHeroLoaded(false)
        setCatcamLoaded(true)
        setScrabbleLoaded(false)
        setCatcamOpacity((currentHeight - heroEnd) / (catcamStart - heroEnd))
        setCatcamDemo(false)
      } else if (currentHeight <= catcamPeak) {
        setNavbarVisible(true)
        setHeroLoaded(false)
        setCatcamLoaded(true)
        setScrabbleLoaded(false)
        setCatcamOpacity(1)
        setCatcamDemo(false)
      } else if (currentHeight <= catcamDemoStart) {
        setNavbarVisible(true)
        setHeroLoaded(false)
        setCatcamLoaded(true)
        setScrabbleLoaded(false)
        setCatcamOpacity(1)
        setCatcamDemo(true)
      } else if (currentHeight < catcamEnd) {
        setNavbarVisible(true)
        setHeroLoaded(false)
        setCatcamLoaded(true)
        setScrabbleLoaded(false)
        setCatcamOpacity(1 - ((currentHeight - catcamDemoStart) / (catcamEnd - catcamDemoStart)))
        setCatcamDemo(true)
      } else if (currentHeight < scrabbleStart) {
        setNavbarVisible(true)
        setHeroLoaded(false)
        setCatcamLoaded(false)
        setScrabbleLoaded(true)
        setScrabbleOpacity((currentHeight - catcamEnd) / (scrabbleStart - catcamEnd))
        setCatcamDemo(true)
      } else if (currentHeight <= scrabblePeak) {
        setNavbarVisible(true)
        setHeroLoaded(false)
        setCatcamLoaded(false)
        setScrabbleLoaded(true)
        setScrabbleOpacity(1)
        setCatcamDemo(true)
      } else if (currentHeight < scrabbleEnd) {
        setNavbarVisible(true)
        setHeroLoaded(false)
        setCatcamLoaded(false)
        setScrabbleLoaded(true)
        setScrabbleOpacity(1 - ((currentHeight - scrabblePeak) / (scrabbleEnd - scrabblePeak)))
        setCatcamDemo(true)
      }
       
    }

    window.addEventListener("scroll", calculateScrollHeight)

    return () => {
      window.removeEventListener("scroll", calculateScrollHeight)
    }
  }, [windowHeight, heroEnd, catcamStart, catcamPeak, catcamDemoStart, catcamEnd, scrabbleStart, scrabblePeak, scrabbleEnd])

  function scrollTo(position: number) {
    window.scrollTo({ top: position, behavior: "smooth" })
  }

  return (
    <>
      <Navbar visible={navbarVisible} scrollToProject={() => scrollTo(catcamPeak)} />
      <main className="flex flex-col items-center h-[2400vh]">
        { heroLoaded && <Hero opacity={heroOpacity} scrollTo={() => scrollTo(catcamPeak)} /> }
        { catcamLoaded && 
          <>
            <Project name="La Catcam" opacity={catcamOpacity} className={`bg-gray-100 text-gray-950`} scrolledUp={catcamDemo} >
              <CatcamDescription scrollTo={() => scrollTo(catcamDemoStart)}/>  
            </Project>
            <Project name="La Catcam - Démonstration" opacity={catcamOpacity} className={`bg-gray-100 text-gray-950}`} scrolledDown={!catcamDemo} >
              <Catcam scrollTo={() => scrollTo(scrabblePeak)} />
            </Project> 
          </>
        }
        { scrabbleLoaded && 
          <Project name="Scrabble Cheetah" opacity={scrabbleOpacity} className="bg-orange-100 text-neutral-950" >
            <Scrabble scrollTo={() => scrollTo(scrabbleEnd)} />
          </Project> 
        }
      </main>
    </>
  );
}
