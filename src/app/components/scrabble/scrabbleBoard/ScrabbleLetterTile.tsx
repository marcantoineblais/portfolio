"use client"

import React from "react"

export default function ScrabbleLetterTile(
    { size, letter, conflict, selected, solution, blur}:
    { size: number, letter: string, conflict: boolean, selected: boolean, solution: boolean, blur: boolean }
) {

    const [background, setBackground] = React.useState<string>("")
    const tileRef = React.useRef<HTMLDivElement|null>(null)

    React.useEffect(() => {
        if (!tileRef.current)
            return

        const tile = tileRef.current
        tile.style.width = size + "px"
        tile.style.height = size + "px"
        tile.style.fontSize = size * 0.6 + "px"
    }, [size])

    React.useEffect(() => {
        let background

        if (conflict)
            background = "bg-red-700 opacity-75"
        else if (solution)
            background = "bg-teal-700"
        else if (selected)
            background = "bg-neutral-700"
        else if (letter && blur)
            background = "bg-tile-texture brightness-50 blur-[1px]"
        else if (blur)
            background = "bg-tile-blur brightness-50"
        else if (letter)
            background = "bg-tile-texture"
        else
            background = ""

        setBackground(background)
    }, [letter, conflict, selected, solution, blur])

    return (
        <div 
            ref={tileRef}
            className={
                `w-full h-full flex justify-center items-center
                text-center border text-white overflow-hidden 
                ${background}`
            }
        >
            { letter }
        </div>
    )
}