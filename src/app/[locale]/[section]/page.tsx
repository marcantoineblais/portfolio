import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import Home from "../../../components/Home";
import { pageMetadata } from "../../../lib/metadata";
import { isSection, SECTIONS } from "../../../lib/sections";

type Props = { params: Promise<{ locale: string; section: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return SECTIONS.map((section) => ({ section }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, section } = await params;
  if (!isSection(section)) notFound();
  return pageMetadata(locale, section);
}

/** Same page as the home, opened on one section (/a-propos, /projects…). */
export default async function SectionPage({ params }: Props) {
  const { locale, section } = await params;
  if (!isSection(section)) notFound();
  setRequestLocale(locale);

  return <Home section={section} />;
}
