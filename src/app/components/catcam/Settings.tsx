"use client"

import React from "react"
import CellphoneDisplay from "../CellphoneDisplay"
import Navbar from "./Navbar"

export default function Settings({ basis }: { basis: number }) {

  const appearanceRef = React.useRef<HTMLSelectElement | null>(null)
  const nbItemsRef = React.useRef<HTMLSelectElement | null>(null)
  const landingRef = React.useRef<HTMLSelectElement | null>(null)

  React.useEffect(() => {
    const appearance = appearanceRef.current
    const appearanceValue = localStorage.getItem("appearance")
    const nbItems = nbItemsRef.current
    const nbItemsValue = localStorage.getItem("pageSize")
    const landing = landingRef.current
    const landingValue = localStorage.getItem("landing")

    if (appearance && appearanceValue)
      appearance.value = appearanceValue

    if (nbItems && nbItemsValue)
      nbItems.value = nbItemsValue

    if (landing && landingValue)
      landing.value = landingValue
  }, [appearanceRef, nbItemsRef, landingRef])

  return (
    <CellphoneDisplay basis={basis}>
      <Navbar activePage="settings"/>
      <div className="h-full px-1 pt-5 max-w-screen-md container mx-auto bg-chat-logo bg-contain bg-no-repeat bg-bottom">
        <form className="w-full px-3 py-6 shadow bg-gray-50 rounded">
          <h1 className="w-full pb-10 text-center text-3xl paysage-hidden">Paramètres</h1>

          <label className="flex pt-3">
            <p className="basis-44 text-sm">Apparence</p>
            <select ref={appearanceRef} className="px-1.5 grow bg-gray-100 rounded text-sm" name="appearance">
              <option value="light">Clair</option>
              <option disabled value="dark">Sombre</option>
              <option disabled value="auto">Auto</option>
            </select>
          </label>

          <label className="flex pt-3">
            <p className="basis-44 text-sm">Enregistrements par page</p>
            <select ref={nbItemsRef} className="px-1.5 grow bg-gray-100 rounded text-sm" name="pageSize">
              <option value="12">12</option>
              <option disabled value="24">24</option>
              <option disabled value="48">48</option>
              <option disabled value="96">96</option>
            </select>
          </label>

          <label className="flex pt-3">
            <p className="basis-44 text-sm">Page d'accueil</p>
            <select ref={landingRef} className="px-1.5 grow bg-gray-100 rounded text-sm" name="landing">
              <option value="/">En direct</option>
              <option disabled value="/recordings">Enregistrements</option>
            </select>
          </label>
        </form>
      </div>
    </CellphoneDisplay>
  )
}