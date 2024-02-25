"use client"

import React from "react";
import Navbar from "./Navbar";
import VideoPlayer from "./VideoPlayer";
import ZoomPad from "./ZoomPad";

export default function LiveStream() {

  const videoRef = React.useRef<HTMLImageElement|null>(null)
  const containerRef = React.useRef<HTMLDivElement|null>(null)

  return (
    <>
      <Navbar activePage="live" />
      <div ref={containerRef} className="w-full h-full p-1 flex flex-col">
        <VideoPlayer videoRef={videoRef} containerRef={containerRef} />
        <ZoomPad videoRef={videoRef} containerRef={containerRef} />
      </div>
    </>
  )
}