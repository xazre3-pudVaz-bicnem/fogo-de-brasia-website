import path from 'node:path';
import type { NextConfig } from 'next';

/**
 * 独自ドメイン移行後、Vercel の仮ドメインへのアクセスを本番ドメインへ 308 で寄せる。
 * NEXT_PUBLIC_SITE_URL と、旧ドメイン（LEGACY_HOST）の両方が設定されているときだけ有効になる。
 *
 * Vercel の環境変数に次を設定してください。
 *   NEXT_PUBLIC_SITE_URL = https://example.jp
 *   LEGACY_HOST          = fogo-de-brasia-website-maj4.vercel.app
 */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, '');
const legacyHost = process.env.LEGACY_HOST;

const nextConfig: NextConfig = {
  // 親ディレクトリにも lockfile があるため、ワークスペースの基点を明示する
  turbopack: { root: path.resolve(import.meta.dirname) },

  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 480, 640, 828, 1080, 1200, 1600, 1920],
    imageSizes: [64, 96, 128, 200, 256, 320, 420],
  },

  poweredByHeader: false,
  // 末尾スラッシュなしに統一する（canonical の表記ゆれを防ぐ）
  trailingSlash: false,

  async redirects() {
    const rules: Awaited<ReturnType<NonNullable<NextConfig['redirects']>>> = [];

    // 旧ドメイン（Vercel 仮ドメイン）→ 独自ドメインへ 308
    if (siteUrl && legacyHost) {
      rules.push({
        source: '/:path*',
        has: [{ type: 'host', value: legacyHost }],
        destination: `${siteUrl}/:path*`,
        permanent: true, // 308
      });
    }

    // 構成変更にともなう旧URL。関連性の高いページへ送る（トップへまとめない）
    rules.push(
      {
        source: '/party/anniversary',
        destination: '/anniversary',
        permanent: true,
      },
      {
        source: '/occasions/birthday',
        destination: '/anniversary',
        permanent: true,
      },
      { source: '/occasions/family', destination: '/family', permanent: true },
      { source: '/occasions/private', destination: '/party', permanent: true },
      { source: '/occasions/company', destination: '/party', permanent: true },
      // 旧「店内・個室」想定URL
      { source: '/private-room', destination: '/space', permanent: true },
      { source: '/rooms', destination: '/space', permanent: true },
      // 一般的な表記ゆれ
      { source: '/menu/course', destination: '/menu', permanent: true },
      { source: '/course', destination: '/menu', permanent: true },
      { source: '/blog', destination: '/news', permanent: true },
      { source: '/blog/:slug', destination: '/news/:slug', permanent: true },
      { source: '/rss', destination: '/feed.xml', permanent: true },
      { source: '/feed', destination: '/feed.xml', permanent: true }
    );

    return rules;
  },
};

export default nextConfig;
