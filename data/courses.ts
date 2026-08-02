/**
 * コース情報の一元管理。
 * 出典: TableCheck 予約ページ掲載の現行プラン
 * 最終確認日: lastVerifiedAt を参照
 *
 * 料金・内容はコンポーネントへ直接書かず、必ずこのファイルから参照する。
 */
import { LAST_VERIFIED_AT, site } from '@/lib/site-config';

export type Course = {
  id: string;
  /** 一覧・見出しに使う簡潔な名称 */
  name: string;
  /** どういうコースかを一文で */
  description: string;
  /** 割引前価格（TableCheck に併記があるプランのみ。根拠のないものは設定しない） */
  regularPrice?: number;
  /** 実売価格（税込） */
  salePrice: number;
  /** 提供時間（分） */
  duration: number;
  /** 含まれるもの */
  features: string[];
  /** どんな方に向くか（コース選びの指針として表示する） */
  recommendedFor: string[];
  /** 予約先。現状は全プラン共通の予約ページ */
  tableCheckUrl: string;
  /** この内容を最後に確認した日 */
  lastVerifiedAt: string;
  /** 掲載中かどうか。false にすると全ページから自動的に消える */
  isActive: boolean;
  /** 大きく見せる代表コース */
  featured?: boolean;
  /** 入店時間などの条件 */
  condition?: string;
  /** 「7,700円〜」のように、価格が起点であることを示す注記 */
  priceSuffix?: string;
};

const base = {
  tableCheckUrl: site.tableCheckUrl,
  lastVerifiedAt: LAST_VERIFIED_AT,
  isActive: true,
};

const allCourses: Course[] = [
  {
    ...base,
    id: 'open-anniversary',
    name: 'OPEN記念コース',
    description:
      '厳選イチボのシュラスコを、サラダバーと飲み放題つきで。ご予約限定の記念プランです。',
    regularPrice: 7700,
    salePrice: 5980,
    duration: 120,
    featured: true,
    condition: 'ご予約限定',
    features: [
      '厳選イチボの本格シュラスコ食べ放題',
      `約${site.counts.saladBar}種のサラダバービュッフェ`,
      '120分飲み放題',
    ],
    recommendedFor: [
      'シュラスコが初めての方',
      'まず一度、雰囲気を試したい方',
      '費用を抑えたい2〜4名のお食事',
    ],
  },
  {
    ...base,
    id: 'regular-dinner',
    name: 'レギュラーディナーコース',
    description: `シュラスコ${site.counts.churrasco}種を心ゆくまで。いちばん選ばれている定番コースです。`,
    regularPrice: 8800,
    salePrice: 7700,
    duration: 120,
    featured: true,
    features: [
      `本格シュラスコ${site.counts.churrasco}種食べ放題`,
      `約${site.counts.saladBar}種のサラダバービュッフェ`,
      'デザートビュッフェ',
      '120分飲み放題',
    ],
    recommendedFor: [
      '部位の違いを一通り味わいたい方',
      'デートや友人とのディナー',
      '迷ったときの標準の一本',
    ],
  },
  {
    ...base,
    id: 'premium-dinner',
    name: 'プレミアムディナーコース',
    description:
      'ピッカーニャ、ランプ、ハラミを含む15種。150分をゆっくりお使いいただけます。',
    salePrice: 8800,
    duration: 150,
    featured: true,
    features: [
      `ピッカーニャ・ランプ・ハラミを含むシュラスコ${site.counts.churrasco}種`,
      `約${site.counts.saladBar}種のサラダバービュッフェ`,
      'TOKYO CRAFT を含むビール',
      '30種以上の150分飲み放題',
    ],
    recommendedFor: [
      '急がずに一本ずつ味わいたい方',
      '挨拶や余興のある会',
      'お酒をゆっくり楽しみたい方',
    ],
  },
  {
    ...base,
    id: 'anniversary',
    name: '誕生日・記念日コース',
    description:
      '旬のフルーツスパークリングでの乾杯と、メッセージ入りのデザートプレートつき。',
    salePrice: 8000,
    duration: 120,
    features: [
      '旬のフルーツスパークリングの乾杯ドリンク',
      'メッセージ入りデザートプレート',
      'シュラスコ120分食べ放題',
    ],
    recommendedFor: [
      '誕生日・記念日のお祝い',
      'サプライズを考えている方',
      '歓送迎会で主役がいる会',
    ],
  },
  {
    ...base,
    id: 'early-dinner',
    name: '早割ディナーコース',
    description: '16時から17時のご入店で、いつもよりお得にお楽しみいただけます。',
    regularPrice: 6500,
    salePrice: 5500,
    duration: 120,
    condition: '16:00〜17:00 のご入店限定',
    features: ['本格シュラスコ食べ放題', 'サラダバー', '120分飲み放題'],
    recommendedFor: [
      '小さなお子様連れのご家族',
      '早い時間から始めたい会',
      '二次会の前に食事を済ませたい方',
    ],
  },
  {
    ...base,
    id: 'private-party',
    name: '貸切相談プラン',
    description: `${site.privateHire.minGuests}名様から。料理も時間も、ご相談のうえで組み立てます。`,
    salePrice: site.privateHire.fromPrice,
    priceSuffix: '〜',
    duration: 120,
    condition: `${site.privateHire.minGuests}名様〜`,
    features: [
      'コース内容・料理・飲み物・時間をご相談のうえ決定',
      `${site.privateHire.minGuests}名様からの貸切に対応`,
      '開催時間もあわせてご相談ください',
    ],
    recommendedFor: [
      '会社の宴会・歓送迎会',
      '同窓会など大人数の集まり',
      'ご予算から逆算したい幹事の方',
    ],
  },
];

export const courses = allCourses.filter((c) => c.isActive);
export const featuredCourses = courses.filter((c) => c.featured);
export const otherCourses = courses.filter((c) => !c.featured);
export const courseById = (id: string) => courses.find((c) => c.id === id);

/** 料金の表示形式を統一する */
export const formatYen = (n: number) => `¥${n.toLocaleString('ja-JP')}`;

/** コース情報の最終確認日（全コースで共通） */
export const coursesLastVerifiedAt = LAST_VERIFIED_AT;

/** 価格・内容の変更可能性に関する共通注記 */
export const priceNotice = [
  '表示価格はすべて税込です。内容・価格は変更になる場合があります。',
  '仕入れの状況により、当日ご提供する部位が変わる場合があります。',
  '最新のプラン内容・空席状況は TableCheck の予約ページをご確認ください。',
];
