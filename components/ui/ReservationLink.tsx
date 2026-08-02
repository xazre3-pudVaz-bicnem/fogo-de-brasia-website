import { site } from '@/lib/site-config';

/**
 * TableCheck への予約導線。すべての予約リンクはこのコンポーネントを通す。
 *
 * ・遷移先・外部リンク属性・計測用 data 属性を一箇所で管理する
 * ・Server Component のままにして、初回 JavaScript を増やさない
 * ・クリック計測は components/analytics/CtaTracker.tsx が
 *   document 全体への委譲リスナー 1 つでまとめて処理する
 *   （ボタンごとに use client を付けるとその分だけ JS が増えるため）
 */

/** GA4 の計測ロケーション。増やすときはここに追加する */
export type CtaLocation =
  | 'home'
  | 'header'
  | 'hero'
  | 'course'
  | 'menu'
  | 'anniversary'
  | 'family'
  | 'party'
  | 'space'
  | 'access'
  | 'occasions'
  | 'article'
  | 'about'
  | 'churrasco'
  | 'news'
  | 'blog'
  | 'footer'
  | 'mobile-fixed'
  | 'mobile-menu'
  | 'not-found';

type Variant = 'solid' | 'outline' | 'ghost' | 'bar';
type Size = 'sm' | 'md' | 'lg';

export type ReservationLinkProps = {
  children: React.ReactNode;
  /** 計測用。ページ内のどこに置いたボタンか */
  location: CtaLocation;
  /** コース単位のボタンではコース名を渡す（GA4 の course_name になる） */
  courseName?: string;
  /** コース個別の予約URLがある場合に上書きする */
  href?: string;
  /** 読み上げ用のラベル。省略時は文言から自動生成 */
  ariaLabel?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** 外部リンクであることを示す補助表記を出すか */
  showExternalNote?: boolean;
  /** 親要素の幅いっぱいに広げる */
  fullWidth?: boolean;
};

const baseClass =
  'group relative inline-flex items-center justify-center gap-2.5 font-gothic tracking-[0.14em] transition-colors duration-300';

const variants: Record<Variant, string> = {
  solid: 'bg-gold text-ink hover:bg-ivory border border-gold hover:border-ivory',
  outline:
    'border border-gold/60 text-gold hover:bg-gold hover:text-ink hover:border-gold',
  ghost: 'border border-ivory/25 text-ivory hover:border-gold hover:text-gold',
  bar: 'w-full bg-bordeaux text-ivory hover:bg-gold hover:text-ink border-t border-gold/40',
};

const sizes: Record<Size, string> = {
  sm: 'px-5 py-2.5 text-xs',
  md: 'px-8 py-3.5 text-sm',
  lg: 'px-10 py-5 text-sm md:text-base',
};

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

export function ReservationLink({
  children,
  location,
  courseName,
  href,
  ariaLabel,
  variant = 'solid',
  size = 'md',
  className = '',
  showExternalNote = false,
  fullWidth = false,
}: ReservationLinkProps) {
  const url = href ?? site.tableCheckUrl;

  const label =
    ariaLabel ??
    (courseName
      ? `${courseName}をTableCheckで予約する（外部サイト）`
      : 'TableCheckで予約する（外部サイト）');

  const wrapper = [
    showExternalNote || fullWidth ? 'flex flex-col gap-2' : 'contents',
    fullWidth ? 'w-full' : 'items-start',
  ].join(' ');

  return (
    <span className={wrapper}>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        data-cta="tablecheck"
        data-location={location}
        {...(courseName ? { 'data-course': courseName } : {})}
        className={`${baseClass} ${variants[variant]} ${sizes[size]} ${className}`}
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
