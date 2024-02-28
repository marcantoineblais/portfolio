"use client"

import WoodenButton from "./WoodenButton"
import React from "react"
import ConditionalDiv from "./ConditionalDiv"
import CheetahLogo from "./CheetahLogo"
import CellphoneDisplay from "../CellphoneDisplay"

export default function Landing({ basis}: { basis: number }) {

  return (
    <CellphoneDisplay basis={basis}>
      <div className="h-full mt-5 px-5 flex flex-col justify-between gap-7">
        <div className="flex flex-col gap-5">
          <CheetahLogo className="text-emerald-900" />
          <div className="mt-5 flex flex-col gap-3">
            <WoodenButton text="Continuer" />
            <WoodenButton text="Nouvelle Partie" />
            <WoodenButton text="Reprendre Partie" />
            <WoodenButton text="Supprimer Partie" />
          </div>
        </div>
        <div className="w-full flex flex-col">
          <WoodenButton text="Se déconnecter" />
        </div>
      </div>
    </CellphoneDisplay>
  )
}