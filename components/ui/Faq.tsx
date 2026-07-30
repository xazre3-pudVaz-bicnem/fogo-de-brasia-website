import type { FaqItem } from '@/data/faq';

/**
 * FAQ。details/summary を使い、JavaScript なしで開閉できるようにしている。
 * ここで表示している内容と FAQPage 構造化データは同一データから生成する。
 */
export function Faq({
  items,
  tone = 'dark',
}: {
  items: FaqItem[];
  tone?: 'dark' | 'light';
}) {
  const border = tone === 'dark' ? 'border-ivory/12' : 'border-brown/15';
  const q = tone === 'dark' ? 'text-ivory' : 'text-brown';
  const a = tone === 'dark' ? 'text-ivory-dim' : 'text-brown/75';

  return (
    <div className={`border-t ${border}`}>
      {items.map((item) => (
        <details
          key={item.q}
          name="faq"
          className={`group border-b ${border} [&_summary::-webkit-details-marker]:hidden`}
        >
          <summary className="flex cursor-pointer list-none items-start gap-5 py-6 pr-2">
            <span className="latin mt-1 shrink-0 text-[0.72rem] text-gold">
              Q
            </span>
            <span
              className={`flex-1 font-mincho text-[0.98rem] leading-[1.8] ${q}`}
            >
              {item.q}
            </span>
            <span
              aria-hidden="true"
              className="relative mt-2.5 size-3 shrink-0"
            >
              <span
                className={`absolute inset-x-0 top-1/2 h-px ${
                  tone === 'dark' ? 'bg-gold' : 'bg-brown/60'
                }`}
              />
              <span
                className={`absolute inset-y-0 left-1/2 w-px transition-transform duration-300 group-open:rotate-90 group-open:opacity-0 ${
                  tone === 'dark' ? 'bg-gold' : 'bg-brown/60'
                }`}
              />
            </span>
          </summary>
          <div className="flex items-start gap-5 pb-7 pr-8">
            <span className="latin shrink-0 text-[0.72rem] text-gold-dim">
              A
            </span>
            <p className={`flex-1 text-[0.88rem] leading-[2.05] ${a}`}>
              {item.a}
            </p>
          </div>
        </details>
      ))}
    </div>
  );
}
