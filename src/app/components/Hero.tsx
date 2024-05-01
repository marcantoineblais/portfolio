"use client"

import React, { ReactNode } from "react";
import { anta, kode_mono } from "../fonts";
import DownArrow from "./DownArrow";

export default function Hero({ opacity, scrollTo }: { opacity: number, scrollTo: Function }) {

    const [lettersSpan, setLettersSpan] = React.useState<ReactNode[]>([])
    const [slogan1, setSlogan1] = React.useState<string>("")
    const [slogan2, setSlogan2] = React.useState<string>("")
    const titleRef = React.useRef<HTMLHeadingElement | null>(null)
    const subTitleRef = React.useRef<HTMLDivElement | null>(null)
    const sloganRef = React.useRef<HTMLDivElement | null>(null)
    const containerRef = React.useRef<HTMLDivElement | null>(null)

    React.useEffect(() => {
        const name = "Marc-Antoine Blais"
        const letters = name.split("")
        const spans = letters.map((letter, i) => <span key={i} className={`opacity-0 duration-1000 ${i === letters.length - 1 && "!tracking-normal"}`}>{letter}</span>)

        setLettersSpan(spans)
    }, [])

    React.useEffect(() => {
        if (!containerRef.current || !titleRef.current || !subTitleRef.current || !sloganRef.current)
            return

        const container = containerRef.current
        const title = titleRef.current
        const subtitle = subTitleRef.current
        const slogan = sloganRef.current

        const updateFontSize = () => {
            const width = container.clientWidth
            const titleSize = width / 16
            const titleSpacing = titleSize / 4
            const subtitleSize = titleSize / 2

            title.style.fontSize = titleSize + "px"
            title.style.lineHeight = titleSize + "px"
            title.style.letterSpacing = titleSpacing + "px"
            subtitle.style.fontSize = subtitleSize + "px"
            subtitle.style.lineHeight = subtitleSize + "px"
            slogan.style.fontSize = subtitleSize + "px"
            slogan.style.lineHeight = subtitleSize + "px"
        }

        updateFontSize()

        window.addEventListener("resize", updateFontSize)

        return () => {
            window.removeEventListener("resize", updateFontSize)
        }
    }, [containerRef])

    React.useEffect(() => {
        if (!titleRef.current || !subTitleRef.current || !sloganRef.current || lettersSpan.length === 0)
            return

        let i = 0
        const spans = titleRef.current.children
        const subtitle = subTitleRef.current
        const slogan = sloganRef.current
        const textSlogan1 = "Votre vision,".split("")
        const textSlogan2 = "Notre réalisation.".split("")
        const symbols = "!@#$%&[]{}".split("")

        const interval = setInterval((): void => {
            if (i < spans.length)
                spans[i++].classList.remove("opacity-0")
            else
                clearInterval(interval)
        }, 100)

        setTimeout((): void => {
            subtitle.classList.remove("opacity-0", "-translate-y-full")
        }, 2500)

        setTimeout((): void => {
            subtitle.classList.remove("-scale-x-100")
        }, 3500)

        setTimeout((): void => {
            slogan.classList.remove("opacity-0")
        }, 5000)

        setTimeout(() => {
            let i = 0
            let text = ""

            const textUpdateInterval = setInterval(() => {
                if (i < textSlogan1.length) {
                    text += textSlogan1[i++]
                } else {
                    clearInterval(textUpdateInterval)
                    clearInterval(symbolChangeInterval)
                    setSlogan1(text)
                }
            }, 100)

            const symbolChangeInterval = setInterval(() => {
                const random = Math.floor(Math.random() * symbols.length)
                setSlogan1(text + symbols[random])
            }, 10)
        }, 7000)

        setTimeout(() => {
            let i = 0
            let text = ""

            const textUpdateInterval = setInterval(() => {
                if (i < textSlogan2.length) {
                    text += textSlogan2[i++]
                } else {
                    clearInterval(textUpdateInterval)
                    clearInterval(symbolChangeInterval)
                    setSlogan2(text)
                }
            }, 100)

            const symbolChangeInterval = setInterval(() => {
                const random = Math.floor(Math.random() * symbols.length)
                setSlogan2(text + symbols[random])
            }, 10)
        }, 9000)

    }, [lettersSpan])

    React.useEffect(() => {
        if (!containerRef.current)
            return

        const container = containerRef.current
        container.style.opacity = opacity.toString()

    }, [opacity, containerRef])

    function rotateSubtitle(rotated: boolean) {
        if (!subTitleRef.current)
            return

        const subtitle = subTitleRef.current
        if (rotated)
            subtitle.classList.add("-scale-x-100")
        else
            subtitle.classList.remove("-scale-x-100")
    }

    return (
        <div className="fixed w-full inset-0 text-gray-300">
            <div ref={containerRef} className="container px-1 w-full h-full min-h-[720px] mx-auto flex flex-col justify-between items-center overflow-y-auto opacity-0">
                <div className="w-full">
                    <div className="relative flex justify-center items-center">
                        <svg className="text-stone-900" viewBox="0 -3.82 54.628 54.628" xmlns="http://www.w3.org/2000/svg">
                            <path fill="currentColor" d="M573.9,258.61h48.307a.1.1,0,0,0,.1-.093V247.379a.1.1,0,0,0-.1-.093H573.9a.1.1,0,0,0-.1.1v11.135A.1.1,0,0,0,573.9,258.61Zm42.617-7.376h2.764V254h-2.764Zm-16.683,0h11.691V254H599.836Zm-23.011,2.416h1.87v-2.064h-1.87v-2.766h2.765v2.414h.971v-2.414h2.767v2.414h.971v-2.414h2.765v2.416h.972v-2.416H590.8v2.416h.973v-2.416h2.766v2.414h1.869V254h-1.869v2.412h-2.766V254H590.8v2.416h-2.764V254h-.972v2.413H584.3V254h-.971v2.412h-2.767V254h-.971v2.415h-2.765Zm43.311,9.142v-1.851H575.974v1.851Zm5.138,22.225h-.644v7.2h.644a.1.1,0,0,0,.1-.1v-7.008A.1.1,0,0,0,625.274,285.015Zm-.005-35.666h-.639v7.2h.644a.1.1,0,0,0,.1-.1v-7.006A.105.105,0,0,0,625.269,249.349Zm0,17.833h-.639v7.2h.644a.1.1,0,0,0,.1-.1v-7A.105.105,0,0,0,625.269,267.182Zm-54.528,17.93v7.006a.1.1,0,0,0,.1.093h.64v-7.2h-.64A.1.1,0,0,0,570.741,285.112Zm0-17.834v7a.1.1,0,0,0,.1.1h.636v-7.2h-.637A.1.1,0,0,0,570.741,267.278Zm49.395,13.344v-1.85H575.974v1.85Zm2.073,2.328H573.9a.1.1,0,0,0-.1.1V294.18a.1.1,0,0,0,.1.1h48.307a.1.1,0,0,0,.1-.1V283.044A.1.1,0,0,0,622.209,282.95Zm-25.8,6.712h-1.869v2.413h-2.766v-2.414H590.8v2.416h-2.764v-2.415h-.972v2.413H584.3v-2.412h-.971v2.414h-2.767v-2.416h-.971v2.414h-2.765v-2.763h1.87v-2.065h-1.87v-2.764h2.765V286.9h.971v-2.415h2.767V286.9h.971v-2.415h2.765V286.9h.972v-2.415H590.8V286.9h.973v-2.415h2.766V286.9h1.869Zm15.119,0H599.836V286.9h11.691Zm7.756,0h-2.764V286.9h2.764ZM573.9,276.444h48.309a.1.1,0,0,0,.1-.093V265.213a.1.1,0,0,0-.1-.1H573.9a.1.1,0,0,0-.1.1v11.136A.1.1,0,0,0,573.9,276.444Zm42.619-7.38h2.764v2.767h-2.764Zm-16.683,0h11.691v2.769H599.836Zm-23.011,2.417h1.87v-2.062h-1.87v-2.766h2.765v2.413h.971v-2.413h2.767v2.413h.971V266.65h2.765v2.412h.972v-2.413H590.8v2.416h.973V266.65h2.766v2.412h1.869v2.769h-1.869v2.412h-2.766v-2.414H590.8v2.416h-2.764v-2.414h-.972v2.414H584.3v-2.414h-.971v2.414h-2.767v-2.414h-.971v2.414h-2.765Zm-6.084-22.032v7a.1.1,0,0,0,.1.094h.637v-7.2h-.637A.1.1,0,0,0,570.741,249.447Z" transform="translate(-570.741 -247.286)" />
                        </svg>

                        <svg className="text-stone-900" viewBox="0 -3.82 54.628 54.628" xmlns="http://www.w3.org/2000/svg">
                            <path fill="currentColor" d="M573.9,258.61h48.307a.1.1,0,0,0,.1-.093V247.379a.1.1,0,0,0-.1-.093H573.9a.1.1,0,0,0-.1.1v11.135A.1.1,0,0,0,573.9,258.61Zm42.617-7.376h2.764V254h-2.764Zm-16.683,0h11.691V254H599.836Zm-23.011,2.416h1.87v-2.064h-1.87v-2.766h2.765v2.414h.971v-2.414h2.767v2.414h.971v-2.414h2.765v2.416h.972v-2.416H590.8v2.416h.973v-2.416h2.766v2.414h1.869V254h-1.869v2.412h-2.766V254H590.8v2.416h-2.764V254h-.972v2.413H584.3V254h-.971v2.412h-2.767V254h-.971v2.415h-2.765Zm43.311,9.142v-1.851H575.974v1.851Zm5.138,22.225h-.644v7.2h.644a.1.1,0,0,0,.1-.1v-7.008A.1.1,0,0,0,625.274,285.015Zm-.005-35.666h-.639v7.2h.644a.1.1,0,0,0,.1-.1v-7.006A.105.105,0,0,0,625.269,249.349Zm0,17.833h-.639v7.2h.644a.1.1,0,0,0,.1-.1v-7A.105.105,0,0,0,625.269,267.182Zm-54.528,17.93v7.006a.1.1,0,0,0,.1.093h.64v-7.2h-.64A.1.1,0,0,0,570.741,285.112Zm0-17.834v7a.1.1,0,0,0,.1.1h.636v-7.2h-.637A.1.1,0,0,0,570.741,267.278Zm49.395,13.344v-1.85H575.974v1.85Zm2.073,2.328H573.9a.1.1,0,0,0-.1.1V294.18a.1.1,0,0,0,.1.1h48.307a.1.1,0,0,0,.1-.1V283.044A.1.1,0,0,0,622.209,282.95Zm-25.8,6.712h-1.869v2.413h-2.766v-2.414H590.8v2.416h-2.764v-2.415h-.972v2.413H584.3v-2.412h-.971v2.414h-2.767v-2.416h-.971v2.414h-2.765v-2.763h1.87v-2.065h-1.87v-2.764h2.765V286.9h.971v-2.415h2.767V286.9h.971v-2.415h2.765V286.9h.972v-2.415H590.8V286.9h.973v-2.415h2.766V286.9h1.869Zm15.119,0H599.836V286.9h11.691Zm7.756,0h-2.764V286.9h2.764ZM573.9,276.444h48.309a.1.1,0,0,0,.1-.093V265.213a.1.1,0,0,0-.1-.1H573.9a.1.1,0,0,0-.1.1v11.136A.1.1,0,0,0,573.9,276.444Zm42.619-7.38h2.764v2.767h-2.764Zm-16.683,0h11.691v2.769H599.836Zm-23.011,2.417h1.87v-2.062h-1.87v-2.766h2.765v2.413h.971v-2.413h2.767v2.413h.971V266.65h2.765v2.412h.972v-2.413H590.8v2.416h.973V266.65h2.766v2.412h1.869v2.769h-1.869v2.412h-2.766v-2.414H590.8v2.416h-2.764v-2.414h-.972v2.414H584.3v-2.414h-.971v2.414h-2.767v-2.414h-.971v2.414h-2.765Zm-6.084-22.032v7a.1.1,0,0,0,.1.094h.637v-7.2h-.637A.1.1,0,0,0,570.741,249.447Z" transform="translate(-570.741 -247.286)" />
                        </svg>

                        <div className="absolute inset-0 flex flex-col justify-center items-center">
                            <div
                                onMouseEnter={() => rotateSubtitle(true)}
                                onMouseLeave={() => rotateSubtitle(false)}
                                className="flex flex-col"
                            >
                                <h1 ref={titleRef} className={`pb-1 h-full text-white drop-shadow-[0_2px_8px_rgba(255,255,255,0.5)] ${anta.className}`}>{lettersSpan}</h1>

                                <div
                                    ref={subTitleRef}
                                    className={`flex justify-between text-right -translate-y-full opacity-0 -scale-x-100 duration-1000 ${kode_mono.className}`}
                                >
                                    <div className="grow flex flex-col blur-[1px] -scale-x-100">
                                        <h2 className="pb-1.5">Développeur web</h2>
                                        <h2>Full-Stack</h2>
                                    </div>

                                    <div className="h-full w-0.5 bg-white blur-[1px]"></div>

                                    <div className="grow flex flex-col">
                                        <h2 className="pb-1.5">Développeur web</h2>
                                        <h2>Full-Stack</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div ref={sloganRef} className={`flex flex-col justify-between items-center opacity-0 duration-1000 ${kode_mono.className}`}>
                        <h2 className="pb-10">Une innovation à chaque ligne de code</h2>
                        <h2 className="h-[2.2em] flex justify-between gap-3 grow">
                            <span>{slogan1}</span>
                            <span className="self-end">{slogan2}</span>
                        </h2>
                    </div>
                </div>

                <DownArrow text="Voir les réalisations" action={scrollTo} disabled={opacity < 1} />
            </div>
        </div>
    )
}