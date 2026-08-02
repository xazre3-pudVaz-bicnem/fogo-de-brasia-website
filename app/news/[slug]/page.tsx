import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import {
  articleBySlug,
  publishedArticles,
  relatedArticles,
  formatDate,
  tableOfContents,
} from '@/data/news';
import { site } from '@/lib/site-config';
import { pageMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ArticleBody } from '@/components/sections/ArticleBody';
import { Faq } from '@/components/ui/Faq';
import { ReservationCTA } from '@/components/sections/ReservationCTA';
import { JsonLd } from '@/components/ui/JsonLd';
import {
  articleSchema,
  breadcrumbWithId,
  faqSchema,
  graph,
} from '@/lib/structured-data';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return publishedArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const article = articleBySlug(slug);
  if (!article) return {};

  return pageMetadata({
    title: article.title,
    description: article.summary,
    path: `/news/${article.slug}`,
    type: 'article',
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt ?? article.publishedAt,
    image: {
      url: article.photo.src,
      width: article.photo.width,
      height: article.photo.height,
      alt: article.photo.alt,
    },
  });
}

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const article = articleBySlug(slug);
  if (!article) notFound();

  const related = relatedArticles(article, 3);
  const toc = tableOfContents(article);
  const path = `/news/${article.slug}`;

  const crumbs = [
    { name: 'ホーム', href: '/' },
    { name: 'お知らせ・コラム', href: '/news' },
    { name: article.title, href: path },
  ];

  return (
    <>
      {/* 記事ヘッダー */}
      <header className="relative isolate flex min-h-[54svh] flex-col justify-end overflow-hidden pt-28">
        <Image
          src={article.photo.src}
          alt={article.photo.alt}
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
            <span className="border border-gold/40 px-2.5 py-0.5 text-[0.7rem] tracking-[0.1em] text-gold">
              {article.category}
            </span>
            <span>
              公開{' '}
              <time dateTime={article.publishedAt} className="tabular-nums">
                {formatDate(article.publishedAt)}
              </time>
            </span>
            {article.updatedAt && article.updatedAt !== article.publishedAt && (
              <span>
                更新{' '}
                <time dateTime={article.updatedAt} className="tabular-nums">
                  {formatDate(article.updatedAt)}
                </time>
              </span>
            )}
          </p>

          <h1 className="mt-5 text-[1.6rem] leading-[1.6] text-balance-ja text-ivory md:text-[2.2rem]">
            {article.title}
          </h1>
        </div>
      </header>

      <article className="bg-char pb-24 pt-12 md:pb-32 md:pt-16">
        <div className="mx-auto max-w-[52rem] px-5 md:px-9">
          {article.photoCaption && (
            <p className="text-[0.78rem] leading-relaxed text-ivory-dim">
              {article.photoCaption}
            </p>
          )}

          {/* 著者・出典 */}
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-ivory/12 py-4 text-[0.78rem] text-ivory-dim">
            <span>
              執筆・監修{' '}
              <span className="text-ivory-2">{site.editorialName}</span>
            </span>
            <span>{site.name}の店舗情報にもとづいて作成しています</span>
          </div>

          {/* 要点 */}
          <section
            aria-label="この記事の要点"
            className="mt-10 border-l-2 border-gold bg-char-2/60 px-6 py-7 md:px-8"
          >
            <h2 className="latin text-[0.72rem] text-gold">KEY POINTS</h2>
            <p className="mt-1 text-[0.85rem] text-ivory-dim">この記事の要点</p>
            <ul className="mt-5 space-y-3">
              {article.keyPoints.map((k) => (
                <li
                  key={k}
                  className="flex gap-4 text-[0.88rem] leading-[1.9] text-ivory-2"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[0.7em] h-px w-3.5 shrink-0 bg-gold/70"
                  />
                  <span>{k}</span>
                </li>
              ))}
            </ul>
          </section>

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

          {/* 要約 */}
          <p className="mt-10 text-[0.9rem] leading-[2.1] text-ivory-dim">
            {article.summary}
          </p>

          <div className="mt-12">
            <ArticleBody blocks={article.blocks} ctaLocation="article" />
          </div>

          {/* 記事固有の FAQ */}
          {article.faq && article.faq.length > 0 && (
            <section className="mt-20">
              <h2 className="text-[1.15rem] leading-[1.7] text-ivory md:text-[1.35rem]">
                この記事に関するよくあるご質問
              </h2>
              <div className="mt-7">
                <Faq items={article.faq} />
              </div>
            </section>
          )}

          {/* 出典・注意書き */}
          <aside className="mt-16 border border-ivory/12 bg-char-2/40 p-6 text-[0.78rem] leading-[1.9] text-ivory-dim md:p-7">
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
                仕入れの状況により、当日ご提供する部位やサラダバーの内容が変わる場合があります。
              </li>
            </ul>
          </aside>
        </div>
      </article>

      {/* 関連記事 */}
      {related.length > 0 && (
        <section className="bg-ink py-20 md:py-24">
          <div className="mx-auto max-w-[86rem] px-5 md:px-9">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h2 className="latin text-[0.72rem] text-gold">
                RELATED ARTICLES
              </h2>
              <Link
                href="/news"
                className="group inline-flex items-center gap-3 text-[0.82rem] text-gold"
              >
                お知らせ・コラムの一覧を見る
                <span
                  aria-hidden="true"
                  className="h-px w-8 bg-gold/60 transition-all duration-500 group-hover:w-12"
                />
              </Link>
            </div>

            <ul className="mt-10 grid gap-x-10 gap-y-12 md:grid-cols-3">
              {related.map((a) => (
                <li key={a.slug}>
                  <Link href={`/news/${a.slug}`} className="group block">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={a.photo.src}
                        alt={a.photo.alt}
                        fill
                        sizes="(min-width: 768px) 30vw, 92vw"
                        className="object-cover transition-transform duration-[900ms] group-hover:scale-[1.04]"
                      />
                    </div>
                    <p className="mt-4 flex items-center gap-4 text-[0.74rem] text-ivory-dim">
                      <time dateTime={a.publishedAt} className="tabular-nums">
                        {formatDate(a.publishedAt)}
                      </time>
                      <span className="text-gold">{a.category}</span>
                    </p>
                    <h3 className="mt-2.5 text-[0.98rem] leading-[1.7] text-balance-ja text-ivory transition-colors group-hover:text-gold">
                      {a.title}
                    </h3>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <ReservationCTA location="article" label="空席を確認する" />

      <JsonLd
        data={graph(
          breadcrumbWithId(crumbs, path),
          articleSchema({
            title: article.title,
            summary: article.summary,
            slug: article.slug,
            publishedAt: article.publishedAt,
            updatedAt: article.updatedAt,
            image: article.photo.src,
          }),
          ...(article.faq?.length ? [faqSchema(article.faq, path)] : [])
        )}
      />
    </>
  );
}
