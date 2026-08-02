/**
 * 店舗情報の一元管理ファイル。
 * 画面表示・構造化データ・SEO メタデータは、すべてここを参照する。
 * コンポーネントへ店舗情報を直接書かないこと。
 *
 * ─────────────────────────────────────────────
 * 確定済み（店舗様より受領・2026年8月2日時点）
 * ─────────────────────────────────────────────
 * ・営業時間 16:00〜23:00 ／ 定休日なし ／ TEL 03-6233-7165
 * ・住所 〒160-0021 東京都新宿区歌舞伎町1-6-7 7F
 * ・お子様料金 5歳まで無料 / 6〜10歳半額 / 11歳以上通常（TableCheck 記載）
 *
 * ─────────────────────────────────────────────
 * 【要確認】確定できていない項目（画面にも構造化データにも出していない）
 * ─────────────────────────────────────────────
 * 1. 緯度・経度
 *    正確な座標が未確認のため geo は出力せず、地図は住所検索の埋め込みを使用。
 *    確認後 geo.latitude / geo.longitude に入れ、geo.verified を true にすること。
 *
 * 2. 外観・入口・エレベーター周辺の写真
 *    お預かりした写真に含まれていない。撮影後 public/images/ へ追加し、
 *    lib/images.ts へ登録するとアクセスページで使用できる。
 *
 * 3. 店舗責任者・料理責任者の氏名／経歴／顔写真
 *    未確認のため、about ページの担当者紹介は出していない。
 *    実在が確認できない人物を作らないこと。
 *
 * 4. ラストオーダー時刻
 *    未確認のため掲載していない。
 */
import { siteUrl } from './env';

/** 掲載情報の最終確認日（画面の注記と、料金の鮮度表示に使う） */
export const LAST_VERIFIED_AT = '2026-08-02';

export const site = {
  name: 'シュラスコテーブル FOGO De BRASIA 新宿',
  shortName: 'FOGO De BRASIA 新宿',
  alternateName: ['FOGO De BRASIA 新宿', 'フォゴ デ ブラジア 新宿'],
  brandLatin: 'FOGO DE BRASIA',
  brandSub: 'CHURRASCARIA',
  /** 環境変数 NEXT_PUBLIC_SITE_URL から取得（lib/env.ts 参照） */
  url: siteUrl,
  locale: 'ja_JP',
  lang: 'ja',

  address: {
    postalCode: '160-0021',
    region: '東京都',
    city: '新宿区',
    street: '歌舞伎町1-6-7',
    floor: '7F',
    full: '〒160-0021 東京都新宿区歌舞伎町1-6-7 7F',
    streetAddress: '歌舞伎町1-6-7 7F',
  },

  /** 最寄駅。表示・構造化データ・アクセス記事で共通利用する */
  nearestStations: [
    {
      name: '新宿駅',
      exit: '東口',
      minutes: 3,
      note: '東口を出て靖国通りを渡り、歌舞伎町方面へ',
    },
    {
      name: '西武新宿駅',
      exit: '南口',
      minutes: 4,
      note: '南口を出て歌舞伎町の中心方向へ',
    },
  ],

  phone: {
    value: '03-6233-7165',
    /** tel: リンク用（国番号付き） */
    tel: '+81362337165',
    verified: true,
    lastVerifiedAt: LAST_VERIFIED_AT,
  },

  openingHours: {
    verified: true,
    text: '16:00〜23:00',
    closedDays: '定休日なし（年中無休）',
    lastVerifiedAt: LAST_VERIFIED_AT,
    /** schema.org openingHoursSpecification 用 */
    spec: [
      {
        days: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '16:00',
        closes: '23:00',
      },
    ],
  },

  /** 【要確認】座標が確認できるまで verified: false のままにすること */
  geo: {
    verified: false,
    latitude: null as number | null,
    longitude: null as number | null,
  },

  /** 予約は TableCheck に一本化 */
  tableCheckUrl:
    'https://www.tablecheck.com/shops/fogo-de-brasia-shinjuku/reserve',
  instagramUrl: 'https://www.instagram.com/fogo_de_brasia/',
  /**
   * Google ビジネスプロフィール（Google のナレッジグラフ上のエンティティ）。
   *
   * 店舗様よりご共有いただいた共有リンク https://share.google/6GggECpchgMtkBRzr が
   * kgmid=/g/11vkl00r24 に解決されることを確認して設定した。
   * 共有リンクそのものは失効の可能性があり、解決先にも計測用パラメータが付くため、
   * sameAs には安定した識別子の形（kgmid）を使う。
   */
  googleBusinessProfileUrl:
    'https://www.google.com/search?kgmid=/g/11vkl00r24' as string | null,
  /** ナレッジグラフのエンティティID（照合用に控えておく） */
  googleKnowledgeGraphId: '/g/11vkl00r24',
  googleMapsUrl:
    'https://www.google.com/maps/search/?api=1&query=%E6%9D%B1%E4%BA%AC%E9%83%BD%E6%96%B0%E5%AE%BF%E5%8C%BA%E6%AD%8C%E8%88%9E%E4%BC%8E%E7%94%BA1-6-7',
  googleMapsEmbedUrl:
    'https://www.google.com/maps?q=%E6%9D%B1%E4%BA%AC%E9%83%BD%E6%96%B0%E5%AE%BF%E5%8C%BA%E6%AD%8C%E8%88%9E%E4%BC%8E%E7%94%BA1-6-7&hl=ja&z=17&output=embed',

  priceRange: '¥5,000〜¥9,000',
  servesCuisine: ['ブラジル料理', 'シュラスコ', 'ステーキ'],
  /** 商圏（構造化データ areaServed 用） */
  areaServed: ['新宿区', '歌舞伎町', '新宿駅周辺', '東京都'],

  /**
   * お子様料金。出典: TableCheck 予約ページ
   * 「5歳まで無料／6歳～10歳半額／11歳以上は通常料金」
   */
  childPolicy: {
    verified: true,
    lastVerifiedAt: LAST_VERIFIED_AT,
    rules: [
      { age: '5歳まで', price: '無料' },
      { age: '6歳〜10歳', price: '半額' },
      { age: '11歳以上', price: '通常料金' },
    ],
  },

  /** 貸切の条件。出典: TableCheck 貸切相談プラン */
  privateHire: {
    minGuests: 40,
    fromPrice: 7700,
    lastVerifiedAt: LAST_VERIFIED_AT,
  },

  counts: {
    churrasco: 15,
    saladBar: 30,
  },

  /** 記事の執筆・監修名義（実在しない個人名を作らないこと） */
  editorialName: 'FOGO De BRASIA 新宿 編集部',
} as const;

