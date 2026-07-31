import Image from 'next/image';
import { logo } from '@/lib/images';
import { site } from '@/lib/site-config';

/**
 * ロゴの表示。
 *
 * ご支給いただいたロゴは 150px 角のため、文字まで含めた版を小さく置くと
 * 「FOGO DE BRASIA / CHURRASCARIA」が潰れてしまう。
 * そのため用途に応じて 2 通りを使い分ける。
 *
 * ・variant="lockup"（ヘッダー）… エンブレム（牛＋炎）＋ 文字組みの店名
 *     エンブレムは図案なので小さくても潰れず、店名は文字なのでどの寸法でも鮮明。
 * ・variant="full"（フッター）… 文字を含むロゴ全体を大きく配置
 *
 * 字間は .latin ユーティリティと衝突しないよう、ここで明示的に指定する。
 */

const scales = {
  sm: {
    mark: 'h-8',
    main: 'text-[0.92rem] tracking-[0.2em] indent-[0.2em]',
    sub: 'text-[0.7rem] tracking-[0.16em] indent-[0.16em]',
    kana: 'text-[0.7rem] tracking-[0.3em] indent-[0.3em]',
    gap: 'gap-2.5',
  },
  md: {
    mark: 'h-11',
    main: 'text-[1.2rem] tracking-[0.26em] indent-[0.26em]',
    sub: 'text-[0.72rem] tracking-[0.26em] indent-[0.26em]',
    kana: 'text-[0.72rem] tracking-[0.38em] indent-[0.38em]',
    gap: 'gap-3.5',
  },
  lg: {
    mark: 'h-16',
    main: 'text-[1.8rem] tracking-[0.28em] indent-[0.28em] md:text-[2.4rem]',
    sub: 'text-[0.75rem] tracking-[0.36em] indent-[0.36em]',
    kana: 'text-[0.75rem] tracking-[0.42em] indent-[0.42em]',
    gap: 'gap-5',
  },
} as const;

export function Wordmark({
  size = 'md',
  withKana = false,
  align = 'center',
  className = '',
}: {
  size?: keyof typeof scales;
  withKana?: boolean;
  /** 表示切替や配置は className の後入れではなく、この props で指定する */
  align?: 'center' | 'start';
  className?: string;
}) {
  const scale = scales[size];

  return (
    <span className={`flex items-center ${scale.gap} ${className}`}>
      <Image
        src={logo.mark.src}
        alt=""
        aria-hidden="true"
        width={logo.mark.width}
        height={logo.mark.height}
        priority={size !== 'lg'}
        className={`${scale.mark} w-auto shrink-0`}
      />

      <span
        className={`flex flex-col leading-none ${
          align === 'start' ? 'items-start' : 'items-center'
        }`}
      >
        {withKana && (
          <span className={`${scale.kana} mb-2.5 text-gold-dim`}>
            シュラスコテーブル
          </span>
        )}

        <span
          className={`font-display ${scale.main} whitespace-nowrap text-ivory`}
        >
          {site.brandLatin}
        </span>

        <span className="mt-2 flex w-full items-center gap-2">
          <span className="h-px flex-1 bg-gold/40" />
          <span
            className={`font-display ${scale.sub} whitespace-nowrap text-gold`}
          >
            {site.brandSub}
          </span>
          <span className="h-px flex-1 bg-gold/40" />
        </span>
      </span>
    </span>
  );
}

/** 文字まで含むロゴ全体。フッターなど大きく置ける場所で使う。 */
export function LogoFull({
  className = '',
  width = 200,
}: {
  className?: string;
  width?: number;
}) {
  return (
    <Image
      src={logo.full.src}
      alt={logo.full.alt}
      width={logo.full.width}
      height={logo.full.height}
      sizes={`${width}px`}
      style={{ width, height: 'auto' }}
      className={className}
    />
  );
}
