"use client"

import React from "react";
import WoodenButton from "./WoodenButton";
import CheetahLogo from "./CheetahLogo";
import FormInput from "./FormInput";
import CellphoneDisplay from "../CellphoneDisplay";
import Menu from "./Menu";

export default function Login({ basis }: { basis: number }) {

  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false)
  const formRef = React.useRef<HTMLFormElement|null>(null)

  return (
    <CellphoneDisplay basis={basis} >
      <Menu title="Connexion">
        <div className="grow p-5 flex flex-col justify-between gap-7">
          <div className="flex flex-col gap-7">
            <CheetahLogo className="text-emerald-900" />

            <form ref={formRef} className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <FormInput name="Nom d'utilisateur">
                <input name="username" className="py-1 px-3 rounded" type="text" readOnly />
              </FormInput>

              <FormInput name="Mot de passe" className="relative" >
                <input name="password" className="py-1 px-3 rounded" type={passwordVisible ? "text" : "password"} readOnly />
                <button
                  className="absolute bottom-0 right-0 py-1 px-3 cursor-pointer hover:opacity-50"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? "Masquer" : "Afficher"}
                </button>
              </FormInput>

              <label className="w-fit flex items-center" htmlFor="rememberMe">
                <input className="me-2" name="rememberMe" type="checkbox" />
                Se souvenir de moi
              </label>
            </form>
            <WoodenButton text="Se connecter" />
          </div>

          <div className="w-full flex flex-col">
            <p>Vous n&apos;avez pas de compte?</p>
            <WoodenButton text="S'inscrire" />
          </div>
        </div>
      </Menu>
    </CellphoneDisplay>
  )
}