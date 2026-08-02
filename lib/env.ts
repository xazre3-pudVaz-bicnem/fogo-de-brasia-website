/**
 * 公開URLと index 可否の判定。
 *
 * 独自ドメインが未確定のため、URL はコードへ直接書かず環境変数から取得する。
 *
 * ── Vercel での設定 ──────────────────────────────
 * 本番（Production）に限り、環境変数へ独自ドメインを設定する。
 *   NEXT_PUBLIC_SITE_URL = https://example.jp
 * Preview / Development には設定しない。
 *   → Preview は VERCEL_URL を使った一時URLになり、自動で noindex になる。
 * ────────────────────────────────────────────
 */

/** Vercel が注入する環境種別。'production' | 'preview' | 'development' */
const vercelEnv = process.env.NEXT_PUBLIC_VERCEL_ENV ?? process.env.VERCEL_ENV;

/** Vercel が注入するデプロイ固有のホスト名（プロトコルなし） */
const vercelUrl =
  process.env.NEXT_PUBLIC_VERCEL_URL ?? process.env.VERCEL_URL;

const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();

const normalize = (value: string) => {
  const withProtocol = /^https?:\/\//.test(value) ? value : `https://${value}`;
  // 末尾スラッシュは付けない（canonical の表記ゆれを防ぐ）
  return withProtocol.replace(/\/+$/, '');
};

/**
 * サイトの基準URL。
 * 1. NEXT_PUBLIC_SITE_URL（本番の独自ドメイン）
 * 2. Vercel のデプロイURL（Preview 用。noindex になる）
 * 3. localhost（開発用）
 */
export const siteUrl = configured
  ? normalize(configured)
  : vercelUrl
    ? normalize(vercelUrl)
    : 'http://localhost:3000';

/**
 * 検索エンジンにインデックスさせてよい環境か。
 *
 * 本番ドメインが環境変数で明示され、かつ Vercel の本番環境である場合のみ true。
 * Preview / Branch デプロイと、ドメイン未設定の状態では noindex になる。
 */
export const isIndexable =
  Boolean(configured) && (vercelEnv === undefined || vercelEnv === 'production');

/**
 * 絶対URLを組み立てる（canonical・OG・構造化データ・sitemap で共通利用）。
 * トップは末尾スラッシュあり、下層は末尾スラッシュなしに統一される。
 */
export const absoluteUrl = (path = '/') => new URL(path, `${siteUrl}/`).toString();
