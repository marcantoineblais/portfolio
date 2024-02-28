"use client"

import React from "react";
import SavedGameCard from "./SavedGameCard";
import WoodenButton from "./WoodenButton";
import CellphoneDisplay from "../CellphoneDisplay";

export default function SavedGames({ basis }: { basis: number }) {

  const [games, setGames] = React.useState<React.JSX.Element[]>([])
  const [loading, setLoading] = React.useState<boolean>(false)

  return (
    <CellphoneDisplay basis={basis}>
      <div className="h-full px-5 flex flex-col justify-between">
        <div className="mt-10 pb-5 flex flex-col">
          <h2 className="font-bold">Sélectionner une partie :</h2>
          <div className="w-full grow flex flex-col gap-5">
            {games}
          </div>
        </div>
        <WoodenButton text="Retour" />
      </div>
    </CellphoneDisplay>
  )
}