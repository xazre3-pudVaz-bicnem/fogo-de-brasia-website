import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { articleBySlug, articles, formatDate } from '@/data/news';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ArticleBody } from '@/components/sections/ArticleBody';
import { ReservationCTA } from '@/components/sections/ReservationCTA';
import { JsonLd } from '@/components/ui/JsonLd';
import { articleSchema, breadcrumbSchema, graph } from '@/lib/structured-data';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const article = articleBySlug(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.summary,
    alternates: { canonical: `/news/${article.slug}` },
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.summary,
      url: `/news/${article.slug}`,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt ?? article.publishedAt,
      images: [
        {
          url: article.photo.src,
          width: article.photo.width,
          height: article.photo.height,
          alt: article.photo.alt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.summary,
      images: [article.photo.src],
    },
  };
}

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const article = articleBySlug(slug);
  if (!article) notFound();

  const related = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

  const crumbs = [
    { name: 'ホーム', href: '/' },
    { name: 'お知らせ・コラム', href: '/news' },
    { name: article.title, href: `/news/${article.slug}` },
  ];

  return (
    <>
      {/* 記事ヘッダー */}
      <header className="relative isolate flex min-h-[58svh] flex-col justify-end overflow-hidden pt-28">
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

        <div className="mx-auto w-full max-w-[52rem] px-5 pb-14 md:px-9 md:pb-16">
          <Breadcrumbs crumbs={crumbs} />

          <p className="mt-8 flex flex-wrap items-center gap-4 text-[0.7rem] text-ivory-dim">
            <time dateTime={article.publishedAt} className="tabular-nums">
              {formatDate(article.publishedAt)}
            </time>
            <span className="border border-gold/40 px-2.5 py-0.5 text-[0.7rem] tracking-[0.1em] text-gold">
              {article.category}
            </span>
          </p>

          <h1 className="mt-5 text-[1.6rem] leading-[1.6] text-balance-ja text-ivory md:text-[2.2rem]">
            {article.title}
          </h1>
        </div>
      </header>

      {/* 本文 */}
      <article className="bg-char pb-24 pt-16 md:pb-32 md:pt-20">
        <div className="mx-auto max-w-[52rem] px-5 md:px-9">
          <p className="border-l-2 border-gold/50 bg-char-2/50 py-5 pl-6 text-[0.88rem] leading-[2.05] text-ivory-2">
            {article.summary}
          </p>

          <div className="mt-14">
            <ArticleBody
              blocks={article.blocks}
              ctaLocation={`article-${article.slug}`}
            />
          </div>

          {/* 記事下の導線 */}
          <div className="mt-20 border-t border-ivory/12 pt-10">
            <p className="latin text-[0.7rem] text-gold">RELATED PAGES</p>
            <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
              {[
                { href: '/menu', label: 'メニュー・コース' },
                { href: '/churrasco', label: 'シュラスコについて' },
                { href: '/access', label: 'アクセス' },
                { href: '/party', label: '宴会・貸切・記念日' },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[0.82rem] text-ivory-2 link-underline"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </article>

      {/* 関連記事 */}
      {related.length > 0 && (
        <section className="bg-ink py-20 md:py-24">
          <div className="mx-auto max-w-[86rem] px-5 md:px-9">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <p className="latin text-[0.72rem] text-gold">OTHER ARTICLES</p>
              <Link
                href="/news"
                className="latin group inline-flex items-center gap-3 text-[0.72rem] text-gold"
              >
                ALL ARTICLES
                <span className="h-px w-8 bg-gold/60 transition-all duration-500 group-hover:w-12" />
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
                    <h2 className="mt-2.5 text-[0.98rem] leading-[1.7] text-balance-ja text-ivory transition-colors group-hover:text-gold">
                      {a.title}
                    </h2>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <ReservationCTA
        location={`article-${article.slug}-footer`}
        label="空席を確認する"
      />

      <JsonLd
        data={graph(
          breadcrumbSchema(crumbs),
          articleSchema({
            title: article.title,
            summary: article.summary,
            slug: article.slug,
            publishedAt: article.publishedAt,
            updatedAt: article.updatedAt,
            image: article.photo.src,
          })
        )}
      />
    </>
  );
}
