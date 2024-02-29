"use client"

import React, { ReactNode } from "react"
import { anta, kode_mono } from "../fonts"


export default function Project(
  { children, opacity, name, className, scrolledUp = false, scrolledDown = false}: 
  { children: ReactNode, opacity: number, name: string, className: string, scrolledDown?: boolean, scrolledUp?: boolean }
) {

  const containerRef = React.useRef<HTMLDivElement|null>(null)

  React.useEffect(() => {
    if (!containerRef.current)
      return

    const container = containerRef.current
    container.style.opacity = opacity.toString()
    
  }, [opacity, containerRef])

  return (
    <div ref={containerRef} className={`fixed inset-0 duration-500 opacity-0 ${className} ${scrolledDown && "top-full"} ${scrolledUp && "-top-full"}`}>
      <div className={`container px-3 mx-auto h-screen w-full pt-12 flex flex-col justify-between items-center gap-7`}>
        <div className="w-full pt-12 flex flex-col gap-7">
          <h2 className={`${kode_mono.className} text-5xl text-center md:text-left`}>Réalisations:</h2>
          <h2 className={`${anta.className} text-5xl text-center border-b border-b-gray-950`}>{ name }</h2>
        </div>
        { children }    
      </div>
    </div>
  )
}