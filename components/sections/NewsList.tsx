import Image from 'next/image';
import Link from 'next/link';
import { formatDate, type Article } from '@/data/news';

/** 記事一覧（/news）— 1件目を大きく、以降を横並びの行で見せる */
export function NewsList({ items }: { items: Article[] }) {
  const [lead, ...rest] = items;
  if (!lead) return null;

  return (
    <div>
      <article className="reveal group">
        <Link href={`/news/${lead.slug}`} className="grid gap-8 md:grid-cols-2 md:gap-14">
          <div className="relative aspect-[4/3] overflow-hidden md:aspect-[5/4]">
            <Image
              src={lead.photo.src}
              alt={lead.photo.alt}
              fill
              sizes="(min-width: 768px) 44vw, 92vw"
              className="object-cover transition-transform duration-[900ms] group-hover:scale-[1.03]"
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className="flex items-center gap-4 text-[0.75rem] text-ivory-dim">
              <time dateTime={lead.publishedAt} className="tabular-nums">
                {formatDate(lead.publishedAt)}
              </time>
              <span className="border border-gold/40 px-2.5 py-0.5 text-[0.7rem] tracking-[0.1em] text-gold">
                {lead.category}
              </span>
            </p>
            <h2 className="mt-5 text-[1.35rem] leading-[1.6] text-balance-ja text-ivory transition-colors group-hover:text-gold md:text-[1.75rem]">
              {lead.title}
            </h2>
            <p className="mt-5 text-[0.86rem] leading-[2] text-ivory-dim">
              {lead.summary}
            </p>
            <span className="latin mt-8 inline-flex items-center gap-3 text-[0.72rem] text-gold">
              READ MORE
              <span className="h-px w-10 bg-gold/60 transition-all duration-500 group-hover:w-16" />
            </span>
          </div>
        </Link>
      </article>

      {rest.length > 0 && (
        <ul className="mt-20 border-t border-ivory/12">
          {rest.map((a) => (
            <li key={a.slug} className="border-b border-ivory/12">
              <Link
                href={`/news/${a.slug}`}
                className="group grid items-center gap-6 py-7 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-10"
              >
                <div className="relative aspect-[16/10] overflow-hidden md:aspect-[4/3]">
                  <Image
                    src={a.photo.src}
                    alt={a.photo.alt}
                    fill
                    sizes="(min-width: 768px) 10rem, 92vw"
                    className="object-cover transition-transform duration-[900ms] group-hover:scale-[1.04]"
                  />
                </div>
                <div>
                  <p className="flex items-center gap-4 text-[0.74rem] text-ivory-dim">
                    <time dateTime={a.publishedAt} className="tabular-nums">
                      {formatDate(a.publishedAt)}
                    </time>
                    <span className="text-gold">{a.category}</span>
                  </p>
                  <h2 className="mt-3 text-[1.02rem] leading-[1.7] text-balance-ja text-ivory transition-colors group-hover:text-gold md:text-[1.15rem]">
                    {a.title}
                  </h2>
                  <p className="mt-3 line-clamp-2 text-[0.8rem] leading-[1.9] text-ivory-dim">
                    {a.summary}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** トップページ用の抜粋 */
export function NewsPreview({ items }: { items: Article[] }) {
  return (
    <ul className="border-t border-ivory/12">
      {items.map((a) => (
        <li key={a.slug} className="border-b border-ivory/12">
          <Link
            href={`/news/${a.slug}`}
            className="group grid items-center gap-5 py-6 md:grid-cols-[7rem_minmax(0,1fr)_auto] md:gap-8"
          >
            <p className="flex items-center gap-3 text-[0.74rem] text-ivory-dim md:flex-col md:items-start md:gap-1.5">
              <time dateTime={a.publishedAt} className="tabular-nums">
                {formatDate(a.publishedAt)}
              </time>
              <span className="text-gold">{a.category}</span>
            </p>
            <h3 className="text-[0.95rem] leading-[1.75] text-balance-ja text-ivory transition-colors group-hover:text-gold">
              {a.title}
            </h3>
            <span
              aria-hidden="true"
              className="hidden h-px w-8 bg-gold/50 transition-all duration-500 group-hover:w-14 md:block"
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
