"use client"

import React from "react"
import CellphoneDisplay from "../CellphoneDisplay"

export default function Login({ basis }: { basis: number }) {

  return (
    <CellphoneDisplay basis={basis}>
      <div className="h-full px-1 pt-5 max-w-screen-md container mx-auto bg-chat-logo bg-contain bg-no-repeat bg-bottom">
        <form className="w-full px-3 py-6 shadow bg-gray-50 rounded">
          <h1 className="w-full pb-10 text-center text-3xl paysage-hidden">Connexion</h1>

          <label className="flex pt-3">
            <p className="basis-40 text-sm">Courriel</p>
            <input className="px-1.5 grow bg-gray-100 rounded text-sm" placeholder="exemple@outlook.com" readOnly></input>
          </label>

          <label className="flex pt-3">
            <p className="basis-40 text-sm">Mot de passe</p>
            <input className="px-1.5 grow bg-gray-100 rounded text-sm" name="password" type="password" placeholder="Mot de passe" readOnly></input>
          </label>

          <label className="flex pt-3">
            <p className="basis-40 text-sm">Se souvenir de moi</p>
            <input className="bg-gray-100 rounded" name="rememberMe" type="checkbox" readOnly></input>
          </label>

          <div className="pt-5 flex justify-center">
            <button className="py-2 w-32 bg-sky-800 text-gray-50 rounded duration-200 hover:bg-sky-700" form="login" type="submit">Envoyer</button>
          </div>
        </form>
      </div>
    </CellphoneDisplay>
  )
}