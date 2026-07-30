/**
 * コース情報の一元管理。
 * 出典: TableCheck 予約ページ掲載の現行プラン（2026年7月時点）
 * 料金・内容はコンポーネントへ直接書かず、必ずこのファイルから参照する。
 */

export type Course = {
  id: string;
  /** 一覧・見出しに使う簡潔な名称 */
  name: string;
  /** TableCheck 上での位置づけを補足する一文 */
  tagline: string;
  /** 税込価格 */
  price: number;
  /** 割引前価格（TableCheck に併記があるプランのみ。根拠のないものは設定しない） */
  priceBefore?: number;
  /** 「40名様〜」などの人数条件、価格が起点であることを示す注記 */
  priceNote?: string;
  minutes: number;
  /** 大きく見せる代表コース */
  featured?: boolean;
  includes: string[];
  /** 入店時間などの条件 */
  condition?: string;
};

export const courses: Course[] = [
  {
    id: 'open-anniversary',
    name: 'OPEN記念コース',
    tagline: '厳選イチボのシュラスコで、まず一度。ご予約限定の記念プラン。',
    price: 5980,
    priceBefore: 7700,
    minutes: 120,
    featured: true,
    includes: [
      '厳選イチボの本格シュラスコ食べ放題',
      '約30種のサラダバービュッフェ',
      '120分飲み放題',
    ],
    condition: 'ご予約限定',
  },
  {
    id: 'regular-dinner',
    name: 'レギュラーディナーコース',
    tagline: 'シュラスコ15種を心ゆくまで。いちばん選ばれている定番。',
    price: 7700,
    priceBefore: 8800,
    minutes: 120,
    featured: true,
    includes: [
      '本格シュラスコ15種食べ放題',
      '約30種のサラダバービュッフェ',
      'デザートビュッフェ',
      '120分飲み放題',
    ],
  },
  {
    id: 'premium-dinner',
    name: 'プレミアムディナーコース',
    tagline: 'ピッカーニャ、ランプ、ハラミ。150分をゆっくりと。',
    price: 8800,
    minutes: 150,
    featured: true,
    includes: [
      'ピッカーニャ・ランプ・ハラミを含むシュラスコ15種',
      '約30種のサラダバービュッフェ',
      'TOKYO CRAFT を含むビール',
      '30種以上の150分飲み放題',
    ],
  },
  {
    id: 'anniversary',
    name: '誕生日・記念日コース',
    tagline: 'メッセージ入りデザートプレートと、乾杯のスパークリング。',
    price: 8000,
    minutes: 120,
    includes: [
      '旬のフルーツスパークリングの乾杯ドリンク',
      'メッセージ入りデザートプレート',
      'シュラスコ120分食べ放題',
    ],
  },
  {
    id: 'early-dinner',
    name: '早割ディナーコース',
    tagline: '16時から17時のご入店で、いつもよりお得に。',
    price: 5500,
    priceBefore: 6500,
    minutes: 120,
    includes: [
      '本格シュラスコ食べ放題',
      'サラダバー',
      '120分飲み放題',
    ],
    condition: '16:00〜17:00 のご入店限定',
  },
  {
    id: 'private-party',
    name: '貸切相談プラン',
    tagline: '40名様から。料理も時間も、ご相談のうえで組み立てます。',
    price: 7700,
    priceNote: '〜（内容によりご相談）',
    minutes: 120,
    includes: [
      'コース内容・料理・飲み物・時間をご相談のうえ決定',
      '40名様からの貸切に対応',
      '開催時間もあわせてご相談ください',
    ],
    condition: '40名様〜',
  },
];

export const featuredCourses = courses.filter((c) => c.featured);
export const otherCourses = courses.filter((c) => !c.featured);

/** 価格・内容の変更可能性に関する共通注記 */
export const priceNotice = [
  '表示価格はすべて税込です。内容・価格は変更になる場合があります。',
  '最新のプラン内容・空席状況は TableCheck の予約ページをご確認ください。',
];
