"use client"

import React, { ReactNode } from "react"
import SideArrow from "./SideArrow"

export default function Carousel({ children, accentColor }: { children: ReactNode[], accentColor: string }) {

  const [selectedIndex, setSelectedIndex] = React.useState<number>(0)
  const [nbItems, setNbItems] = React.useState<number>(0)
  const [dots, setDots] = React.useState<ReactNode|null>(null)
  const carouselRef = React.useRef<HTMLDivElement|null>(null)
  const containerRef = React.useRef<HTMLDivElement|null>(null)

  React.useEffect(() => {
    if (!carouselRef.current || !containerRef.current)
      return
        
    const carousel = carouselRef.current
    const container = containerRef.current
    const nbCarouselItems = carousel.children.length
        
    const resize = () => {
      carousel.style.width = (container.clientWidth * nbCarouselItems) + "px"
    }

    resize()
    window.addEventListener("resize", resize)
    setNbItems(nbCarouselItems)

    return () => {
      window.removeEventListener("resize", resize)
    }
    
  }, [children])

  React.useEffect(() => {
    const dots: ReactNode[] = []

    for (let i = 0; i < nbItems; i++) {
      const bg = i === selectedIndex ? accentColor : "bg-gray-300"
      dots.push(<div key={i} onClick={() => setSelectedIndex(i)} className={`w-4 h-4 rounded-full cursor-pointer duration-500 hover:opacity-75 ${bg}`}></div>)
    }

    setDots(dots)
  }, [nbItems, selectedIndex])

  React.useEffect(() => {
    if (!carouselRef.current)
      return

    const carousel = carouselRef.current
    carousel.style.left = (selectedIndex * -100) + "%"
  }, [selectedIndex])

  function scrollRight() {
    if (selectedIndex < nbItems - 1)
      setSelectedIndex(selectedIndex + 1)
    else 
      setSelectedIndex(0)
  }

  function scrollLeft() {
    if (selectedIndex > 0)
      setSelectedIndex(selectedIndex - 1)
    else 
      setSelectedIndex(nbItems - 1)
  }

  return (
    <div className="w-full h-full pb-5 flex flex-col justify-between items-center gap-7">
      <div className="w-full h-full flex justify-center items-center">
        <SideArrow action={() => scrollLeft()} reversed={true} />

        <div ref={containerRef} className="relative grow w-fit max-w-full h-full flex flex-col justify-center items-center overflow-hidden">
          <div ref={carouselRef} className="py-3 absolute top-0 bottom-0 flex justify-around items-center gap-7 duration-1000">
            { children }
          </div>
        </div>
        
        <SideArrow action={() => scrollRight()} reversed={false} />
      </div>
      <div className="flex justify-center items-center gap-7">
        { dots }
      </div>
    </div>
  )
}