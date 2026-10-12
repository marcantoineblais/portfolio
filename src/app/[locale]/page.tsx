import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import Home from "../../components/Home";
import { pageMetadata } from "../../lib/metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, null);
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <Home section={null} />;
}
