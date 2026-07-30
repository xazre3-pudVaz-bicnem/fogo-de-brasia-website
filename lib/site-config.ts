/**
 * 店舗情報の一元管理ファイル。
 * 画面表示・構造化データ・SEO メタデータは、すべてここを参照する。
 *
 * ─────────────────────────────────────────────
 * 営業時間・電話番号・定休日：店舗様より確定情報を受領（2026年7月31日）
 * ─────────────────────────────────────────────
 * ・営業時間 16:00〜23:00 ／ 定休日なし ／ TEL 03-6233-7165
 * ・いずれも verified: true とし、画面表示と構造化データへ反映済み。
 * ・変更が生じた場合は下記の値のみを書き換えれば、全ページへ自動反映されます。
 *
 * ─────────────────────────────────────────────
 * 【要確認】現時点で確定できていない項目
 * ─────────────────────────────────────────────
 * 1. 緯度・経度
 *    正確な座標を確認できていないため、構造化データの geo は出力していません。
 *    また Google マップは座標ピンではなく「住所検索」の埋め込みを使用しています。
 *
 * 2. 外観・入口の写真
 *    お預かりした写真に外観・入口・ビル周辺のカットが含まれていませんでした。
 *    撮影後 public/images/ に追加し、アクセスページでご使用ください。
 *
 * 3. 本番ドメイン
 *    下記 url は仮の値です。確定後に差し替えてください
 *    （canonical・OG・sitemap の基点になります）。
 */

export const site = {
  name: 'シュラスコテーブル FOGO De BRASIA 新宿',
  shortName: 'FOGO De BRASIA 新宿',
  brandLatin: 'FOGO DE BRASIA',
  brandSub: 'CHURRASCARIA',
  /** 本番ドメイン確定後に差し替えてください（canonical・sitemap の基点） */
  url: 'https://fogo-de-brasia-shinjuku.jp',
  locale: 'ja_JP',
  lang: 'ja',

  address: {
    postalCode: '160-0021',
    region: '東京都',
    city: '新宿区',
    street: '歌舞伎町1-6-7',
    floor: '7F',
    /** 表示用の一行住所 */
    full: '〒160-0021 東京都新宿区歌舞伎町1-6-7 7F',
    /** 構造化データ用（郵便番号を除いた番地） */
    streetAddress: '歌舞伎町1-6-7 7F',
  },

  access: [
    { station: '新宿駅', minutes: 3, note: '東口方面から徒歩約3分' },
    { station: '西武新宿駅', minutes: 4, note: '南口方面から徒歩約4分' },
  ],

  phone: {
    /** 表示用 */
    value: '03-6233-7165',
    /** tel: リンク用（ハイフンなし・国番号付き） */
    tel: '+81362337165',
    verified: true,
  },

  openingHours: {
    verified: true,
    draft: {
      text: '16:00〜23:00',
      closed: '定休日なし（年中無休）',
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
  },

  /** 予約は TableCheck に一本化 */
  reservationUrl:
    'https://www.tablecheck.com/shops/fogo-de-brasia-shinjuku/reserve',
  instagramUrl: 'https://www.instagram.com/fogo_de_brasia/',
  /** 住所検索ベースの地図（座標が未確定のため、誤ったピンを打たない） */
  googleMapsSearchUrl:
    'https://www.google.com/maps/search/?api=1&query=%E6%9D%B1%E4%BA%AC%E9%83%BD%E6%96%B0%E5%AE%BF%E5%8C%BA%E6%AD%8C%E8%88%9E%E4%BC%8E%E7%94%BA1-6-7',
  googleMapsEmbedUrl:
    'https://www.google.com/maps?q=%E6%9D%B1%E4%BA%AC%E9%83%BD%E6%96%B0%E5%AE%BF%E5%8C%BA%E6%AD%8C%E8%88%9E%E4%BC%8E%E7%94%BA1-6-7&hl=ja&z=17&output=embed',

  priceRange: '¥5,000〜¥9,000',
  servesCuisine: ['ブラジル料理', 'シュラスコ', 'ステーキ'],

  /** 数量の根拠: TableCheck 掲載プラン内容 */
  counts: {
    churrasco: 15,
    saladBar: 30,
  },
} as const;

/** 表示可能な営業時間（未確定なら null） */
export const publicOpeningHours = site.openingHours.verified
  ? site.openingHours.draft
  : null;

/** 表示可能な電話番号（未確定なら null）。value は表示用、tel は tel: リンク用 */
export const publicPhone =
  site.phone.verified && site.phone.value
    ? { value: site.phone.value, tel: site.phone.tel }
    : null;

export type NavItem = { href: string; label: string; latin: string };

export const nav: NavItem[] = [
  { href: '/about', label: 'FOGO De BRASIAについて', latin: 'ABOUT' },
  { href: '/churrasco', label: 'シュラスコ', latin: 'CHURRASCO' },
  { href: '/menu', label: 'メニュー・コース', latin: 'MENU' },
  { href: '/space', label: '店内・個室', latin: 'SPACE' },
  { href: '/occasions', label: '利用シーン', latin: 'OCCASIONS' },
  { href: '/access', label: 'アクセス', latin: 'ACCESS' },
  { href: '/news', label: 'お知らせ', latin: 'NEWS' },
];
