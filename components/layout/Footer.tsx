import Link from 'next/link';
import { nav, publicOpeningHours, publicPhone, site } from '@/lib/site-config';
import { LogoFull } from '@/components/ui/Wordmark';
import { ReservationLink } from '@/components/ui/ReservationLink';

export function Footer() {
  return (
    <footer className="border-t border-gold/20 bg-ink">
      <div className="mx-auto max-w-[86rem] px-5 py-16 md:px-9 md:py-20">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_auto]">
          {/* 店舗情報 */}
          <div>
            <div>
              <LogoFull width={168} />
              <p className="mt-5 text-[0.9rem] tracking-[0.06em] text-ivory-2">
                {site.name}
              </p>
            </div>

            <dl className="mt-10 space-y-4 text-[0.84rem] leading-[1.9]">
              <div className="flex gap-5">
                <dt className="w-16 shrink-0 text-gold-dim">所在地</dt>
                <dd className="text-ivory-2">
                  {site.address.full}
                  <br />
                  <span className="text-ivory-dim">
                    新宿駅 徒歩約3分 / 西武新宿駅 徒歩約4分
                  </span>
                </dd>
              </div>

              <div className="flex gap-5">
                <dt className="w-16 shrink-0 text-gold-dim">営業時間</dt>
                <dd className="text-ivory-2">
                  {publicOpeningHours ? (
                    <>
                      {publicOpeningHours.text}
                      <br />
                      <span className="text-ivory-dim">
                        {publicOpeningHours.closedDays}
                      </span>
                    </>
                  ) : (
                    <span className="text-ivory-dim">
                      最新の営業時間は TableCheck の予約ページをご確認ください。
                    </span>
                  )}
                </dd>
              </div>

              {publicPhone && (
                <div className="flex gap-5">
                  <dt className="w-16 shrink-0 text-gold-dim">電話</dt>
                  <dd>
                    <a
                      href={`tel:${publicPhone.tel}`}
                      data-cta="tel"
                      data-location="footer"
                      className="tabular-nums text-ivory-2 link-underline"
                    >
                      {publicPhone.value}
                    </a>
                  </dd>
                </div>
              )}

              <div className="flex gap-5">
                <dt className="w-16 shrink-0 text-gold-dim">ご予約</dt>
                <dd className="text-ivory-2">TableCheck にて24時間受付</dd>
              </div>
            </dl>

            <div className="mt-9 flex flex-wrap items-center gap-6">
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="latin group inline-flex items-center gap-2.5 text-[0.75rem] text-ivory-2 transition-colors hover:text-gold"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="size-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.3"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle
                    cx="17.5"
                    cy="6.5"
                    r="1"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
                INSTAGRAM
              </a>
              <a
                href={site.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="latin inline-flex items-center gap-2.5 text-[0.75rem] text-ivory-2 transition-colors hover:text-gold"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="size-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.3"
                >
                  <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
                GOOGLE MAPS
              </a>
            </div>
          </div>

          {/* サイト内リンク */}
          <div className="lg:pl-16">
            <p className="latin text-[0.72rem] text-gold">SITE MAP</p>
            <nav aria-label="フッターナビゲーション" className="mt-6">
              <ul className="grid grid-cols-2 gap-x-10 gap-y-3.5 text-[0.82rem] sm:grid-cols-2 lg:grid-cols-1">
                <li>
                  <Link
                    href="/"
                    className="text-ivory-2 transition-colors hover:text-gold"
                  >
                    トップページ
                  </Link>
                </li>
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-ivory-2 transition-colors hover:text-gold"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/party"
                    className="text-ivory-2 transition-colors hover:text-gold"
                  >
                    宴会・貸切・記念日
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-ivory-2 transition-colors hover:text-gold"
                  >
                    プライバシーポリシー
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="mt-9">
              <ReservationLink location="footer" variant="outline" size="sm">
                TableCheckで予約する
              </ReservationLink>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-ivory/10 pt-7">
          <p className="latin text-[0.7rem] tracking-[0.2em] text-ivory-dim">
            © {new Date().getFullYear()} {site.brandLatin} SHINJUKU. ALL RIGHTS
            RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}
