import { getTranslations } from "next-intl/server";
import type { CSSProperties, ReactNode } from "react";

import CopyButton from "./contact/CopyButton";
import SectionHeader from "./SectionHeader";

const EMAIL = "blaisma@live.fr";
const PHONE = "514-296-1923";
const GITHUB = "https://github.com/marcantoineblais";
const LINKEDIN = "https://linkedin.com/in/marcantoineblais";

const icon = (d: ReactNode) => (
  <svg
    viewBox="0 0 24 24"
    className="h-5 w-5"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {d}
  </svg>
);

export const ICONS = {
  phone: icon(
    <path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2" />,
  ),
  email: icon(
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </>,
  ),
  github: (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.58.23 2.75.11 3.04.74.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5z" />
    </svg>
  ),
  linkedin: (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  ),
};

export const LINKS = { EMAIL, PHONE, GITHUB, LINKEDIN };

export default async function Contact() {
  const t = await getTranslations("contact");

  const rows = [
    {
      key: "phone",
      label: t("phone"),
      value: PHONE,
      href: `tel:+1${PHONE.replace(/-/g, "")}`,
      icon: ICONS.phone,
    },
    {
      key: "email",
      label: t("email"),
      value: EMAIL,
      href: `mailto:${EMAIL}`,
      icon: ICONS.email,
      copy: true,
    },
    {
      key: "github",
      label: "GitHub",
      value: "github.com/marcantoineblais",
      href: GITHUB,
      icon: ICONS.github,
      external: true,
    },
    {
      key: "linkedin",
      label: "LinkedIn",
      value: "linkedin.com/in/marcantoineblais",
      href: LINKEDIN,
      icon: ICONS.linkedin,
      external: true,
    },
  ];

  return (
    <section
      id="contact"
      data-scene
      className="scene relative bg-yellow-50 text-gray-900"
    >
      <div className="mx-auto grid max-w-7xl items-start gap-14 [&>*]:min-w-0 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-2 lg:gap-20">
        <div className="flex flex-col gap-8">
          <SectionHeader
            index="04"
            label={t("label")}
            title={t("title")}
            intro={t("intro")}
          />
          <a
            data-reveal
            style={{ "--delay": "250ms" } as CSSProperties}
            href={`mailto:${EMAIL}`}
            className="font-mono group inline-flex w-full items-center justify-center gap-3 self-start rounded-xl bg-gray-900 px-7 py-4 text-lg font-bold text-yellow-50 shadow-xl shadow-gray-900/20 transition-colors hover:bg-stone-800 sm:w-auto"
          >
            {t("write")}
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </a>
        </div>

        <div
          data-reveal="zoom"
          className="rounded-3xl border border-gray-900/10 bg-white/60 p-3 shadow-xl shadow-gray-500/10 backdrop-blur sm:p-4"
        >
          <div className="flex items-center justify-between px-3 pb-3 pt-2">
            <p className="font-display text-xl sm:text-2xl">
              Marc-Antoine Blais
            </p>
            <span className="flex gap-1.5" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-gray-900/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-gray-900/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-gray-900/40" />
            </span>
          </div>
          <ul className="flex flex-col gap-2">
            {rows.map((row) => (
              <li
                key={row.key}
                className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm transition-shadow hover:shadow-md sm:gap-4 sm:p-4"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-900 text-yellow-50">
                  {row.icon}
                </span>
                <a
                  href={row.href}
                  target={row.external ? "_blank" : undefined}
                  rel={row.external ? "noopener noreferrer" : undefined}
                  className="flex min-w-0 grow flex-col"
                >
                  <span className="font-mono text-xs uppercase tracking-widest text-gray-500">
                    {row.label}
                  </span>
                  <span className="truncate font-semibold hover:underline sm:text-lg">
                    {row.value}
                  </span>
                </a>
                {row.copy && (
                  <CopyButton
                    value={row.value}
                    label={t("copy")}
                    copiedLabel={t("copied")}
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
