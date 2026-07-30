import { site } from '@/lib/site-config';

/**
 * ロゴ画像が支給されていないため、店名を文字組みで表示する。
 * 実店舗のロゴ（FOGO DE BRASIA / CHURRASCARIA）の構成にならい、
 * 上下を細い罫線で挟んだ二段構えにしている。
 *
 * 字間は .latin ユーティリティと衝突しないよう、ここで明示的に指定する。
 */

const scales = {
  sm: {
    main: 'text-[1rem] tracking-[0.24em] indent-[0.24em]',
    sub: 'text-[0.7rem] tracking-[0.2em] indent-[0.2em]',
    kana: 'text-[0.7rem] tracking-[0.3em] indent-[0.3em]',
  },
  md: {
    main: 'text-[1.3rem] tracking-[0.28em] indent-[0.28em]',
    sub: 'text-[0.72rem] tracking-[0.3em] indent-[0.3em]',
    kana: 'text-[0.72rem] tracking-[0.38em] indent-[0.38em]',
  },
  lg: {
    main: 'text-[2rem] tracking-[0.28em] indent-[0.28em] md:text-[3rem]',
    sub: 'text-[0.75rem] tracking-[0.4em] indent-[0.4em]',
    kana: 'text-[0.75rem] tracking-[0.42em] indent-[0.42em]',
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
    <span
      className={`flex flex-col leading-none ${
        align === 'start' ? 'items-start' : 'items-center'
      } ${className}`}
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
  );
}
