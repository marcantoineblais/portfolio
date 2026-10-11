module.exports = {
  siteUrl: "https://marcblais.net",
  generateRobotsTxt: true,
  exclude: ["/icon"],
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
