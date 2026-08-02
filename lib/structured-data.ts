/**
 * schema.org 構造化データの組み立て。
 *
 * 方針
 * ・確認できた事実のみを出力する。未確認の値（座標・Googleビジネスプロフィール）は出さない。
 * ・自社の口コミによる AggregateRating / Review は出力しない。
 * ・@id で実体を一意にし、ページ間で重複や矛盾が生じないようにする。
 * ・画面に表示している内容と完全に一致させる（特に FAQ）。
 */
import { absoluteUrl } from './env';
import { site, verifiedSameAs } from './site-config';
import { meats } from '@/data/menu';
import { courses, formatYen } from '@/data/courses';
import type { FaqItem } from '@/data/faq';

export const RESTAURANT_ID = absoluteUrl('/#restaurant');
export const WEBSITE_ID = absoluteUrl('/#website');
export const ORGANIZATION_ID = absoluteUrl('/#organization');

const postalAddress = {
  '@type': 'PostalAddress',
  postalCode: site.address.postalCode,
  addressRegion: site.address.region,
  addressLocality: site.address.city,
  streetAddress: site.address.streetAddress,
  addressCountry: 'JP',
};

const openingHoursSpecification = site.openingHours.verified
  ? site.openingHours.spec.map((s) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: s.days,
      opens: s.opens,
      closes: s.closes,
    }))
  : undefined;

const telephone =
  site.phone.verified && site.phone.value ? site.phone.value : undefined;

const geo =
  site.geo.verified && site.geo.latitude !== null && site.geo.longitude !== null
    ? {
        '@type': 'GeoCoordinates',
        latitude: site.geo.latitude,
        longitude: site.geo.longitude,
      }
    : undefined;

/** TableCheck での予約を明示する */
const reserveAction = {
  '@type': 'ReserveAction',
  target: {
    '@type': 'EntryPoint',
    urlTemplate: site.tableCheckUrl,
    inLanguage: 'ja',
    actionPlatform: [
      'http://schema.org/DesktopWebPlatform',
      'http://schema.org/MobileWebPlatform',
    ],
  },
  result: {
    '@type': 'Reservation',
    name: `${site.name} のご予約`,
  },
};

/** Organization（運営者） */
export function organizationSchema() {
  return {
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: site.name,
    alternateName: [...site.alternateName],
    url: absoluteUrl('/'),
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl('/images/logo-full.webp'),
      width: 384,
      height: 327,
    },
    address: postalAddress,
    ...(telephone ? { telephone } : {}),
    ...(verifiedSameAs.length ? { sameAs: verifiedSameAs } : {}),
  };
}

