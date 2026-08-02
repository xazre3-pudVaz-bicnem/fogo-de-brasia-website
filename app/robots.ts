import type { MetadataRoute } from 'next';
import { absoluteUrl, isIndexable, siteUrl } from '@/lib/env';

/**
 * 本番の独自ドメインでのみクロールを許可する。
 * Preview / Branch デプロイ、独自ドメイン未設定の環境では全面 disallow にして、
 * 仮ドメインが検索結果に出るのを防ぐ。
 */
export default function robots(): MetadataRoute.Robots {
  if (!isIndexable) {
    return { rules: [{ userAgent: '*', disallow: '/' }] };
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // 内部利用のパスはクロール対象から外す
        disallow: ['/api/'],
      },
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
    host: siteUrl,
  };
}
