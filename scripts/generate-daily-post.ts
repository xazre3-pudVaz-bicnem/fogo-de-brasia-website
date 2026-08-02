/**
 * Claude API で1日1本のブログ記事を生成し、content/blog/ へ Markdown で保存する。
 *
 * 実行:
 *   npm run blog:generate     （ANTHROPIC_API_KEY が必要）
 *   npm run blog:dry-run      （ファイルを書かず、生成結果だけ表示）
 *
 * オプション（環境変数）:
 *   ANTHROPIC_MODEL   使用モデル。未設定なら claude-haiku-4-5-20251001
 *   BLOG_TOPIC        テーマを指定（未設定なら未使用テーマから自動選択）
 *   BLOG_DATE         公開日 YYYY-MM-DD（未設定なら今日／Asia/Tokyo）
 *   BLOG_DRY_RUN      "1" ならファイルを書かず内容だけ表示（--dry-run でも可）
 *
 * 設計方針:
 * ・構造化出力（output_config.format）で JSON を強制し、Haiku でも
 *   frontmatter が壊れないようにする
 * ・既存のブログ記事・お知らせ記事のタイトルを渡し、テーマ重複を防ぐ
 * ・店舗の確定情報だけをプロンプトへ渡し、料金や営業時間の創作を防ぐ
 * ・内部リンクは実在するページのみを候補として渡す
 */
import fs from 'node:fs';
import path from 'node:path';
import Anthropic from '@anthropic-ai/sdk';

// ─────────────────────────────────────────────
// 店舗情報（確定済みの事実のみ）
// lib/site-config.ts と同じ値。生成物が実サイトと矛盾しないようにする。
// ─────────────────────────────────────────────
const SITE = {
  name: 'シュラスコテーブル FOGO De BRASIA 新宿',
  shortName: 'FOGO De BRASIA 新宿',
  baseUrl: 'https://www.fogodebrasia-shinjuku.jp',
  area: '新宿・新宿駅周辺・歌舞伎町',
  address: '〒160-0021 東京都新宿区歌舞伎町1-6-7 7F',
  access: '新宿駅東口から徒歩約3分、西武新宿駅から徒歩約4分',
  hours: '16:00〜23:00',
  closed: '定休日なし（年中無休）',
  tel: '03-6233-7165',
  tableCheckUrl:
    'https://www.tablecheck.com/shops/fogo-de-brasia-shinjuku/reserve',
  instagram: 'https://www.instagram.com/fogo_de_brasia/',
} as const;

/** 掲載してよい事実。これ以外の数値・提供内容を書かせない */
const VERIFIED_FACTS = `
- 店名: ${SITE.name}
- 所在地: ${SITE.address}（ビルの7階）
- アクセス: ${SITE.access}
- 営業時間: ${SITE.hours}／${SITE.closed}
- 電話番号: ${SITE.tel}
- 予約: TableCheck から24時間受付
- シュラスコ: 約15種類（ピッカーニャ、ガーリックピッカーニャ、ペッパーピッカーニャ、アルカトラ、フラウディーニャ、ビッフェ・デ・チョリソ、コステラ・デ・ボイ、豚肩ロース、鶏もも肉、鶏ハツ、リングイッサ、焼きオニオン、焼きチーズ、焼きパイナップル、ポンデケージョ）
- サラダバービュッフェ: 約30種類（葉物・豆のサラダ、クスクス、ヴィナグレッチ、フェイジョアーダ、ガーリックライス、スープ、温かい副菜など）
- コース（すべて税込・飲み放題付き）:
  ・OPEN記念コース 5,980円（120分／ご予約限定）
  ・レギュラーディナーコース 7,700円（120分／シュラスコ15種＋デザートビュッフェ）
  ・プレミアムディナーコース 8,800円（150分／TOKYO CRAFT を含む30種以上の飲み放題）
  ・誕生日・記念日コース 8,000円（120分／乾杯スパークリング＋メッセージ入りデザートプレート）
  ・早割ディナーコース 5,500円（120分／16時〜17時のご入店限定）
  ・貸切相談プラン 7,700円〜（40名様〜）
- お子様料金: 5歳まで無料／6歳〜10歳半額／11歳以上は通常料金
- 席: ソファー席が中心（窓際のソファー席、ボックスソファー席、ラウンドテーブル席、窓沿いのテーブル席）。完全な個室はない
- 提供方法: 専用ロースターで焼き上げ、スタッフが串のまま席へ運び、目の前で希望の量を切り分ける
`.trim();

