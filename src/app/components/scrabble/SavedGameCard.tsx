"use client"

import React from "react"
import ScrabbleContainer from "./scrabbleBoard/ScrabbleContainer"
import ScrabbleBoard from "./scrabbleBoard/ScrabbleBoard"
import ScrabbleLetters from "./scrabbleBoard/ScrabbleLetters"
import WoodenButton from "./WoodenButton"


export default function SavedGameCard() {
  const [grid] = React.useState<string[][]>([
    ["","","","","","","","","","","","","","",""],
    ["","","","","","","","","","","","","","",""],
    ["","","","","","","","","","","","","","",""],
    ["","","","","","","","","","","","","","",""],
    ["","","","","","","","W","","","","","","",""],
    ["","","","","","","","O","","","","","","",""],
    ["","","","","","","","R","","","","","","",""],
    ["","","","","H","E","L","L","O","","","","","",""],
    ["","","","","","","","D","","","","","","",""],
    ["","","","","","","","","","","","","","",""],
    ["","","","","","","","","","","","","","",""],
    ["","","","","","","","","","","","","","",""],
    ["","","","","","","","","","","","","","",""],
    ["","","","","","","","","","","","","","",""],
    ["","","","","","","","","","","","","","",""]
  ])
  const [gridType] = React.useState<any>({
    doubleLetter: [[0, 7], [1, 1], [1, 13], [2, 6], [2, 8], [4, 6], [4, 8], [6, 2], [6, 4], [6, 10], [6, 12], [7, 0], [7, 14], [8, 2], [8, 4], [8, 10], [8, 12], [10, 6], [10, 8], [12, 6], [12, 8], [13, 1], [13, 13], [14, 7]],
    tripleLetter: [[2, 2], [2, 12], [3, 7], [4, 4], [4, 10], [7, 3], [7, 11], [10, 4], [10, 10], [11, 7], [12, 2], [12, 12]],
    doubleWord: [[0, 0], [0, 14], [1, 5], [1, 9], [3, 3], [3, 11], [5, 1], [5, 5], [5, 9], [5, 13], [9, 1], [9, 5], [9, 9], [9, 13], [11, 3], [11, 11], [13, 5], [13, 9], [14, 0], [14, 14]],
    tripleWord: [[0, 4], [0, 10], [4, 0], [4, 14], [10, 0], [10, 14], [14, 4], [14, 10]]
  })
  const [width, setWidth] = React.useState<number>(0)
  const containerRef = React.useRef<HTMLDivElement | null>(null)


  React.useEffect(() => {

  }, [])

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
        <WoodenButton text="Supprimer" />
      </div>
      <div ref={containerRef} className="w-full h-full">
        <ScrabbleContainer setWidth={setWidth} card={true}>
          <ScrabbleBoard grid={grid} gridType={gridType} width={width} />
          <ScrabbleLetters grid={grid} width={width} />
        </ScrabbleContainer>
      </div>
    </div>
  )
}