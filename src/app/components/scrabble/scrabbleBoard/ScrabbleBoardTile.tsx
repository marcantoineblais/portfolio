"use client"

import React from "react"

export default function ScrabbleBoardTile({ size, bonus }: { size: number, bonus: number }) {

  const [text, setText] = React.useState<string>("")
  const [background, setBackground] = React.useState("")
  const tileRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    if (!tileRef.current)
      return

    const tile = tileRef.current
    tile.style.width = size + "px"
    tile.style.height = size + "px"
    tile.style.lineHeight = size * 0.28 + "px"

    if (bonus === 5)
      tile.style.fontSize = size + "px"
    else
      tile.style.fontSize = size * 0.22 + "px"
  }, [size, bonus])

  React.useEffect(() => {
    switch (bonus) {
      case 1:
        setText("Lettre Compte Double")
        setBackground("bg-green-700")
        break

      case 2:
        setText("Lettre Compte Triple")
        setBackground("bg-sky-700")
        break

      case 3:
        setText("Mot Compte Double")
        setBackground("bg-orange-500")
        break

      case 4:
        setText("Mot Compte Triple")
        setBackground("bg-red-700")
        break

      case 5:
        setText(String.fromCharCode(9733))
        setBackground("bg-orange-300")
        break

      default:
        setBackground("bg-orange-300")
        setText("")
        break
    }
  }, [bonus])

  return (
    <div
      ref={tileRef}
      className={
        `w-full h-full 
                flex justify-center items-center duration-200
                border text-center border-orange-100
                bg- text-slate-100 overflow-hidden 
                ${background}`}
    >
      {text}
    </div>
  )
}