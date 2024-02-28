"use client"

import React from "react"
import ScrabbleContainer from "./scrabbleBoard/ScrabbleContainer"
import ScrabbleBoard from "./scrabbleBoard/ScrabbleBoard"
import ScrabbleLetters from "./scrabbleBoard/ScrabbleLetters"
import WoodenButton from "./WoodenButton"

const [grid] = React.useState<string[][]>(Array(15).fill(Array(15).fill("")))

export default function SavedGameCard() {
    const [width, setWidth] = React.useState<number>(0)
    const containerRef = React.useRef<HTMLDivElement|null>(null)

    React.useEffect(() => {
        if (!containerRef.current)
            return 

        const container = containerRef.current
        container.style.flexBasis = width + "px"
    }, [width])

    return (
        <div className="flex justify-between items-center gap-5 p-1 border border-neutral-900 rounded h-40 bg-orange-100">
            <div className="px-3 py-1 h-full flex flex-col justify-between items-center grow">
                <div className="w-full">
                    <h2 className="font-bold">Exemple</h2>
                    <h2 className="bold">FRANCAIS</h2>
                </div>
              <WoodenButton text="Reprendre" />
            </div>
            <div ref={containerRef} className="w-full h-full">
                <ScrabbleContainer setWidth={setWidth}>
                    <ScrabbleBoard grid={grid} gridType={grid} width={width}/>
                    <ScrabbleLetters grid={grid} width={width} />
                </ScrabbleContainer>
            </div>
        </div>
    )
}