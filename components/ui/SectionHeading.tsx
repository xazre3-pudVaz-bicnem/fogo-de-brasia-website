/**
 * セクション見出し。
 * 通し番号 + 英字ラベル + 日本語見出しの三層で構成し、
 * 全ページで同じリズムをつくる。
 */
export function SectionHeading({
  index,
  latin,
  title,
  lead,
  as: As = 'h2',
  align = 'left',
  tone = 'dark',
}: {
  index?: string;
  latin: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3';
  align?: 'left' | 'center';
  tone?: 'dark' | 'light';
}) {
  const muted = tone === 'dark' ? 'text-ivory-dim' : 'text-brown/70';
  const strong = tone === 'dark' ? 'text-ivory' : 'text-brown';

  return (
    <div className={align === 'center' ? 'text-center' : ''}>
      <p
        className={`latin flex items-center gap-3 text-[0.74rem] text-gold ${
          align === 'center' ? 'justify-center' : ''
        }`}
      >
        {index && <span className="tabular-nums opacity-70">{index}</span>}
        <span className="h-px w-8 bg-gold/50" />
        <span>{latin}</span>
      </p>
      <As
        className={`mt-5 text-[1.6rem] leading-[1.6] text-balance-ja md:text-[2.1rem] ${strong}`}
      >
        {title}
      </As>
      {lead && (
        <p
          className={`mt-6 max-w-2xl text-[0.94rem] leading-[2.05] ${muted} ${
            align === 'center' ? 'mx-auto' : ''
          }`}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
