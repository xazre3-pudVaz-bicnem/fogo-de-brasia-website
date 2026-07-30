import type { Metadata } from 'next';

import { pageMetadata } from '@/lib/seo';
import Image from 'next/image';
import Link from 'next/link';

import { photos } from '@/lib/images';
import { publicOpeningHours, publicPhone, site } from '@/lib/site-config';
import { faqAccess } from '@/data/faq';
import { PageHero } from '@/components/ui/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Faq } from '@/components/ui/Faq';
import { ReservationCTA } from '@/components/sections/ReservationCTA';
import { ReservationButton } from '@/components/ui/ReservationButton';
import { JsonLd } from '@/components/ui/JsonLd';
import { breadcrumbSchema, faqSchema, graph } from '@/lib/structured-data';

export const metadata: Metadata = pageMetadata({
  title: 'アクセス・店舗情報｜新宿駅から徒歩約3分',
  description:
    'シュラスコテーブル FOGO De BRASIA 新宿へのアクセス。〒160-0021 東京都新宿区歌舞伎町1-6-7 7F。新宿駅から徒歩約3分、西武新宿駅から徒歩約4分。駅からの道順、歌舞伎町内での位置、地図をご案内します。',
  path: '/access',
});

const crumbs = [
  { name: 'ホーム', href: '/' },
  { name: 'アクセス', href: '/access' },
];

const routes = [
  {
    station: '新宿駅',
    minutes: '徒歩約3分',
    latin: 'FROM SHINJUKU STA.',
    steps: [
      '新宿駅の東口を出ます。',
      '正面の靖国通りを渡り、歌舞伎町方面へ進みます。',
      '歌舞伎町一番街の入口を目印に、区役所通り方向へ。',
      '歌舞伎町1-6-7のビルに到着します。エレベーターで7階へお上がりください。',
    ],
  },
  {
    station: '西武新宿駅',
    minutes: '徒歩約4分',
    latin: 'FROM SEIBU-SHINJUKU STA.',
    steps: [
      '西武新宿駅の南口を出ます。',
      '歌舞伎町の中心方向へ進みます。',
      '新宿駅方面より人通りが少なく、歩きやすい道のりです。',
      '歌舞伎町1-6-7のビルに到着します。エレベーターで7階へお上がりください。',
    ],
  },
];

