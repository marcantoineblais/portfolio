"use client"

import React, { ReactNode } from "react"

export default function ScrabbleContainer({ children, setWidth, card = false }: { children: ReactNode, setWidth: Function, card?: boolean }) {

    const containerRef = React.useRef<HTMLDivElement|null>(null)    

    React.useEffect(() =>{
        function resize() {
            if (!containerRef.current)
                return
    
            const container = containerRef.current
            const parent = container.parentElement

            if (!parent)
              return 

            const width = card ? parent.clientHeight : parent.clientWidth

            container.style.width = width + "px"
            container.style.height = width + "px"
            setWidth(width)
        }
    
        resize()
        window.addEventListener("resize", resize)
        
        return () => {
            window.removeEventListener("resize", resize)
        }
    }, [setWidth, containerRef.current, card])

    return (
        <div ref={containerRef} className="w-full h-full relative">
            { children }
        </div>
    )
}