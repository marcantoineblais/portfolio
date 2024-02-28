"use client"

import React from "react";
import WoodenButton from "../components/WoodenButton";
import { postRequest } from "../utilities/utilities";
import { Player } from "../models/Player";
import { LoginRequest } from "../models/LoginRequest";
import CheetahLogo from "../components/CheetahLogo";
import FormInput from "../components/FormInput";

export default function Login({ setPlayer, setPage }: { setPlayer: Function, setPage: Function }) {

    const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false)
    const formRef = React.useRef<HTMLFormElement|null>(null)

    async function login() {
        if (!formRef.current)
            return

        const form = formRef.current
        const username = form.username.value
        const password = form.password.value
        const rememberMe = form.rememberMe.checked

        if (!username || !password) {
            alert("Tous les champs sont requis")
            return
        }

        const loginRequest: LoginRequest = new LoginRequest(
            username,
            password,
            rememberMe
        )

        try {
            const response = await postRequest(JSON.stringify(loginRequest), "/login")
            
            if (response.ok) {
                const player: Player = await response.json()
                setPlayer(player)
                setPage("landing")                
            } else if (response.status === 401) {
                alert("Votre inscription n'a pas encore été approuvée. Veuillez réessayer plus tard.")
            } else if (response.status === 511) {
                alert("Nom d'utilisateur ou mot de passe incorrect.")
            } else {
                alert("Un problème est survenu, veuillez réessayer plus tard.")
            }
        } catch (ex) {
            console.error(ex)
        }
    }

    function signIn() {
        setPage("signIn")
    }

    return (
        <div className="grow px-5 flex flex-col justify-between gap-7">
            <div className="flex flex-col gap-7">
                <CheetahLogo className="text-emerald-900" />

                <form ref={formRef} className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
                    <FormInput name="Nom d'utilisateur">
                        <input name="username" className="py-1 px-3 rounded" type="text" maxLength={30} />
                    </FormInput>

                    <FormInput name="Mot de passe" className="relative" >
                        <input name="password" className="py-1 px-3 rounded" type={passwordVisible ? "text" : "password"} maxLength={30} />
                        <button 
                            className="absolute bottom-0 right-0 py-1 px-3 cursor-pointer hover:opacity-50"
                            onClick={() => setPasswordVisible(!passwordVisible)}
                        >
                            { passwordVisible ? "Masquer" : "Afficher" }
                        </button>
                    </FormInput>

                    <label className="w-fit flex items-center" htmlFor="rememberMe">
                        <input className="me-2" id="rememberMe" name="rememberMe" type="checkbox" />
                        Se souvenir de moi
                    </label>
                </form>
                <WoodenButton text="Se connecter" action={login}/>
            </div>

            <div className="w-full flex flex-col">
                <p>Vous n&apos;avez pas de compte?</p>
                <WoodenButton text="S'inscrire" action={() => signIn()}/>
            </div>
        </div>
    )
}