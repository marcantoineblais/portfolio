"use client"

import React from "react"
import Logo from "./images/catcam-logo.png"
import Image from "next/image"

export default function VideoPlayer({ videoRef, containerRef }: { videoRef: React.MutableRefObject<HTMLImageElement|null>, containerRef: React.MutableRefObject<HTMLDivElement|null> }) {
  const [videoTime, setVideoTime] = React.useState<string>("0:12")
  const [videoEnd, setVideoEnd] = React.useState<string>("3:00")
  const [duration, setDuration] = React.useState<number>(300)
  const [paused, setPaused] = React.useState<boolean>(false)
  const [overlayTimeouts] = React.useState<any[]>([])
  const [dblClicksTimeouts] = React.useState<any[]>([])

  const videoContainerRef = React.useRef<HTMLDivElement|null>(null)
  const overlayRef = React.useRef<HTMLDivElement|null>(null)
  const playBtnRef = React.useRef<HTMLImageElement|null>(null)
  const pauseBtnRef = React.useRef<HTMLImageElement|null>(null)
  const videoSeekingRef = React.useRef<HTMLDivElement|null>(null)
  const progressBarRef = React.useRef<HTMLDivElement|null>(null)
  const bufferBarRef = React.useRef<HTMLDivElement|null>(null)
  const trackingHeadRef = React.useRef<HTMLDivElement|null>(null)


  // Resize streaming or recording video element when resizing window (16:9 ratio)
  React.useEffect(() => {
    const videoContainer = videoContainerRef.current
    const container = containerRef.current

    if (!container || !videoContainer)
      return

    const resize = () => {
      
      const width = container.clientWidth
      const height = (width / 16) * 9
      
      videoContainer.style.width = width + "px"
      videoContainer.style.height = height + "px"
    }

    resize()
    window.addEventListener("resize", resize)

    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [videoContainerRef, containerRef])

  // Toggle between play and pause
  function playPauseVideo() {
    const video = videoRef.current
    const overlay = overlayRef.current
    const playBtn = playBtnRef.current
    const pauseBtn = pauseBtnRef.current

    if (!video || !overlay || !playBtn || !pauseBtn || !video.src)
      return

    if (paused) {
      overlay.classList.remove("!opacity-100", "!visible")
      overlay.classList.add("opacity-0", "insivible")
      playBtn.classList.add('hidden')
      pauseBtn.classList.remove('hidden')
      setPaused(false)
    } else {
      overlay.classList.add("!opacity-100", "!visible")
      overlay.classList.remove("opacity-0", "insivible")
      pauseBtn.classList.add('hidden')
      playBtn.classList.remove('hidden')
      setPaused(true)
    }
  }

  // Convert the duration number into a string (m:ss)
  function getTimeString(time: number) {
    let seconds = Math.floor(time % 60).toString()
    const minutes = Math.floor(time / 60).toString()

    if (seconds.length === 1)
      seconds = "0" + seconds

    return minutes + ":" + seconds
  }

  // Update video length when new metadata is loaded
  function updateDuration() {
    const video = videoRef.current

    if (!video)
      return

    const time = duration

    setDuration(time)
    setVideoEnd(getTimeString(time))
  }

  // Adjust the progress bar size when time passes
  function updateProgressBar() {
    const video = videoRef.current
    const progress = progressBarRef.current
    const head = trackingHeadRef.current

    if (duration <= 0 || !video || !progress || !head)
      return
    const time = 42
    let position = time / duration

    if (position > 1)
      position = 1
    else if (position < 0)
      position = 0

    if (!paused)
      progress.style.width = `${position * 100}%`

    setVideoTime(getTimeString(time))
  }

  // Adjust the buffer bar sizes when data is loaded
  function updateBufferBar() {
    const video = videoRef.current
    const buffer = bufferBarRef.current

    if (!video || !buffer)
      return

    const end = 200
    const videoDuration = duration

    let position = end / videoDuration

    if (position > 1)
      position = 1
    else if (position < 0)
      position = 0

    buffer.style.width = `${position * 100}%`
    setDuration(videoDuration)
    setVideoEnd(getTimeString(videoDuration))
  }

  // Open overlay when closed and vice-versa
  function toggleOverlay(e: React.MouseEvent | null) {
    const overlay = overlayRef.current

    if (!overlay)
      return

    if (overlay.classList.contains("invisible"))
      showOverlay()
    else
      hideOverlay()

    e?.stopPropagation()
  }

  function hideOverlay() {
    const overlay = overlayRef.current

    if (!overlay)
      return

    overlay.classList.add("opacity-0", "invisible")
  }

  // Open overlay and create timeout to close it
  function showOverlay() {
    const overlay = overlayRef.current
    const video = videoRef.current
    let n: number = 0;

    if (!overlay || !video || !video.src)
      return

    overlayTimeouts.forEach(t => {
      clearTimeout(t)
      n++
    })
    overlayTimeouts.splice(0, n)
    overlay.classList.remove("opacity-0", "invisible")

    overlayTimeouts.push(setTimeout(() => {
      overlay.classList.add("opacity-0", "invisible")
    }, 2000))
  }

  // Make the progress bar clickable to seek in video
  function videoSeekingOnMouseDown(e: React.MouseEvent) {
    const video = videoRef.current
    const seekBar = videoSeekingRef.current
    const head = trackingHeadRef.current
    const progressBar = progressBarRef.current

    if (!video || !seekBar || !progressBar || !head || !video.src)
      return

    const start = seekBar.getBoundingClientRect().left
    const end = seekBar.getBoundingClientRect().right

    if (!paused)
      playPauseVideo()

    const seek = (e: MouseEvent | React.MouseEvent) => {
      const position = e.clientX

      showOverlay()
      if (position >= start && position <= end && progressBar) {
        const progressFraction = 1 - (end - position) / (end - start)
        progressBar.style.width = `${progressFraction * 100}%`
      }
    }

    const clear = () => {
      window.removeEventListener("mouseup", clear)
      window.removeEventListener("mousemove", seek)
      if (!paused)
        playPauseVideo()
    }

    window.addEventListener("mouseup", clear)
    window.addEventListener("mousemove", seek)
    seek(e)
  }

  // Make the progress bar touchable to seek in video
  function videoSeekingOnTouchStart(e: React.TouchEvent) {
    const video = videoRef.current
    const seekBar = videoSeekingRef.current
    const progressBar = progressBarRef.current

    if (!video || !seekBar || !progressBar || !video.src || e.touches.length > 1)
      return

    const start = seekBar.getBoundingClientRect().left
    const end = seekBar.getBoundingClientRect().right

    if (!paused)
      playPauseVideo()

    const seek = (e: TouchEvent | React.TouchEvent) => {
      const position = e.touches[0].clientX

      if (position >= start && position <= end && progressBar) {
        const progressFraction = 1 - ((end - position) / (end - start))
        progressBar.style.width = progressFraction * 100 + "%"
      }

      showOverlay()
      e.stopPropagation()
    }

    const clear = () => {
      window.removeEventListener("touchend", clear)
      window.removeEventListener("touchmove", seek)
      if (!paused)
        playPauseVideo()
    }

    window.addEventListener("touchend", clear)
    window.addEventListener("touchmove", seek)
    seek(e)
    e.stopPropagation()
  }

  // show overlay when video ends
  const onVideoEnd = () => {
    const playBtn = playBtnRef.current
    const pauseBtn = pauseBtnRef.current
    const overlay = overlayRef.current

    if (!playBtn || !pauseBtn || !overlay)
      return

    overlay.classList.add("!opacity-100", "!visible")
    playBtn.classList.remove("hidden")
    pauseBtn.classList.add("hidden")
  }

  return (
    <div className="py-1.5 flex justify-center items-center">
      <div ref={videoContainerRef} className="relative flex justify-center rounded overflow-hidden shadow">
        <Image src={Logo} alt="cat picture"
          className="w-full h-full object-contain scale-100 bg-loading bg-no-repeat bg-center"
          ref={videoRef}
          onTimeUpdate={() => updateProgressBar()}
          onProgress={() => updateBufferBar()}
          onLoadedMetadata={() => updateDuration()}
          onEnded={() => onVideoEnd()}
          onClick={() => showOverlay()}
          onMouseMove={() => showOverlay()}
        />
        <div
          className="absolute top-0 left-0 right-0 bottom-0 opacity-0 invisible duration-500 text-gray-50"
          ref={overlayRef}
          onClick={(e) => toggleOverlay(e)}
          onMouseMove={() => showOverlay()}
        >
          <div onClick={(e) => e.stopPropagation()} className="px-5 pt-3 pb-1.5 absolute bottom-0 left-0 right-0 flex flex-col justify-between items-center bg-gray-950/75">
            <div
              className="w-full flex justify-center"
              onMouseDown={(e) => videoSeekingOnMouseDown(e)}
              onTouchStart={(e) => videoSeekingOnTouchStart(e)}
            >
              <div ref={videoSeekingRef} className="h-1 w-full relative bg-gray-800 rounded cursor-pointer">
                <div ref={bufferBarRef} className="absolute top-0 bottom-0 left-0 bg-gray-500 rounded"></div>
                <div ref={progressBarRef} className="absolute top-0 bottom-0 left-0 bg-sky-700 rounded cursor-pointer">
                  <div ref={trackingHeadRef} className="absolute h-5 w-5 -top-2 -right-[0.28rem] bg-gray-100 rounded-full cursor-pointer translate-x-1/4"></div>
                </div>
              </div>
            </div>
            <div className="w-full pt-3 flex justify-between items-center flex-grow">
              <div className="flex items-center gap-5">
                <div onClick={() => playPauseVideo()} className="cursor-pointer">
                  <div ref={playBtnRef} className="hidden">
                    <svg className="w-5 h-5" fill="currentColor" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
                      <path d="M471.25,246.56,28.64,18.49A3.87,3.87,0,0,0,23,21.93V478.07a3.87,3.87,0,0,0,5.64,3.44L471.25,253.44A3.87,3.87,0,0,0,471.25,246.56Z" />
                    </svg>
                  </div>
                  <div ref={pauseBtnRef}>
                    <svg className="w-5 h-5" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
                      <rect fill="currentColor" x="26.88" y="20.18" width="152" height="463.89" rx="4.12" />
                      <rect fill="currentColor" x="322.21" y="20.18" width="152" height="463.89" rx="4.12" />
                    </svg>
                  </div>
                </div>
                <div className="flex-grow">{videoTime} / {videoEnd}</div>
              </div>
              <div className="h-full flex items-center cursor-pointer">
                <svg className="w-6 h-6" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
                  <rect fill="currentColor" x="17.53" y="450.24" width="155.05" height="32.47" rx="4.01" transform="translate(190.12 932.94) rotate(-180)" />
                  <rect fill="currentColor" x="-44.21" y="388.5" width="155.95" height="32.47" rx="4.01" transform="translate(-370.96 438.5) rotate(-90)" />
                  <rect fill="currentColor" x="-41.16" y="81.48" width="155.05" height="32.47" rx="4.01" transform="translate(-61.34 134.08) rotate(-90)" />
                  <rect fill="currentColor" x="20.13" y="20.18" width="155.95" height="32.47" rx="4.01" />
                  <rect fill="currentColor" x="322.56" y="19.73" width="155.05" height="32.47" rx="4.01" />
                  <rect fill="currentColor" x="383.4" y="81.48" width="155.95" height="32.47" rx="4.01" transform="translate(559.09 -363.67) rotate(90)" />
                  <rect fill="currentColor" x="383.85" y="388.05" width="155.05" height="32.47" rx="4.01" transform="translate(865.66 -57.1) rotate(90)" />
                  <rect fill="currentColor" x="321.66" y="449.34" width="155.95" height="32.47" rx="4.01" transform="translate(799.27 931.14) rotate(-180)" />
                </svg>
              </div>
            </div>
          </div>
          <div
            className=" absolute top-0 bottom-16 left-0 w-1/5"
          ></div>
          <div
            className="absolute top-0 bottom-16 right-0 w-1/5"
          ></div>
        </div>
      </div>
    </div>
  )
}