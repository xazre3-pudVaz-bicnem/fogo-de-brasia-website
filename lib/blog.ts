import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

/**
 * ブログ記事（content/blog/*.md）の読み込み。
 *
 * ・記事は Markdown + frontmatter で管理し、GitHub Actions が毎日1本追記する
 * ・ビルド時にファイルを読むだけなので、追加のデータベースやCMSは不要
 * ・frontmatter が壊れている記事はビルドを止めず、警告を出して除外する
 *   （自動生成の1本の失敗でサイト全体が落ちないようにするため）
 *
 * 手動で記事を追加する場合も、同じ形式のファイルを置くだけで反映されます。
 */

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

/** 記事カテゴリ。生成スクリプトもこの一覧から選ぶ */
export const BLOG_CATEGORIES = [
  'シュラスコ',
  'ブラジル料理',
  '新宿グルメ',
  '利用シーン',
  '記念日・お祝い',
  '宴会・貸切',
  'ドリンク',
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  /** ISO 8601 (YYYY-MM-DD) */
  date: string;
  category: BlogCategory;
  tags: string[];
  /** 本文（Markdown） */
  content: string;
};

/** カテゴリ名 ⇄ URL スラッグ。日本語をURLに出さないための対応表 */
export const CATEGORY_SLUGS: Record<BlogCategory, string> = {
  シュラスコ: 'churrasco',
  ブラジル料理: 'brazilian',
  新宿グルメ: 'shinjuku',
  利用シーン: 'occasions',
  '記念日・お祝い': 'anniversary',
  '宴会・貸切': 'party',
  ドリンク: 'drink',
};

export const categoryFromSlug = (slug: string): BlogCategory | undefined =>
  (Object.keys(CATEGORY_SLUGS) as BlogCategory[]).find(
    (c) => CATEGORY_SLUGS[c] === slug
  );

const isValidCategory = (v: unknown): v is BlogCategory =>
  typeof v === 'string' && (BLOG_CATEGORIES as readonly string[]).includes(v);

const isValidSlug = (v: unknown): v is string =>
  typeof v === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(v);

const isValidDate = (v: unknown): v is string =>
  typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v);

/** frontmatter を検証し、壊れていれば null を返す */
function parsePost(fileName: string, raw: string): BlogPost | null {
  const { data, content } = matter(raw);
  const slug = data.slug ?? fileName.replace(/\.md$/, '');

  const problems: string[] = [];
  if (!isValidSlug(slug)) problems.push('slug は英数字とハイフンのみ');
  if (typeof data.title !== 'string' || !data.title.trim())
    problems.push('title がありません');
  if (typeof data.description !== 'string' || !data.description.trim())
    problems.push('description がありません');
  if (!isValidDate(data.date)) problems.push('date は YYYY-MM-DD 形式');
  if (!isValidCategory(data.category))
    problems.push(`category が不正（${BLOG_CATEGORIES.join(' / ')} のいずれか）`);
  if (!content.trim()) problems.push('本文が空です');

  if (problems.length) {
    console.warn(
      `[blog] ${fileName} を読み飛ばしました: ${problems.join(' / ')}`
    );
    return null;
  }

  const tags = Array.isArray(data.tags)
    ? data.tags.filter((t): t is string => typeof t === 'string' && !!t.trim())
    : [];

  return {
    slug,
    title: data.title.trim(),
    description: data.description.trim(),
    date: data.date,
    category: data.category as BlogCategory,
    tags,
    content,
  };
}

let cache: BlogPost[] | null = null;

/** 公開日の降順で全記事を返す */
export function getAllPosts(): BlogPost[] {
  if (cache) return cache;

  if (!fs.existsSync(BLOG_DIR)) {
    cache = [];
    return cache;
  }

  const posts = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => parsePost(f, fs.readFileSync(path.join(BLOG_DIR, f), 'utf8')))
    .filter((p): p is BlogPost => p !== null)
    .sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));

  // slug の重複はビルドを壊すため、先勝ちで除外して警告する
  const seen = new Set<string>();
  cache = posts.filter((p) => {
    if (seen.has(p.slug)) {
      console.warn(`[blog] slug が重複しています: ${p.slug}`);
      return false;
    }
    seen.add(p.slug);
    return true;
  });

  return cache;
}

export const getPostBySlug = (slug: string): BlogPost | undefined =>
  getAllPosts().find((p) => p.slug === slug);

export const getPostsByCategory = (category: BlogCategory): BlogPost[] =>
  getAllPosts().filter((p) => p.category === category);

/** 実際に記事が存在するカテゴリのみ返す */
export const getUsedCategories = (): BlogCategory[] => {
  const used = new Set(getAllPosts().map((p) => p.category));
  return BLOG_CATEGORIES.filter((c) => used.has(c));
};

/**
 * 関連記事。同じタグの重なりを優先し、次に同カテゴリ、最後に新しさで選ぶ。
 */
export function getRelatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  return getAllPosts()
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({
      post: p,
      score:
        p.tags.filter((t) => post.tags.includes(t)).length * 2 +
        (p.category === post.category ? 1 : 0),
    }))
    .sort((a, b) => b.score - a.score || b.post.date.localeCompare(a.post.date))
    .slice(0, limit)
    .map((r) => r.post);
}

export const formatBlogDate = (iso: string) => {
  const [y, m, d] = iso.split('-');
  return `${y}年${Number(m)}月${Number(d)}日`;
};

/** 本文の h2 から目次を組み立てる */
export function getTableOfContents(content: string) {
  return [...content.matchAll(/^##\s+(.+)$/gm)].map((m, i) => ({
    id: `section-${i + 1}`,
    text: m[1].trim(),
  }));
}

/** 全角を1文字として数えた本文の文字数（Markdown記法を除く） */
export const countBodyChars = (content: string) =>
  content
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/[*_`>\-|]/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\s/g, '').length;
