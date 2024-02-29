"use client"

import React from "react"
import ScrabbleContainer from "./scrabbleBoard/ScrabbleContainer"
import ScrabbleBoard from "./scrabbleBoard/ScrabbleBoard"
import ScrabbleLetters from "./scrabbleBoard/ScrabbleLetters"
import ScrabbleOverlay from "./scrabbleBoard/ScrabbleOverlay"
import WoodenButton from "./WoodenButton"
import FormInput from "./FormInput"
import Drawer from "./Drawer"
import ConditionalDiv from "./ConditionalDiv"
import SolutionsBrowser from "./SolutionsBrowser"
import { Entry } from "./models/Entry"
import { Solution } from "./models/Solution"
import CellphoneDisplay from "../CellphoneDisplay"
import Menu from "./Menu"

export default function Game({ basis }: { basis: number }) {
  const [width, setWidth] = React.useState<number>(0)
  const [grid, setGrid] = React.useState<string[][]>([
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "W", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "O", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "R", "", "", "", "", "", "", ""],
    ["", "", "", "", "H", "E", "L", "L", "O", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "D", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]
  ])
  const [gridType] = React.useState<any>({
    doubleLetter: [[0, 7], [1, 1], [1, 13], [2, 6], [2, 8], [4, 6], [4, 8], [6, 2], [6, 4], [6, 10], [6, 12], [7, 0], [7, 14], [8, 2], [8, 4], [8, 10], [8, 12], [10, 6], [10, 8], [12, 6], [12, 8], [13, 1], [13, 13], [14, 7]],
    tripleLetter: [[2, 2], [2, 12], [3, 7], [4, 4], [4, 10], [7, 3], [7, 11], [10, 4], [10, 10], [11, 7], [12, 2], [12, 12]],
    doubleWord: [[0, 0], [0, 14], [1, 5], [1, 9], [3, 3], [3, 11], [5, 1], [5, 5], [5, 9], [5, 13], [9, 1], [9, 5], [9, 9], [9, 13], [11, 3], [11, 11], [13, 5], [13, 9], [14, 0], [14, 14]],
    tripleWord: [[0, 4], [0, 10], [4, 0], [4, 14], [10, 0], [10, 14], [14, 4], [14, 10]]
  })
  const [selectedTile, setSelectedTile] = React.useState<number[] | null>(null)
  const [selectedVertical, setSelectedVertical] = React.useState<boolean>(false)
  const [selectedEntry, setSelectedEntry] = React.useState<Entry | null>(null)
  const [selectedSolution, setSelectedSolution] = React.useState<Solution | null>(null)
  const [newEntry, setNewEntry] = React.useState<Entry | null>(null)
  const [entries, setEntries] = React.useState<Entry[]>([])
  const [solutions, setSolutions] = React.useState<Solution[]>([])
  const [newWord, setNewWord] = React.useState<string>("")
  const [editedWord, setEditedWord] = React.useState<string>("")
  const [playerLetters, setPlayerLetters] = React.useState<string>("")
  const [openDrawerId, setOpenDrawerId] = React.useState<number | null>(1)
  const [wordEditMode, setWordEditMode] = React.useState<boolean>(false)
  const [blankTiles, setBlankTiles] = React.useState<number[][]>([[]])
  const newWordTextBoxRef = React.useRef<HTMLInputElement | null>(null)
  const editWordTextBoxRef = React.useRef<HTMLInputElement | null>(null)
  const lettersTextBoxRef = React.useRef<HTMLInputElement | null>(null)


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

    setEntries(updatedEntries)
  }, [grid])

  // SELECT THE NEW ENTRY TO DISPLAY ON GRID, TURNS RED WHEN CANNOT BE PLACED
  React.useEffect(() => {
    if (!selectedTile)
      return

    let entry: Entry | null

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
    } else if (openDrawerId !== 2) {
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


  // WRITE THE ENTRIES ON THE GRID AND UPDATE THE GRID
  function updateGrid(entryList: Entry[]) {
    let updatedGrid: string[][] = grid.map(row => row.map(_col => ""))

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

  function resetTextbox(textbox: React.MutableRefObject<HTMLInputElement | null>) {
    if (!textbox.current)
      return

    textbox.current.value = ""
  }

  function submitGrid() {

  }

  return (
    <CellphoneDisplay basis={basis}>
      <Menu title="Scrabble Cheetah">
        <div className="h-full w-full flex flex-col justify-between">
          <div className="w-full py-3 flex flex-col gap-7">
            <div className="w-full">
              <div className="w-full flex justify-between">
                <h2 className="font-bold">EXEMPLE</h2>
                <h2 className="font-bold">FRANCAIS</h2>
              </div>
              <ScrabbleContainer setWidth={setWidth}>
                <ScrabbleBoard width={width} grid={grid} gridType={gridType} />
                <ScrabbleLetters grid={grid} newEntry={newEntry} selectedEntry={selectedEntry} selectedSolution={selectedSolution} width={width} />
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
                    readOnly
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
          <div className="p-5">
            <WoodenButton text="Retour" />
          </div>
        </div>
      </Menu>
    </CellphoneDisplay>
  )
}
