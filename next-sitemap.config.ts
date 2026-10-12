// Public paths: the locale never shows in the URL, and each section has a
// path per language (see src/i18n/routing.ts)
const PATHS = [
  "/",
  "/about",
  "/a-propos",
  "/projects",
  "/realisations",
  "/skills",
  "/competences",
  "/contact",
];

// Build output only has the internal /en/... and /fr/... routes: list the
// public paths instead
type SitemapConfig = {
  transform: (config: SitemapConfig, path: string) => Promise<unknown>;
};

const additionalPaths = async (config: SitemapConfig) => {
  const entries = PATHS.map((path) => config.transform(config, path));
  return Promise.all(entries);
};

module.exports = {
  siteUrl: "https://marcblais.net",
  generateRobotsTxt: true,
  exclude: ["/icon", "/en", "/fr", "/en/*", "/fr/*"],
  additionalPaths,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "Googlebot",
        allow: "/",
      },
      {
        userAgent: "facebookexternalhit",
        allow: "/",
      },
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },
  sitemapSize: 7000,
};
