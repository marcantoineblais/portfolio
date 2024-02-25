"use client"

import React from "react"

const Navbar = ({ activePage }: { activePage: string }) => {

  const containerRef = React.useRef<HTMLDivElement|null>(null)
  const menuIconRef = React.useRef<HTMLDivElement|null>(null)
  const navBtnRef = React.useRef<HTMLDivElement|null>(null)

  // Close the menu when clicking anywhere on screen
  React.useEffect(() => {
    const menuIcon = menuIconRef.current
    const navBtn = navBtnRef.current

    if (!menuIcon || !navBtn)
      return

    const closeMenu = () => {
      navBtn.classList.add("scale-x-0")
      menuIcon.classList.remove("rotate-90")
    }

    window.addEventListener("click", closeMenu)

    return () => {
      window.addEventListener("click", closeMenu)
    }
  }, [])

  // Change colors of the active page btn
  React.useEffect(() => {
    const navBtn = navBtnRef.current

    if (!navBtn)
      return

    let i = 0

    if (activePage === "live")
      i = 0
    else if (activePage === "recordings")
      i = 1
    else if (activePage === "settings")
      i = 2

    navBtn.children[i].classList.add("bg-sky-700", "border-sky-700", "cursor-default", "text-gray-100")
    navBtn.children[i].classList.remove("border-gray-400", "hover:text-gray-700", "hover:border-gray-700")
  }, [activePage])

  // Open menu
  const showMenu = (e: React.MouseEvent) => {
    e.stopPropagation()

    const navBtn = navBtnRef.current
    const menuIcon = e.currentTarget

    navBtn?.classList.toggle('scale-x-0')
    menuIcon.classList.toggle("rotate-90")
  }

  return (
    <div className="relative pt-1 border-b-2 border-gray-300 shadow">
      <div ref={containerRef} className="px-1 h-full container max-w-screen-lg flex justify-between items-center mx-auto">
        <div className="bg-chats-titre bg-bottom bg-contain bg-origin-content bg-clip-text text-transparent">
          <h2 className="text-gray-950/50 text-4xl font-extrabold tracking-widest">CATCAM</h2>
        </div>
        <menu className="h-full py-1 flex justify-end items-end">
          <div ref={menuIconRef} className="py-1 h-full flex items-center duration-200" onClick={(e: React.MouseEvent) => showMenu(e)}>
            <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
              <rect fill="currentColor" x="212" y="-121.02" width="76" height="463.89" rx="4.12" transform="translate(360.92 -139.08) rotate(90)" />
              <rect fill="currentColor" x="212" y="157.13" width="76" height="463.89" rx="4.12" transform="translate(639.08 139.08) rotate(90)" />
              <rect fill="currentColor" x="212" y="18.05" width="76" height="463.89" rx="4.12" transform="translate(500 0) rotate(90)" />
            </svg>
          </div>
          <div ref={navBtnRef} className="flex flex-col justify-end items-end absolute top-12 left-0 right-0 z-50 bg-gray-100 scale-x-0 duration-200 origin-right">
            <button className="w-full text-center py-4 border-2 duration-200 border-gray-400 hover:text-gray-700 hover:border-gray-700">Live</button>
            <button className="w-full text-center py-4 border-2 duration-200 border-gray-400 hover:text-gray-700 hover:border-gray-700">Recordings</button>
            <button className="w-full text-center py-4 border-2 duration-200 border-gray-400 hover:text-gray-700 hover:border-gray-700">Settings</button>
            <button className="w-full text-center py-4 border-2 border-gray-400 text-amber-900 duration-200 hover:text-amber-700 hover:border-amber-700">Logout</button>
          </div>
        </menu>
      </div>
    </div>
  )
}

export default Navbar
