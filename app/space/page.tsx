import type { Metadata } from 'next';

import { pageMetadata } from '@/lib/seo';
import Image from 'next/image';
import Link from 'next/link';

import { photos } from '@/lib/images';
import { PageHero } from '@/components/ui/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ReservationCTA } from '@/components/sections/ReservationCTA';
import { occasions } from '@/data/occasions';
import { JsonLd } from '@/components/ui/JsonLd';
import {
  breadcrumbWithId,
  graph,
  webPageSchema,
} from '@/lib/structured-data';

export const metadata: Metadata = pageMetadata({
  title: '店内・お席｜新宿の夜景を望むソファー席',
  description:
    '歌舞伎町のビル7階。新宿の夜景を望む窓際のソファー席、こもり感のあるボックス席、大人数向けのテーブル席をご紹介します。デートや女子会、会社宴会など、人数と目的に合わせてご案内します。',
  path: '/space',
});

const crumbs = [
  { name: 'ホーム', href: '/' },
  { name: '店内・お席', href: '/space' },
];

const seats = [
  {
    n: '01',
    latin: 'WINDOW SOFA',
    t: '窓際のソファー席',
    people: '2〜6名様',
    b: 'ビルの7階から、歌舞伎町の灯りと高層ビルの夜景を見渡せるお席です。マーブル調のテーブルと革張りのソファーを組み合わせ、隣席との距離にも余裕を持たせています。デートや記念日のご利用に選ばれることの多い場所です。',
    photo: photos.seatWindowBooth,
  },
  {
    n: '02',
    latin: 'BOX SOFA',
    t: 'ボックスソファー席',
    people: '4〜10名様',
    b: '両側をソファーで囲んだ、こもり感のあるお席です。ペンダントライトを低く落としているため、周囲の視線が気になりません。荷物を置いても窮屈にならないので、女子会やご家族でのお食事にも向いています。',
    photo: photos.seatLargeBooth,
  },
  {
    n: '03',
    latin: 'ROUND TABLE',
    t: 'ラウンドテーブル席',
    people: '4〜8名様',
    b: '曲線のマーブルテーブルを囲むお席です。角がないぶん、全員の顔が見えて会話が回りやすい形になっています。少人数の集まりや、久しぶりに会う方とのお食事に。',
    photo: photos.seatMarbleRound,
  },
  {
    n: '04',
    latin: 'TABLE ROW',
    t: '窓沿いのテーブル席',
    people: '10〜40名様',
    b: '窓に沿って並ぶテーブル席です。人数に応じてつなげてご案内できる場合があり、会社の宴会や歓送迎会、同窓会などの大人数のご利用に対応します。40名様からは貸切のご相談も承ります。',
    photo: photos.seatTableRow,
  },
];

