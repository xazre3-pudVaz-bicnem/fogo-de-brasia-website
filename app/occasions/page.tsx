import type { Metadata } from 'next';

import { pageMetadata } from '@/lib/seo';
import Image from 'next/image';
import Link from 'next/link';

import { photos } from '@/lib/images';
import { occasions } from '@/data/occasions';
import { PageHero } from '@/components/ui/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ReservationCTA } from '@/components/sections/ReservationCTA';
import { ReservationButton } from '@/components/ui/ReservationButton';
import { JsonLd } from '@/components/ui/JsonLd';
import { breadcrumbSchema, graph } from '@/lib/structured-data';

export const metadata: Metadata = pageMetadata({
  title: '利用シーン｜新宿のデート・誕生日・女子会・宴会',
  description:
    'デート、誕生日・記念日、女子会、ご家族での食事、友人とのディナー、会社宴会、歓送迎会、同窓会、大人数の貸切。新宿・歌舞伎町のシュラスコ店FOGO De BRASIA 新宿を、目的別にご案内します。',
  path: '/occasions',
});

const crumbs = [
  { name: 'ホーム', href: '/' },
  { name: '利用シーン', href: '/occasions' },
];

export default function OccasionsPage() {
  return (
    <>
      <PageHero
        photo={photos.cheers}
        latin="OCCASIONS"
        title="どんな日にも、焼きたてを。"
        lead="切り分ける量をその場で調整できるシュラスコは、人数と目的が変わっても対応しやすい食事です。目的別に、知っておくと役立つことをまとめました。"
        crumbs={crumbs}
        objectPosition="center 40%"
      />

      {/* 目次 */}
      <nav
        aria-label="利用シーンの一覧"
        className="border-b border-ivory/12 bg-char"
      >
        <ul className="mx-auto flex max-w-[86rem] gap-6 overflow-x-auto px-5 py-5 md:px-9">
          {occasions.map((o, i) => (
            <li key={o.id} className="shrink-0">
              <a
                href={`#${o.id}`}
                className="flex items-baseline gap-2.5 text-[0.8rem] text-ivory-2 transition-colors hover:text-gold"
              >
                <span className="latin text-[0.7rem] text-gold tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {o.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* 各シーン */}
      {occasions.map((o, i) => {
        const light = i % 2 === 1;
        return (
          <section
            key={o.id}
            id={o.id}
            className={`scroll-mt-20 py-20 md:py-28 ${
              light ? 'bg-ivory text-brown' : 'bg-char'
            }`}
          >
            <div className="mx-auto max-w-[86rem] px-5 md:px-9">
              <div
                className={`grid gap-12 lg:gap-20 ${
                  i % 2 === 0
                    ? 'lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]'
                    : 'lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]'
                }`}
              >
                <div className={i % 2 === 0 ? '' : 'lg:order-2'}>
                  <SectionHeading
                    index={String(i + 1).padStart(2, '0')}
                    latin={o.latin}
                    title={o.heading}
                    as="h2"
                    tone={light ? 'light' : 'dark'}
                  />
                  <p
                    className={`mt-4 text-[0.72rem] tracking-[0.08em] ${
                      light ? 'text-bordeaux' : 'text-gold-dim'
                    }`}
                  >
                    目安 {o.people}
                  </p>
                  <p
                    className={`mt-7 text-[0.92rem] leading-[2.15] ${
                      light ? 'text-brown/80' : 'text-ivory-2'
                    }`}
                  >
                    {o.lead}
                  </p>

                  <dl
                    className={`mt-10 space-y-6 border-t pt-8 ${
                      light ? 'border-brown/15' : 'border-ivory/12'
                    }`}
                  >
                    {o.points.map((pt) => (
                      <div
                        key={pt.title}
                        className="flex flex-col gap-2 sm:flex-row sm:gap-8"
                      >
                        <dt
                          className={`w-20 shrink-0 font-mincho text-[0.9rem] ${
                            light ? 'text-bordeaux' : 'text-gold'
                          }`}
                        >
                          {pt.title}
                        </dt>
                        <dd
                          className={`text-[0.85rem] leading-[1.95] ${
                            light ? 'text-brown/70' : 'text-ivory-dim'
                          }`}
                        >
                          {pt.body}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-10">
                    <ReservationButton
                      location={`occasions-${o.id}`}
                      variant={light ? 'solid' : 'outline'}
                      size="md"
                    >
                      {o.id === 'birthday'
                        ? '誕生日・記念日プランを予約する'
                        : o.id === 'private' || o.id === 'company'
                          ? '宴会・貸切を相談する'
                          : '空席を確認する'}
                    </ReservationButton>
                  </div>
                </div>

                {o.photo && (
                  <div
                    className={`reveal ${i % 2 === 0 ? '' : 'lg:order-1'}`}
                  >
                    <Image
                      src={o.photo.src}
                      alt={o.photo.alt}
                      width={o.photo.width}
                      height={o.photo.height}
                      sizes="(min-width: 1024px) 48vw, 92vw"
                      className="w-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          </section>
        );
      })}

      {/* 関連ページ */}
      <section className="bg-ink py-20 md:py-24">
        <div className="mx-auto max-w-[86rem] px-5 md:px-9">
          <p className="latin text-[0.72rem] text-gold">RELATED</p>
          <ul className="mt-8 grid gap-px md:grid-cols-3">
            {[
              {
                href: '/party',
                latin: 'PARTY & PRIVATE',
                t: '宴会・貸切・記念日',
                b: '10名様以上の宴会、40名様からの貸切、記念日のご利用について、人数別にご案内しています。',
              },
              {
                href: '/space',
                latin: 'SPACE',
                t: '店内・個室',
                b: '窓際のソファー席、ボックス席、ラウンドテーブル席など、お席の種類をご紹介しています。',
              },
              {
                href: '/menu',
                latin: 'MENU & COURSE',
                t: 'メニュー・コース',
                b: 'シュラスコ約15種、サラダバー約30種、飲み放題付きコースの内容と料金です。',
              },
            ].map((r) => (
              <li key={r.href}>
                <Link
                  href={r.href}
                  className="group flex h-full flex-col gap-4 border-t border-gold/25 bg-char-2/40 px-6 py-9 transition-colors hover:bg-char-2 md:px-8"
                >
                  <p className="latin text-[0.7rem] text-gold">{r.latin}</p>
                  <h2 className="text-[1.08rem] text-ivory transition-colors group-hover:text-gold">
                    {r.t}
                  </h2>
                  <p className="text-[0.82rem] leading-[1.95] text-ivory-dim">
                    {r.b}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ReservationCTA
        location="occasions-footer"
        photo={photos.lineup}
        label="空席を確認する"
        title={
          <>
            人数とご希望を、
            <br />
            お聞かせください。
          </>
        }
      />

      <JsonLd data={graph(breadcrumbSchema(crumbs))} />
    </>
  );
}
