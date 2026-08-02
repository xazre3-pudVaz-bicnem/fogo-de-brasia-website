import { absoluteUrl, isIndexable } from '@/lib/env';
import { site } from '@/lib/site-config';
import { publishedArticles } from '@/data/news';

/**
 * RSS 2.0 フィード。
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

export function GET() {
  const items = isIndexable
    ? publishedArticles
        .map((a) => {
          const url = absoluteUrl(`/news/${a.slug}`);
          const date = new Date(
            `${a.updatedAt ?? a.publishedAt}T00:00:00+09:00`
          ).toUTCString();
          return `    <item>
      <title>${escapeXml(a.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(a.summary)}</description>
      <category>${escapeXml(a.category)}</category>
      <pubDate>${date}</pubDate>
    </item>`;
        })
        .join('\n')
    : '';

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(site.name)} お知らせ・コラム</title>
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
