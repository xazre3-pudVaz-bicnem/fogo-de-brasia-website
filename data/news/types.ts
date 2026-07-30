import type { Photo } from '@/lib/images';

/**
 * 記事本文のブロック。
 * 追加ライブラリを使わずに、意味のある HTML（h2 / h3 / p / ul / blockquote）を出力する。
 */
export type Block =
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'note'; text: string }
  /** 本文中から下層ページへ送る内部リンク */
  | { type: 'link'; href: string; label: string; text: string }
  /** TableCheck への予約ボタン */
  | { type: 'cta'; label: string; text: string };

export type Category = 'シュラスコ' | '新宿ガイド' | '記念日' | '宴会・貸切';

export type Article = {
  slug: string;
  title: string;
  /** 一覧・meta description に使う要約（120文字前後） */
  summary: string;
  category: Category;
  /** ISO 8601 (YYYY-MM-DD) */
  publishedAt: string;
  updatedAt?: string;
  /** アイキャッチ */
  photo: Photo;
  blocks: Block[];
};
