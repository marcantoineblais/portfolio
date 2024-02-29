"use client"

import React, { MutableRefObject, ReactNode } from "react"
import ScrabbleBoardTile from "./ScrabbleBoardTile"
import ScrabbleRow from "./ScrabbleRow"

export default function ScrabbleBoard(
    { grid, gridType, width }:
    { grid: string[][], gridType: any, width: number }
) {

    const [bonus, setBonus] = React.useState<number[][]|null>(null)
    const [tiles, setTiles] = React.useState<ReactNode|null>(null)

    React.useEffect(() => {
        const bonusOnGrid: number[][] = grid.map((row: string[]) => row.map(() => 0))        

        gridType.doubleLetter.forEach(([y, x]: [number, number]) => bonusOnGrid[y][x] = 1)
        gridType.tripleLetter.forEach(([y, x]: [number, number]) => bonusOnGrid[y][x] = 2)
        gridType.doubleWord.forEach(([y, x]: [number, number]) => bonusOnGrid[y][x] = 3)
        gridType.tripleWord.forEach(([y, x]: [number, number]) => bonusOnGrid[y][x] = 4)
        bonusOnGrid[7][7] = 5

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