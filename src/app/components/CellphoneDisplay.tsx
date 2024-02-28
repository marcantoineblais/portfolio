"use client"

import React, { ReactNode } from "react"

export default function CellphoneDisplay({ children, basis }: { children: ReactNode, basis: number }) {
  
  const cellPhoneDisplayRef = React.useRef<HTMLDivElement|null>(null)
  const containerRef = React.useRef<HTMLDivElement|null>(null)
  
  React.useEffect(() => {
    if (!containerRef.current)
      return
    
    const container = containerRef.current
    container.style.flexBasis = (100 / basis) + "%"
  }, [basis])
  
  React.useEffect(() => {
    if (!cellPhoneDisplayRef.current || !containerRef.current)
      return
    
    const cellPhoneDisplay = cellPhoneDisplayRef.current
    const container = containerRef.current

    const resize = () => {
      let height = container.clientHeight
      let width = height / 9 * 5

      if (width > container.clientWidth) {
        width = container.clientWidth
        height = width / 5 * 9
      }
  
      cellPhoneDisplay.style.width = width + "px"
      cellPhoneDisplay.style.height = height + "px"
    }

    resize()
    window.addEventListener("resize", resize)

    return () => {
      window.removeEventListener("resize", resize)
    }
  }, [])
  
  return (
    <div ref={containerRef} className="h-full flex justify-center items-center">
      <div ref={cellPhoneDisplayRef} className="flex flex-col border border-gray-950 rounded-xl shadow-md overflow-hidden">
        { children }
      </div>
    </div>
  )
}