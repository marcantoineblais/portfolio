"use client"

import React from "react"

export default function Login() {

  return (
    <div className="h-full px-1 pt-5 max-w-screen-md container mx-auto bg-chat-logo bg-contain bg-no-repeat bg-bottom">
      <form className="w-full px-3 py-6 shadow bg-gray-50 rounded dark:bg-zinc-700 dark:shadow-zinc-50/10">
        <h1 className="w-full pb-10 text-center text-3xl paysage-hidden">Login</h1>

        <label className="flex pt-3">
          <p className="basis-32 text-sm">Email</p>
          <input className="px-1.5 grow bg-gray-100 rounded text-sm dark:text-zinc-950" name="email"></input>
        </label>

        <label className="flex pt-3">
          <p className="basis-32 text-sm">Password</p>
          <input className="px-1.5 grow bg-gray-100 rounded text-sm dark:text-zinc-950" name="password" type="password"></input>
        </label>

        <label className="flex pt-3">
          <p className="basis-32 text-sm">Remember me</p>
          <input className="bg-gray-100 rounded" id="remember-me dark:text-zinc-950" name="rememberMe" type="checkbox"></input>
        </label>

        <div className="pt-5 flex justify-center">
          <button className="py-2 w-32 bg-sky-800 text-gray-50 rounded duration-200 hover:bg-sky-700" form="login" type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}