import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import {
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
  getTableOfContents,
  formatBlogDate,
  CATEGORY_SLUGS,
  type BlogCategory,
  type BlogPost,
} from '@/lib/blog';
import { photos, type Photo } from '@/lib/images';
import { site } from '@/lib/site-config';
import { pageMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { BlogBody } from '@/components/sections/BlogBody';
import { ReservationCTA } from '@/components/sections/ReservationCTA';
import { JsonLd } from '@/components/ui/JsonLd';
import {
  articleSchema,
  breadcrumbWithId,
  graph,
} from '@/lib/structured-data';

type Params = { params: Promise<{ slug: string }> };

/**
 * 記事ヘッダーの写真。
 * 記事は自動生成されるため、カテゴリごとに合う写真の候補を持たせ、
 * その中から slug で決定的に選ぶ（同じ記事は常に同じ絵になり、
 * 同じカテゴリでも記事ごとに絵が変わる）。
 */
const CATEGORY_PHOTOS: Record<BlogCategory, readonly Photo[]> = {
  シュラスコ: [photos.picanhaTop, photos.picanhaSide, photos.passador],
  ブラジル料理: [photos.lineup, photos.feijoada, photos.saladBar],
  新宿グルメ: [photos.picanhaRoastBeer, photos.viewNight, photos.skewerTable],
  利用シーン: [photos.skewerTable, photos.seatWindowBooth, photos.cheers],
  '記念日・お祝い': [photos.fondant, photos.cheers, photos.seatMarbleRound],
  '宴会・貸切': [photos.feast, photos.seatLargeBooth, photos.passador],
  ドリンク: [photos.cheers, photos.beerTaps, photos.picanhaRoastBeer],
};

const headerPhotoFor = (post: BlogPost): Photo => {
  const candidates = CATEGORY_PHOTOS[post.category];
  const sum = [...post.slug].reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return candidates[sum % candidates.length];
};

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const photo = headerPhotoFor(post);

  return pageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    type: 'article',
    publishedTime: post.date,
    modifiedTime: post.date,
    image: {
      url: photo.src,
      width: photo.width,
      height: photo.height,
      alt: photo.alt,
    },
  });
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const path = `/blog/${post.slug}`;
  const photo = headerPhotoFor(post);
  const toc = getTableOfContents(post.content);
  const related = getRelatedPosts(post, 3);

  const crumbs = [
    { name: 'ホーム', href: '/' },
    { name: 'ブログ', href: '/blog' },
    { name: post.title, href: path },
  ];

  return (
    <>
      {/* 記事ヘッダー */}
      <header className="relative isolate flex min-h-[54svh] flex-col justify-end overflow-hidden pt-28">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-t from-char via-char/80 to-ink/55"
        />

        <div className="mx-auto w-full max-w-[52rem] px-5 pb-12 md:px-9 md:pb-14">
          <Breadcrumbs crumbs={crumbs} />

          <p className="mt-8 flex flex-wrap items-center gap-4 text-[0.75rem] text-ivory-dim">
            <Link
              href={`/blog/category/${CATEGORY_SLUGS[post.category]}`}
              className="border border-gold/40 px-2.5 py-0.5 text-[0.7rem] tracking-[0.1em] text-gold transition-colors hover:bg-gold hover:text-ink"
            >
              {post.category}
            </Link>
            <span>
              公開{' '}
              <time dateTime={post.date} className="tabular-nums">
                {formatBlogDate(post.date)}
              </time>
            </span>
          </p>

          <h1 className="mt-5 text-[1.6rem] leading-[1.6] text-balance-ja text-ivory md:text-[2.2rem]">
            {post.title}
          </h1>
        </div>
      </header>

      <article className="bg-char pb-24 pt-12 md:pb-32 md:pt-16">
        <div className="mx-auto max-w-[52rem] px-5 md:px-9">
          {/* 著者 */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-ivory/12 py-4 text-[0.78rem] text-ivory-dim">
            <span>
              執筆・監修{' '}
              <span className="text-ivory-2">{site.editorialName}</span>
            </span>
            <span>{site.name}の店舗情報にもとづいて作成しています</span>
          </div>

          {/* 目次 */}
          {toc.length > 2 && (
            <nav
              aria-label="目次"
              className="mt-10 border border-ivory/15 p-6 md:p-7"
            >
              <p className="latin text-[0.72rem] text-gold">CONTENTS</p>
              <ol className="mt-5 space-y-2.5">
                {toc.map((t, i) => (
                  <li key={t.id} className="flex gap-4">
                    <span className="latin shrink-0 text-[0.72rem] text-gold-dim tabular-nums">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <a
                      href={`#${t.id}`}
                      className="text-[0.86rem] leading-[1.8] text-ivory-2 transition-colors hover:text-gold"
                    >
                      {t.text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          {/* 概要 */}
          <p className="mt-10 text-[0.9rem] leading-[2.1] text-ivory-dim">
            {post.description}
          </p>

          <div className="mt-12">
            <BlogBody content={post.content} />
          </div>

          {/* タグ */}
          {post.tags.length > 0 && (
            <ul className="mt-14 flex flex-wrap gap-2.5">
              {post.tags.map((t) => (
                <li
                  key={t}
                  className="border border-ivory/18 px-3 py-1.5 text-[0.75rem] text-ivory-dim"
                >
                  {t}
                </li>
              ))}
            </ul>
          )}

          {/* 注意書き */}
          <aside className="mt-14 border border-ivory/12 bg-char-2/40 p-6 text-[0.78rem] leading-[1.9] text-ivory-dim md:p-7">
            <p className="text-ivory-2">この記事について</p>
            <ul className="mt-3 space-y-1.5">
              <li>
                本記事は{site.name}
                の店舗情報および TableCheck 掲載のプラン内容にもとづいて作成しています。
              </li>
              <li>
                料金・コース内容・営業時間は変更になる場合があります。ご来店前に
                TableCheck の予約ページで最新の情報をご確認ください。
              </li>
              <li>
                仕入れの状況により、当日ご提供する部位やサラダバーの内容が変わる場合があります。食物アレルギーや苦手な食材がある場合は、ご予約時またはご来店時にお知らせください。
              </li>
            </ul>
          </aside>

          <div className="mt-10">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-3 text-[0.85rem] text-gold"
            >
              <span
                aria-hidden="true"
                className="h-px w-8 bg-gold/60 transition-all duration-500 group-hover:w-12"
              />
              ブログ一覧へ戻る
            </Link>
          </div>
        </div>
      </article>

      {/* 関連記事 */}
      {related.length > 0 && (
        <section className="bg-ink py-20 md:py-24">
          <div className="mx-auto max-w-[86rem] px-5 md:px-9">
            <h2 className="latin text-[0.72rem] text-gold">RELATED ARTICLES</h2>

            <ul className="mt-10 grid gap-x-10 gap-y-10 md:grid-cols-3">
              {related.map((p) => (
                <li key={p.slug} className="border-t border-ivory/12 pt-6">
                  <Link href={`/blog/${p.slug}`} className="group block">
                    <p className="flex items-center gap-4 text-[0.74rem] text-ivory-dim">
                      <time dateTime={p.date} className="tabular-nums">
                        {formatBlogDate(p.date)}
                      </time>
                      <span className="text-gold">{p.category}</span>
                    </p>
                    <h3 className="mt-3 text-[0.98rem] leading-[1.7] text-balance-ja text-ivory transition-colors group-hover:text-gold">
                      {p.title}
                    </h3>
                    <p className="mt-2.5 line-clamp-3 text-[0.8rem] leading-[1.9] text-ivory-dim">
                      {p.description}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <ReservationCTA location="blog" label="空席を確認する" />

      <JsonLd
        data={graph(
          breadcrumbWithId(crumbs, path),
          articleSchema({
            title: post.title,
            summary: post.description,
            slug: post.slug,
            path,
            publishedAt: post.date,
            image: photo.src,
          })
        )}
      />
    </>
  );
}
