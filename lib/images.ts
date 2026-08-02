/**
 * 写真の一元管理。
 * intrinsic な width / height を持たせることで、next/image のレイアウトシフトを防ぐ。
 * alt は「画像」「写真1」のような無意味な文言を使わず、内容が伝わる日本語で記述する。
 */

export type Photo = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

const p = (
  name: string,
  width: number,
  height: number,
  alt: string
): Photo => ({ src: `/images/${name}.webp`, width, height, alt });

export const photos = {
  // ── 主要ビジュアル ───────────────────────────────
  hero: p(
    'hero-shinjuku',
    1672,
    941,
    '炎の灯る店内で、串に刺したピッカーニャをナイフで切り分けるスタッフ'
  ),
  heroCarving: p(
    'hero-carving',
    2000,
    1334,
    'シュラスコの串から焼きたてのピッカーニャを切り分けるスタッフ'
  ),
  passador: p(
    'passador-skewers',
    1600,
    900,
    '大きな串に刺した数種類の肉を運ぶFOGO De BRASIA 新宿のスタッフ'
  ),
  lineup: p(
    'churrasco-lineup',
    1600,
    960,
    'ピッカーニャや焼きチーズなど6種類のシュラスコとブラジル産フルーツドリンクの並び'
  ),
  picanhaTop: p(
    'picanha-skewers-top',
    1600,
    1067,
    '炭火で焼き上げたピッカーニャを刺した2本の串を真上から見たところ'
  ),
  saladBar: p(
    'salad-bar',
    1440,
    1080,
    '新鮮な野菜やスープ、ライスが並ぶFOGO De BRASIA 新宿のサラダバー'
  ),

  // ── 店内 ─────────────────────────────────────
  seatWindowBooth: p(
    'seat-window-booth',
    1440,
    1080,
    '歌舞伎町の夜景を望む窓際のソファー席とマーブル調のテーブル'
  ),
  seatLargeBooth: p(
    'seat-large-booth',
    1200,
    1200,
    'ペンダントライトが灯る大人数向けのボックスソファー席'
  ),
  seatMarbleRound: p(
    'seat-marble-round',
    1200,
    1200,
    'マーブル模様のラウンドテーブルとクッションを配した、こもり感のあるソファー席'
  ),
  seatTableRow: p(
    'seat-table-row',
    597,
    597,
    'セッティングを済ませた窓沿いのテーブル席が並ぶ新宿の店内'
  ),
  viewNight: p(
    'view-shinjuku-night',
    954,
    635,
    '客席の窓から見える新宿・歌舞伎町の高層ビルの夜景'
  ),

  // ── シュラスコ ───────────────────────────────
  picanha: p('meat-picanha', 1000, 1000, '厚めに切り分けたピッカーニャの断面'),
  garlicPicanha: p(
    'meat-garlic-picanha',
    1000,
    1000,
    'ガーリックをまとわせて焼き上げたガーリックピッカーニャ'
  ),
  pepperPicanha: p(
    'meat-pepper-picanha',
    1200,
    800,
    '粗挽き黒胡椒をきかせて焼き上げたペッパーピッカーニャ'
  ),
  bifeDeChorizo: p(
    'meat-bife-de-chorizo',
    1200,
    795,
    '霜降りが美しいビッフェ・デ・チョリソ用の牛肉'
  ),
  costela: p(
    'meat-costela',
    1200,
    900,
    'じっくり焼き上げた骨付きの牛リブ、コステラ・デ・ボイ'
  ),
  porkShoulder: p(
    'meat-pork-shoulder',
    1200,
    800,
    '薄く切り分けたジューシーな豚肩ロースのシュラスコ'
  ),
  chickenThigh: p(
    'meat-chicken-thigh',
    1400,
    680,
    '皮目を香ばしく焼き上げた鶏もも肉のシュラスコ'
  ),
  linguica: p(
    'meat-linguica',
    1200,
    798,
    'ブラジルのソーセージ、リングイッサとファロファ、ヴィナグレッチの盛り合わせ'
  ),
  grilledCheese: p(
    'meat-grilled-cheese',
    1000,
    1000,
    '表面がとろけるまで焼き上げた焼きチーズ'
  ),
  grilledPineapple: p(
    'meat-grilled-pineapple',
    587,
    800,
    'シナモンをまとわせた焼きパイナップルを串から切り分けるところ'
  ),
  paoDeQueijo: p(
    'meat-pao-de-queijo',
    1000,
    667,
    '焼きたてのブラジル定番チーズパン、ポンデケージョ'
  ),
  picanhaSide: p(
    'picanha-skewer-side',
    1600,
    900,
    '串に刺したピッカーニャとポレンタ、ポンデケージョ、ファロファ'
  ),
  picanhaRoastBeer: p(
    'picanha-roast-beer',
    1400,
    931,
    '焼き上がったピッカーニャの塊肉と冷えたビール'
  ),
  skewerTable: p(
    'skewer-table-setting',
    1400,
    933,
    'テーブルに並んだシュラスコの串とブラジル料理の付け合わせ'
  ),
  flambeCheese: p(
    'flambe-cheese',
    574,
    800,
    'スキレットの上で炎を上げる焼きチーズ'
  ),
  garlicBread: p(
    'garlic-bread-skewer',
    604,
    799,
    '串に刺して焼き上げたガーリックブレッド'
  ),

  // ── サラダバー・ブラジル料理 ─────────────────
  saladBean: p(
    'salad-bean-broccoli',
    1000,
    667,
    'ブロッコリーと豆をあわせたサラダバーの一品'
  ),
  saladGreen: p(
    'salad-green',
    1000,
    667,
    '生ハムを添えたグリーンサラダとドレッシング'
  ),
  vinagrete: p(
    'salad-vinagrete',
    1000,
    667,
    'トマトと玉ねぎのブラジル風サルサ、ヴィナグレッチ'
  ),
  couscous: p('salad-couscous', 1000, 667, '野菜を混ぜ込んだクスクスのサラダ'),
  feijoada: p(
    'dish-feijoada',
    1000,
    667,
    'ブラジルの家庭料理、黒豆と肉を煮込んだフェイジョアーダ'
  ),
  garlicRice: p(
    'dish-garlic-rice',
    1000,
    667,
    '香ばしく炒めたガーリックライス'
  ),
  curry: p('dish-curry', 1000, 667, 'ビュッフェに並ぶビーフカレーとライス'),
  grilledPotato: p(
    'dish-grilled-potato',
    1000,
    667,
    '串焼きにしたポテトとソーセージ'
  ),
  feast: p(
    'party-feast',
    1400,
    1120,
    '大皿に盛り付けた肉料理とサラダを囲む宴会のテーブル'
  ),

  // ── デザート・ドリンク ───────────────────────
  fondant: p(
    'dessert-fondant',
    1100,
    733,
    'アイスクリームを添えた温かいチョコレートデザート'
  ),
  tiramisu: p('dessert-tiramisu', 1000, 667, 'ココアをふりかけたティラミス'),
  acai: p('dessert-acai', 1000, 667, 'フルーツをのせたアサイーボウル'),
  beerTaps: p(
    'drink-beer-taps',
    660,
    370,
    'カウンターに並ぶゴールドのビールサーバー'
  ),
  cheers: p(
    'drink-cheers',
    1200,
    800,
    'グラスを合わせて乾杯するテーブルの様子'
  ),
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;

/**
 * ロゴ。
 * ご支給いただいた白背景のロゴから、暗い背景用に透過＋配色調整した版を
 * scripts/build-logo.mjs で生成している（炎の赤は維持、線画・文字はアイボリー）。
 */
export const logo = {
  /** エンブレム（牛＋炎）。小さく置いても潰れないので、ヘッダー向け */
  mark: p('logo-mark', 294, 207, 'FOGO De BRASIA のロゴマーク'),
  /** 文字を含むロゴ全体。フッターなど、大きく置ける場所向け */
  full: p(
    'logo-full',
    384,
    327,
    'シュラスコテーブル FOGO De BRASIA 新宿のロゴ'
  ),
} satisfies Record<string, Photo>;
