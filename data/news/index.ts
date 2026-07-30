/**
 * お知らせ・コラムの記事一覧。
 *
 * ── 記事の追加方法 ──────────────────────────────
 * 1. data/news/ に <slug>.ts を作り、Article 型のオブジェクトを default export する
 * 2. 本ファイルで import し、articles 配列へ追加する
 * 3. 公開日の降順で自動的に並び替えられ、一覧・ページネーション・
 *    sitemap.xml・構造化データへ反映される
 * ────────────────────────────────────────────
 */
import type { Article } from './types';

import churrascoBasics from './shinjuku-churrasco-basics';
import picanha from './picanha-guide';
import anniversary from './shinjuku-anniversary-dinner';
import saladBar from './churrasco-salad-bar';
import party from './shinjuku-party-venue';

export const articles: Article[] = [
  churrascoBasics,
  picanha,
  anniversary,
  saladBar,
  party,
].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

export const PER_PAGE = 6;

export const totalPages = Math.max(1, Math.ceil(articles.length / PER_PAGE));

export const articlesForPage = (page: number) =>
  articles.slice((page - 1) * PER_PAGE, page * PER_PAGE);

export const articleBySlug = (slug: string) =>
  articles.find((a) => a.slug === slug);

export const categories = [...new Set(articles.map((a) => a.category))];

export const formatDate = (iso: string) => {
  const [y, m, d] = iso.split('-');
  return `${y}年${Number(m)}月${Number(d)}日`;
};

export type { Article, Block, Category } from './types';
