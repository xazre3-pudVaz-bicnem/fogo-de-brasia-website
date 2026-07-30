import type { MetadataRoute } from 'next';
import { site } from '@/lib/site-config';
import { articles, totalPages } from '@/data/news';

const abs = (path: string) => new URL(path, site.url).toString();

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticPages: MetadataRoute.Sitemap = (
    [
      { url: abs('/'), changeFrequency: 'weekly', priority: 1 },
      { url: abs('/churrasco'), changeFrequency: 'monthly', priority: 0.9 },
      { url: abs('/menu'), changeFrequency: 'weekly', priority: 0.9 },
      { url: abs('/party'), changeFrequency: 'monthly', priority: 0.8 },
      { url: abs('/occasions'), changeFrequency: 'monthly', priority: 0.8 },
      { url: abs('/space'), changeFrequency: 'monthly', priority: 0.7 },
      { url: abs('/access'), changeFrequency: 'monthly', priority: 0.7 },
      { url: abs('/about'), changeFrequency: 'monthly', priority: 0.6 },
      { url: abs('/news'), changeFrequency: 'weekly', priority: 0.6 },
      { url: abs('/privacy'), changeFrequency: 'yearly', priority: 0.2 },
    ] satisfies MetadataRoute.Sitemap
  ).map((p) => ({ ...p, lastModified }));

  const newsPages: MetadataRoute.Sitemap = Array.from(
    { length: Math.max(0, totalPages - 1) },
    (_, i) => ({
      url: abs(`/news/page/${i + 2}`),
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.4,
    })
  );

  const articlePages: MetadataRoute.Sitemap = articles.map((a) => ({
    url: abs(`/news/${a.slug}`),
    lastModified: new Date(a.updatedAt ?? a.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  return [...staticPages, ...newsPages, ...articlePages];
}
