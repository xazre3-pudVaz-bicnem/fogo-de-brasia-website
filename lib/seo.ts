import type { Metadata } from 'next';
import { isIndexable } from './env';
import { site } from './site-config';

/**
 * ページ共通のメタデータ組み立て。
 *
 * Next.js の openGraph は親子でマージされないため、下層ページで openGraph を
 * 定義すると layout.tsx の og:image が失われる。ここを通すことで、
 * すべてのページで OG 画像・locale・siteName・canonical が確実に出力される。
 *
 * URL はすべて metadataBase（NEXT_PUBLIC_SITE_URL）からの相対で指定し、
 * ドメインをコードへ直接書かない。
 *
 * タイトルは layout.tsx の template（%s｜FOGO De BRASIA 新宿）が付くため、
 * title には 24文字程度までの簡潔な文言を渡す。
 */
export function pageMetadata({
  title,
  description,
  path,
  ogTitle,
  ogDescription,
  image,
  type = 'website',
  publishedTime,
  modifiedTime,
  noindex = false,
}: {
  title: string;
  description: string;
  path: string;
  ogTitle?: string;
  ogDescription?: string;
  image?: { url: string; width: number; height: number; alt: string };
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  /** 意図的に検索結果へ出さないページ */
  noindex?: boolean;
}): Metadata {
  const img = image ?? {
    url: '/og-image.jpg',
    width: 1200,
    height: 630,
    alt: 'FOGO De BRASIA 新宿のシュラスコとブラジル産フルーツドリンク',
  };
  const t = ogTitle ?? `${title}｜${site.shortName}`;
  const d = ogDescription ?? description;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      siteName: site.name,
      locale: site.locale,
      url: path,
      title: t,
      description: d,
      images: [img],
      ...(type === 'article'
        ? { publishedTime, modifiedTime, authors: [site.editorialName] }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: t,
      description: d,
      images: [img.url],
    },
    ...(noindex || !isIndexable
      ? { robots: { index: false, follow: !noindex } }
      : {}),
  };
}