/** Restaurant（LocalBusiness のサブタイプ）— トップページで出力し、他ページからは @id で参照 */
export function restaurantSchema() {
  return {
    '@type': 'Restaurant',
    '@id': RESTAURANT_ID,
    name: site.name,
    alternateName: [...site.alternateName],
    description:
      '新宿・歌舞伎町にある本格ブラジリアンシュラスコの専門店。専用ロースターで焼き上げた肉を、スタッフがお客様の目の前で切り分けてご提供します。約15種類のシュラスコと約30種類のサラダバービュッフェを、飲み放題付きのコースでお楽しみいただけます。',
    url: absoluteUrl('/'),
    logo: absoluteUrl('/images/logo-full.webp'),
    image: [
      absoluteUrl('/og-image.jpg'),
      absoluteUrl('/images/hero-shinjuku.webp'),
      absoluteUrl('/images/salad-bar.webp'),
      absoluteUrl('/images/seat-window-booth.webp'),
    ],
    address: postalAddress,
    servesCuisine: [...site.servesCuisine],
    priceRange: site.priceRange,
    currenciesAccepted: 'JPY',
    acceptsReservations: site.tableCheckUrl,
    menu: absoluteUrl('/menu'),
    hasMenu: {
      '@type': 'Menu',
      name: 'シュラスコ・コースメニュー',
      url: absoluteUrl('/menu'),
      inLanguage: 'ja',
      hasMenuSection: [
        {
          '@type': 'MenuSection',
          name: `シュラスコ 約${site.counts.churrasco}種`,
          description:
            '専用ロースターで焼き上げ、お客様の目の前で切り分けてご提供します。',
          hasMenuItem: meats.map((m) => ({
            '@type': 'MenuItem',
            name: m.name,
            alternateName: m.latin,
            description: m.description,
          })),
        },
        {
          '@type': 'MenuSection',
          name: 'コース',
          description:
            'シュラスコ食べ放題、サラダバービュッフェ、飲み放題をセットにしたコースです。',
          hasMenuItem: courses.map((c) => ({
            '@type': 'MenuItem',
            name: c.name,
            description: c.features.join('、'),
            offers: {
              '@type': 'Offer',
              price: String(c.salePrice),
              priceCurrency: 'JPY',
              availability: 'https://schema.org/InStock',
              url: c.tableCheckUrl,
            },
          })),
        },
      ],
    },
    areaServed: site.areaServed.map((a) => ({ '@type': 'Place', name: a })),
    potentialAction: reserveAction,
    parentOrganization: { '@id': ORGANIZATION_ID },
    ...(openingHoursSpecification ? { openingHoursSpecification } : {}),
    ...(telephone ? { telephone } : {}),
    ...(geo ? { geo } : {}),
    ...(verifiedSameAs.length ? { sameAs: verifiedSameAs } : {}),
    // 自社の口コミによる aggregateRating / review は出力しない
  };
}

/** WebSite */
export function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: absoluteUrl('/'),
    name: site.name,
    alternateName: site.shortName,
    inLanguage: 'ja',
    publisher: { '@id': ORGANIZATION_ID },
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
      item: absoluteUrl(c.href),
    })),
  };
}

/** 下層ページ共通の WebPage */
export function webPageSchema({
  path,
  name,
  description,
  primaryImage,
}: {
  path: string;
  name: string;
  description: string;
  primaryImage?: string;
}) {
  return {
    '@type': 'WebPage',
    '@id': absoluteUrl(`${path}#webpage`),
    url: absoluteUrl(path),
    name,
    description,
    inLanguage: 'ja',
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': RESTAURANT_ID },
    breadcrumb: { '@id': absoluteUrl(`${path}#breadcrumb`) },
    ...(primaryImage
      ? {
          primaryImageOfPage: {
            '@type': 'ImageObject',
            url: absoluteUrl(primaryImage),
          },
        }
      : {}),
  };
}

/** 画面に表示している FAQ と完全に同じ内容から生成する */
export function faqSchema(items: FaqItem[], path?: string) {
  return {
    '@type': 'FAQPage',
    ...(path ? { '@id': absoluteUrl(`${path}#faq`) } : {}),
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
  const url = absoluteUrl(`/news/${a.slug}`);
  return {
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: a.title,
    description: a.summary,
    inLanguage: 'ja',
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
    image: [absoluteUrl(a.image)],
    datePublished: a.publishedAt,
    dateModified: a.updatedAt ?? a.publishedAt,
    author: {
      '@type': 'Organization',
      '@id': ORGANIZATION_ID,
      name: site.editorialName,
    },
    publisher: { '@id': ORGANIZATION_ID },
    isPartOf: { '@id': WEBSITE_ID },
  };
}

/** パンくずに @id を持たせて WebPage から参照できるようにする */
export function breadcrumbWithId(crumbs: Crumb[], path: string) {
  return { ...breadcrumbSchema(crumbs), '@id': absoluteUrl(`${path}#breadcrumb`) };
}

/** 複数のスキーマを 1 つの @graph にまとめる */
export function graph(...nodes: Record<string, unknown>[]) {
  return { '@context': 'https://schema.org', '@graph': nodes };
}

export { formatYen };
