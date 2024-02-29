"use client"

import React, { ReactNode } from "react";
import SavedGameCard from "./SavedGameCard";
import WoodenButton from "./WoodenButton";
import CellphoneDisplay from "../CellphoneDisplay";
import Menu from "./Menu";

export default function SavedGames({ basis }: { basis: number }) {

  const [games, setGames] = React.useState<ReactNode[]>([])

  React.useEffect(() => {
    const games: ReactNode[] = []

    for (let i = 0; i < 3; i++) {
      const div = <SavedGameCard key={i} />
      games.push(div)
    }

    setGames(games)
  }, [])

  return (
    <CellphoneDisplay basis={basis}>
      <Menu title="Parties Sauvegardées" >
        <div className="h-full px-5 flex flex-col justify-between">
          <div className="mt-10 pb-5 flex flex-col">
            <h2 className="font-bold">Sélectionner une partie :</h2>
            <div className="w-full grow flex flex-col gap-5">
              {games}
            </div>
          </div>
          <WoodenButton text="Retour" />
        </div>
      </Menu>
    </CellphoneDisplay>
  )
}