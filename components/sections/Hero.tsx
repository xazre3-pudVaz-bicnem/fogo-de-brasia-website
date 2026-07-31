import Image from 'next/image';
import { photos } from '@/lib/images';
import { site } from '@/lib/site-config';

/**
 * トップページのヒーロー。
 * 背景写真を主役にするため、この中に大きな予約ボタンは置かない（予約はヘッダーと下部固定バー）。
 */
export function Hero() {
  return (
    <section className="relative isolate flex min-h-[88svh] flex-col justify-end overflow-hidden md:min-h-[94svh]">
      {/*
        スマートフォンは縦に長く切り取られるため、切り分けている手元が
        画面に残るよう object-position を右寄りにしている。
      */}
      <Image
        src={photos.hero.src}
        alt={photos.hero.alt}
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        quality={82}
        className="-z-10 object-cover object-[68%_center] md:object-center"
      />

      {/*
        文字の可読性を確保しつつ、写真の暖炉の灯りを潰さないよう、
        全面を均一に暗くするのではなく、文字が載る左下へ重点的に落とす。
      */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink/28" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-char via-char/45 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/72 via-ink/15 to-transparent"
      />

      <div className="mx-auto w-full max-w-[86rem] px-5 pb-24 md:px-9 md:pb-28">
        <p className="hero-in latin text-[0.72rem] text-gold md:text-[0.78rem]">
          SHINJUKU · KABUKICHO
        </p>

        <h1 className="hero-in-2 mt-6 max-w-[16em] font-mincho text-[1.7rem] leading-[1.55] text-balance-ja text-ivory sm:text-[2.4rem] md:text-[3.4rem] md:leading-[1.42]">
          新宿で味わう、
          <br className="hidden sm:block" />
          本格ブラジリアンシュラスコ
        </h1>

        <p className="hero-in-3 mt-8 max-w-xl text-[0.9rem] leading-[2.05] text-ivory-2 md:text-[1rem]">
          焼き上がった肉を目の前で切り分ける、
          <br className="hidden sm:block" />
          五感で楽しむ特別なひととき。
        </p>

        <p className="hero-in-3 mt-9 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.72rem] tracking-[0.08em] text-ivory-dim">
          <span>{site.name}</span>
          <span aria-hidden="true" className="h-3 w-px bg-gold/40" />
          <span>新宿駅 徒歩約3分</span>
        </p>
      </div>

      {/* ファーストビュー下部の控えめなスクロール表示 */}
      <div
        aria-hidden="true"
        className="scroll-hint pointer-events-none absolute bottom-0 right-5 flex flex-col items-center gap-3 md:left-9 md:right-auto"
      >
        <span className="latin text-[0.7rem] tracking-[0.3em] text-ivory-dim [writing-mode:vertical-rl]">
          SCROLL
        </span>
        <span className="block h-14 w-px bg-gold/70" />
      </div>
    </section>
  );
}
