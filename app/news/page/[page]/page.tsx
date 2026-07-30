import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { photos } from '@/lib/images';
import { pageMetadata } from '@/lib/seo';
import { articlesForPage, totalPages } from '@/data/news';
import { PageHero } from '@/components/ui/PageHero';
import { NewsList } from '@/components/sections/NewsList';
import { ReservationCTA } from '@/components/sections/ReservationCTA';
import { JsonLd } from '@/components/ui/JsonLd';
import { breadcrumbSchema, graph } from '@/lib/structured-data';

type Params = { params: Promise<{ page: string }> };

/** 1ページ目は /news が正なので、2ページ目以降だけを生成する */
export function generateStaticParams() {
  return Array.from({ length: Math.max(0, totalPages - 1) }, (_, i) => ({
    page: String(i + 2),
  }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { page } = await params;
  const n = Number(page);
  return pageMetadata({
    title: `お知らせ・コラム（${n}ページ目）`,
    description: `FOGO De BRASIA 新宿のお知らせとコラムの一覧（${n}ページ目）。シュラスコの楽しみ方や、新宿でのお店選びに役立つ話題をお届けしています。`,
    path: `/news/page/${n}`,
  });
}

export default async function NewsPagedPage({ params }: Params) {
  const { page } = await params;
  const n = Number(page);

  if (!Number.isInteger(n) || n < 2 || n > totalPages) notFound();

  const items = articlesForPage(n);
  if (items.length === 0) notFound();

  const crumbs = [
    { name: 'ホーム', href: '/' },
    { name: 'お知らせ・コラム', href: '/news' },
    { name: `${n}ページ目`, href: `/news/page/${n}` },
  ];

  return (
    <>
      <PageHero
        photo={photos.skewerTable}
        latin="NEWS & COLUMN"
        title="お知らせ・コラム"
        lead={`シュラスコの楽しみ方や、新宿でのお店選びに役立つ話題をお届けしています。（${n}ページ目）`}
        crumbs={crumbs}
        objectPosition="center 55%"
      />

      <section className="bg-char py-20 md:py-28">
        <div className="mx-auto max-w-[86rem] px-5 md:px-9">
          <NewsList items={items} />

          <nav
            aria-label="記事のページ送り"
            className="mt-16 flex justify-center"
          >
            <ul className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <li key={p}>
                  {p === n ? (
                    <span
                      aria-current="page"
                      className="latin flex size-11 items-center justify-center border border-gold bg-gold text-[0.7rem] text-ink tabular-nums"
                    >
                      {p}
                    </span>
                  ) : (
                    <Link
                      href={p === 1 ? '/news' : `/news/page/${p}`}
                      className="latin flex size-11 items-center justify-center border border-ivory/25 text-[0.7rem] text-ivory tabular-nums transition-colors hover:border-gold hover:text-gold"
                    >
                      {p}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      <ReservationCTA location="news-paged-footer" label="空席を確認する" />

      <JsonLd data={graph(breadcrumbSchema(crumbs))} />
    </>
  );
}
