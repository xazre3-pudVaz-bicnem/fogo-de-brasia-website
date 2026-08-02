/**
 * 公開URLと index 可否の判定。
 *
 * URL はコードへ直接書かず、環境変数から取得する。
 *
 * ── Vercel での設定 ──────────────────────────────
 * 本番（Production）に、独自ドメインを設定する。
 *   NEXT_PUBLIC_SITE_URL = https://www.example.jp
 * Preview / Development には設定しない（Preview は自動で noindex になる）。
 *
 * ※ NEXT_PUBLIC_* はビルド時にコードへ埋め込まれる。
 *   管理画面で値を変えたら、必ず再デプロイすること。
 *
 * ※ NEXT_PUBLIC_SITE_URL を設定し忘れても、本番環境であれば Vercel が自動で入れる
 *   VERCEL_PROJECT_PRODUCTION_URL（本番ドメイン）へフォールバックする。
 *   VERCEL_URL はデプロイ固有のURLで独自ドメインにならないため、本番では使わない。
 * ────────────────────────────────────────────
 */

/** Vercel が注入する環境種別。'production' | 'preview' | 'development' */
const vercelEnv = process.env.NEXT_PUBLIC_VERCEL_ENV ?? process.env.VERCEL_ENV;

/** 本番ドメイン（プロトコルなし）。Vercel が本番・Preview 双方で注入する */
const vercelProductionUrl =
  process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL ??
  process.env.VERCEL_PROJECT_PRODUCTION_URL;

/** デプロイ固有のURL。独自ドメインにはならないため Preview でのみ使う */
const vercelDeploymentUrl =
  process.env.NEXT_PUBLIC_VERCEL_URL ?? process.env.VERCEL_URL;

const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();

const normalize = (value: string) => {
  const withProtocol = /^https?:\/\//.test(value) ? value : `https://${value}`;
  // 末尾スラッシュは付けない（canonical の表記ゆれを防ぐ）
  return withProtocol.replace(/\/+$/, '');
};

/** Vercel 上で、本番以外（Preview / Branch デプロイ）かどうか */
const isNonProductionDeploy =
  vercelEnv !== undefined && vercelEnv !== 'production';

/** 本番として使うべきURL（未解決なら null） */
const productionUrl = configured ?? vercelProductionUrl ?? null;

/**
 * サイトの基準URL。
 * 1. 本番: NEXT_PUBLIC_SITE_URL → VERCEL_PROJECT_PRODUCTION_URL
 * 2. Preview / Branch: デプロイ固有URL（noindex になる）
 * 3. ローカル: localhost
 */
export const siteUrl = isNonProductionDeploy
  ? vercelDeploymentUrl
    ? normalize(vercelDeploymentUrl)
    : 'http://localhost:3000'
  : productionUrl
    ? normalize(productionUrl)
    : 'http://localhost:3000';

/**
 * 検索エンジンにインデックスさせてよい環境か。
 *
 * 本番ドメインが解決でき、かつ Preview / Branch デプロイでない場合のみ true。
 * ドメインが解決できない状態（ローカル等）でも noindex になる。
 */
export const isIndexable = !isNonProductionDeploy && productionUrl !== null;

/**
 * 絶対URLを組み立てる（canonical・OG・構造化データ・sitemap で共通利用）。
 * トップは末尾スラッシュあり、下層は末尾スラッシュなしに統一される。
 */
export const absoluteUrl = (path = '/') => new URL(path, `${siteUrl}/`).toString();
