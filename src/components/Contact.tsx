import { getTranslations } from "next-intl/server";
import type { CSSProperties } from "react";

import { EMAIL, GITHUB, LINKEDIN, PHONE } from "../data/contact";
import ContactIcon, { type ContactIconName } from "./contact/ContactIcon";
import CopyButton from "./contact/CopyButton";
import Scene from "./Scene";
import SectionHeader from "./SectionHeader";

type ContactRow = {
  key: string;
  label: string;
  value: string;
  href: string;
  icon: ContactIconName;
  copy?: boolean;
  external?: boolean;
};

export default async function Contact() {
  const t = await getTranslations("contact");
  const tCta = await getTranslations("cta");

  const rows: ContactRow[] = [
    {
      key: "phone",
      label: t("phone"),
      value: PHONE,
      href: `tel:+1${PHONE.replace(/-/g, "")}`,
      icon: "phone",
    },
    {
      key: "email",
      label: t("email"),
      value: EMAIL,
      href: `mailto:${EMAIL}`,
      icon: "email",
      copy: true,
    },
    {
      key: "github",
      label: "GitHub",
      value: "github.com/marcantoineblais",
      href: GITHUB,
      icon: "github",
      external: true,
    },
    {
      key: "linkedin",
      label: "LinkedIn",
      value: "linkedin.com/in/marcantoineblais",
      href: LINKEDIN,
      icon: "linkedin",
      external: true,
    },
  ];

  return (
    <Scene id="contact" className="bg-yellow-50 text-gray-900">
      <div className="mx-auto grid max-w-7xl items-start gap-14 px-4 py-20 *:min-w-0 sm:px-6 sm:py-28 lg:grid-cols-2 lg:gap-20">
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
            className="group inline-flex w-full items-center justify-center gap-3 self-start rounded-xl bg-gray-900 px-7 py-4 font-mono text-lg font-bold text-yellow-50 shadow-xl shadow-gray-900/20 transition-colors hover:bg-stone-800 sm:w-auto"
          >
            {tCta("write")}
            <span
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-1"
            >
              →
            </span>
          </a>
        </div>

        <div
          data-reveal="zoom"
          className="rounded-3xl border border-gray-900/10 bg-white/70 p-3 shadow-xl shadow-gray-500/10 sm:p-4"
        >
          <div className="flex items-center justify-between px-3 pt-2 pb-3">
            <p className="font-display text-xl sm:text-2xl">
              Marc Antoine Blais
            </p>
            <span className="flex gap-1.5" aria-hidden="true">
              <span className="size-2.5 rounded-full bg-gray-900/15" />
              <span className="size-2.5 rounded-full bg-gray-900/15" />
              <span className="size-2.5 rounded-full bg-gray-900/40" />
            </span>
          </div>
          <ul className="flex flex-col gap-2">
            {rows.map((row) => (
              <li
                key={row.key}
                className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm transition-shadow hover:shadow-md sm:gap-4 sm:p-4"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gray-900 text-yellow-50">
                  <ContactIcon name={row.icon} />
                </span>
                <a
                  href={row.href}
                  target={row.external ? "_blank" : undefined}
                  rel={row.external ? "noopener noreferrer" : undefined}
                  className="flex min-w-0 grow flex-col"
                >
                  <span className="font-mono text-xs tracking-widest text-gray-500 uppercase">
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
    </Scene>
  );
}
