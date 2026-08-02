import { absoluteUrl, isIndexable } from '@/lib/env';
import { site } from '@/lib/site-config';
import { publishedArticles } from '@/data/news';
import { getAllPosts } from '@/lib/blog';

/**
 * RSS 2.0 フィード。
 * お知らせ・コラム（data/news）とブログ（content/blog）を1本にまとめて配信する。
 * 下書き記事は含めない。仮ドメイン・Preview では空のフィードを返す。
 */
export const dynamic = 'force-static';

const escapeXml = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

type FeedItem = {
  title: string;
  url: string;
  description: string;
  category: string;
  /** YYYY-MM-DD */
  date: string;
};

export function GET() {
  const entries: FeedItem[] = isIndexable
    ? [
        ...publishedArticles.map((a) => ({
          title: a.title,
          url: absoluteUrl(`/news/${a.slug}`),
          description: a.summary,
          category: a.category,
          date: a.updatedAt ?? a.publishedAt,
        })),
        ...getAllPosts().map((p) => ({
          title: p.title,
          url: absoluteUrl(`/blog/${p.slug}`),
          description: p.description,
          category: p.category,
          date: p.date,
        })),
      ].sort((a, b) => b.date.localeCompare(a.date))
    : [];

  const items = entries
    .map((e) => {
      const pubDate = new Date(`${e.date}T00:00:00+09:00`).toUTCString();
      return `    <item>
      <title>${escapeXml(e.title)}</title>
      <link>${e.url}</link>
      <guid isPermaLink="true">${e.url}</guid>
      <description>${escapeXml(e.description)}</description>
      <category>${escapeXml(e.category)}</category>
      <pubDate>${pubDate}</pubDate>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(site.name)} お知らせ・ブログ</title>
    <link>${absoluteUrl('/news')}</link>
    <description>${escapeXml(
      'シュラスコの食べ方や部位の解説、新宿でのお店選びに役立つ話題をお届けします。'
    )}</description>
    <language>ja</language>
    <atom:link href="${absoluteUrl('/feed.xml')}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
