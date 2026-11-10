import type { MetadataRoute } from "next";
import { CATEGORIES } from "@/data/categories";
import { TOOLS } from "@/data/tools";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://mytoolpocket.com";
  const releaseDate = "2026-11-11T00:00:00.000Z";

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: releaseDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/tools/`,
      lastModified: releaseDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog/`,
      lastModified: releaseDate,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about/`,
      lastModified: releaseDate,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact/`,
      lastModified: releaseDate,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy-policy/`,
      lastModified: releaseDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms/`,
      lastModified: releaseDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/sitemap/`,
      lastModified: releaseDate,
      changeFrequency: "weekly",
      priority: 0.6,
    },
  ];

  const blogPosts: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/blog/why-client-side-privacy-matters/`,
      lastModified: releaseDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blog/10-essential-developer-utilities/`,
      lastModified: releaseDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blog/mastering-meta-tags-for-seo/`,
      lastModified: releaseDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blog/pomodoro-technique-for-deep-work/`,
      lastModified: releaseDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = CATEGORIES.map((cat) => ({
    url: `${baseUrl}/${cat.slug}/`,
    lastModified: releaseDate,
    changeFrequency: "daily",
    priority: 0.8,
  }));

  const toolRoutes: MetadataRoute.Sitemap = TOOLS.map((tool) => ({
    url: `${baseUrl}/${tool.category}/${tool.slug}/`,
    lastModified: releaseDate,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  return [...staticRoutes, ...blogPosts, ...categoryRoutes, ...toolRoutes];
}
