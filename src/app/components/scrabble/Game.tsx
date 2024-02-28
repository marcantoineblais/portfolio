"use client"

import React from "react"
import ScrabbleContainer from "../components/scrabbleBoard/ScrabbleContainer"
import ScrabbleBoard from "../components/scrabbleBoard/ScrabbleBoard"
import ScrabbleLetters from "../components/scrabbleBoard/ScrabbleLetters"
import { Grid } from "../models/Grid"
import ScrabbleOverlay from "../components/scrabbleBoard/ScrabbleOverlay"
import { Entry } from "../models/Entry"
import WoodenButton from "../components/WoodenButton"
import FormInput from "../components/FormInput"
import Drawer from "../components/Drawer"
import { postRequest } from "../utilities/utilities"
import LoadingScreen from "../components/LoadingScreen"
import ConditionalDiv from "../components/ConditionalDiv"
import SolutionsBrowser from "../components/SolutionsBrowser"
import { Solution } from "../models/Solution"
import { Player } from "../models/Player"

export default function Game(
    { currentGrid, setPage, setPlayer }: 
    { currentGrid: Grid, setPage: Function, setPlayer: Function }
) {
    const [width, setWidth] = React.useState<number>(0)
    const [grid, setGrid] = React.useState<string[][]>(currentGrid.grid)
    const [selectedTile, setSelectedTile] = React.useState<number[]|null>(null)
    const [selectedVertical, setSelectedVertical] = React.useState<boolean>(false)
    const [selectedEntry, setSelectedEntry] = React.useState<Entry|null>(null)
    const [selectedSolution, setSelectedSolution] = React.useState<Solution|null>(null)
    const [newEntry, setNewEntry] = React.useState<Entry|null>(null)
    const [entries, setEntries] = React.useState<Entry[]>([])
    const [solutions, setSolutions] = React.useState<Solution[]>([])
    const [newWord, setNewWord] = React.useState<string>("")
    const [editedWord, setEditedWord] = React.useState<string>("")
    const [playerLetters, setPlayerLetters] = React.useState<string>("")
    const [openDrawerId, setOpenDrawerId] = React.useState<number|null>(1)
    const [wordEditMode, setWordEditMode] = React.useState<boolean>(false)
    const [loadingScreen, setLoadingScreen] = React.useState<boolean>(false)
    const [blankTiles, setBlankTiles] = React.useState<number[][]>(currentGrid.blankTiles)
    const newWordTextBoxRef = React.useRef<HTMLInputElement|null>(null)
    const editWordTextBoxRef = React.useRef<HTMLInputElement|null>(null)
    const lettersTextBoxRef = React.useRef<HTMLInputElement|null>(null)
    

    // READ ENTRIES FROM GRID
    React.useEffect(() => {
        const updatedEntries: Entry[] = []

        grid.forEach((row, y) => {
            row.forEach((letter, x) => {
                if (letter) {
                    if (x === 0 || !grid[y][x - 1]) {
                        let word: string = ""
                        let i = x
                        while (i < grid[y].length && grid[y][i]) {
                            word += grid[y][i++]
                        }

                        if (word.length > 1) {
                            updatedEntries.push(new Entry(word, y, x, false))
                        }
                    }

                    if (y === 0 || !grid[y - 1][x]) {
                        let word: string = ""
                        let i = y
                        while (i < grid.length && grid[i][x]) {
                            word += grid[i++][x]
                        }

                        if (word.length > 1) {
                            updatedEntries.push(new Entry(word, y, x, true))
                        }
                    }
                }
            })
        })

        currentGrid.grid = grid
        setEntries(updatedEntries)    
    }, [grid, currentGrid])

    // SELECT THE NEW ENTRY TO DISPLAY ON GRID, TURNS RED WHEN CANNOT BE PLACED
    React.useEffect(() => {
        if (!selectedTile)
            return

        let entry: Entry|null
        
        if (openDrawerId === 1)
            entry = new Entry(newWord, selectedTile[0], selectedTile[1], selectedVertical)
        else if (openDrawerId === 2 && selectedEntry && wordEditMode)
            entry = new Entry(editedWord, selectedTile[0], selectedTile[1], selectedVertical)
        else 
            entry = null

        if (entry) {
            if (entry.lastY() >= grid.length || entry.lastX() >= grid[0].length)
                entry.conflict = true
            else {
                const conflicts: number[][] = entries.map(e => e.letterConflicts(entry)).flat()

                if (selectedEntry)
                    entry.conflict = !conflicts.every(([y, x]) => selectedEntry.isSelected([y, x], selectedEntry.vertical))   
                else
                    entry.conflict = conflicts.length > 0
            }
        }
        
        setNewEntry(entry)

    }, [newWord, editedWord, selectedTile, selectedVertical, openDrawerId, entries, grid, selectedEntry, wordEditMode])

    // CHANGE THE SELECTED ENTRY WHEN THE EDIT MENU IS OPEN
    React.useEffect(() => {
        if (!selectedTile || !editWordTextBoxRef.current)
            return 

        const textbox = editWordTextBoxRef.current

        if (openDrawerId === 2 && !wordEditMode) {
            const entry = entries.find(e => e.isSelected(selectedTile, selectedVertical)) || null
            setSelectedEntry(entry)
            textbox.value = entry ? entry.word.toUpperCase() : ""
        } else if (openDrawerId !==2) {     
            setWordEditMode(false)
        }
        
    }, [selectedTile, selectedVertical, openDrawerId, entries, wordEditMode])

    // REMOVE THE SELECTED ENTRY FROM THE GRID WHILE EDITING, KEEP THE BACKGROUND COLOR FOR REFERENCE
    React.useEffect(() => {        
        if (!selectedEntry)
            return
        
        if (wordEditMode) {
            setEditedWord(selectedEntry.word)
            setEntries((entries) => [...entries.filter(e => !e.equals(selectedEntry))])
        } else if (openDrawerId !== 2) {
            setEditedWord("")
            setNewEntry(null)
            setSelectedEntry((null))
            setEntries((entries) => [...entries, selectedEntry])
        }
            
    }, [wordEditMode, openDrawerId, selectedEntry])

    React.useEffect(() => {
        currentGrid.playerLetters = playerLetters
        currentGrid.blankTiles = blankTiles
        currentGrid.grid = grid
    }, [playerLetters, blankTiles, grid, currentGrid])

    React.useEffect(() => {
        async function saveGrid() {     
            try {
                const response = await postRequest(JSON.stringify(currentGrid), "/grid")
                if (response.ok) {
                    const player: Player = await response.json()
                    setPlayer(() => player)
                } else {
                    console.warn("Could not update player data")
                }
            } catch (ex) {
                console.error(ex)
            }
        }

        saveGrid()
    }, [grid, blankTiles, currentGrid, setPlayer])


    // WRITE THE ENTRIES ON THE GRID AND UPDATE THE GRID
    function updateGrid(entryList: Entry[]) {       
        let updatedGrid: string[][] = currentGrid.grid.map(row => row.map(_col => ""))
        
        entryList.forEach(entry => entry.writeWordOnGrid(updatedGrid))
        setGrid([...updatedGrid])
    }

    function selectTile([y, x]: number[]) {
        if (selectedTile && selectedTile[0] == y && selectedTile[1] == x)
            setSelectedVertical(!selectedVertical)
        else
            setSelectedTile([y, x])
    }
    
    function selectOrToggleTile([y, x]: number[]) {
        const timer = setTimeout(() => {
            if (!grid[y][x])
                return

            const updatedList = blankTiles.filter(([j, i]: number[]) => j !== y || i !== x)
        
            if (updatedList.length === blankTiles.length)
                updatedList.push([y, x])

            setBlankTiles(updatedList)
            navigator.vibrate(50)
            window.removeEventListener("mouseup", cancelTimeout)
            window.removeEventListener("touchend", cancelTimeout)
        }, 200)

        const cancelTimeout = () => {
            clearTimeout(timer)
            selectTile([y, x])
            window.removeEventListener("mouseup", cancelTimeout)
            window.removeEventListener("touchend", cancelTimeout)
        }

        window.addEventListener("mouseup", cancelTimeout)
        window.addEventListener("touchend", cancelTimeout)
    }

    function updateNewWord() {
        if (!newWordTextBoxRef.current)
            return

        const textbox = newWordTextBoxRef.current
        textbox.value = textbox.value.toUpperCase()
        setNewWord(textbox.value)
    }

    function editSelectedWordLetters() {
        if (!editWordTextBoxRef.current || !selectedEntry)
            return

        const textbox = editWordTextBoxRef.current
        textbox.value = textbox.value.toUpperCase()
        setEditedWord(textbox.value)
    }

    function toggleWordEditMode() {
        if (!selectedEntry || wordEditMode)
            setWordEditMode(false)
        else
            setWordEditMode(true)
    }

    function updatePlayerLetters() {
        if (!lettersTextBoxRef.current)
            return

        const textbox = lettersTextBoxRef.current
        textbox.value = textbox.value.toUpperCase()
        setPlayerLetters(textbox.value) 
    }

    function placeWord() {
        if (!newEntry)
            return

        if (newEntry.conflict || !newEntry.word.length) {
            alert("Impossible de placer le mot ici.")
            return
        }

        setSelectedEntry(null)
        setNewEntry(null)
        setWordEditMode(false)

        if (openDrawerId === 1) {
            resetTextbox(newWordTextBoxRef)
            setNewWord("")
        } else {
            resetTextbox(editWordTextBoxRef)
            setEditedWord("")
        }

        updateGrid([...entries, newEntry])
    }

    function eraseEntry() {
        if (!selectedEntry)
            return

        if (confirm("Voulez-vous effacer le mot " + selectedEntry.word + " ?")) {
            const coords = selectedEntry.coords()

            setSelectedEntry(null)
            entries.forEach(entry => {
                coords.forEach(([y, x]) => entry.eraseLetterArCoord([y, x]))
            })
            resetTextbox(editWordTextBoxRef)
            updateGrid(entries.filter(e => !e.equals(selectedEntry)))
        }
    }

    function openDrawer(id: number) {
        if (openDrawerId === id)
            setOpenDrawerId(null)
        else
            setOpenDrawerId(id)
    }

    function acceptSolution() {
        if (!entries || !selectedSolution)
            return 

        selectedSolution.blankTiles.forEach(i => {
            const y = selectedSolution.entry.vertical ? i + selectedSolution.entry.y : selectedSolution.entry.y
            const x = selectedSolution.entry.vertical ? selectedSolution.entry.x : i + selectedSolution.entry.x
            blankTiles.push([y, x])
        })

        setSelectedSolution(null)
        setBlankTiles([...blankTiles])
        setWordEditMode(false)
        setSolutions([])
        resetTextbox(lettersTextBoxRef)
        updateGrid([...entries, selectedSolution.entry])
    }

    function ignoreSolutions() {
        if (confirm("Voulez-vous vraiment refuser toutes les solutions proposées?")) {
            setSelectedSolution(null)
            setSolutions([])
        }
    }

    function resetTextbox(textbox: React.MutableRefObject<HTMLInputElement|null>) {
        if (!textbox.current)
            return 

        textbox.current.value = ""
    }

    async function submitGrid() {
        if (!playerLetters) {
            alert("Veuillez entrer au moins une lettre")
            return
        }

        setLoadingScreen(true)
        const body: Grid = new Grid(
            currentGrid.id, 
            currentGrid.name, 
            grid, 
            playerLetters, 
            currentGrid.gridType,
            blankTiles, 
            currentGrid.language, 
            currentGrid.player
        )

        try {
            const response = await postRequest(JSON.stringify(body), "/grid/solve")          
            const data = await response.json()
            const solutionsList: Solution[] = []
            
            data.forEach((obj: any) => {
                const entry: Entry = new Entry(obj.entry.word, obj.y, obj.x, obj.vertical)
                solutionsList.push(new Solution(entry, obj.points, obj.blankTiles))
                setSolutions(solutionsList)
            })
            
        } catch (ex) {
            console.error(ex)
        }
        setLoadingScreen(false)
    }    

    return (
        <div className="grow flex flex-col justify-between">
            <div className="pt-5 pb-3 flex flex-col gap-7">
                <LoadingScreen visible={loadingScreen} /> 

                <div>
                    <div className="flex justify-between">
                        <h2 className="font-bold">{ currentGrid.name }</h2>
                        <h2 className="font-bold">{ currentGrid.language.name }</h2>
                    </div>
                    <ScrabbleContainer setWidth={setWidth}>
                        <ScrabbleBoard width={width} grid={currentGrid.grid} gridType={currentGrid.gridType} />
                        <ScrabbleLetters grid={grid} newEntry={newEntry} selectedEntry={selectedEntry} selectedSolution={selectedSolution} blankTiles={blankTiles} width={width}/>
                        <ScrabbleOverlay width={width} selectedTile={selectedTile} selectedVertical={selectedVertical} grid={grid} selectOrToggleTile={selectOrToggleTile} selectedSolution={selectedSolution} />
                    </ScrabbleContainer>
                </div>
                
                <ConditionalDiv className="px-5 flex flex-col gap-10" visible={!solutions.length}>    
                    <Drawer title="Ajouter un mot" id={1} open={openDrawerId === 1} openDrawer={openDrawer}>
                        <FormInput name="Entrez un mot à placer :">
                            <input 
                                onChange={() => updateNewWord()} 
                                ref={newWordTextBoxRef} 
                                className="w-full py-1 px-3" 
                                maxLength={15}
                            />
                        </FormInput>
                        <WoodenButton text="Placer le mot" action={() => placeWord()} />
                    </Drawer>
                    
                    <Drawer title="Modifier un mot" id={2} open={openDrawerId === 2} openDrawer={openDrawer}>
                        <FormInput name="Modifier le mot sélectionné :">
                            <input 
                                onChange={() => editSelectedWordLetters()}
                                ref={editWordTextBoxRef}
                                readOnly={!wordEditMode}
                                className="w-full py-1 px-3"
                                maxLength={15} 
                            />
                        </FormInput>
                        <ConditionalDiv className="w-full flex gap-1" visible={!wordEditMode}>
                            <WoodenButton text="Modifier" action={() => toggleWordEditMode()} />
                            <WoodenButton text="Effacer" action={() => eraseEntry()} />
                        </ConditionalDiv> 
                        <ConditionalDiv className="w-full flex gap-1" visible={wordEditMode}>
                            <WoodenButton text="Accepter" action={() => placeWord()} /> 
                            <WoodenButton text="Annuler" action={() => toggleWordEditMode()} /> 
                        </ConditionalDiv> 
                    </Drawer>

                    <Drawer title="Trouver les solutions" id={3} open={openDrawerId === 3} openDrawer={openDrawer}>
                        <FormInput name="Entrez vos lettres :">
                            <input 
                                onChange={() => updatePlayerLetters()} 
                                ref={lettersTextBoxRef} 
                                className="w-full py-1 px-3" 
                                maxLength={7}
                            />
                        </FormInput>
                        <WoodenButton text="Trouver les solutions" action={() => submitGrid()} />
                    </Drawer>            
                </ConditionalDiv>

                <ConditionalDiv className="px-5" visible={solutions.length > 1}>
                    <SolutionsBrowser
                        solutions={solutions} 
                        ignoreSolutions={ignoreSolutions} 
                        setSelectedSolution={setSelectedSolution} 
                        acceptSolution={acceptSolution}
                    />
                </ConditionalDiv>               
            </div>
            <div className="px-5">
                <WoodenButton text="Retour" action={() => setPage("landing")} />
            </div>
        </div>
    )
}
