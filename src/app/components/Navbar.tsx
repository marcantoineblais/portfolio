"use client"

import React from "react"

export default function Navbar(
    { visible, scrollToProject, scrollToAbout, scrollToContact }:
    { visible: boolean, scrollToProject: Function, scrollToAbout: Function, scrollToContact: Function }
) {

    const [showMenu, setShowMenu] = React.useState<boolean>(false)
    const menuRef = React.useRef<HTMLUListElement | null>(null)
    const iconRef = React.useRef<HTMLSpanElement | null>(null)
    const navbarRef = React.useRef<HTMLDivElement | null>(null)

    React.useEffect(() => {
        const hideMenu = () => {
            setShowMenu(false)
        }

        window.addEventListener("click", hideMenu)

        return () => {
            window.removeEventListener("click", hideMenu)
        }
    }, [])

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

    React.useEffect(() => {
        if (!navbarRef.current)
            return

        const navbar = navbarRef.current

        if (visible)
            navbar.classList.remove("-translate-y-full")
        else
            navbar.classList.add("-translate-y-full")

    }, [visible])

    function toggleMenu(e: React.MouseEvent) {
        e.stopPropagation()
        setShowMenu(!showMenu)
    }

    return (
        <div ref={navbarRef} className="z-50 fixed top-0 left-0 right-0 text-gray-300 border-b border-b-gray-950 bg-stone-900 -translate-y-full duration-1000">
            <div className="container mx-auto px-3 py-1 flex justify-between gap-3 items-center bg-inherit">
                <div onClick={() => scrollTo({ top: 0})} className="w-20 flex justify-center items-center cursor-pointer duration-200 hover:text-gray-500">
                    <svg viewBox="0 -3.82 54.628 54.628" xmlns="http://www.w3.org/2000/svg">
                        <path fill="currentColor" d="M573.9,258.61h48.307a.1.1,0,0,0,.1-.093V247.379a.1.1,0,0,0-.1-.093H573.9a.1.1,0,0,0-.1.1v11.135A.1.1,0,0,0,573.9,258.61Zm42.617-7.376h2.764V254h-2.764Zm-16.683,0h11.691V254H599.836Zm-23.011,2.416h1.87v-2.064h-1.87v-2.766h2.765v2.414h.971v-2.414h2.767v2.414h.971v-2.414h2.765v2.416h.972v-2.416H590.8v2.416h.973v-2.416h2.766v2.414h1.869V254h-1.869v2.412h-2.766V254H590.8v2.416h-2.764V254h-.972v2.413H584.3V254h-.971v2.412h-2.767V254h-.971v2.415h-2.765Zm43.311,9.142v-1.851H575.974v1.851Zm5.138,22.225h-.644v7.2h.644a.1.1,0,0,0,.1-.1v-7.008A.1.1,0,0,0,625.274,285.015Zm-.005-35.666h-.639v7.2h.644a.1.1,0,0,0,.1-.1v-7.006A.105.105,0,0,0,625.269,249.349Zm0,17.833h-.639v7.2h.644a.1.1,0,0,0,.1-.1v-7A.105.105,0,0,0,625.269,267.182Zm-54.528,17.93v7.006a.1.1,0,0,0,.1.093h.64v-7.2h-.64A.1.1,0,0,0,570.741,285.112Zm0-17.834v7a.1.1,0,0,0,.1.1h.636v-7.2h-.637A.1.1,0,0,0,570.741,267.278Zm49.395,13.344v-1.85H575.974v1.85Zm2.073,2.328H573.9a.1.1,0,0,0-.1.1V294.18a.1.1,0,0,0,.1.1h48.307a.1.1,0,0,0,.1-.1V283.044A.1.1,0,0,0,622.209,282.95Zm-25.8,6.712h-1.869v2.413h-2.766v-2.414H590.8v2.416h-2.764v-2.415h-.972v2.413H584.3v-2.412h-.971v2.414h-2.767v-2.416h-.971v2.414h-2.765v-2.763h1.87v-2.065h-1.87v-2.764h2.765V286.9h.971v-2.415h2.767V286.9h.971v-2.415h2.765V286.9h.972v-2.415H590.8V286.9h.973v-2.415h2.766V286.9h1.869Zm15.119,0H599.836V286.9h11.691Zm7.756,0h-2.764V286.9h2.764ZM573.9,276.444h48.309a.1.1,0,0,0,.1-.093V265.213a.1.1,0,0,0-.1-.1H573.9a.1.1,0,0,0-.1.1v11.136A.1.1,0,0,0,573.9,276.444Zm42.619-7.38h2.764v2.767h-2.764Zm-16.683,0h11.691v2.769H599.836Zm-23.011,2.417h1.87v-2.062h-1.87v-2.766h2.765v2.413h.971v-2.413h2.767v2.413h.971V266.65h2.765v2.412h.972v-2.413H590.8v2.416h.973V266.65h2.766v2.412h1.869v2.769h-1.869v2.412h-2.766v-2.414H590.8v2.416h-2.764v-2.414h-.972v2.414H584.3v-2.414h-.971v2.414h-2.767v-2.414h-.971v2.414h-2.765Zm-6.084-22.032v7a.1.1,0,0,0,.1.094h.637v-7.2h-.637A.1.1,0,0,0,570.741,249.447Z" transform="translate(-570.741 -247.286)" />
                    </svg>

                    <svg viewBox="0 -3.82 54.628 54.628" xmlns="http://www.w3.org/2000/svg">
                        <path fill="currentColor" d="M573.9,258.61h48.307a.1.1,0,0,0,.1-.093V247.379a.1.1,0,0,0-.1-.093H573.9a.1.1,0,0,0-.1.1v11.135A.1.1,0,0,0,573.9,258.61Zm42.617-7.376h2.764V254h-2.764Zm-16.683,0h11.691V254H599.836Zm-23.011,2.416h1.87v-2.064h-1.87v-2.766h2.765v2.414h.971v-2.414h2.767v2.414h.971v-2.414h2.765v2.416h.972v-2.416H590.8v2.416h.973v-2.416h2.766v2.414h1.869V254h-1.869v2.412h-2.766V254H590.8v2.416h-2.764V254h-.972v2.413H584.3V254h-.971v2.412h-2.767V254h-.971v2.415h-2.765Zm43.311,9.142v-1.851H575.974v1.851Zm5.138,22.225h-.644v7.2h.644a.1.1,0,0,0,.1-.1v-7.008A.1.1,0,0,0,625.274,285.015Zm-.005-35.666h-.639v7.2h.644a.1.1,0,0,0,.1-.1v-7.006A.105.105,0,0,0,625.269,249.349Zm0,17.833h-.639v7.2h.644a.1.1,0,0,0,.1-.1v-7A.105.105,0,0,0,625.269,267.182Zm-54.528,17.93v7.006a.1.1,0,0,0,.1.093h.64v-7.2h-.64A.1.1,0,0,0,570.741,285.112Zm0-17.834v7a.1.1,0,0,0,.1.1h.636v-7.2h-.637A.1.1,0,0,0,570.741,267.278Zm49.395,13.344v-1.85H575.974v1.85Zm2.073,2.328H573.9a.1.1,0,0,0-.1.1V294.18a.1.1,0,0,0,.1.1h48.307a.1.1,0,0,0,.1-.1V283.044A.1.1,0,0,0,622.209,282.95Zm-25.8,6.712h-1.869v2.413h-2.766v-2.414H590.8v2.416h-2.764v-2.415h-.972v2.413H584.3v-2.412h-.971v2.414h-2.767v-2.416h-.971v2.414h-2.765v-2.763h1.87v-2.065h-1.87v-2.764h2.765V286.9h.971v-2.415h2.767V286.9h.971v-2.415h2.765V286.9h.972v-2.415H590.8V286.9h.973v-2.415h2.766V286.9h1.869Zm15.119,0H599.836V286.9h11.691Zm7.756,0h-2.764V286.9h2.764ZM573.9,276.444h48.309a.1.1,0,0,0,.1-.093V265.213a.1.1,0,0,0-.1-.1H573.9a.1.1,0,0,0-.1.1v11.136A.1.1,0,0,0,573.9,276.444Zm42.619-7.38h2.764v2.767h-2.764Zm-16.683,0h11.691v2.769H599.836Zm-23.011,2.417h1.87v-2.062h-1.87v-2.766h2.765v2.413h.971v-2.413h2.767v2.413h.971V266.65h2.765v2.412h.972v-2.413H590.8v2.416h.973V266.65h2.766v2.412h1.869v2.769h-1.869v2.412h-2.766v-2.414H590.8v2.416h-2.764v-2.414h-.972v2.414H584.3v-2.414h-.971v2.414h-2.767v-2.414h-.971v2.414h-2.765Zm-6.084-22.032v7a.1.1,0,0,0,.1.094h.637v-7.2h-.637A.1.1,0,0,0,570.741,249.447Z" transform="translate(-570.741 -247.286)" />
                    </svg>
                </div>

                <div className="flex flex-col bg-inherit">
                    <span
                        ref={iconRef}
                        onClick={(e) => toggleMenu(e)}
                        className="w-8 cursor-pointer md:hidden duration-500"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
                            <rect fill="currentColor" x="212" y="-121.02" width="76" height="463.89" rx="4.12" transform="translate(360.92 -139.08) rotate(90)" />
                            <rect fill="currentColor" x="212" y="157.13" width="76" height="463.89" rx="4.12" transform="translate(639.08 139.08) rotate(90)" />
                            <rect fill="currentColor" x="212" y="18.05" width="76" height="463.89" rx="4.12" transform="translate(500 0) rotate(90)" />
                        </svg>
                    </span>
                    <ul
                        ref={menuRef}
                        className="
                            z-50 fixed md:static top-12 left-1/2 right-0 mt-[1px] md:mt-0 scale-x-0 md:scale-x-100
                            flex flex-col md:flex-row md:justify-between md:gap-5 border md:border-0 border-gray-300 rounded 
                            bg-inherit text-center font-kode_mono font-bold duration-500 origin-right
                        "
                    >
                        <li onClick={() => scrollToAbout()}className="py-3 md:py-1 px-3 border-b border-gray-300 hover:text-gray-500 hover:border-gray-500 cursor-pointer duration-200">À propos</li>
                        <li onClick={() => scrollToProject()} className="py-3 md:py-1 px-3 border-b border-gray-300 hover:text-gray-500 hover:border-gray-500 cursor-pointer duration-200">Projets</li>
                        <li onClick={() => scrollToContact()} className="py-3 md:py-1 px-3 border-b border-gray-300 hover:text-gray-500 hover:border-gray-500 cursor-pointer duration-200">Contact</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}