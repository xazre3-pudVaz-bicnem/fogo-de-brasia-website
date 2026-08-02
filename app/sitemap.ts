import type { MetadataRoute } from 'next';
import { absoluteUrl, isIndexable } from '@/lib/env';
import { routes } from '@/lib/routes';
import { publishedArticles, totalPages } from '@/data/news';
import { getAllPosts, getUsedCategories, CATEGORY_SLUGS } from '@/lib/blog';

/**
 * sitemap.xml
 * ・index 可能なページのみを載せる（noindex ページ・下書き記事は含めない）
 * ・記事は公開日／更新日を lastModified に反映する
 * ・代表画像を images として持たせ、画像サイトマップを兼ねる
 */
export default function sitemap(): MetadataRoute.Sitemap {
  // 仮ドメイン・Preview では sitemap を空にして、誤ってクロールされないようにする
  if (!isIndexable) return [];

  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = routes.map((r) => ({
    url: absoluteUrl(r.path),
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
    ...(r.image ? { images: [absoluteUrl(r.image)] } : {}),
  }));

  const newsPages: MetadataRoute.Sitemap = Array.from(
    { length: Math.max(0, totalPages - 1) },
    (_, i) => ({
      url: absoluteUrl(`/news/page/${i + 2}`),
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.3,
    })
  );

  const articlePages: MetadataRoute.Sitemap = publishedArticles.map((a) => ({
    url: absoluteUrl(`/news/${a.slug}`),
    lastModified: new Date(a.updatedAt ?? a.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
    images: [absoluteUrl(a.photo.src)],
  }));

  // ブログ（content/blog/*.md／GitHub Actions が毎日追記する）
  const blogPages: MetadataRoute.Sitemap = getAllPosts().map((p) => ({
    url: absoluteUrl(`/blog/${p.slug}`),
    lastModified: new Date(`${p.date}T00:00:00+09:00`),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  const blogCategoryPages: MetadataRoute.Sitemap = getUsedCategories().map(
    (c) => ({
      url: absoluteUrl(`/blog/category/${CATEGORY_SLUGS[c]}`),
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.3,
    })
  );

  return [
    ...staticPages,
    ...newsPages,
    ...articlePages,
    ...blogPages,
    ...blogCategoryPages,
  ];
}
