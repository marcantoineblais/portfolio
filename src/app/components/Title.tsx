"use client"

import React, { ReactNode } from "react";
import { anta, kode_mono } from "../fonts";

export default function Title() {

  const [lettersSpan, setLettersSpan] = React.useState<ReactNode[]>([])
  const titleRef = React.useRef<HTMLHeadingElement|null>(null)
  const subTitleRef = React.useRef<HTMLDivElement|null>(null)

  React.useEffect(() => {
    const name = "Marc-Antoine Blais"
    const letters = name.split("")
    const spans = letters.map((letter, i) => <span key={i} className="opacity-0 duration-1000">{letter}</span>)

    setLettersSpan(spans)
  }, [])

  React.useEffect(() => {
    if (!titleRef.current || !subTitleRef.current || lettersSpan.length === 0)
      return

    let i = 0
    const spans = titleRef.current.children
    const subtitle = subTitleRef.current

    const interval = setInterval((): void => {
      if (i < spans.length)
        spans[i++].classList.remove("opacity-0")
      else
        clearInterval(interval)
    }, 200)

    setTimeout((): void => {
      subtitle.classList.remove("opacity-0", "-translate-y-full")
    }, 4000)
    
    setTimeout((): void => {
      subtitle.classList.remove("-scale-x-100")
    }, 6000)

  }, [lettersSpan])

  return (    
      <div className="relative w-full">
        <div className="flex justify-center text-neutral-900">
            <svg viewBox="0 -3.82 54.628 54.628" xmlns="http://www.w3.org/2000/svg">
              <path fill="currentColor" d="M573.9,258.61h48.307a.1.1,0,0,0,.1-.093V247.379a.1.1,0,0,0-.1-.093H573.9a.1.1,0,0,0-.1.1v11.135A.1.1,0,0,0,573.9,258.61Zm42.617-7.376h2.764V254h-2.764Zm-16.683,0h11.691V254H599.836Zm-23.011,2.416h1.87v-2.064h-1.87v-2.766h2.765v2.414h.971v-2.414h2.767v2.414h.971v-2.414h2.765v2.416h.972v-2.416H590.8v2.416h.973v-2.416h2.766v2.414h1.869V254h-1.869v2.412h-2.766V254H590.8v2.416h-2.764V254h-.972v2.413H584.3V254h-.971v2.412h-2.767V254h-.971v2.415h-2.765Zm43.311,9.142v-1.851H575.974v1.851Zm5.138,22.225h-.644v7.2h.644a.1.1,0,0,0,.1-.1v-7.008A.1.1,0,0,0,625.274,285.015Zm-.005-35.666h-.639v7.2h.644a.1.1,0,0,0,.1-.1v-7.006A.105.105,0,0,0,625.269,249.349Zm0,17.833h-.639v7.2h.644a.1.1,0,0,0,.1-.1v-7A.105.105,0,0,0,625.269,267.182Zm-54.528,17.93v7.006a.1.1,0,0,0,.1.093h.64v-7.2h-.64A.1.1,0,0,0,570.741,285.112Zm0-17.834v7a.1.1,0,0,0,.1.1h.636v-7.2h-.637A.1.1,0,0,0,570.741,267.278Zm49.395,13.344v-1.85H575.974v1.85Zm2.073,2.328H573.9a.1.1,0,0,0-.1.1V294.18a.1.1,0,0,0,.1.1h48.307a.1.1,0,0,0,.1-.1V283.044A.1.1,0,0,0,622.209,282.95Zm-25.8,6.712h-1.869v2.413h-2.766v-2.414H590.8v2.416h-2.764v-2.415h-.972v2.413H584.3v-2.412h-.971v2.414h-2.767v-2.416h-.971v2.414h-2.765v-2.763h1.87v-2.065h-1.87v-2.764h2.765V286.9h.971v-2.415h2.767V286.9h.971v-2.415h2.765V286.9h.972v-2.415H590.8V286.9h.973v-2.415h2.766V286.9h1.869Zm15.119,0H599.836V286.9h11.691Zm7.756,0h-2.764V286.9h2.764ZM573.9,276.444h48.309a.1.1,0,0,0,.1-.093V265.213a.1.1,0,0,0-.1-.1H573.9a.1.1,0,0,0-.1.1v11.136A.1.1,0,0,0,573.9,276.444Zm42.619-7.38h2.764v2.767h-2.764Zm-16.683,0h11.691v2.769H599.836Zm-23.011,2.417h1.87v-2.062h-1.87v-2.766h2.765v2.413h.971v-2.413h2.767v2.413h.971V266.65h2.765v2.412h.972v-2.413H590.8v2.416h.973V266.65h2.766v2.412h1.869v2.769h-1.869v2.412h-2.766v-2.414H590.8v2.416h-2.764v-2.414h-.972v2.414H584.3v-2.414h-.971v2.414h-2.767v-2.414h-.971v2.414h-2.765Zm-6.084-22.032v7a.1.1,0,0,0,.1.094h.637v-7.2h-.637A.1.1,0,0,0,570.741,249.447Z" transform="translate(-570.741 -247.286)"/>
            </svg>
            <svg viewBox="0 -3.82 54.628 54.628" xmlns="http://www.w3.org/2000/svg">
              <path fill="currentColor" d="M573.9,258.61h48.307a.1.1,0,0,0,.1-.093V247.379a.1.1,0,0,0-.1-.093H573.9a.1.1,0,0,0-.1.1v11.135A.1.1,0,0,0,573.9,258.61Zm42.617-7.376h2.764V254h-2.764Zm-16.683,0h11.691V254H599.836Zm-23.011,2.416h1.87v-2.064h-1.87v-2.766h2.765v2.414h.971v-2.414h2.767v2.414h.971v-2.414h2.765v2.416h.972v-2.416H590.8v2.416h.973v-2.416h2.766v2.414h1.869V254h-1.869v2.412h-2.766V254H590.8v2.416h-2.764V254h-.972v2.413H584.3V254h-.971v2.412h-2.767V254h-.971v2.415h-2.765Zm43.311,9.142v-1.851H575.974v1.851Zm5.138,22.225h-.644v7.2h.644a.1.1,0,0,0,.1-.1v-7.008A.1.1,0,0,0,625.274,285.015Zm-.005-35.666h-.639v7.2h.644a.1.1,0,0,0,.1-.1v-7.006A.105.105,0,0,0,625.269,249.349Zm0,17.833h-.639v7.2h.644a.1.1,0,0,0,.1-.1v-7A.105.105,0,0,0,625.269,267.182Zm-54.528,17.93v7.006a.1.1,0,0,0,.1.093h.64v-7.2h-.64A.1.1,0,0,0,570.741,285.112Zm0-17.834v7a.1.1,0,0,0,.1.1h.636v-7.2h-.637A.1.1,0,0,0,570.741,267.278Zm49.395,13.344v-1.85H575.974v1.85Zm2.073,2.328H573.9a.1.1,0,0,0-.1.1V294.18a.1.1,0,0,0,.1.1h48.307a.1.1,0,0,0,.1-.1V283.044A.1.1,0,0,0,622.209,282.95Zm-25.8,6.712h-1.869v2.413h-2.766v-2.414H590.8v2.416h-2.764v-2.415h-.972v2.413H584.3v-2.412h-.971v2.414h-2.767v-2.416h-.971v2.414h-2.765v-2.763h1.87v-2.065h-1.87v-2.764h2.765V286.9h.971v-2.415h2.767V286.9h.971v-2.415h2.765V286.9h.972v-2.415H590.8V286.9h.973v-2.415h2.766V286.9h1.869Zm15.119,0H599.836V286.9h11.691Zm7.756,0h-2.764V286.9h2.764ZM573.9,276.444h48.309a.1.1,0,0,0,.1-.093V265.213a.1.1,0,0,0-.1-.1H573.9a.1.1,0,0,0-.1.1v11.136A.1.1,0,0,0,573.9,276.444Zm42.619-7.38h2.764v2.767h-2.764Zm-16.683,0h11.691v2.769H599.836Zm-23.011,2.417h1.87v-2.062h-1.87v-2.766h2.765v2.413h.971v-2.413h2.767v2.413h.971V266.65h2.765v2.412h.972v-2.413H590.8v2.416h.973V266.65h2.766v2.412h1.869v2.769h-1.869v2.412h-2.766v-2.414H590.8v2.416h-2.764v-2.414h-.972v2.414H584.3v-2.414h-.971v2.414h-2.767v-2.414h-.971v2.414h-2.765Zm-6.084-22.032v7a.1.1,0,0,0,.1.094h.637v-7.2h-.637A.1.1,0,0,0,570.741,249.447Z" transform="translate(-570.741 -247.286)"/>
            </svg>
        </div>
        
        <div className="absolute inset-0 flex flex-col justify-center items-center">
          <div className="flex flex-col">
            <div className="relative overflow-hidden">
              <h1 ref={titleRef} className={`h-full text-4xl text-center tracking-widest ${anta.className}`}>{ lettersSpan }</h1>
            </div>
            
            <div ref={subTitleRef} className={`flex justify-between text-neutral-300 text-right -translate-y-full opacity-0 -scale-x-100 duration-1000 ${kode_mono.className}`}>
              <div className="grow flex flex-col blur-[1px] -scale-x-100">
                <h2>Développeur web</h2>
                <h2>Full-Stack</h2>
              </div>
              <div className="h-full w-0.5 bg-white blur-[1px]"></div>
              <div className="grow flex flex-col">
                <h2>Développeur web</h2>
                <h2>Full-Stack</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}