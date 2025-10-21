"use client";

import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import Hamburger from "./Hamburger";
import { twJoin } from "tailwind-merge";

export default function Navbar() {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [showMenu, setShowMenu] = useState<boolean>(false);

  useEffect(() => {
    const hideMenu = () => {
      setShowMenu(false);
    };

    window.addEventListener("click", hideMenu);

    return () => {
      window.removeEventListener("click", hideMenu);
    };
  }, []);

  function toggleMenu(e: React.MouseEvent) {
    e.stopPropagation();
    setShowMenu((prev) => !prev);
  }

  return (
    <div
      className={twJoin(
        "w-full h-0 py-3 text-gray-300 border-b border-b-gray-950 bg-stone-900 duration-1000",
        "data-visible:h-16"
      )}
      data-visible={isVisible || undefined}
    >
      <div className="mx-auto container relative h-full px-3 py-1 flex justify-between gap-3 items-center">
        <Logo
          className="w-20 flex justify-center items-center cursor-pointer duration-200 hover:text-gray-500"
        />

        <div className="flex flex-col">
          <Hamburger
            onClick={(e) => toggleMenu(e)}
            className="w-8 cursor-pointer md:hidden duration-200 data-focused:rotate-90 hover:opacity-75"
            data-focused={showMenu || undefined}
          />

          <div
            className={twJoin(
              "absolute right-0 top-full z-50 mt-0.25 overflow-hidden",
              "md:static md:mt-0"
            )}
          >
            <ul 
              className={twJoin(
                "w-64 flex flex-col border border-gray-300 rounded text-center font-kode_mono bg-stone-900 font-bold translate-x-full duration-500 ease-out",
                "md:static md:flex-row md:justify-between md:gap-5 md:border-0 md:translate-x-0 md:w-auto",
                "data-focused:translate-x-0"
              )}
              data-focused={showMenu || undefined}
            >
              <li
                // onClick={() => scrollToAbout()}
                className="py-3 md:py-1 px-3 border-b border-gray-300 hover:text-gray-500 hover:border-gray-500 cursor-pointer duration-200"
              >
                À propos
              </li>
              <li
                // onClick={() => scrollToProject()}
                className="py-3 md:py-1 px-3 border-b border-gray-300 hover:text-gray-500 hover:border-gray-500 cursor-pointer duration-200"
              >
                Réalisations
              </li>
              <li
                // onClick={() => scrollToContact()}
                className="py-3 md:py-1 px-3 border-b border-gray-300 hover:text-gray-500 hover:border-gray-500 cursor-pointer duration-200"
              >
                Contact
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
