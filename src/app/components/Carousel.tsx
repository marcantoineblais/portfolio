"use client"

import React, { ReactNode } from "react"
import SideArrow from "./SideArrow"

export default function Carousel({ children }: { children: ReactNode[] }) {

  const [selectedIndex, setSelectedIndex] = React.useState<number>(0)
  const [nbItems, setNbItems] = React.useState<number>(0)
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
    <div className="w-full h-full flex flex-col justify-between items-center">
      <div className="w-full h-full flex justify-center items-center">
        <SideArrow action={() => scrollLeft()} reversed={true} />

        <div ref={containerRef} className="relative grow w-fit max-w-full h-full flex flex-col justify-center items-center overflow-hidden">
          <div ref={carouselRef} className="absolute top-0 bottom-0 flex justify-around items-center gap-7 duration-1000">
            { children }
          </div>
        </div>
        
        <SideArrow action={() => scrollRight()} reversed={false} />
      </div>
    </div>
  )
}