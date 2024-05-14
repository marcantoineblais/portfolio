module.exports = {
    siteUrl: "https://marcblais.xyz",
    generateRobotsTxt: true,
    robotsTxtOptions: {
        policies: [
            {
                userAgent: "Googlebot",
                allow: "/"
            }, {
                userAgent: "facebookexternalhit",
                allow: "/"
            }, {
                userAgent: "*",
                allow: "/"
            }
        ]
    },
    sitemapSize: 7000,
};

