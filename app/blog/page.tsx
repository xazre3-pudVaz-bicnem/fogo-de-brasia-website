import type { Metadata } from 'next';
import Link from 'next/link';

import { photos } from '@/lib/images';
import { pageMetadata } from '@/lib/seo';
import {
  getAllPosts,
  getUsedCategories,
  formatBlogDate,
  CATEGORY_SLUGS,
} from '@/lib/blog';
import { crumbsFor } from '@/lib/routes';
import { PageHero } from '@/components/ui/PageHero';
import { ReservationCTA } from '@/components/sections/ReservationCTA';
import { JsonLd } from '@/components/ui/JsonLd';
import {
  breadcrumbWithId,
  graph,
  webPageSchema,
} from '@/lib/structured-data';

const PATH = '/blog';

const title = 'ブログ｜新宿のシュラスコの楽しみ方';
const description =
  'シュラスコの楽しみ方、ブラジル料理の背景、新宿で肉料理のお店を選ぶときの視点まで。FOGO De BRASIA 新宿がお届けするブログです。';

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: PATH,
});

const crumbs = crumbsFor(PATH);

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const categories = getUsedCategories();
  const [lead, ...rest] = posts;

  return (
    <>
      <PageHero
        photo={photos.picanhaRoastBeer}
        latin="BLOG"
        title="新宿のシュラスコと、肉料理の話"
        lead="シュラスコの楽しみ方から、新宿でお店を選ぶときの視点まで。読んでから来ると、その日の食事が少し変わります。"
        crumbs={crumbs}
        objectPosition="center 45%"
      />

      <section className="bg-char py-20 md:py-28">
        <div className="mx-auto max-w-[86rem] px-5 md:px-9">
          {posts.length === 0 ? (
            <p className="text-[0.92rem] leading-[2.1] text-ivory-dim">
              記事は準備中です。まもなく公開いたします。
            </p>
          ) : (
            <>
              {/* カテゴリ */}
              {categories.length > 0 && (
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-ivory/12 pb-6">
                  <p className="latin text-[0.72rem] text-gold">CATEGORY</p>
                  <ul className="flex flex-wrap gap-x-5 gap-y-2">
                    {categories.map((c) => (
                      <li key={c}>
                        <Link
                          href={`/blog/category/${CATEGORY_SLUGS[c]}`}
                          className="text-[0.8rem] tracking-[0.06em] text-ivory-dim transition-colors hover:text-gold"
                        >
                          {c}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <p className="latin ml-auto text-[0.72rem] text-ivory-dim tabular-nums">
                    {posts.length} ARTICLES
                  </p>
                </div>
              )}

              {/* 最新記事を大きく */}
              <article className="reveal mt-14 group">
                <Link href={`/blog/${lead.slug}`} className="block">
                  <p className="flex flex-wrap items-center gap-4 text-[0.75rem] text-ivory-dim">
                    <time dateTime={lead.date} className="tabular-nums">
                      {formatBlogDate(lead.date)}
                    </time>
                    <span className="border border-gold/40 px-2.5 py-0.5 text-[0.7rem] tracking-[0.1em] text-gold">
                      {lead.category}
                    </span>
                  </p>
                  <h2 className="mt-5 max-w-3xl text-[1.4rem] leading-[1.6] text-balance-ja text-ivory transition-colors group-hover:text-gold md:text-[1.9rem]">
                    {lead.title}
                  </h2>
                  <p className="mt-5 max-w-3xl text-[0.88rem] leading-[2] text-ivory-dim">
                    {lead.description}
                  </p>
                  <span className="latin mt-8 inline-flex items-center gap-3 text-[0.72rem] text-gold">
                    READ MORE
                    <span
                      aria-hidden="true"
                      className="h-px w-10 bg-gold/60 transition-all duration-500 group-hover:w-16"
                    />
                  </span>
                </Link>
              </article>

              {/* 以降を一覧で */}
              {rest.length > 0 && (
                <ul className="mt-16 border-t border-ivory/12">
                  {rest.map((p) => (
                    <li key={p.slug} className="border-b border-ivory/12">
                      <Link
                        href={`/blog/${p.slug}`}
                        className="group grid items-baseline gap-3 py-7 md:grid-cols-[8rem_minmax(0,1fr)] md:gap-8"
                      >
                        <p className="flex items-center gap-3 text-[0.74rem] text-ivory-dim md:flex-col md:items-start md:gap-1.5">
                          <time dateTime={p.date} className="tabular-nums">
                            {formatBlogDate(p.date)}
                          </time>
                          <span className="text-gold">{p.category}</span>
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
              )}
            </>
          )}

          <div className="mt-16 border-t border-ivory/12 pt-10">
            <p className="latin text-[0.72rem] text-gold">RELATED</p>
            <ul className="mt-6 flex flex-wrap gap-x-10 gap-y-3">
              {[
                { href: '/news', label: 'お知らせ・コラムを見る' },
                { href: '/menu', label: 'メニュー・料金を見る' },
                { href: '/churrasco', label: 'シュラスコについて知る' },
                { href: '/access', label: '新宿駅東口からのアクセス' },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[0.86rem] text-ivory-2 link-underline"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <ReservationCTA
        location="blog"
        photo={photos.skewerTable}
        objectPosition="center 60%"
        label="空席を確認する"
      />

      <JsonLd
        data={graph(
          breadcrumbWithId(crumbs, PATH),
          webPageSchema({
            path: PATH,
            name: title,
            description,
            primaryImage: photos.picanhaRoastBeer.src,
          })
        )}
      />
    </>
  );
}
