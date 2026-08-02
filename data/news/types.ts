import type { Photo } from '@/lib/images';
import type { FaqItem } from '@/data/faq';

/**
 * 記事本文のブロック。
 * 追加ライブラリを使わずに、意味のある HTML（h2 / h3 / p / ul / figure）を出力する。
 */
export type Block =
  | { type: 'h2'; text: string; /** 目次のアンカー。省略時は自動採番 */ id?: string }
  | { type: 'h3'; text: string }
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] }
  /** 定義リスト。用語解説や条件の列挙に使う */
  | { type: 'dl'; items: { term: string; description: string }[] }
  | { type: 'note'; text: string }
  /** 本文中の写真。キャプションを必ず添える */
  | { type: 'figure'; photo: Photo; caption: string }
  /** 本文中から下層ページへ送る内部リンク（アンカーテキストは具体的に） */
  | { type: 'link'; href: string; label: string; text: string }
  /** TableCheck への予約ボタン */
  | { type: 'cta'; label: string; text: string };

export type Category =
  | 'シュラスコ'
  | '新宿ガイド'
  | 'アクセス'
  | '記念日'
  | '子連れ・家族'
  | '宴会・貸切'
  | 'ドリンク';

export type Article = {
  slug: string;
  title: string;
  /** 一覧・meta description に使う要約（120文字前後） */
  summary: string;
  category: Category;
  /** ISO 8601 (YYYY-MM-DD) */
  publishedAt: string;
  updatedAt?: string;
  /** アイキャッチ（記事ごとに固有のものを設定する） */
  photo: Photo;
  /** アイキャッチのキャプション */
  photoCaption?: string;
  /** 冒頭に置く「この記事の要点」 */
  keyPoints: string[];
  /** 記事固有の FAQ（表示と FAQPage 構造化データが同一データから生成される） */
  faq?: FaqItem[];
  /**
   * 関連記事の選定に使うトピック。
   * 同一カテゴリだけでなく、検索意図の近さで関連記事を選ぶために使う。
   */
  topics: string[];
  /**
   * 下書き。true の間は一覧・sitemap・RSS に出ず、ページも 404 になる。
   * 情報が不足している記事を無理に公開しないための仕組み。
   */
  draft?: boolean;
  blocks: Block[];
};
