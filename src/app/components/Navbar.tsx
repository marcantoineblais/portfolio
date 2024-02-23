"use client"

import React from "react"

export default function Navbar() {

  const [showMenu, setShowMenu] = React.useState<boolean>(false)
  const menuRef = React.useRef<HTMLUListElement|null>(null)
  const iconRef = React.useRef<HTMLSpanElement|null>(null)

  React.useEffect(() => {
    if (!menuRef.current || !iconRef.current)
      return

    if (showMenu) {
      menuRef.current.classList.remove("scale-x-0")
      iconRef.current.classList.add("rotate-90")
    } else {
      menuRef.current.classList.add("scale-x-0")
      iconRef.current.classList.remove("rotate-90")
    }
  }, [showMenu])

  return (
    <div className="p-3 flex flex-col justify-center gap-3 items-end bg-neutral-900 text-neutral-300">
      <span 
        ref={iconRef}
        onClick={() => setShowMenu(!showMenu)} 
        className="w-8 cursor-pointer md:hidden duration-500"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
          <rect fill="currentColor" x="212" y="-121.02" width="76" height="463.89" rx="4.12" transform="translate(360.92 -139.08) rotate(90)"/>
          <rect fill="currentColor" x="212" y="157.13" width="76" height="463.89" rx="4.12" transform="translate(639.08 139.08) rotate(90)"/>
          <rect fill="currentColor" x="212" y="18.05" width="76" height="463.89" rx="4.12" transform="translate(500 0) rotate(90)"/>
        </svg>
      </span>
      <ul 
        ref={menuRef} 
        className="
          z-50 fixed md:static top-16 left-1/2 right-3 scale-x-0 md:scale-x-100
          flex flex-col md:flex-row md:justify-between md:gap-5 
          bg-inherit text-center font-kode_mono font-bold duration-500 origin-right
        "
      >
        <li className="py-3 md:py-1 px-3 border-b border-neutral-300 hover:text-neutral-500 hover:border-neutral-500 cursor-pointer duration-200">À propos</li>
        <li className="py-3 md:py-1 px-3 border-b border-neutral-300 hover:text-neutral-500 hover:border-neutral-500 cursor-pointer duration-200">Projets</li>
        <li className="py-3 md:py-1 px-3 border-b border-neutral-300 hover:text-neutral-500 hover:border-neutral-500 cursor-pointer duration-200">Contact</li>
      </ul>
    </div>
  )
}