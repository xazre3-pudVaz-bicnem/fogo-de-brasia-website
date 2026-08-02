import type { Metadata } from 'next';

import { pageMetadata } from '@/lib/seo';
import Link from 'next/link';

import { photos } from '@/lib/images';
import { articles, articlesForPage, categories, totalPages } from '@/data/news';
import { PageHero } from '@/components/ui/PageHero';
import { NewsList } from '@/components/sections/NewsList';
import { ReservationCTA } from '@/components/sections/ReservationCTA';
import { JsonLd } from '@/components/ui/JsonLd';
import {
  breadcrumbWithId,
  graph,
  webPageSchema,
} from '@/lib/structured-data';

export const metadata: Metadata = pageMetadata({
  title: 'お知らせ・コラム｜シュラスコと新宿の話',
  description:
    'シュラスコの食べ方や部位の解説、料金と時間の見方、新宿駅からのアクセス、宴会や子連れ利用の確認事項まで。FOGO De BRASIA 新宿の店舗情報にもとづいたお知らせとコラムをお届けします。',
  path: '/news',
});

const crumbs = [
  { name: 'ホーム', href: '/' },
  { name: 'お知らせ・コラム', href: '/news' },
];

export default function NewsIndexPage() {
  const items = articlesForPage(1);

  return (
    <>
      <PageHero
        photo={photos.skewerTable}
        latin="NEWS & COLUMN"
        title="お知らせ・コラム"
        lead="シュラスコの楽しみ方や、新宿でのお店選びに役立つ話題をお届けしています。"
        crumbs={crumbs}
        objectPosition="center 55%"
      />

      <section className="bg-char py-20 md:py-28">
        <div className="mx-auto max-w-[86rem] px-5 md:px-9">
          {/* カテゴリ表示（記事が増えた際の目印） */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-ivory/12 pb-6">
            <p className="latin text-[0.7rem] text-gold">CATEGORY</p>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {categories.map((c) => (
                <li
                  key={c}
                  className="text-[0.76rem] tracking-[0.06em] text-ivory-dim"
                >
                  {c}
                </li>
              ))}
            </ul>
            <p className="latin ml-auto text-[0.72rem] text-ivory-dim tabular-nums">
              {articles.length} ARTICLES
            </p>
          </div>

          <div className="mt-14">
            <NewsList items={items} />
          </div>

          {/* ページネーション（記事が増えると自動で表示される） */}
          {totalPages > 1 && (
            <nav
              aria-label="記事のページ送り"
              className="mt-16 flex justify-center"
            >
              <ul className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <li key={p}>
                    {p === 1 ? (
                      <span
                        aria-current="page"
                        className="latin flex size-11 items-center justify-center border border-gold bg-gold text-[0.7rem] text-ink tabular-nums"
                      >
                        {p}
                      </span>
                    ) : (
                      <Link
                        href={`/news/page/${p}`}
                        className="latin flex size-11 items-center justify-center border border-ivory/25 text-[0.7rem] text-ivory tabular-nums transition-colors hover:border-gold hover:text-gold"
                      >
                        {p}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </section>

      <ReservationCTA
        location="news"
        photo={photos.grilledPotato}
        label="空席を確認する"
      />

      <JsonLd data={graph(
          breadcrumbWithId(crumbs, '/news'),
          webPageSchema({
            path: '/news',
            name: metadata.title as string,
            description: metadata.description as string,
            primaryImage: '/images/skewer-table-setting.webp',
          })
        )} />
    </>
  );
}
