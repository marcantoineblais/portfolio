"use client"

import React from "react"

export default function LightDrop() {

  const baseRef = React.useRef<HTMLDivElement|null>(null)

  React.useEffect(() => {

  }, [])

  return (
    <div>
      <div ref={baseRef} className="absolute origin-bottom mx-auto left-0 right-0 bottom-0 rounded-full bg-white/25"></div>
    </div>
  )
}