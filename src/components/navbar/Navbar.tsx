"use client";

import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import Hamburger from "./Hamburger";
import { twJoin } from "tailwind-merge";
import { Link } from "@/src/i18n/navigation";

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout | number = 0;
    const hideMenu = () => {
      setShowMenu(false);
    };

    const onResize = () => {
      clearTimeout(timeout);
      setIsResizing(true);
      setShowMenu(false);
      timeout = setTimeout(() => {
        setIsResizing(false);
      }, 50);
    }

    window.addEventListener("resize", onResize);

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
      className="sticky top-0  w-full text-gray-300 border-b border-b-gray-950 bg-stone-900"
    >
      <div className="mx-auto container relative px-3 py-1.5 flex justify-between gap-3 items-center">
        <Logo className="w-20 flex justify-center items-center cursor-pointer duration-200 hover:opacity-50" />

        <div className="flex flex-col">
          <Hamburger
            onClick={(e) => toggleMenu(e)}
            className="w-8 cursor-pointer md:hidden duration-200 data-focused:rotate-90 hover:opacity-50"
            data-focused={showMenu || undefined}
          />

          <div
            className={twJoin(
              "absolute right-0 top-full z-50 mt-px overflow-hidden",
              "md:static md:mt-0"
            )}
          >
            <ul
              className={twJoin(
                "w-64 flex flex-col border border-gray-300 rounded text-center font-kode_mono bg-stone-900 font-bold translate-x-full duration-500 ease-out",
                "md:static md:flex-row md:justify-between md:gap-5 md:border-0 md:translate-x-0 md:w-auto",
                "data-focused:translate-x-0",
                "data-resizing:duration-0"
              )}
              data-focused={showMenu || undefined}
              data-resizing={isResizing || undefined}
            >
              <li
                className="py-3 md:py-1 px-3 border-b border-gray-300 hover:opacity-50 cursor-pointer duration-200"
              >
                <Link href="/about">À propos</Link>
              </li>
              <li
                className="py-3 md:py-1 px-3 border-b border-gray-300 hover:opacity-50 cursor-pointer duration-200"
              >
                <Link href="/projects">Projets</Link>
              </li>
              <li
                className="py-3 md:py-1 px-3 border-b border-gray-300 hover:opacity-50 cursor-pointer duration-200"
              >
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
