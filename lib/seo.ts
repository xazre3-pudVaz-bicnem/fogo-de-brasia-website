import type { Metadata } from 'next';
import { site } from './site-config';

/**
 * ページ共通のメタデータ組み立て。
 *
 * Next.js の openGraph は親子でマージされないため、下層ページで openGraph を
 * 定義すると layout.tsx の og:image が失われる。ここを通すことで、
 * すべてのページで OG 画像・locale・siteName が確実に出力される。
 *
 * タイトルは layout.tsx の template（%s｜FOGO De BRASIA 新宿）が付くため、
 * title には 22文字程度までの簡潔な文言を渡す。
 */
export function pageMetadata({
  title,
  description,
  path,
  ogTitle,
  ogDescription,
  image,
}: {
  title: string;
  description: string;
  path: string;
  /** OG で別の文言を使いたい場合 */
  ogTitle?: string;
  ogDescription?: string;
  /** 既定は共通の OG 画像 */
  image?: { url: string; width: number; height: number; alt: string };
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
      type: 'website',
      siteName: site.name,
      locale: site.locale,
      url: path,
      title: t,
      description: d,
      images: [img],
    },
    twitter: {
      card: 'summary_large_image',
      title: t,
      description: d,
      images: [img.url],
    },
  };
}
