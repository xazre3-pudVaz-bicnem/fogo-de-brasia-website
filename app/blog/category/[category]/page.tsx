import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import {
  categoryFromSlug,
  getPostsByCategory,
  getUsedCategories,
  formatBlogDate,
  CATEGORY_SLUGS,
} from '@/lib/blog';
import { photos } from '@/lib/images';
import { pageMetadata } from '@/lib/seo';
import { PageHero } from '@/components/ui/PageHero';
import { ReservationCTA } from '@/components/sections/ReservationCTA';
import { JsonLd } from '@/components/ui/JsonLd';
import { breadcrumbWithId, graph, webPageSchema } from '@/lib/structured-data';

type Params = { params: Promise<{ category: string }> };

/** 記事が1本もないカテゴリのページは作らない（中身の薄いページを増やさない） */
export function generateStaticParams() {
  return getUsedCategories().map((c) => ({ category: CATEGORY_SLUGS[c] }));
}

const descriptionFor = (name: string) =>
  `${name}に関する記事の一覧です。新宿・歌舞伎町のシュラスコレストラン FOGO De BRASIA 新宿がお届けします。`;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { category } = await params;
  const name = categoryFromSlug(category);
  if (!name) return {};

  return pageMetadata({
    title: `${name}の記事一覧｜ブログ`,
    description: descriptionFor(name),
    path: `/blog/category/${category}`,
  });
}

export default async function BlogCategoryPage({ params }: Params) {
  const { category } = await params;
  const name = categoryFromSlug(category);
  if (!name) notFound();

  const posts = getPostsByCategory(name);
  if (posts.length === 0) notFound();

  const path = `/blog/category/${category}`;
  const categories = getUsedCategories();

  const crumbs = [
    { name: 'ホーム', href: '/' },
    { name: 'ブログ', href: '/blog' },
    { name, href: path },
  ];

  return (
    <>
      <PageHero
        photo={photos.lineup}
        latin="BLOG"
        title={`${name}の記事`}
        lead={descriptionFor(name)}
        crumbs={crumbs}
        objectPosition="center 55%"
      />

      <section className="bg-char py-20 md:py-28">
        <div className="mx-auto max-w-[86rem] px-5 md:px-9">
          {/* カテゴリ切り替え */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-ivory/12 pb-6">
            <p className="latin text-[0.72rem] text-gold">CATEGORY</p>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              <li>
                <Link
                  href="/blog"
                  className="text-[0.8rem] tracking-[0.06em] text-ivory-dim transition-colors hover:text-gold"
                >
                  すべて
                </Link>
              </li>
              {categories.map((c) => (
                <li key={c}>
                  {c === name ? (
                    <span
                      aria-current="page"
                      className="text-[0.8rem] tracking-[0.06em] text-gold"
                    >
                      {c}
                    </span>
                  ) : (
                    <Link
                      href={`/blog/category/${CATEGORY_SLUGS[c]}`}
                      className="text-[0.8rem] tracking-[0.06em] text-ivory-dim transition-colors hover:text-gold"
                    >
                      {c}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            <p className="latin ml-auto text-[0.72rem] text-ivory-dim tabular-nums">
              {posts.length} ARTICLES
            </p>
          </div>

          <ul className="mt-4 border-t border-ivory/0">
            {posts.map((p) => (
              <li key={p.slug} className="border-b border-ivory/12">
                <Link
                  href={`/blog/${p.slug}`}
                  className="group grid items-baseline gap-3 py-7 md:grid-cols-[8rem_minmax(0,1fr)] md:gap-8"
                >
                  <p className="text-[0.74rem] text-ivory-dim">
                    <time dateTime={p.date} className="tabular-nums">
                      {formatBlogDate(p.date)}
                    </time>
                  </p>
                  <div>
                    <h2 className="text-[1.02rem] leading-[1.7] text-balance-ja text-ivory transition-colors group-hover:text-gold md:text-[1.15rem]">
                      {p.title}
                    </h2>
                    <p className="mt-2.5 line-clamp-2 text-[0.82rem] leading-[1.9] text-ivory-dim">
                      {p.description}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-14">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-3 text-[0.85rem] text-gold"
            >
              <span
                aria-hidden="true"
                className="h-px w-8 bg-gold/60 transition-all duration-500 group-hover:w-12"
              />
              すべての記事を見る
            </Link>
          </div>
        </div>
      </section>

      <ReservationCTA
        location="blog"
        photo={photos.cheers}
        objectPosition="center 45%"
        label="空席を確認する"
      />

      <JsonLd
        data={graph(
          breadcrumbWithId(crumbs, path),
          webPageSchema({
            path,
            name: `${name}の記事一覧`,
            description: descriptionFor(name),
            primaryImage: photos.lineup.src,
          })
        )}
      />
    </>
  );
}