export default function SpacePage() {
  return (
    <>
      <PageHero
        photo={photos.seatLargeBooth}
        latin="SPACE"
        title="新宿の夜景と、こもれるソファー席。"
        lead="歌舞伎町のビルの7階。賑やかな街のなかにありながら、席についてしまえば落ち着いて過ごせる場所を目指しました。"
        crumbs={crumbs}
        objectPosition="center 55%"
      />

      {/* 空間について */}
      <section className="bg-char py-24 md:py-32">
        <div className="mx-auto max-w-[86rem] px-5 md:px-9">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center lg:gap-20">
            <div className="reveal">
              <SectionHeading
                index="01"
                latin="THE ROOM"
                title="7階から見える、新宿の夜"
              />
              <div className="mt-9 space-y-6 text-[0.92rem] leading-[2.15] text-ivory-2">
                <p>
                  窓の外には、高層ビルの灯りと歌舞伎町の街明かりが広がります。日が落ちてからの時間帯は、店内の照明を落としているため、外の光がいっそう際立ちます。
                </p>
                <p>
                  内装には、深い色みのマーブルと真鍮色の照明を組み合わせました。明るすぎない光の下では、焼き上がった肉の断面がよく映えます。写真を撮っていかれる方が多いのも、この照明のためかもしれません。
                </p>
              </div>
            </div>

            <div className="reveal">
              <Image
                src={photos.viewNight.src}
                alt={photos.viewNight.alt}
                width={photos.viewNight.width}
                height={photos.viewNight.height}
                sizes="(min-width: 1024px) 52vw, 92vw"
                className="w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 席の種類 */}
      <section className="bg-ink py-24 md:py-32">
        <div className="mx-auto max-w-[86rem] px-5 md:px-9">
          <SectionHeading
            index="02"
            latin="SEATING"
            title="お席のご案内"
            lead="人数とご利用目的に応じてお席をご案内します。ご希望がある場合は、TableCheck でのご予約時に備考欄へお書き添えください。"
          />

          <div className="mt-16 space-y-px">
            {seats.map((s, i) => (
              <article
                key={s.n}
                className={`reveal grid items-center gap-8 bg-char-2/40 md:gap-14 ${
                  i % 2 === 0
                    ? 'md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]'
                    : 'md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]'
                }`}
              >
                <div className={i % 2 === 0 ? '' : 'md:order-2'}>
                  <Image
                    src={s.photo.src}
                    alt={s.photo.alt}
                    width={s.photo.width}
                    height={s.photo.height}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="aspect-[16/11] w-full object-cover"
                  />
                </div>

                <div
                  className={`px-6 pb-10 md:px-10 md:py-12 ${
                    i % 2 === 0 ? '' : 'md:order-1'
                  }`}
                >
                  <p className="latin flex items-center gap-3 text-[0.7rem] text-gold">
                    <span className="tabular-nums">{s.n}</span>
                    <span className="h-px w-5 bg-gold/40" />
                    <span>{s.latin}</span>
                  </p>
                  <h3 className="mt-4 text-[1.3rem] text-ivory md:text-[1.5rem]">
                    {s.t}
                  </h3>
                  <p className="mt-3 text-[0.72rem] tracking-[0.08em] text-gold-dim">
                    目安 {s.people}
                  </p>
                  <p className="mt-5 text-[0.88rem] leading-[2.05] text-ivory-dim">
                    {s.b}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 border-l-2 border-gold/50 bg-char-2/50 px-6 py-7 md:px-9">
            <p className="text-[0.86rem] leading-[2.05] text-ivory-2">
              当店に完全な個室はございませんが、ソファーと照明の配置により、周囲を気にせず過ごしやすい構成にしています。半個室のようなこもり感のあるお席をご希望の場合は、人数と時間帯によってご相談を承りますので、ご予約時にお知らせください。
            </p>
          </div>
        </div>
      </section>

      {/* シーン別の席選び */}
      <section className="bg-ivory py-24 text-brown md:py-32">
        <div className="mx-auto max-w-[86rem] px-5 md:px-9">
          <SectionHeading
            index="03"
            latin="BY OCCASION"
            title="どのお席を選ぶか"
            lead="ご利用の目的によって、過ごしやすいお席は変わります。迷われたときの目安としてご覧ください。"
            tone="light"
          />

          <ul className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {occasions.slice(0, 6).map((o) => (
              <li key={o.id} className="reveal border-t border-brown/15 pt-7">
                <p className="latin text-[0.7rem] text-bordeaux">{o.latin}</p>
                <h3 className="mt-3 text-[1.02rem] text-brown">{o.label}</h3>
                <p className="mt-2 text-[0.7rem] tracking-[0.06em] text-brown/50">
                  目安 {o.people}
                </p>
                <p className="mt-4 text-[0.83rem] leading-[1.95] text-brown/70">
                  {o.points[1]?.body ?? o.lead}
                </p>
                <Link
                  href={`/occasions#${o.id}`}
                  className="latin group mt-5 inline-flex items-center gap-3 text-[0.7rem] text-bordeaux"
                >
                  DETAIL
                  <span className="h-px w-8 bg-bordeaux/50 transition-all duration-500 group-hover:w-12" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-14">
            <Link
              href="/occasions"
              className="latin group inline-flex items-center gap-4 text-[0.74rem] text-bordeaux"
            >
              ALL OCCASIONS
              <span className="h-px w-10 bg-bordeaux/50 transition-all duration-500 group-hover:w-16" />
            </Link>
          </div>
        </div>
      </section>

      <ReservationCTA
        location="space"
        photo={photos.seatMarbleRound}
        objectPosition="center 45%"
        label="空席を確認する"
        title={
          <>
            席のご希望も、
            <br />
            あわせてご相談ください。
          </>
        }
        lead="お席のご希望は、TableCheck でのご予約時に備考欄へお書き添えください。人数と時間帯によって、可能な範囲でご用意します。"
      />

      <JsonLd data={graph(
          breadcrumbWithId(crumbs, '/space'),
          webPageSchema({
            path: '/space',
            name: metadata.title as string,
            description: metadata.description as string,
            primaryImage: '/images/seat-window-booth.webp',
          })
        )} />
    </>
  );
}
