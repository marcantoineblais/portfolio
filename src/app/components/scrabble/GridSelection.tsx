"use client"

import React, { ReactNode } from "react"
import { emptyRow, getRequest, postRequest } from "../utilities/utilities"
import ScrabbleContainer from "../components/scrabbleBoard/ScrabbleContainer"
import ScrabbleBoard from "../components/scrabbleBoard/ScrabbleBoard"
import WoodenButton from "../components/WoodenButton"
import Arrow from "../components/Arrow"
import { GameOptions } from "@/app/models/GameOptions"
import { GridType } from "@/app/models/GridType"
import { Language } from "@/app/models/Language"
import { GameOption } from "@/app/models/GameOption"
import { Grid } from "@/app/models/Grid"
import FormInput from "../components/FormInput"
import { Player } from "../models/Player"

export default function GridSelection(
    { setCurrentGrid, setPage, setPlayer }:
    { setCurrentGrid: Function, setPage: Function, setPlayer: Function }
) {

    const [gameOptions, setGameOptions] = React.useState<GameOptions>(new GameOptions([], []))
    const [gridType, setGridType] = React.useState<GridType|null>(null)
    const [gridTypeIndex, setGridTypeIndex] = React.useState<number>(0)
    const [language, setLanguage] = React.useState<Language|null>(null)
    const [name, setName] = React.useState<string>("")
    const [options, setOptions] = React.useState<ReactNode[]>([])
    const [width, setWidth] = React.useState<number>(0)
    const [emptyGrid] = React.useState<string[][]>(emptyRow(() => emptyRow(() => "")))
    
    React.useEffect(() => {
        async function getGameOptions() {
            try {
                const response = await getRequest("/options")
                const gameOptions: GameOptions = await response.json()
                
                setGameOptions(gameOptions)
            } catch (ex) {
                console.error(ex)
            }
        }

        getGameOptions()
    }, [])
    
        React.useEffect(() => {
            if (!gameOptions)
                return
                
            const languageOptions = gameOptions.languages.map((language: Language, index: number) => {
                const capitalisedName = language.name.substring(0, 1).toUpperCase() + language.name.substring(1).toLowerCase()
                
                return <option key={index} value={index}>{ capitalisedName }</option>
            })

            setOptions(languageOptions)
        }, [gameOptions])

    React.useEffect(() => {
        if (!gameOptions)
            return

        setGridType(gameOptions.gridTypes[0])
        setLanguage(gameOptions.languages[0])
    }, [gameOptions])

    function previousGridType() {
        if (!gameOptions)
            return 

        if (gridTypeIndex > 0) {
            setGridTypeIndex(gridTypeIndex - 1)
            setGridType(gameOptions.gridTypes[gridTypeIndex - 1])
        }
    }
    
    function nextGridType() {
        if (!gameOptions)
            return

        if (gridTypeIndex < gameOptions.gridTypes.length - 1) {
            setGridTypeIndex(gridTypeIndex + 1)
            setGridType(gameOptions.gridTypes[gridTypeIndex + 1])
        }
    }

    function changeLanguageId(e: React.SyntheticEvent<HTMLSelectElement>) {
        if (!gameOptions)
            return 

        try {
            const index: number = parseInt(e.currentTarget.value)
            setLanguage(gameOptions.languages[index])
        } catch (ex) {
            console.error(ex)
        }
    }

    function changeName(e: React.SyntheticEvent<HTMLInputElement>) {
        setName(e.currentTarget.value)
    }

    async function submitGrid() {
        if (!name || !gridType || !language) {
            alert("Tous les champs sont obligatoires")
            return
        }

        const gameOption: GameOption = new GameOption(
            gridType,
            language,
            name
        )
        
        try {
            const response = await postRequest(JSON.stringify(gameOption), "/grid/new")

            if (response.ok) {
                const player: Player = await response.json() as Player
                const grid: Grid = player.grids[0]
                
                setPlayer(player)
                setCurrentGrid(grid)
                setPage("game")
            } else if (response.status === 507) {
                alert("Limite de sauvegardes atteites. Veuillez supprimer une partie puis réessayez.")
                setPage("landing")
            }
            
        } catch (ex) {
            console.error(ex)
        }
    }

    return (
        <div className="pt-5 w-full grow flex flex-col gap-5">
            <div>
                <h2 className="font-bold">Choisir le type de grille de jeu :</h2>
                <ScrabbleContainer setWidth={setWidth}>
                    { gridType ? <ScrabbleBoard width={width} grid={emptyGrid} gridType={gridType} /> : null }
                </ScrabbleContainer>

                <div className="flex justify-between">
                    <Arrow action={() => previousGridType()} reversed={true} className="w-[2rem]" visible={gridTypeIndex > 0}/>
                    <Arrow action={() => nextGridType()} reversed={false} className="w-[2rem]" visible={gridTypeIndex < gameOptions?.gridTypes.length - 1}/>
                </div>
            </div>

            <div className="h-full px-5 flex flex-col gap-7">
                <FormInput name="Choisir la langue de jeu :">
                    <select onChange={(e) => changeLanguageId(e)} className="w-full px-1.5 py-1">
                        { options }
                    </select>
                </FormInput>

                <FormInput name="Donner un nom à votre grille de jeu :">
                    <input onChange={(e) => changeName(e)} className="w-full py-1 px-3" />
                </FormInput>
                
                <WoodenButton text="Débuter la partie" action={submitGrid} />
            </div>

            <div className="px-5">
                <WoodenButton text="Retour" action={() => setPage("landing")} />
            </div>
        </div>
    )
}