/** 内部リンク候補。実在するページのみ */
const INTERNAL_LINKS = `
- /menu … メニュー・料金（コースの内容と価格、シュラスコ15種、サラダバー、飲み放題）
- /churrasco … シュラスコとは（焼き方、食べ方、部位の違い）
- /space … 店内・お席（窓際のソファー席、ボックス席、夜景）
- /party … 宴会・貸切（会社宴会、歓送迎会、同窓会、40名様からの貸切）
- /anniversary … 誕生日・記念日（乾杯ドリンク、デザートプレート）
- /family … 子連れ・ご家族（お子様料金、席の相談、早い時間の利用）
- /occasions … 利用シーン（デート、女子会、家族、宴会などの目的別）
- /access … アクセス・店舗情報（駅からの道順、地図、営業時間）
- /about … 当店について（こだわり、ロースター、提供方針）
- /news … お知らせ・コラム（部位や料理の詳しい解説記事をまとめている）
`.trim();

/** 記事テーマの候補 */
const TOPICS = [
  '新宿でシュラスコを食べるなら知っておきたいこと',
  '新宿のブラジル料理をはじめて食べる方へ',
  '新宿で肉料理を楽しむときのお店の選び方',
  '新宿の肉食べ放題を選ぶときに見るべき点',
  '新宿で肉料理のディナーを楽しむ夜の過ごし方',
  '新宿でデートに使えるレストランの条件',
  '新宿の女子会で肉料理を選ぶという選択',
  '新宿で宴会に肉料理を選ぶ理由',
  '新宿の飲み会でレストランを決めるときの手順',
  '新宿でグループ利用しやすいレストランの探し方',
  '新宿で誕生日ディナーを計画するときの流れ',
  '新宿で記念日ディナーを選ぶときに大切なこと',
  '新宿で歓送迎会の会場を決めるまでの段取り',
  '新宿で忘年会に肉料理を選ぶときの考え方',
  '新宿で新年会に肉料理を選ぶときの考え方',
  'シュラスコとはどんな料理か',
  'シュラスコの楽しみ方と食べる順番',
  'はじめてのシュラスコで戸惑わないために',
  'シュラスコと焼肉のちがい',
  'ブラジル料理の魅力とその背景',
  '肉好きの方におすすめしたい外食の選び方',
  '会社帰りにシュラスコを楽しむという選択',
  '週末に行きたい新宿の肉料理',
  '大人数で楽しめる新宿のレストランの条件',
  '新宿で非日常感のある食事をしたいときに',
  'シュラスコを楽しむときの服装と過ごし方',
  '肉料理とお酒の合わせ方',
  '新宿でコース料理を選ぶときのポイント',
  '新宿駅周辺でレストランを探すときの視点',
  'ピッカーニャという部位について',
  'サラダバーがあるシュラスコ店の楽しみ方',
  '飲み放題付きコースの選び方',
] as const;

/**
 * 使用モデル。
 * 毎日の自動生成はコストを抑えるため Haiku を既定にする。
 * ANTHROPIC_MODEL が設定されていればそちらを優先する。
 */
const MODEL = process.env.ANTHROPIC_MODEL || 'claude-haiku-4-5-20251001';

/** ファイルを書かずに内容だけ確認するモード */
const DRY_RUN =
  process.env.BLOG_DRY_RUN === '1' || process.argv.includes('--dry-run');

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');
const NEWS_DIR = path.join(process.cwd(), 'data', 'news');

const CATEGORIES = [
  'シュラスコ',
  'ブラジル料理',
  '新宿グルメ',
  '利用シーン',
  '記念日・お祝い',
  '宴会・貸切',
  'ドリンク',
] as const;

/** 日本時間の YYYY-MM-DD */
function todayInTokyo(): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());
}

