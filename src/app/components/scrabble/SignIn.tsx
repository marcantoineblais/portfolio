"use client"

import React from "react"
import CheetahLogo from "../components/CheetahLogo"
import FormInput from "../components/FormInput"
import WoodenButton from "../components/WoodenButton"
import { SignInRequest } from "../models/SignInRequest"
import { postRequest } from "../utilities/utilities"
import { log } from "console"
import LoadingScreen from "../components/LoadingScreen"

export default function SignIn({ setPage }: { setPage: Function }) {

    const [loading, setLoading] = React.useState<boolean>(false)
    const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false)
    const formRef = React.useRef<HTMLFormElement|null>(null)

    async function submitForm() {
        if (!formRef.current)
            return

        const form = formRef.current
        const username = form.username.value
        const password = form.password.value
        const email = form.email.value
        const info = form.info.value

        if (!username || !password || !email || !info) {
            alert("Tous les champs sont requis")
            return
        }

        if (username.length < 4) {
            alert("Le nom d'utilisateur doit contenir au moins 4 charactères.")
            return
        }

        if (password.length < 8) {
            alert("Le mot de passe doit contenir au moins 8 charactères.")
            return
        }

        const pattern: string = "^[a-zA-Z0-9\-_\.]+@[a-zA-Z]+\.[a-zA-Z]{2,3}$"
        if (!email.match(pattern)) {
            alert("L'adresse courriel n'a pas un format valide.")
            return
        }

        const body: SignInRequest = new SignInRequest(
            username,
            password,
            email,
            info
        )

        setLoading(true)
        try {
            const response = await postRequest(JSON.stringify(body), "/signin")
            
            if (response.ok) {
                alert("Votre demande à bien été envoyée.")
                setPage("")                
            } else if (response.status === 409) {
                alert("Ce nom d'utilisateur n'est pas disponible.")
            } else {
                console.warn(response.status)
            }
        } catch (ex) {
            console.error(ex)
        }
        setLoading(false)
    }


    return (
        <div className="px-5 grow flex flex-col justify-between gap-7">
            <LoadingScreen visible={loading} />
            <div className="flex flex-col gap-5">
                <CheetahLogo className="text-emerald-800" />
                <p className="pb-3 text-justify border-b">Veuillez remplir les champs ci-dessous. Vous recevrez un courriel une fois que votre demande sera acceptée.</p>
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
                    
                    <FormInput name="Courriel">
                        <input name="email" className="py-1 px-3 rounded" type="text" />
                    </FormInput>
                    
                    <FormInput name="Qui êtes-vous ?">
                        <textarea name="info" className="py-1 px-3 rounded" maxLength={300} rows={3} />
                    </FormInput>
                </form>
                <WoodenButton text="Envoyer" action={() => submitForm()} />
            </div>

            <WoodenButton text="Retour" action={() => setPage("")} />
        </div>
    )
}