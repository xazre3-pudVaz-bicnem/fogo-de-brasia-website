import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond } from 'next/font/google';
import './globals.css';

import { isIndexable, siteUrl } from '@/lib/env';
import { site } from '@/lib/site-config';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileReserveBar } from '@/components/layout/MobileReserveBar';
import { CtaTracker } from '@/components/analytics/CtaTracker';
import { JsonLd } from '@/components/ui/JsonLd';
import {
  graph,
  organizationSchema,
  restaurantSchema,
  websiteSchema,
} from '@/lib/structured-data';

/**
 * 欧文のみ Web フォントを読み込む。
 * 和文は端末の明朝・ゴシックを使い、転送量と LCP への影響を抑える。
 */
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-cormorant',
  // 和文へフォールバックする際のズレを抑える
  adjustFontFallback: true,
});

const defaultTitle = '新宿のシュラスコ食べ放題｜FOGO De BRASIA 新宿【公式】';
const defaultDescription =
  '新宿駅東口から徒歩圏内のシュラスコテーブル FOGO De BRASIA 新宿。約15種類の本格シュラスコと約30種類のサラダバー、飲み放題付きコースをご用意。誕生日、宴会、貸切のご予約はTableCheckから。';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    // 下層ページのタイトルが長くなりすぎないよう、接尾辞は店名のみに留める
    template: `%s｜${site.shortName}`,
  },
  description: defaultDescription,
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: site.name,
    locale: site.locale,
    url: '/',
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'FOGO De BRASIA 新宿のシュラスコとブラジル産フルーツドリンク',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description: defaultDescription,
    images: ['/og-image.jpg'],
  },
  /**
   * 本番の独自ドメインでのみ index を許可する。
   * Preview / Branch デプロイと、独自ドメイン未設定の状態では noindex になる
   * （仮ドメインが検索結果に出て、本番と重複するのを防ぐため）。
   */
  robots: isIndexable
    ? {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
      }
    : { index: false, follow: false, nocache: true },
  formatDetection: { telephone: false, address: false, email: false },
  manifest: '/manifest.webmanifest',
  // Search Console の HTML タグ確認。未設定なら出力されない
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  other: {
    'format-detection': 'telephone=no',
  },
};

export const viewport: Viewport = {
  themeColor: '#12100e',
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className={cormorant.variable}>
      <head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${site.shortName} お知らせ・コラム`}
          href="/feed.xml"
        />
      </head>
      <body className="pb-fixed-cta antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-gold focus:px-5 focus:py-3 focus:text-sm focus:text-ink"
        >
          本文へスキップ
        </a>

        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileReserveBar />
        <CtaTracker />

        <JsonLd
          data={graph(organizationSchema(), websiteSchema(), restaurantSchema())}
        />
      </body>
    </html>
  );
}