/** 既存記事のタイトル・テーマを集める（重複防止用） */
function collectExistingTitles(): { blog: string[]; news: string[] } {
  const blog: string[] = [];
  if (fs.existsSync(BLOG_DIR)) {
    for (const f of fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.md'))) {
      const raw = fs.readFileSync(path.join(BLOG_DIR, f), 'utf8');
      const m = raw.match(/^title:\s*["']?(.+?)["']?\s*$/m);
      if (m) blog.push(m[1]);
    }
  }

  const news: string[] = [];
  if (fs.existsSync(NEWS_DIR)) {
    for (const f of fs.readdirSync(NEWS_DIR).filter((f) => f.endsWith('.ts'))) {
      const raw = fs.readFileSync(path.join(NEWS_DIR, f), 'utf8');
      const m = raw.match(/^\s*title: '(.+?)',$/m);
      if (m) news.push(m[1]);
    }
  }
  return { blog, news };
}

/** 既存スラッグ一覧 */
function existingSlugs(): Set<string> {
  if (!fs.existsSync(BLOG_DIR)) return new Set();
  return new Set(
    fs
      .readdirSync(BLOG_DIR)
      .filter((f) => f.endsWith('.md'))
      .map((f) => f.replace(/\.md$/, ''))
  );
}

/**
 * まだ使っていないテーマを選ぶ。
 * 全テーマを使い切ったら、いちばん古く使ったものから再利用する。
 */
function pickTopic(usedTitles: string[]): string {
  if (process.env.BLOG_TOPIC) return process.env.BLOG_TOPIC;

  const usedBlob = usedTitles.join('\n');
  const unused = TOPICS.filter((t) => {
    // テーマの中核語がタイトルに含まれていれば「使用済み」とみなす
    const core = t.replace(/[。、]/g, '').slice(0, 10);
    return !usedBlob.includes(core);
  });

  const pool = unused.length > 0 ? unused : TOPICS;
  // 日付ベースで決定的に選ぶ（同日に複数回動かしても同じテーマになる）
  const seed = Number(todayInTokyo().replace(/-/g, ''));
  return pool[seed % pool.length];
}

const OUTPUT_SCHEMA = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
      description:
        '記事タイトル。28〜40文字程度の日本語。地域名やキーワードを自然に含める。煽り表現や「No.1」は禁止。',
    },
    slug: {
      type: 'string',
      description:
        'URL用スラッグ。英小文字・数字・ハイフンのみ。3〜6語程度。日本語やアンダースコアは使わない。',
    },
    description: {
      type: 'string',
      description:
        'meta description。90〜120文字の日本語。記事の内容を要約し、検索意図に答える。',
    },
    category: {
      type: 'string',
      enum: [...CATEGORIES],
      description: '記事カテゴリ',
    },
    tags: {
      type: 'array',
      items: { type: 'string' },
      description: '3〜5個の日本語タグ。単語または短い語句。',
    },
    body: {
      type: 'string',
      description:
        'Markdown本文。## と ### の見出しで構成し、導入文・本文・まとめを含む。2,000〜3,000文字程度。h1（#）は使わない。',
    },
  },
  required: ['title', 'slug', 'description', 'category', 'tags', 'body'],
  additionalProperties: false,
} as const;