export default function AccessPage() {
  return (
    <>
      <PageHero
        photo={photos.viewNight}
        latin="ACCESS"
        title="新宿駅から徒歩約3分、歌舞伎町のビル7階。"
        lead="新宿駅と西武新宿駅の両方から歩けるため、複数路線でお集まりいただく会にも向いた立地です。"
        crumbs={crumbs}
      />

      {/* 店舗情報 */}
      <section className="bg-char py-24 md:py-32">
        <div className="mx-auto max-w-[86rem] px-5 md:px-9">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-20">
            <div>
              <SectionHeading index="01" latin="INFORMATION" title="店舗情報" />

              <dl className="mt-10 border-t border-ivory/12 text-[0.88rem]">
                {[
                  { t: '店名', d: site.name },
                  {
                    t: '所在地',
                    d: (
                      <>
                        〒{site.address.postalCode}
                        <br />
                        {site.address.region}
                        {site.address.city}
                        {site.address.street} {site.address.floor}
                      </>
                    ),
                  },
                  {
                    t: '最寄駅',
                    d: (
                      <>
                        新宿駅 徒歩約3分
                        <br />
                        西武新宿駅 徒歩約4分
                      </>
                    ),
                  },
                  {
                    t: '営業時間',
                    d: publicOpeningHours ? (
                      <>
                        {publicOpeningHours.text}
                        <br />
                        {publicOpeningHours.closed}
                      </>
                    ) : (
                      <span className="text-ivory-dim">
                        最新の営業時間・定休日は、TableCheck
                        の予約ページでご確認ください。
                      </span>
                    ),
                  },
                  ...(publicPhone
                    ? [
                        {
                          t: '電話番号',
                          d: (
                            <a
                              href={`tel:${publicPhone.tel}`}
                              data-cta="tel"
                              data-location="access"
                              className="tabular-nums text-ivory-2 link-underline"
                            >
                              {publicPhone.value}
                            </a>
                          ),
                        },
                      ]
                    : []),
                  {
                    t: 'ご予約',
                    d: 'TableCheck にて24時間受付（お電話でのご予約は営業時間内に承ります）',
                  },
                  {
                    t: '料理',
                    d: 'シュラスコ、ブラジル料理、ステーキ',
                  },
                  {
                    t: 'ご予算',
                    d: `${site.priceRange}（コースにより異なります）`,
                  },
                ].map((row, i) => (
                  <div
                    key={i}
                    className="flex flex-col gap-2 border-b border-ivory/12 py-6 sm:flex-row sm:gap-10"
                  >
                    <dt className="w-24 shrink-0 text-gold-dim">{row.t}</dt>
                    <dd className="leading-[1.95] text-ivory-2">{row.d}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-10 flex flex-wrap gap-4">
                <ReservationButton
                  location="access-info"
                  variant="solid"
                  size="md"
                >
                  空席を確認する
                </ReservationButton>
                <a
                  href={site.googleMapsSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 border border-ivory/25 px-6 py-3.5 text-[0.8rem] tracking-[0.1em] text-ivory transition-colors hover:border-gold hover:text-gold"
                >
                  Googleマップで開く
                </a>
              </div>
            </div>

            {/* 地図 */}
            <div className="reveal">
              <div className="aspect-[4/3] w-full bg-char-2 md:aspect-square">
                <iframe
                  src={site.googleMapsEmbedUrl}
                  title={`${site.name}の地図（東京都新宿区歌舞伎町1-6-7）`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="size-full"
                />
              </div>
              <p className="mt-4 text-[0.75rem] leading-relaxed text-ivory-dim">
                地図は住所（東京都新宿区歌舞伎町1-6-7）で表示しています。ビルの7階が当店です。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 駅からの道順 */}
      <section className="bg-ink py-24 md:py-32">
        <div className="mx-auto max-w-[86rem] px-5 md:px-9">
          <SectionHeading
            index="02"
            latin="ROUTE"
            title="駅からの道順"
            lead="新宿駅からも西武新宿駅からも徒歩圏内です。人通りの多い時間帯は、西武新宿駅からのほうが歩きやすいこともあります。"
          />

          <div className="mt-16 grid gap-px md:grid-cols-2">
            {routes.map((r) => (
              <div
                key={r.station}
                className="reveal border-t border-gold/25 bg-char-2/40 px-6 py-10 md:px-10 md:py-12"
              >
                <p className="latin text-[0.7rem] text-gold">{r.latin}</p>
                <h3 className="mt-4 text-[1.25rem] text-ivory">
                  {r.station}から
                  <span className="ml-3 align-middle text-[0.8rem] text-gold">
                    {r.minutes}
                  </span>
                </h3>

                <ol className="mt-8 space-y-5">
                  {r.steps.map((step, i) => (
                    <li key={step} className="flex gap-5">
                      <span className="latin mt-0.5 shrink-0 text-[0.72rem] text-gold-dim tabular-nums">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <p className="text-[0.86rem] leading-[1.95] text-ivory-dim">
                        {step}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 歌舞伎町内での位置 */}
      <section className="bg-ivory py-24 text-brown md:py-32">
        <div className="mx-auto max-w-[86rem] px-5 md:px-9">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
            <div>
              <SectionHeading
                index="03"
                latin="IN KABUKICHO"
                title="歌舞伎町の、どのあたりか"
                tone="light"
              />
              <div className="mt-9 space-y-6 text-[0.9rem] leading-[2.1] text-brown/80">
                <p>
                  当店があるのは歌舞伎町1丁目、新宿駅東口と西武新宿駅のあいだのエリアです。歌舞伎町一番街や区役所通りからもほど近く、新宿三丁目方面からも歩いてお越しいただけます。
                </p>
                <p>
                  ビルの7階のため、通り沿いから店内は見えません。エントランスからエレベーターでお上がりください。上層階にあるぶん、窓際のお席からは新宿の夜景をご覧いただけます。
                </p>
                <p>
                  待ち合わせには、新宿駅東口や歌舞伎町一番街の入口が分かりやすい目印になります。遠方から来られる方にも説明しやすい場所です。
                </p>
              </div>

              <div className="mt-10">
                <Link
                  href="/space"
                  className="latin group inline-flex items-center gap-4 text-[0.74rem] text-bordeaux"
                >
                  VIEW SPACE
                  <span className="h-px w-10 bg-bordeaux/50 transition-all duration-500 group-hover:w-16" />
                </Link>
              </div>
            </div>

            <div className="reveal">
              <Image
                src={photos.seatWindowBooth.src}
                alt={photos.seatWindowBooth.alt}
                width={photos.seatWindowBooth.width}
                height={photos.seatWindowBooth.height}
                sizes="(min-width: 1024px) 48vw, 92vw"
                className="w-full object-cover"
              />
              <p className="mt-4 text-[0.75rem] leading-relaxed text-brown/60">
                7階の窓際のお席から見える、歌舞伎町の夜。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-char py-24 md:py-32">
        <div className="mx-auto max-w-[86rem] px-5 md:px-9">
          <div className="grid gap-12 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-20">
            <SectionHeading
              index="04"
              latin="FAQ"
              title="アクセスに関するご質問"
            />
            <Faq items={faqAccess} />
          </div>
        </div>
      </section>

      <ReservationCTA
        location="access-footer"
        photo={photos.viewNight}
        label="空席を確認する"
        title={
          <>
            新宿駅から、
            <br />
            歩いて3分。
          </>
        }
      />

      <JsonLd data={graph(breadcrumbSchema(crumbs), faqSchema(faqAccess))} />
    </>
  );
}
