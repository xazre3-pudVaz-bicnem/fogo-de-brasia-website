import Link from 'next/link';
import type { Crumb } from '@/lib/structured-data';

/** パンくずリスト。構造化データは各ページ側で breadcrumbSchema から出力する。 */
export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="パンくずリスト" className="overflow-x-auto">
      <ol className="flex items-center gap-2 whitespace-nowrap text-[0.75rem] tracking-[0.06em] text-ivory-dim">
        {crumbs.map((c, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={c.href} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="text-gold">
                  {c.name}
                </span>
              ) : (
                <>
                  <Link
                    href={c.href}
                    className="transition-colors hover:text-gold"
                  >
                    {c.name}
                  </Link>
                  <span aria-hidden="true" className="text-ivory-dim/50">
                    ／
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
