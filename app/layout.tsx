import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond } from 'next/font/google';
import './globals.css';

import { site } from '@/lib/site-config';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileReserveBar } from '@/components/layout/MobileReserveBar';
import { JsonLd } from '@/components/ui/JsonLd';
import { graph, restaurantSchema, websiteSchema } from '@/lib/structured-data';

/**
 * 欧文のみ Web フォントを読み込む。
 * 和文は端末の明朝・ゴシックを使い、転送量と LCP への影響を抑える。
 */
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-cormorant',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: '新宿のシュラスコ食べ放題｜FOGO De BRASIA 新宿【公式】',
    // 下層ページのタイトルが長くなりすぎないよう、接尾辞は店名のみに留める
    template: `%s｜${site.shortName}`,
  },
  description:
    '新宿駅徒歩約3分のシュラスコ専門店。焼きたての本格シュラスコを目の前で切り分けてご提供します。約30種のサラダバー、飲み放題付きコース、個室風のソファー席、誕生日・記念日、宴会・貸切にも対応。ご予約はTableCheckから。',
  keywords: [
    '新宿 シュラスコ',
    '新宿 シュラスコ 食べ放題',
    '新宿 シュラスコ 個室',
    '歌舞伎町 シュラスコ',
    '新宿 肉料理',
    '新宿 ブラジル料理',
    '新宿 誕生日 ディナー',
    '新宿 貸切 レストラン',
  ],
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: site.name,
    locale: site.locale,
    url: site.url,
    title: '新宿のシュラスコ食べ放題｜FOGO De BRASIA 新宿【公式】',
    description:
      '新宿駅徒歩約3分。焼きたての本格シュラスコを目の前で切り分けてご提供します。サラダバー・飲み放題付きコース、誕生日・記念日、宴会・貸切にも対応。',
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
    title: '新宿のシュラスコ食べ放題｜FOGO De BRASIA 新宿【公式】',
    description:
      '新宿駅徒歩約3分。焼きたての本格シュラスコを目の前で切り分けてご提供します。サラダバー・飲み放題付きコース、宴会・貸切にも対応。',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  formatDetection: { telephone: false, address: false, email: false },
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

        <JsonLd data={graph(restaurantSchema(), websiteSchema())} />
      </body>
    </html>
  );
}
