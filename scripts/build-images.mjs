/**
 * 元写真（public 直下の LINE アルバム）を、用途別の名前・サイズの WebP に変換して
 * public/images/ へ書き出す。元ファイルは photos-source/ へ退避する。
 *
 * 実行: node scripts/build-images.mjs
 */
import { mkdir, readdir, rename, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const SRC_DIR = path.join(ROOT, 'public');
const OUT_DIR = path.join(ROOT, 'public', 'images');
const ARCHIVE_DIR = path.join(ROOT, 'photos-source');

/** 元ファイルの連番 → 出力名・最大幅・切り出し位置 */
const MAP = [
  // --- ヒーロー / 主要ビジュアル ---
  ['61', 'hero-carving', 2000],
  ['66', 'passador-skewers', 1600],
  ['70', 'churrasco-lineup', 1600],
  ['65', 'picanha-skewers-top', 1600],
  ['82', 'salad-bar', 1440],
  ['68', 'seat-window-booth', 1440],

  // --- 店内 ---
  ['72', 'seat-large-booth', 1200],
  ['73', 'seat-marble-round', 1200],
  ['77', 'seat-table-row', 1100],
  ['78', 'view-shinjuku-night', 1400],

  // --- シュラスコ 15種 ---
  ['12', 'meat-picanha', 1000],
  ['16', 'meat-garlic-picanha', 1000],
  ['44', 'meat-pepper-picanha', 1200],
  ['64', 'meat-bife-de-chorizo', 1200],
  ['47', 'meat-costela', 1200],
  ['45', 'meat-pork-shoulder', 1200],
  ['42', 'meat-chicken-thigh', 1400],
  ['43', 'meat-linguica', 1200],
  ['17', 'meat-grilled-cheese', 1000],
  ['22', 'meat-grilled-pineapple', 900],
  ['28', 'meat-pao-de-queijo', 1000],

  // --- サラダバー / ブラジル料理 ---
  ['33', 'salad-bean-broccoli', 1000],
  ['35', 'salad-green', 1000],
  ['36', 'salad-vinagrete', 1000],
  ['37', 'salad-couscous', 1000],
  ['27', 'dish-feijoada', 1000],
  ['25', 'dish-garlic-rice', 1000],
  ['23', 'dish-curry', 1000],
  ['32', 'dish-grilled-potato', 1000],
  ['10', 'party-feast', 1400],

  // --- デザート / ドリンク ---
  ['21', 'dessert-fondant', 1100],
  ['19', 'dessert-tiramisu', 1000],
  ['18', 'dessert-acai', 1000],
  ['56', 'drink-beer-taps', 900],
  ['8', 'drink-cheers', 1200],

  // --- その他 ---
  ['5', 'skewer-table-setting', 1400],
  ['69', 'picanha-skewer-side', 1600],
  ['57', 'picanha-roast-beer', 1400],
  ['40', 'flambe-cheese', 900],
  ['24', 'garlic-bread-skewer', 900],
];

/** OG 画像は 1200x630 に固定トリミング */
const OG = { num: '70', name: 'og-image', width: 1200, height: 630, position: 'attention' };

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const files = await readdir(SRC_DIR);
  const bySeq = new Map();
  for (const f of files) {
    const m = f.match(/_(\d+)\.jpe?g$/i);
    if (m) bySeq.set(m[1], path.join(SRC_DIR, f));
  }

  const missing = [];
  for (const [num, name, width] of MAP) {
    const src = bySeq.get(num);
    if (!src) {
      missing.push(num);
      continue;
    }
    await sharp(src)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 78, effort: 5 })
      .toFile(path.join(OUT_DIR, `${name}.webp`));
  }

  const ogSrc = bySeq.get(OG.num);
  if (ogSrc) {
    await sharp(ogSrc)
      .rotate()
      .resize({ width: OG.width, height: OG.height, fit: 'cover', position: OG.position })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(path.join(SRC_DIR, `${OG.name}.jpg`));
  }

  // 元ファイルを public の外へ退避（配信対象から外すため）
  await mkdir(ARCHIVE_DIR, { recursive: true });
  let moved = 0;
  for (const [, src] of bySeq) {
    const dest = path.join(ARCHIVE_DIR, path.basename(src));
    if (!existsSync(dest)) {
      await rename(src, dest);
      moved += 1;
    }
  }

  // 生成物の一覧をメモとして残す
  const manifest = MAP.map(([num, name, width]) => `${name}.webp  <- _${num}.jpg  (max ${width}px)`).join('\n');
  await writeFile(path.join(ARCHIVE_DIR, 'MANIFEST.txt'), `${manifest}\n`, 'utf8');

  console.log(`generated: ${MAP.length - missing.length} webp`);
  if (missing.length) console.log(`missing source: ${missing.join(', ')}`);
  console.log(`archived originals: ${moved}`);
}

main();
