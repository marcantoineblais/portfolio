"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";
import Hamburger from "./Hamburger";
import { twJoin } from "tailwind-merge";
import NavbarButton from "./NavbarButton";
import useParallax from "@/src/hooks/useParallax";
import { useTranslations } from "next-intl";

export default function Navbar() {
  const t = useTranslations("Navbar");
  const { selectedKey, setSelectedKey } = useParallax();

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
    <div
      className={twJoin(
        "z-50 sticky top-0 w-full overflow-hidden",
        "transition-[color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,height] duration-1000 ease-in-out",
        "h-14 shadow-sm shadow-default/25 text-default bg-linear-to-r",
        "from-default-foreground/75 to-default-foreground",
        "data-hero:h-0 data-hero:pointer-events-none",
        "data-projects:from-primary/75 data-projects:to-primary",
        "data-about:from-secondary/75 data-about:to-secondary",
        "data-contact:from-ternary/75 data-contact:to-ternary"
      )}
      data-hero={selectedKey === "hero" || undefined}
      data-projects={selectedKey === "projects" || undefined}
      data-about={selectedKey === "about" || undefined}
      data-contact={selectedKey === "contact" || undefined}
    >
      <div className="mx-auto container px-3 py-1.5 flex justify-between gap-3 items-center bg-inherit">
        <Logo
          className="w-20 flex justify-center items-center cursor-pointer duration-200 hover:opacity-50"
          onClick={() => setSelectedKey("hero")}
        />

        <div className="flex flex-col bg-inherit">
          <Hamburger
            onClick={(e) => toggleMenu(e)}
            className="w-8 cursor-pointer md:hidden duration-200 data-focused:rotate-90 hover:opacity-50"
            data-focused={showMenu || undefined}
          />

          <div
            className={twJoin(
              "z-50 absolute right-0 top-full mt-px overflow-hidden bg-inherit",
              "md:static md:mt-0"
            )}
          >
            <ul
              className={twJoin(
                "w-64 flex flex-col bg-inherit border border-primary-foreground rounded-lg text-center font-kode_mono font-bold translate-x-full duration-500 ease-out overflow-hidden",
                "md:static md:flex-row md:justify-between md:gap-5 md:border-0 md:translate-x-0 md:w-auto md:bg-transparent",
                "data-focused:translate-x-0",
                "data-resizing:duration-0"
              )}
              data-focused={showMenu || undefined}
              data-resizing={isResizing || undefined}
            >
              <li>
                <NavbarButton onClick={() => setSelectedKey("projects")}>
                  {t("projects")}
                </NavbarButton>
              </li>
              <li>
                <NavbarButton onClick={() => setSelectedKey("about")}>
                  {t("about")}
                </NavbarButton>
              </li>
              <li>
                <NavbarButton
                  className="border-0 md:border-b"
                  onClick={() => setSelectedKey("contact")}
                >
                  {t("contact")}
                </NavbarButton>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
