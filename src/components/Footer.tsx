import { getTranslations } from "next-intl/server";

import { ICONS, LINKS } from "./Contact";
import RackLogo from "./RackLogo";

const SECTIONS = [
  "about",
  "projects",
  "skills",
  "experience",
  "contact",
] as const;

export default async function Footer({ resumeHref }: { resumeHref?: string }) {
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");
  const tAbout = await getTranslations("about");
  const year = new Date().getFullYear();

  return (
    <footer className="scene relative bg-gray-950 text-gray-400">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-14 sm:px-6">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-start">
          <div className="flex flex-col gap-4">
            <a
              href="#top"
              aria-label={tNav("home")}
              className="h-10 w-20 text-stone-700 transition-colors hover:text-gray-300"
            >
              <RackLogo double className="h-full w-full" />
            </a>
            <p className="font-display text-2xl tracking-widest text-gray-200">
              Marc-Antoine Blais
            </p>
            {resumeHref && (
              <a
                href={resumeHref}
                download
                className="font-mono inline-flex items-center gap-2 self-start rounded-lg border border-white/15 px-4 py-2 text-sm font-bold text-gray-300 transition-colors hover:border-white/40 hover:text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M12 4v11m0 0l-4.5-4.5M12 15l4.5-4.5M5 20h14" />
                </svg>
                {tAbout("resume")}
              </a>
            )}
          </div>

          <nav className="font-mono grid grid-cols-2 gap-x-12 gap-y-3 text-sm sm:grid-cols-3">
            {SECTIONS.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                className="transition-colors hover:text-white"
              >
                {tNav(id)}
              </a>
            ))}
            <a href="#top" className="transition-colors hover:text-white">
              ↑ {t("top")}
            </a>
          </nav>

          <div className="flex gap-3">
            {[
              { href: LINKS.GITHUB, label: "GitHub", icon: ICONS.github },
              { href: LINKS.LINKEDIN, label: "LinkedIn", icon: ICONS.linkedin },
              {
                href: `mailto:${LINKS.EMAIL}`,
                label: "Email",
                icon: ICONS.email,
              },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                aria-label={link.label}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 transition-colors hover:border-white/40 hover:text-white"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-white/10 pt-6 text-xs sm:flex-row sm:justify-between sm:text-sm">
          <p>
            © {year} Marc-Antoine Blais. {t("rights")}
          </p>
          <p>{t("built")}</p>
        </div>
      </div>
    </footer>
  );
}
