"use client"

import React from "react"

export default function Settings() {

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
    <div className="h-full px-1 pt-5 max-w-screen-md container mx-auto bg-chat-logo bg-contain bg-no-repeat bg-bottom">
      <form className="w-full px-3 py-6 shadow bg-gray-50 rounded dark:bg-zinc-700 dark:shadow-zinc-50/10">
        <h1 className="w-full pb-10 text-center text-3xl paysage-hidden">Settings</h1>

        <label className="flex pt-3">
          <p className="basis-36 text-sm">Appearance</p>
          <select ref={appearanceRef} className="px-1.5 grow bg-gray-100 rounded text-sm dark:text-zinc-950" name="appearance">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="auto">Auto</option>
          </select>
        </label>

        <label className="flex pt-3">
          <p className="basis-36 text-sm">Recordings per page</p>
          <select ref={nbItemsRef} className="px-1.5 grow bg-gray-100 rounded text-sm dark:text-zinc-950" name="pageSize">
            <option value="12">12</option>
            <option value="24">24</option>
            <option value="48">48</option>
            <option value="96">96</option>
          </select>
        </label>

        <label className="flex pt-3">
          <p className="basis-36 text-sm">Landing page</p>
          <select ref={landingRef} className="px-1.5 grow bg-gray-100 rounded text-sm dark:text-zinc-950" name="landing">
            <option value="/">Livestream</option>
            <option value="/recordings">Recorginds</option>
          </select>
        </label>
      </form>
    </div>
  )
}