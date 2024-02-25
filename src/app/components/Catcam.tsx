import React, { ReactNode } from "react";

export default function Catcam({ children, containerRef, opacity }: { children: ReactNode, containerRef: React.MutableRefObject<HTMLDivElement|null>, opacity: number }) {

  const cellPhoneDisplayRef = React.useRef<HTMLDivElement|null>(null)

  React.useEffect(() => {
    if (!cellPhoneDisplayRef.current)
      return
    
    const cellPhoneDisplay = cellPhoneDisplayRef.current
    const resize = () => {
      const height = cellPhoneDisplay.clientHeight
      const width = height / 7 * 4
  
      cellPhoneDisplay.style.width = width + "px"
    }

    resize()
    window.addEventListener("resize", resize)

    return () => {
      window.removeEventListener("resize", resize)
    }
  }, [])

  React.useEffect(() => {
    if (!containerRef.current?.parentElement)
      return

    const container = containerRef.current.parentElement
    container.style.opacity = opacity.toString()
    
  }, [opacity, containerRef])

  return (
    <div className="w-full h-[400vh] bg-gray-100 text-gray-950">
      <div ref={containerRef} className="container mx-auto pt-12 sticky inset-0 h-screen flex flex-col justify-center items-center">
        <div ref={cellPhoneDisplayRef} className="border border-gray-950 rounded-xl h-3/5">
          { children }
        </div>
      </div>
    </div>
  )
}