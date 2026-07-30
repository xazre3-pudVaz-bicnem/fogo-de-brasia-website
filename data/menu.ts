/**
 * シュラスコ・サラダバーの品目。
 * 掲載しているのは Instagram / TableCheck / お預かりした写真で確認できたものに限る。
 */
import { photos, type Photo } from '@/lib/images';

export type MeatItem = {
  name: string;
  latin: string;
  kind: '牛' | '豚' | '鶏' | 'その他';
  description: string;
  photo?: Photo;
};

/** TableCheck 記載「本格シュラスコ15種」に対応 */
export const meats: MeatItem[] = [
  {
    name: 'ピッカーニャ',
    latin: 'Picanha',
    kind: '牛',
    description:
      'シュラスコの主役とされる、牛のいちばん外側の腰まわりの部位。脂の甘みと赤身の香りが同時に立ちのぼります。まずはここから。',
    photo: photos.picanha,
  },
  {
    name: 'ガーリックピッカーニャ',
    latin: 'Picanha com Alho',
    kind: '牛',
    description:
      'ピッカーニャにガーリックをまとわせて焼き上げた一本。香ばしさが加わり、後半でも食べ進めやすい味わいです。',
    photo: photos.garlicPicanha,
  },
  {
    name: 'ペッパーピッカーニャ',
    latin: 'Picanha com Pimenta',
    kind: '牛',
    description:
      '粗挽きの黒胡椒をきかせた変化球。赤ワインやクラフトビールと合わせたい一皿です。',
    photo: photos.pepperPicanha,
  },
  {
    name: 'アルカトラ',
    latin: 'Alcatra',
    kind: '牛',
    description:
      'ランプとも呼ばれる、きめの細かい赤身。噛むほどに旨みが出るので、塩だけでゆっくり味わってみてください。',
    photo: photos.picanhaTop,
  },
  {
    name: 'フラウディーニャ',
    latin: 'Fraldinha',
    kind: '牛',
    description:
      'ハラミに近い、繊維の粗い部位。しっかりした肉の食感を求める方に選ばれています。',
  },
  {
    name: 'ビッフェ・デ・チョリソ',
    latin: 'Bife de Chorizo',
    kind: '牛',
    description:
      'サーロインを厚く切り出した、ごちそう感のある一本。断面の色と脂の縁までが見どころです。',
    photo: photos.bifeDeChorizo,
  },
  {
    name: 'コステラ・デ・ボイ',
    latin: 'Costela de Boi',
    kind: '牛',
    description:
      '骨付きの牛リブを時間をかけて焼き上げます。ほろりとほどける食感は、シュラスコならでは。',
    photo: photos.costela,
  },
  {
    name: '豚肩ロース',
    latin: 'Lombo Suíno',
    kind: '豚',
    description:
      '脂と赤身のバランスがよく、牛の合間に挟むと味の流れが整います。薄めに切り分けてご提供します。',
    photo: photos.porkShoulder,
  },
  {
    name: '鶏もも肉',
    latin: 'Coxa de Frango',
    kind: '鶏',
    description:
      '皮目を香ばしく、中はしっとりと。お子さまや、軽めに召し上がりたい方にも。',
    photo: photos.chickenThigh,
  },
  {
    name: '鶏ハツ',
    latin: 'Coração de Frango',
    kind: '鶏',
    description:
      'ブラジルのシュラスカリアでは欠かせない定番。小気味よい歯ざわりで、お酒がすすみます。',
  },
  {
    name: 'リングイッサ',
    latin: 'Linguiça',
    kind: '豚',
    description:
      'ブラジルの粗挽きソーセージ。ヴィナグレッチ（トマトと玉ねぎのサルサ）と合わせるのが本場の食べ方です。',
    photo: photos.linguica,
  },
  {
    name: '焼きオニオン',
    latin: 'Cebola Grelhada',
    kind: 'その他',
    description:
      '串の熱でゆっくり火を通した玉ねぎ。とろりと甘く、肉の合間の箸休めになります。',
  },
  {
    name: '焼きチーズ',
    latin: 'Queijo Coalho',
    kind: 'その他',
    description:
      '表面がとろけ、縁が香ばしく色づいたところで。テーブルで最初に歓声が上がる一品です。',
    photo: photos.grilledCheese,
  },
  {
    name: '焼きパイナップル',
    latin: 'Abacaxi Grelhado',
    kind: 'その他',
    description:
      'シナモンをまとわせて焼き上げた、シュラスコの締めくくり。甘みと酸味が口の中をすっきりと整えます。',
    photo: photos.grilledPineapple,
  },
  {
    name: 'ポンデケージョ',
    latin: 'Pão de Queijo',
    kind: 'その他',
    description:
      'もちりとした食感のブラジル定番チーズパン。焼きたてのタイミングでお持ちします。',
    photo: photos.paoDeQueijo,
  },
];

export const meatsWithPhoto = meats.filter((m) => m.photo);
export const meatsTextOnly = meats.filter((m) => !m.photo);

export type BuffetItem = {
  name: string;
  description: string;
  photo?: Photo;
};

/** TableCheck 記載「約30種のサラダバービュッフェ」に対応する代表例 */
export const buffet: BuffetItem[] = [
  {
    name: 'グリーンサラダ',
    description:
      'レタス、キャベツ、きゅうり、トマトなど。ドレッシングを選んで、肉の合間に。',
    photo: photos.saladGreen,
  },
  {
    name: '豆とブロッコリーのサラダ',
    description:
      'ひよこ豆や黒豆を使った、ブラジルらしい取り合わせ。食べごたえがあります。',
    photo: photos.saladBean,
  },
  {
    name: 'ヴィナグレッチ',
    description:
      'トマトと玉ねぎを刻んだブラジルのサルサ。シュラスコにのせると、味が一段引き締まります。',
    photo: photos.vinagrete,
  },
  {
    name: 'クスクスサラダ',
    description: '野菜を混ぜ込んだ軽やかな一品。前半の箸休めにおすすめです。',
    photo: photos.couscous,
  },
  {
    name: 'フェイジョアーダ',
    description:
      '黒豆と肉をじっくり煮込んだ、ブラジルを代表する家庭料理。ライスと合わせてどうぞ。',
    photo: photos.feijoada,
  },
  {
    name: 'ガーリックライス',
    description:
      '香ばしく炒めたライス。シュラスコの受け皿として、驚くほど相性がいい一品です。',
    photo: photos.garlicRice,
  },
  {
    name: 'ビーフカレー',
    description: 'ビュッフェ台の定番。〆に少しだけ、という方にも人気です。',
    photo: photos.curry,
  },
  {
    name: 'グリルポテト・スープ',
    description:
      '日替わりのスープと温かい副菜。サラダバーには温菜も並びます。',
    photo: photos.grilledPotato,
  },
];

export type Dessert = { name: string; description: string; photo?: Photo };

export const desserts: Dessert[] = [
  {
    name: 'チョコレートデザート',
    description: '温かいチョコレートに冷たいアイスクリームを添えて。',
    photo: photos.fondant,
  },
  {
    name: 'ティラミス',
    description: 'ココアをふりかけた、軽い口あたりの定番デザート。',
    photo: photos.tiramisu,
  },
  {
    name: 'アサイーボウル',
    description: 'ブラジルらしい一品。フルーツをのせてさっぱりと。',
    photo: photos.acai,
  },
];
