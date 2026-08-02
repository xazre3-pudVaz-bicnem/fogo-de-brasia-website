/**
 * お知らせ・コラムの記事一覧。
 *
 * ── 記事の追加方法 ──────────────────────────────
 * 1. data/news/ に <slug>.ts を作り、Article 型のオブジェクトを default export
 * 2. 本ファイルで import し、allArticles 配列へ追加する
 * 3. 公開日の降順で自動的に並び替えられ、一覧・ページネーション・
 *    sitemap.xml・RSS・構造化データへ反映される
 *
 * 情報が不足している記事は draft: true にしておくと、
 * 一覧・sitemap・RSS に出ず、ページも 404 になる。
 * ────────────────────────────────────────────
 */
import type { Article } from './types';

import churrascoBasics from './shinjuku-churrasco-basics';
import picanha from './picanha-guide';
import anniversary from './shinjuku-anniversary-dinner';
import saladBar from './churrasco-salad-bar';
import party from './shinjuku-party-venue';
import priceGuide from './churrasco-price-time-guide';
import cuts from './churrasco-15-cuts';
import family from './shinjuku-family-churrasco';
import routeEast from './access-shinjuku-east-exit';
import routeSeibu from './access-seibu-shinjuku';
import brazilianDishes from './brazilian-side-dishes';
import drinkPairing from './churrasco-drink-pairing';
import largeParty from './shinjuku-large-party-checklist';

const allArticles: Article[] = [
  churrascoBasics,
  picanha,
  anniversary,
  saladBar,
  party,
  priceGuide,
  cuts,
  family,
  routeEast,
  routeSeibu,
  brazilianDishes,
  drinkPairing,
  largeParty,
];

const byDateDesc = (a: Article, b: Article) =>
  b.publishedAt.localeCompare(a.publishedAt);

/** 下書きを除いた公開記事。一覧・sitemap・RSS はすべてこれを使う */
export const publishedArticles = allArticles
  .filter((a) => !a.draft)
  .sort(byDateDesc);

/** 後方互換のためのエイリアス */
export const articles = publishedArticles;

export const PER_PAGE = 6;

export const totalPages = Math.max(
  1,
  Math.ceil(publishedArticles.length / PER_PAGE)
);

export const articlesForPage = (page: number) =>
  publishedArticles.slice((page - 1) * PER_PAGE, page * PER_PAGE);

/** 下書きは取得できない（記事ページは 404 になる） */
export const articleBySlug = (slug: string) =>
  publishedArticles.find((a) => a.slug === slug);

export const categories = [
  ...new Set(publishedArticles.map((a) => a.category)),
];

/**
 * 関連記事の選定。
 * 同じカテゴリだけを並べると内容が近すぎるため、
 * topics（検索意図のタグ）の重なりを優先し、次にカテゴリ、最後に新しさで選ぶ。
 */
export const relatedArticles = (article: Article, limit = 3) =>
  publishedArticles
    .filter((a) => a.slug !== article.slug)
    .map((a) => {
      const shared = a.topics.filter((t) => article.topics.includes(t)).length;
      const sameCategory = a.category === article.category ? 1 : 0;
      return { article: a, score: shared * 2 + sameCategory };
    })
    .sort(
      (x, y) =>
        y.score - x.score ||
        y.article.publishedAt.localeCompare(x.article.publishedAt)
    )
    .slice(0, limit)
    .map((r) => r.article);

export const formatDate = (iso: string) => {
  const [y, m, d] = iso.split('-');
  return `${y}年${Number(m)}月${Number(d)}日`;
};

/** 見出しから目次を組み立てる（h2 のみ） */
export const tableOfContents = (article: Article) =>
  article.blocks
    .filter((b): b is Extract<Article['blocks'][number], { type: 'h2' }> =>
      b.type === 'h2'
    )
    .map((b, i) => ({ id: b.id ?? `section-${i + 1}`, text: b.text }));

export type { Article, Block, Category } from './types';