/** 表示可能な営業時間（未確定なら null） */
export const publicOpeningHours = site.openingHours.verified
  ? site.openingHours
  : null;

/** 表示可能な電話番号（未確定なら null） */
export const publicPhone =
  site.phone.verified && site.phone.value
    ? { value: site.phone.value, tel: site.phone.tel }
    : null;

/** sameAs に出せる外部プロフィール（確認できたものだけ） */
export const verifiedSameAs = [
  site.instagramUrl,
  site.googleBusinessProfileUrl,
].filter((v): v is string => Boolean(v));

/** 掲載情報の鮮度に関する共通注記 */
export const freshnessNote = (verifiedAt: string = LAST_VERIFIED_AT) => {
  const [y, m] = verifiedAt.split('-');
  return `掲載内容は${y}年${Number(m)}月確認時点の情報です。最新の料金・空席状況は TableCheck の予約ページをご確認ください。`;
};

export type NavItem = { href: string; label: string; latin: string };

export const nav: NavItem[] = [
  { href: '/about', label: 'FOGO De BRASIAについて', latin: 'ABOUT' },
  { href: '/churrasco', label: 'シュラスコ', latin: 'CHURRASCO' },
  { href: '/menu', label: 'メニュー・料金', latin: 'MENU' },
  // 完全個室の提供を確認できていないため「個室」とは表記しない
  { href: '/space', label: '店内・お席', latin: 'SPACE' },
  { href: '/occasions', label: '利用シーン', latin: 'OCCASIONS' },
  { href: '/access', label: 'アクセス', latin: 'ACCESS' },
  { href: '/news', label: 'お知らせ', latin: 'NEWS' },
];

/** 利用目的ページ（/occasions をハブとして、目的別に独立ページを持つ） */
export const occasionPages = [
  {
    href: '/anniversary',
    label: '誕生日・記念日',
    latin: 'ANNIVERSARY',
    summary:
      '乾杯のスパークリングと、メッセージ入りのデザートプレート。お持ちするタイミングもご相談いただけます。',
  },
  {
    href: '/family',
    label: '子連れ・ご家族',
    latin: 'FAMILY',
    summary:
      '切り分ける量をその場で調整できます。5歳まで無料、6〜10歳半額のお子様料金をご用意しています。',
  },
  {
    href: '/party',
    label: '宴会・貸切',
    latin: 'PARTY',
    summary:
      '取り分けはスタッフが行い、料理は順に運ばれます。40名様からの貸切もご相談ください。',
  },
] as const;
