"use client"

import React, { ReactNode } from "react"
import ScrabbleRow from "./ScrabbleRow"
import ScrabbleLetterTile from "./ScrabbleLetterTile"

export default function ScrabbleLetters(
  { grid, width, newEntry = null, selectedEntry = null, selectedSolution = null }:
    { grid: string[][], width: number, newEntry?: any, selectedEntry?: any, selectedSolution?: any }
) {

  const [tiles, setTiles] = React.useState<ReactNode | null>(null)

  React.useEffect(() => {
    const gridTiles = grid.map((row, y) => {
      const cols = row.map((col, x) => {
        let letter = col
        let conflict = false
        let selected = false
        let solution = false
        let blur = false

        if (selectedSolution) {
          if (selectedSolution.entry.letterAtCoord([y, x])) {
            letter = selectedSolution.entry.letterAtCoord([y, x]) || ""
            solution = true
          } else {
            blur = true
          }
        } else if (newEntry && newEntry.letterAtCoord([y, x])) {
          letter = newEntry.letterAtCoord([y, x]) || ""
          conflict = newEntry.conflict
        } else if (selectedEntry && selectedEntry.letterAtCoord([y, x])) {
          selected = true
        }

        return <ScrabbleLetterTile
          key={x}
          size={width / grid.length}
          letter={letter}
          conflict={conflict}
          selected={selected}
          solution={solution}
          blur={blur}
        />
      })

      return <ScrabbleRow key={y} width={width}>{cols}</ScrabbleRow>
    })

    setTiles(gridTiles)
  }, [newEntry, selectedEntry, selectedSolution, grid, width])

  return (
    <div className="absolute inset-0">
      {tiles}
    </div>
  )
}