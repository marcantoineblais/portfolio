"use client"

import React, { MutableRefObject, ReactNode } from "react"
import ScrabbleBoardTile from "./ScrabbleBoardTile"
import { Bonus } from "@/app/models/Bonus"
import { emptyRow } from "@/app/utilities/utilities"
import ScrabbleRow from "./ScrabbleRow"
import { GridType } from "@/app/models/GridType"

export default function ScrabbleBoard(
    { grid, gridType, width }:
    { grid: string[][], gridType: GridType, width: number }
) {

    const [bonus, setBonus] = React.useState<number[][]|null>(null)
    const [tiles, setTiles] = React.useState<ReactNode|null>(null)

    React.useEffect(() => {
        const bonusOnGrid: number[][] = emptyRow(() => emptyRow(() => Bonus.NONE))

        gridType.doubleLetter.forEach(([y, x]) => bonusOnGrid[y][x] = Bonus.DOUBLE_LETTER)
        gridType.tripleLetter.forEach(([y, x]) => bonusOnGrid[y][x] = Bonus.TRIPLE_LETTER)
        gridType.doubleWord.forEach(([y, x]) => bonusOnGrid[y][x] = Bonus.DOUBLE_WORD)
        gridType.tripleWord.forEach(([y, x]) => bonusOnGrid[y][x] = Bonus.TRIPLE_WORD)
        bonusOnGrid[7][7] = Bonus.CENTER

        setBonus(bonusOnGrid)
    }, [gridType])

    React.useEffect(() => {
        if (!bonus)
            return
        
        const gridTiles: ReactNode[] = grid.map((row: string[], y: number) => {
            const cols: ReactNode[] = row.map((_col: string, x: number) => {
                return <ScrabbleBoardTile key={x} size={width / grid.length} bonus={bonus[y][x]} />
            })

            return <ScrabbleRow key={y} width={width}>{ cols }</ScrabbleRow>
        })

        setTiles(gridTiles)
    }, [bonus, width, grid])

    return (
        <div className="absolute inset-0">
            { tiles }
        </div>
    )
}