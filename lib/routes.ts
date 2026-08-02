/**
 * 公開ページの一覧。
 * sitemap.xml・内部リンク・パンくずの表記ゆれを防ぐため、ここを唯一の出典にする。
 *
 * noindex にしたいページはここへ追加せず、各ページ側で robots を指定すること
 * （sitemap には index 可能なページだけを載せる）。
 */

export type Route = {
  path: string;
  /** パンくず・内部リンクで使う正式名称 */
  name: string;
  /** sitemap の優先度 */
  priority: number;
  changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  /** 画像サイトマップ用の代表画像 */
  image?: string;
};

export const routes: Route[] = [
  {
    path: '/',
    name: 'ホーム',
    priority: 1,
    changeFrequency: 'weekly',
    image: '/images/hero-shinjuku.webp',
  },
  {
    path: '/menu',
    name: 'メニュー・料金',
    priority: 0.9,
    changeFrequency: 'weekly',
    image: '/images/churrasco-lineup.webp',
  },
  {
    path: '/churrasco',
    name: 'シュラスコ',
    priority: 0.9,
    changeFrequency: 'monthly',
    image: '/images/picanha-skewers-top.webp',
  },
  {
    path: '/party',
    name: '宴会・貸切',
    priority: 0.85,
    changeFrequency: 'monthly',
    image: '/images/party-feast.webp',
  },
  {
    path: '/anniversary',
    name: '誕生日・記念日',
    priority: 0.85,
    changeFrequency: 'monthly',
    image: '/images/dessert-fondant.webp',
  },
  {
    path: '/family',
    name: '子連れ・ご家族',
    priority: 0.85,
    changeFrequency: 'monthly',
    image: '/images/seat-large-booth.webp',
  },
  {
    path: '/access',
    name: 'アクセス',
    priority: 0.8,
    changeFrequency: 'monthly',
    image: '/images/view-shinjuku-night.webp',
  },
  {
    path: '/space',
    name: '店内・お席',
    priority: 0.75,
    changeFrequency: 'monthly',
    image: '/images/seat-window-booth.webp',
  },
  {
    path: '/occasions',
    name: '利用シーン',
    priority: 0.7,
    changeFrequency: 'monthly',
    image: '/images/drink-cheers.webp',
  },
  {
    path: '/about',
    name: 'FOGO De BRASIAについて',
    priority: 0.6,
    changeFrequency: 'monthly',
    image: '/images/passador-skewers.webp',
  },
  {
    path: '/news',
    name: 'お知らせ・コラム',
    priority: 0.6,
    changeFrequency: 'weekly',
    image: '/images/skewer-table-setting.webp',
  },
  {
    path: '/blog',
    name: 'ブログ',
    priority: 0.6,
    // 毎日1本追加されるため daily
    changeFrequency: 'daily',
    image: '/images/picanha-roast-beer.webp',
  },
  {
    path: '/privacy',
    name: 'プライバシーポリシー',
    priority: 0.2,
    changeFrequency: 'yearly',
  },
];

export const routeByPath = (path: string) => routes.find((r) => r.path === path);

/** パンくずを組み立てる（表記ゆれ防止） */
export const crumbsFor = (path: string, extra?: { name: string; href: string }[]) => {
  const route = routeByPath(path);
  return [
    { name: 'ホーム', href: '/' },
    ...(route && route.path !== '/'
      ? [{ name: route.name, href: route.path }]
      : []),
    ...(extra ?? []),
  ];
};
