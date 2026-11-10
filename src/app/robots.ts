import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/_next/static/", "/_next/image/"],
        disallow: ["/api/", "/_next/", "/*?*"],
      },
      {
        userAgent: "Googlebot",
        allow: ["/", "/_next/static/", "/_next/image/"],
        disallow: ["/api/", "/_next/", "/*?*"],
      },
    ],
    sitemap: "https://mytoolpocket.com/sitemap.xml",
    host: "https://mytoolpocket.com",
  };
}
