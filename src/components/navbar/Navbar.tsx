"use client";

import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import Hamburger from "./Hamburger";
import { twJoin } from "tailwind-merge";
import { Link } from "@/src/i18n/navigation";
import NavbarButton from "./NavbarButton";

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
    };

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
    <div className="z-30 sticky top-0 w-full border-b border-primary bg-linear-to-r from-primary to-primary/75">
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
                "w-64 flex flex-col bg-primary border border-primary-foreground rounded-lg text-center font-kode_mono font-bold translate-x-full duration-500 ease-out overflow-hidden",
                "md:static md:flex-row md:justify-between md:gap-5 md:border-0 md:translate-x-0 md:w-auto md:bg-transparent",
                "data-focused:translate-x-0",
                "data-resizing:duration-0"
              )}
              data-focused={showMenu || undefined}
              data-resizing={isResizing || undefined}
            >
              <li>
                <NavbarButton>
                  <Link href="/about">À propos</Link>
                </NavbarButton>
              </li>
              <li>
                <NavbarButton>
                  <Link href="/projects">Projets</Link>
                </NavbarButton>
              </li>
              <li>
                <NavbarButton className="border-0 md:border-b">
                  <Link href="/contact">Contact</Link>
                </NavbarButton>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
