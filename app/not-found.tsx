import Image from 'next/image';
import Link from 'next/link';

import { photos } from '@/lib/images';
import { nav } from '@/lib/site-config';
import { ReservationButton } from '@/components/ui/ReservationButton';

export const metadata = {
  title: 'ページが見つかりません',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[90svh] flex-col justify-center overflow-hidden pt-28">
      <Image
        src={photos.picanhaSide.src}
        alt={photos.picanhaSide.alt}
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-ink/85"
      />

      <div className="mx-auto w-full max-w-[86rem] px-5 py-20 md:px-9">
        <p className="latin text-[0.74rem] text-gold">404 — NOT FOUND</p>

        <h1 className="mt-6 font-mincho text-[1.7rem] leading-[1.55] text-balance-ja text-ivory md:text-[2.4rem]">
          お探しのページが
          <br />
          見つかりませんでした。
        </h1>

        <p className="mt-7 max-w-lg text-[0.9rem] leading-[2.05] text-ivory-2">
          ページのURLが変更されたか、削除された可能性があります。お手数ですが、下記のページからお探しください。
        </p>

        <nav aria-label="サイト内の主なページ" className="mt-12">
          <ul className="grid max-w-3xl gap-x-10 gap-y-3.5 sm:grid-cols-2 lg:grid-cols-3">
            <li>
              <Link
                href="/"
                className="group inline-flex items-center gap-3 text-[0.86rem] text-ivory-2 transition-colors hover:text-gold"
              >
                <span
                  aria-hidden="true"
                  className="h-px w-4 bg-gold/50 transition-all duration-500 group-hover:w-7"
                />
                トップページ
              </Link>
            </li>
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group inline-flex items-center gap-3 text-[0.86rem] text-ivory-2 transition-colors hover:text-gold"
                >
                  <span
                    aria-hidden="true"
                    className="h-px w-4 bg-gold/50 transition-all duration-500 group-hover:w-7"
                  />
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/party"
                className="group inline-flex items-center gap-3 text-[0.86rem] text-ivory-2 transition-colors hover:text-gold"
              >
                <span
                  aria-hidden="true"
                  className="h-px w-4 bg-gold/50 transition-all duration-500 group-hover:w-7"
                />
                宴会・貸切・記念日
              </Link>
            </li>
          </ul>
        </nav>

        <div className="mt-14">
          <ReservationButton location="404" variant="outline" size="md">
            空席を確認する
          </ReservationButton>
        </div>
      </div>
    </section>
  );
}