function buildPrompt(topic: string, existing: { blog: string[]; news: string[] }) {
  const avoid = [...existing.blog, ...existing.news];

  return `あなたは「${SITE.name}」の公式サイトのブログ記事を書く編集者です。
飲食店の書き手として、読んでおいしそうだと感じられる、自然な日本語の記事を書いてください。

# 今回のテーマ
${topic}

# このブログの役割（重要）
当サイトには /news に「シュラスコの部位」「サラダバー」「ブラジル料理」などの
解説記事がすでにあります。ブログで同じ解説を繰り返さないでください。

ブログでは、読者の状況（誰と／いつ／どんな目的で来るのか）から書き起こし、
「どう選ぶか」「どう過ごすか」という判断の視点を示してください。
料理そのものの詳しい解説が必要な場面では、深追いせずに /news や
該当ページへリンクして先へ進めます。

# 店舗の確定情報（ここに書かれていることだけを事実として使う）
${VERIFIED_FACTS}

# 記事の構成（必ず守る）
1. 導入文（見出しなし、200〜300文字）… 読者の状況や疑問から入り、この記事で何が分かるかを示す
2. 本文 … ## の見出しを4〜6個。必要に応じて ### の小見出しを使う
3. まとめ … 最後の ## 見出しをまとめにあて、店舗の情報と予約への導線で締める

# 文字数
本文全体で2,000〜3,000文字程度（日本語の文字数）。水増しは禁止。

# 内部リンク（本文中に2〜4本、文脈に合う場所へ自然に置く）
Markdownのリンク記法で、以下の実在するページだけにリンクする。
${INTERNAL_LINKS}

アンカーテキストは「詳しくはこちら」ではなく、内容が分かる具体的な文言にする。
例: [メニュー・料金のページでコースの内容を見る](/menu)

予約は必ず TableCheck への外部リンクにする。
例: [TableCheckで空席を確認する](${SITE.tableCheckUrl})

# 絶対に守ること
- 上記「店舗の確定情報」に無い料金・営業時間・提供内容・サービスを書かない
- 食べ放題・飲み放題の条件を勝手に断定しない。「コースにより異なります」等と添える
- 「新宿で一番」「必ず満足」「最安」「No.1」「人気No.1」など根拠のない表現を使わない
- 過剰な煽り、感嘆符の多用、絵文字を使わない
- 「いかがでしたでしょうか」「ぜひ一度足を運んでみてはいかがでしょうか」のような定型の締め文を使わない
- 架空の口コミ、架空の体験談、架空のスタッフの声を書かない
- 競合店との比較や競合店名を書かない
- アレルギーや食材について断定せず、事前のご確認をご案内する
- 「新宿」「シュラスコ」を不自然に連呼しない。1つの見出しの中で何度も繰り返さない
- 同じ意味の文を言い換えて繰り返さない

# 既に公開済みの記事（内容が重複しないようにする）
${avoid.length ? avoid.map((t) => `- ${t}`).join('\n') : '（まだありません）'}

# slug の付け方
英小文字・数字・ハイフンのみ。記事内容を表す3〜6語。
例: shinjuku-churrasco-first-time / picanha-cut-guide / party-course-guide

以上の条件で記事を1本書いてください。`;
}

type GeneratedPost = {
  title: string;
  slug: string;
  description: string;
  category: string;
  tags: string[];
  body: string;
};

/** 生成結果の検証。問題があれば理由を返す */
function validate(post: GeneratedPost, taken: Set<string>): string[] {
  const errors: string[] = [];

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(post.slug))
    errors.push(`slug が不正: ${post.slug}`);
  if (taken.has(post.slug)) errors.push(`slug が既存と重複: ${post.slug}`);
  if (!(CATEGORIES as readonly string[]).includes(post.category))
    errors.push(`category が不正: ${post.category}`);
  if (post.body.includes('\n# ') || post.body.startsWith('# '))
    errors.push('本文に h1(#) が含まれています');
  if (!post.body.includes('## ')) errors.push('本文に ## 見出しがありません');

  const bodyChars = post.body.replace(/\s/g, '').length;
  if (bodyChars < 1200) errors.push(`本文が短すぎます（${bodyChars}文字）`);

  const banned = ['No.1', 'ナンバーワン', '日本一', '最安', '必ず満足', '地域No'];
  for (const w of banned)
    if (post.body.includes(w) || post.title.includes(w))
      errors.push(`禁止表現が含まれています: ${w}`);

  // 実在しない内部リンクを検出（存在しないページへ誘導させない）
  const allowed = [...INTERNAL_LINKS.matchAll(/^- (\/[a-z-]+)/gm)].map(
    (m) => m[1]
  );
  for (const m of post.body.matchAll(/\]\((\/[^)]*)\)/g)) {
    const href = m[1].split('#')[0];
    if (!allowed.includes(href)) errors.push(`存在しない内部リンク: ${m[1]}`);
  }

  return errors;
}

