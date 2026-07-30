import Link from 'next/link';
import type { Block } from '@/data/news';
import { ReservationButton } from '@/components/ui/ReservationButton';

/** 記事本文のレンダラー。ブロック種別ごとに意味のある HTML を出力する。 */
export function ArticleBody({
  blocks,
  ctaLocation,
}: {
  blocks: Block[];
  ctaLocation: string;
}) {
  return (
    <div className="space-y-7">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'h2':
            return (
              <h2
                key={i}
                className="!mt-16 border-l-2 border-gold pl-5 text-[1.25rem] leading-[1.7] text-balance-ja text-ivory md:text-[1.5rem]"
              >
                {block.text}
              </h2>
            );

          case 'h3':
            return (
              <h3
                key={i}
                className="!mt-12 text-[1.02rem] leading-[1.75] text-balance-ja text-gold md:text-[1.15rem]"
              >
                {block.text}
              </h3>
            );

          case 'p':
            return (
              <p key={i} className="text-[0.92rem] leading-[2.15] text-ivory-2">
                {block.text}
              </p>
            );

          case 'ul':
            return (
              <ul key={i} className="!mt-8 space-y-3.5 border-y border-ivory/12 py-7">
                {block.items.map((it) => (
                  <li
                    key={it}
                    className="flex gap-4 text-[0.88rem] leading-[1.95] text-ivory-2"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[0.75em] h-px w-3.5 shrink-0 bg-gold/70"
                    />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            );

          case 'note':
            return (
              <p
                key={i}
                className="border-l border-gold/40 bg-char-2/60 py-4 pl-5 text-[0.82rem] leading-[1.95] text-ivory-dim"
              >
                {block.text}
              </p>
            );

          case 'link':
            return (
              <aside
                key={i}
                className="!mt-10 border border-ivory/15 bg-char-2/50 p-6 md:p-8"
              >
                <p className="text-[0.86rem] leading-[1.95] text-ivory-2">
                  {block.text}
                </p>
                <Link
                  href={block.href}
                  className="latin group mt-5 inline-flex items-center gap-3 text-[0.74rem] text-gold"
                >
                  {block.label}
                  <span className="h-px w-9 bg-gold/60 transition-all duration-500 group-hover:w-14" />
                </Link>
              </aside>
            );

          case 'cta':
            return (
              <aside
                key={i}
                className="!mt-12 border-t-2 border-gold bg-gradient-to-b from-bordeaux-deep/40 to-transparent p-7 md:p-9"
              >
                <p className="text-[0.88rem] leading-[1.95] text-ivory-2">
                  {block.text}
                </p>
                <div className="mt-6">
                  <ReservationButton
                    location={ctaLocation}
                    variant="solid"
                    size="md"
                    showExternalNote
                  >
                    {block.label}
                  </ReservationButton>
                </div>
              </aside>
            );
        }
      })}
    </div>
  );
}
