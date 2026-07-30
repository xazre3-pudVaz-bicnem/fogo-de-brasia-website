import { site } from '@/lib/site-config';

type Variant = 'solid' | 'outline' | 'ghost' | 'bar';
type Size = 'sm' | 'md' | 'lg';

export type ReservationButtonProps = {
  /** ボタン文言。設置箇所ごとに使い分ける */
  children: React.ReactNode;
  /** 計測用。GA などでイベントを付けやすいよう data-location に出力する */
  location: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** 外部リンクであることを示す補助表記を出すか */
  showExternalNote?: boolean;
  /** 親要素の幅いっぱいに広げる（補助表記があっても崩れないようにする） */
  fullWidth?: boolean;
};

const base =
  'group relative inline-flex items-center justify-center gap-2.5 font-gothic tracking-[0.14em] transition-colors duration-300';

const variants: Record<Variant, string> = {
  solid:
    'bg-gold text-ink hover:bg-ivory border border-gold hover:border-ivory',
  outline:
    'border border-gold/60 text-gold hover:bg-gold hover:text-ink hover:border-gold',
  ghost:
    'border border-ivory/25 text-ivory hover:border-gold hover:text-gold',
  bar: 'w-full bg-bordeaux text-ivory hover:bg-gold hover:text-ink border-t border-gold/40',
};

const sizes: Record<Size, string> = {
  sm: 'px-5 py-2.5 text-xs',
  md: 'px-8 py-3.5 text-sm',
  lg: 'px-10 py-5 text-sm md:text-base',
};

/** 外部リンクを示す控えめなアイコン */
function ExternalIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="size-3.5 shrink-0 opacity-70 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="square"
    >
      <path d="M6 2h8v8" />
      <path d="M14 2 6.5 9.5" />
      <path d="M11 10.5V14H2V5h3.5" />
    </svg>
  );
}

/**
 * TableCheck への予約導線。
 * すべての予約ボタンはこのコンポーネントを通すことで、
 * 遷移先・計測用 data 属性・外部リンク表記を一箇所で管理できる。
 */
export function ReservationButton({
  children,
  location,
  variant = 'solid',
  size = 'md',
  className = '',
  showExternalNote = false,
  fullWidth = false,
}: ReservationButtonProps) {
  const wrapper = [
    showExternalNote || fullWidth ? 'flex flex-col gap-2' : 'contents',
    fullWidth ? 'w-full' : 'items-start',
  ].join(' ');

  return (
    <span className={wrapper}>
      <a
        href={site.reservationUrl}
        target="_blank"
        rel="noopener noreferrer"
        data-cta="tablecheck"
        data-location={location}
        className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      >
        {children}
        <ExternalIcon />
      </a>
      {showExternalNote && (
        <span className="text-[0.75rem] tracking-[0.1em] text-ivory-dim">
          TableCheck の予約ページ（外部サイト）が開きます
        </span>
      )}
    </span>
  );
}