function toMarkdown(post: GeneratedPost, date: string): string {
  const esc = (s: string) => s.replace(/"/g, '\\"');
  return `---
title: "${esc(post.title)}"
slug: "${post.slug}"
description: "${esc(post.description)}"
date: "${date}"
category: "${post.category}"
tags: [${post.tags.map((t) => `"${esc(t)}"`).join(', ')}]
---

${post.body.trim()}
`;
}

async function main() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error('ANTHROPIC_API_KEY が設定されていません。');
    process.exit(1);
  }

  const date = process.env.BLOG_DATE || todayInTokyo();
  const existing = collectExistingTitles();
  const taken = existingSlugs();
  const topic = pickTopic(existing.blog);

  console.log('─'.repeat(60));
  console.log(`使用モデル : ${MODEL}`);
  console.log(`公開日     : ${date}`);
  console.log(`テーマ     : ${topic}`);
  console.log(`既存記事   : ブログ ${existing.blog.length}本 / お知らせ ${existing.news.length}本`);
  console.log('─'.repeat(60));

  const client = new Anthropic({ apiKey });

  let post: GeneratedPost | null = null;
  let lastErrors: string[] = [];

  // 検証に落ちたら、理由を伝えて最大2回まで作り直す
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    const retryNote = lastErrors.length
      ? `\n\n# 前回の生成でこの問題がありました。必ず直してください\n${lastErrors.map((e) => `- ${e}`).join('\n')}`
      : '';

    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 16000,
      system:
        '日本語で、飲食店の公式ブログにふさわしい自然で具体的な文章を書きます。与えられた事実だけを使い、確認できない情報は書きません。',
      messages: [
        { role: 'user', content: buildPrompt(topic, existing) + retryNote },
      ],
      output_config: {
        format: { type: 'json_schema', schema: OUTPUT_SCHEMA },
      },
    });

    // 途中で打ち切られると JSON が壊れるため、原因が分かる形で残す
    if (response.stop_reason === 'max_tokens') {
      lastErrors = ['出力が max_tokens で打ち切られました。本文を短くしてください'];
      console.warn(`試行 ${attempt}: ${lastErrors[0]}`);
      continue;
    }
    if (response.stop_reason === 'refusal') {
      lastErrors = ['モデルが生成を拒否しました'];
      console.warn(`試行 ${attempt}: ${lastErrors[0]}`);
      continue;
    }

    const textBlock = response.content.find((b) => b.type === 'text');
    if (!textBlock || textBlock.type !== 'text') {
      lastErrors = ['応答に本文が含まれていません'];
      console.warn(`試行 ${attempt}: ${lastErrors[0]}`);
      continue;
    }

    let candidate: GeneratedPost;
    try {
      candidate = JSON.parse(textBlock.text) as GeneratedPost;
    } catch {
      lastErrors = ['JSON の解析に失敗しました'];
      console.warn(`試行 ${attempt}: ${lastErrors[0]}`);
      continue;
    }

    const errors = validate(candidate, taken);
    if (errors.length === 0) {
      post = candidate;
      console.log(
        `入力 ${response.usage.input_tokens} / 出力 ${response.usage.output_tokens} トークン`
      );
      break;
    }

    lastErrors = errors;
    console.warn(`試行 ${attempt}: 検証エラー\n${errors.map((e) => `  - ${e}`).join('\n')}`);
  }

  if (!post) {
    console.error('3回試しましたが、条件を満たす記事を生成できませんでした。');
    process.exit(1);
  }

  const markdown = toMarkdown(post, date);
  const filePath = path.join(BLOG_DIR, `${post.slug}.md`);

  console.log('─'.repeat(60));
  console.log(`タイトル   : ${post.title}`);
  console.log(`スラッグ   : ${post.slug}`);
  console.log(`カテゴリ   : ${post.category}`);
  console.log(`タグ       : ${post.tags.join(' / ')}`);
  console.log(`本文文字数 : ${post.body.replace(/\s/g, '').length}文字`);
  console.log(`保存先     : content/blog/${post.slug}.md`);
  console.log('─'.repeat(60));

  if (DRY_RUN) {
    console.log('ドライラン（--dry-run）のためファイルは書き込みません。\n');
    console.log(markdown);
    return;
  }

  fs.mkdirSync(BLOG_DIR, { recursive: true });
  fs.writeFileSync(filePath, markdown, 'utf8');
  console.log('記事を保存しました。');

  // GitHub Actions のサマリー・後続ステップ向けに出力
  if (process.env.GITHUB_OUTPUT) {
    fs.appendFileSync(
      process.env.GITHUB_OUTPUT,
      `slug=${post.slug}\nfile=content/blog/${post.slug}.md\ntitle=${post.title}\nmodel=${MODEL}\n`
    );
  }
}

main().catch((err) => {
  console.error('生成に失敗しました:', err);
  process.exit(1);
});
