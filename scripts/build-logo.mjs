/**
 * 別途ご支給いただいた素材（ロゴ・ヒーロー写真）を、サイト用に変換する。
 *
 * ■ ロゴ（白背景の JPG）
 * ・白背景を透過に変換（アンチエイリアスを残すため、明度からアルファを復元）
 * ・サイトの背景がチャコールのため、黒だった線画・文字をアイボリーへ置換
 *   （炎の赤はブランド色として維持する = ダークモード用ロゴ）
 * ・エンブレム部分（牛＋炎）だけを切り出したマークと、文字入りの全体版を書き出す
 *
 * ■ ヒーロー写真（PNG 1.9MB）
 * ・LCP に効くため WebP へ変換する
 *
 * 変換後、元ファイルは photos-source/supplied/ へ退避する（配信対象から外すため）。
 *
 * 実行: node scripts/build-logo.mjs
 */
import { mkdir, rename } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const SRC = path.join(ROOT, 'public', 'images', 'logo.jpg');
const OUT = path.join(ROOT, 'public', 'images');

/** サイトのアイボリー（--color-ivory） */
const IVORY = [242, 235, 224];
/** 白とみなす閾値。これ以上明るいピクセルは完全透過にする */
const WHITE_CUT = 246;

async function extract({ top, height, name, scale }) {
  const base = sharp(SRC).extract({ left: 0, top, width: 150, height });

  const { data, info } = await base
    .clone()
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const out = Buffer.alloc(info.width * info.height * 4);

  for (let i = 0, o = 0; i < data.length; i += info.channels, o += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // 白背景に対する不透明度を、いちばん暗いチャンネルから復元する
    const min = Math.min(r, g, b);
    let a = 255 - min;
    if (min >= WHITE_CUT) a = 0;

    if (a <= 3) {
      out[o] = out[o + 1] = out[o + 2] = out[o + 3] = 0;
      continue;
    }

    // 白との合成を打ち消して、素の色を求める
    const un = (c) =>
      Math.max(0, Math.min(255, Math.round(((c - (255 - a)) * 255) / a)));
    const ur = un(r);
    const ug = un(g);
    const ub = un(b);

    // 赤み（炎）はブランド色として残し、それ以外の線画・文字はアイボリーへ
    const isFlame = ur - Math.max(ug, ub) > 35 && ur > 90;

    if (isFlame) {
      out[o] = ur;
      out[o + 1] = ug;
      out[o + 2] = ub;
    } else {
      out[o] = IVORY[0];
      out[o + 1] = IVORY[1];
      out[o + 2] = IVORY[2];
    }
    out[o + 3] = a;
  }

  const img = sharp(out, {
    raw: { width: info.width, height: info.height, channels: 4 },
  }).trim({ threshold: 0 });

  const meta = await img.clone().toBuffer({ resolveWithObject: true });

  await img
    .clone()
    .resize({
      width: Math.round(meta.info.width * scale),
      kernel: 'lanczos3',
    })
    .webp({ quality: 92, alphaQuality: 100, effort: 6 })
    .toFile(path.join(OUT, `${name}.webp`));

  const final = await sharp(path.join(OUT, `${name}.webp`)).metadata();
  console.log(`  ${name}.webp  ${final.width}x${final.height}`);
}

async function main() {
  console.log('ロゴ:');
  // エンブレム（牛＋炎）。文字は y=96 付近から始まるため、その手前で切る
  await extract({ top: 12, height: 79, name: 'logo-mark', scale: 3 });
  // ロゴ全体（文字入り）
  await extract({ top: 12, height: 126, name: 'logo-full', scale: 3 });

  console.log('ヒーロー写真:');
  const heroSrc = path.join(OUT, 'hero.png');
  if (existsSync(heroSrc)) {
    await sharp(heroSrc)
      .rotate()
      .webp({ quality: 80, effort: 6 })
      .toFile(path.join(OUT, 'hero-shinjuku.webp'));
    const m = await sharp(path.join(OUT, 'hero-shinjuku.webp')).metadata();
    console.log(`  hero-shinjuku.webp  ${m.width}x${m.height}`);
  }

  // 元ファイルを public の外へ退避
  const archive = path.join(ROOT, 'photos-source', 'supplied');
  await mkdir(archive, { recursive: true });
  for (const f of ['logo.jpg', 'hero.png']) {
    const from = path.join(OUT, f);
    const to = path.join(archive, f);
    if (existsSync(from) && !existsSync(to)) {
      await rename(from, to);
      console.log(`  退避: ${f} → photos-source/supplied/`);
    }
  }
}

main();
