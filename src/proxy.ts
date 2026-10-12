import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";

import { LOCALE_COOKIE, routing } from "./i18n/routing";
import { localeFromPathname } from "./lib/sections";

const intlProxy = createMiddleware(routing);

/**
 * next-intl picks the locale from the cookie. A path that only exists in
 * one language (a shared /a-propos link) wins over it, so the page always
 * matches its URL, and the cookie follows.
 */
export default function proxy(request: NextRequest) {
  const pathLocale = localeFromPathname(request.nextUrl.pathname);
  const cookieLocale = request.cookies.get(LOCALE_COOKIE.name)?.value;

  if (!pathLocale || pathLocale === cookieLocale) return intlProxy(request);

  request.cookies.set(LOCALE_COOKIE.name, pathLocale);
  const response = intlProxy(request);
  const { name, ...options } = LOCALE_COOKIE;
  response.cookies.set(name, pathLocale, { ...options, path: "/" });
  return response;
}

export const config = {
  // Match all pathnames except API routes, Next internals, the generated
  // favicon (/icon) and static files
  matcher: "/((?!api|trpc|_next|_vercel|icon|.*\\..*).*)",
};
