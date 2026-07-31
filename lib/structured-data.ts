/**
 * schema.org 構造化データの組み立て。
 * 未確認の値（現時点では座標）は出力しない。架空の値では埋めない。
 */
import { site } from './site-config';
import { meats } from '@/data/menu';
import { courses } from '@/data/courses';
import type { FaqItem } from '@/data/faq';

const abs = (path: string) => new URL(path, site.url).toString();

export const RESTAURANT_ID = `${site.url}/#restaurant`;
const WEBSITE_ID = `${site.url}/#website`;

const postalAddress = {
  '@type': 'PostalAddress',
  postalCode: site.address.postalCode,
  addressRegion: site.address.region,
  addressLocality: site.address.city,
  streetAddress: site.address.streetAddress,
  addressCountry: 'JP',
};

/** Restaurant（LocalBusiness のサブタイプ）— 全ページ共通 */
export function restaurantSchema() {
  const openingHoursSpecification = site.openingHours.verified
    ? site.openingHours.draft.spec.map((s) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: s.days,
        opens: s.opens,
        closes: s.closes,
      }))
    : undefined;

  return {
    '@type': 'Restaurant',
    '@id': RESTAURANT_ID,
    name: site.name,
    alternateName: site.brandLatin,
    description:
      '新宿・歌舞伎町にある本格ブラジリアンシュラスコの専門店。専用ロースターで焼き上げた肉を、スタッフがお客様の目の前で切り分けてご提供します。',
    url: site.url,
    image: [abs('/og-image.jpg'), abs('/images/hero-shinjuku.webp')],
    address: postalAddress,
    servesCuisine: [...site.servesCuisine],
    priceRange: site.priceRange,
    acceptsReservations: 'True',
    menu: abs('/menu'),
    hasMenu: {
      '@type': 'Menu',
      name: 'シュラスコ・コースメニュー',
      url: abs('/menu'),
      hasMenuSection: [
        {
          '@type': 'MenuSection',
          name: `シュラスコ 約${site.counts.churrasco}種`,
          hasMenuItem: meats.map((m) => ({
            '@type': 'MenuItem',
            name: m.name,
            description: m.description,
          })),
        },
        {
          '@type': 'MenuSection',
          name: 'コース',
          hasMenuItem: courses.map((c) => ({
            '@type': 'MenuItem',
            name: c.name,
            description: c.includes.join('、'),
            offers: {
              '@type': 'Offer',
              price: String(c.price),
              priceCurrency: 'JPY',
            },
          })),
        },
      ],
    },
    sameAs: [site.instagramUrl],
    ...(openingHoursSpecification ? { openingHoursSpecification } : {}),
    ...(site.phone.verified && site.phone.value
      ? { telephone: site.phone.value }
      : {}),
    // geo は正確な座標が未確認のため出力しない
  };
}

/** WebSite */
export function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: site.url,
    name: site.name,
    inLanguage: 'ja',
    publisher: { '@id': RESTAURANT_ID },
  };
}

export type Crumb = { name: string; href: string };

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: abs(c.href),
    })),
  };
}

/** 画面に表示している FAQ と完全に同じ内容から生成する */
export function faqSchema(items: FaqItem[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function articleSchema(a: {
  title: string;
  summary: string;
  slug: string;
  publishedAt: string;
  updatedAt?: string;
  image: string;
}) {
  return {
    '@type': 'Article',
    headline: a.title,
    description: a.summary,
    inLanguage: 'ja',
    mainEntityOfPage: abs(`/news/${a.slug}`),
    image: [abs(a.image)],
    datePublished: a.publishedAt,
    dateModified: a.updatedAt ?? a.publishedAt,
    author: { '@id': RESTAURANT_ID },
    publisher: { '@id': RESTAURANT_ID },
  };
}

/** 複数のスキーマを 1 つの @graph にまとめる */
export function graph(...nodes: Record<string, unknown>[]) {
  return { '@context': 'https://schema.org', '@graph': nodes };
}
