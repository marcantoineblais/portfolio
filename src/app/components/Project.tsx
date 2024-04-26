"use client"

import React, { ReactNode } from "react"
import { anta, kode_mono } from "../fonts"
import DownArrow from "./DownArrow"


export default function Project(
  { children, opacity, name, className, scrollTo}: 
  { children: ReactNode, opacity: number, name: string, className: string, scrollTo: Function}
) {

  const containerRef = React.useRef<HTMLDivElement|null>(null)

  React.useEffect(() => {
    if (!containerRef.current)
      return

    const container = containerRef.current
    container.style.opacity = opacity.toString()
    
  }, [opacity, containerRef])

  return (
    <div ref={containerRef} className={`fixed inset-0 opacity-0 overflow-y-auto ${className}`}>
      <div className={`container px-3 mx-auto h-full min-h-[940px] w-full flex flex-col justify-between items-center gap-1`}>
        <div className="w-full pt-12 flex flex-col gap-3">
          <h2 className={`${kode_mono.className} p-3 text-5xl font-bold`}>Réalisations</h2>
          <h2 className={`${anta.className} text-5xl text-center border-b border-b-gray-950`}>{ name }</h2>
        </div>
        { children }
        <DownArrow text="Réalisation suivante" action={() => scrollTo()} disabled={opacity < 1} />
      </div>
    </div>
  )
}