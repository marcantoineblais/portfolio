import { getLocale, getTranslations } from "next-intl/server";

import { EMAIL, GITHUB, LINKEDIN } from "../data/contact";
import { sectionHref } from "../lib/sectionHref";
import { SECTIONS } from "../lib/sections";
import ContactIcon, { type ContactIconName } from "./contact/ContactIcon";
import RackLogo from "./RackLogo";

const SOCIAL_LINKS: { href: string; label: string; icon: ContactIconName }[] = [
  { href: GITHUB, label: "GitHub", icon: "github" },
  { href: LINKEDIN, label: "LinkedIn", icon: "linkedin" },
  { href: `mailto:${EMAIL}`, label: "Email", icon: "email" },
];

export default async function Footer() {
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");
  const locale = await getLocale();
  const year = new Date().getFullYear();
  const topHref = sectionHref(locale, null);

  return (
    <footer className="relative bg-gray-950 text-gray-400">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-14 sm:px-6">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-start">
          <div className="flex flex-col gap-4">
            <a
              href={topHref}
              data-section="top"
              aria-label={tNav("home")}
              className="size-11 text-gray-500 transition-colors hover:text-gray-200"
            >
              <RackLogo className="size-full" />
            </a>
            <p className="font-display text-2xl tracking-widest text-gray-200">
              Marc Antoine Blais
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-x-12 gap-y-3 font-mono text-sm sm:grid-cols-3">
            {SECTIONS.map((id) => (
              <a
                key={id}
                href={sectionHref(locale, id)}
                data-section={id}
                className="transition-colors hover:text-white"
              >
                {tNav(id)}
              </a>
            ))}
            <a
              href={topHref}
              data-section="top"
              className="transition-colors hover:text-white"
            >
              ↑ {t("top")}
            </a>
          </nav>

          <div className="flex gap-3">
            {SOCIAL_LINKS.map((link) => {
              const external = link.href.startsWith("http");
              return (
                <a
                  key={link.label}
                  href={link.href}
                  aria-label={link.label}
                  target={external ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex size-11 items-center justify-center rounded-full border border-white/10 transition-colors hover:border-white/40 hover:text-white"
                >
                  <ContactIcon name={link.icon} />
                </a>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-white/10 pt-6 text-xs sm:flex-row sm:justify-between sm:text-sm">
          <p>
            © {year} Marc Antoine Blais. {t("rights")}
          </p>
          <p>{t("built")}</p>
        </div>
      </div>
    </footer>
  );
}
