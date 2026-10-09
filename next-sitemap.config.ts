module.exports = {
  siteUrl: "https://marcblais.xyz",
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
