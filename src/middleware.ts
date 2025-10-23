import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // Define your supported locales
  locales: ['en', 'fr'],
  // Set your default locale
  defaultLocale: 'en',
});

export const config = {
  // Match all paths except static files and API routes
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};