import type { Metadata } from 'next';

import { pageMetadata } from '@/lib/seo';
import Image from 'next/image';
import Link from 'next/link';

import { photos } from '@/lib/images';
import { site } from '@/lib/site-config';
import { meats, meatsWithPhoto, meatsTextOnly, buffet, desserts } from '@/data/menu';
import { PageHero } from '@/components/ui/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CourseList } from '@/components/sections/CourseList';
import { ReservationCTA } from '@/components/sections/ReservationCTA';
import { ReservationLink } from '@/components/ui/ReservationLink';
import { JsonLd } from '@/components/ui/JsonLd';
import {
  breadcrumbWithId,
  graph,
  webPageSchema,
} from '@/lib/structured-data';

export const metadata: Metadata = pageMetadata({
  title: 'メニュー・料金｜新宿のシュラスコ食べ放題',
  description:
    '新宿・歌舞伎町のシュラスコ食べ放題コースの料金と内容。約15種類のシュラスコ、約30種類のサラダバービュッフェ、120分・150分の飲み放題付きプランを比較できます。お子様は5歳まで無料、6〜10歳は半額。',
  path: '/menu',
});

const crumbs = [
  { name: 'ホーム', href: '/' },
  { name: 'メニュー・料金', href: '/menu' },
];

const kindLabel: Record<string, string> = {
  牛: 'BEEF',
  豚: 'PORK',
  鶏: 'CHICKEN',
  その他: 'OTHERS',
};

export default function MenuPage() {
  return (
    <>
      <PageHero
        photo={photos.lineup}
        latin="MENU & COURSE"
        title="約15種のシュラスコと、約30種のサラダバー"
        lead="コースを選んでしまえば、あとは席につくだけ。シュラスコ食べ放題・サラダバービュッフェ・飲み放題を組みにしてご用意しています。"
        crumbs={crumbs}
      />

      {/* ページ内目次 */}
      <nav
        aria-label="メニュー内の項目"
        className="border-b border-ivory/12 bg-char"
      >
        <ul className="mx-auto flex max-w-[86rem] gap-7 overflow-x-auto px-5 py-5 md:px-9">
          {[
            { href: '#course', label: 'コース', latin: 'COURSE' },
            { href: '#churrasco', label: 'シュラスコ', latin: 'CHURRASCO' },
            { href: '#salad-bar', label: 'サラダバー', latin: 'SALAD BAR' },
            { href: '#dessert', label: 'デザート', latin: 'DESSERT' },
            { href: '#drink', label: 'ドリンク', latin: 'DRINK' },
          ].map((t) => (
            <li key={t.href} className="shrink-0">
              <a
                href={t.href}
                className="group flex flex-col gap-1 text-[0.8rem] text-ivory-2 transition-colors hover:text-gold"
              >
                {t.label}
                <span className="latin text-[0.7rem] text-gold-dim">
                  {t.latin}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* コース */}
      <section id="course" className="scroll-mt-24 bg-char py-24 md:py-32">
        <div className="mx-auto max-w-[86rem] px-5 md:px-9">
          <SectionHeading
            index="01"
            latin="COURSE"
            title="コースの選び方"
            lead="すべてのコースに、シュラスコ食べ放題、サラダバービュッフェ、飲み放題をセットにしてご用意しています。ひとりあたりの金額が先に決まるため、幹事の方にも見積もりを立てていただきやすい構成です。"
          />

          {/* 選び方の指針。価格の並びだけでは決めにくいため、目的から逆算できるようにする */}
          <div className="mt-14 grid gap-px md:grid-cols-2">
            <div className="border-t-2 border-gold/50 bg-char-2/40 px-6 py-9 md:px-9 md:py-11">
              <p className="latin text-[0.7rem] text-gold">120 MIN</p>
              <h3 className="mt-4 text-[1.15rem] text-ivory">
                120分が向く会
              </h3>
              <p className="mt-4 text-[0.87rem] leading-[2.05] text-ivory-dim">
                2〜6名のお食事、デート、平日の夕食。食べ放題と飲み放題を両方楽しむには、意外にちょうどよい長さです。当店の標準はこちらになります。
              </p>
            </div>
            <div className="border-t-2 border-gold/50 bg-char-2/40 px-6 py-9 md:px-9 md:py-11">
              <p className="latin text-[0.7rem] text-gold">150 MIN</p>
              <h3 className="mt-4 text-[1.15rem] text-ivory">
                150分が向く会
              </h3>
              <p className="mt-4 text-[0.87rem] leading-[2.05] text-ivory-dim">
                挨拶や余興のある宴会、歓送迎会、久しぶりに会う相手との食事。話す時間を取ると120分は早く過ぎます。飲み放題の種類も30種以上に広がります。
              </p>
            </div>
          </div>

          <dl className="mt-12 border-t border-ivory/12">
            {[
              {
                t: 'はじめての方',
                d: 'OPEN記念コース（5,980円）。厳選イチボのシュラスコとサラダバー、飲み放題が揃った、まず一度試すのに向く構成です。',
              },
              {
                t: '部位を一通り味わいたい方',
                d: 'レギュラーディナーコース（7,700円）。シュラスコ15種にデザートビュッフェが加わります。迷ったときの標準の一本です。',
              },
              {
                t: '誕生日・記念日',
                d: '誕生日・記念日コース（8,000円）。乾杯のスパークリングとメッセージ入りデザートプレートが含まれます。',
              },
              {
                t: '宴会・歓送迎会',
                d: 'プレミアムディナーコース（8,800円・150分）。挨拶や余興の時間を見込めます。40名様からは貸切もご相談ください。',
              },
              {
                t: '早い時間に始めたい方',
                d: '早割ディナーコース（5,500円）。16時〜17時のご入店限定で、内容は変えずに価格が下がります。',
              },
            ].map((r) => (
              <div
                key={r.t}
                className="grid gap-2 border-b border-ivory/12 py-6 sm:grid-cols-[14rem_minmax(0,1fr)] sm:gap-8"
              >
                <dt className="font-mincho text-[0.98rem] text-gold">{r.t}</dt>
                <dd className="text-[0.87rem] leading-[2] text-ivory-2">
                  {r.d}
                </dd>
              </div>
            ))}
          </dl>

          {/* お子様料金 */}
          <div className="mt-12 border-l-2 border-gold/50 bg-char-2/50 px-6 py-8 md:px-9">
            <h3 className="text-[1.05rem] text-ivory">お子様料金</h3>
            <dl className="mt-5 flex flex-wrap gap-x-12 gap-y-4">
              {site.childPolicy.rules.map((r) => (
                <div key={r.age} className="flex items-baseline gap-3">
                  <dt className="text-[0.85rem] text-ivory-dim">{r.age}</dt>
                  <dd className="font-mincho text-[1.2rem] text-gold">
                    {r.price}
                  </dd>
                </div>
              ))}
            </dl>
            <Link
              href="/family"
              className="mt-6 inline-block text-[0.85rem] text-gold link-underline"
            >
              子連れでのご利用について詳しく見る
            </Link>
          </div>

          <div className="mt-16">
            <CourseList />
          </div>
        </div>
      </section>

      {/* シュラスコ */}
      <section id="churrasco" className="scroll-mt-24 bg-ink py-24 md:py-32">
        <div className="mx-auto max-w-[86rem] px-5 md:px-9">
          <SectionHeading
            index="02"
            latin="CHURRASCO"
            title={`シュラスコ 約${site.counts.churrasco}種`}
            lead="厳選牛を中心に、豚肉、鶏肉、ソーセージ。さらに焼きチーズや焼きパイナップル、ポンデケージョも串で焼き上げます。焼き上がったものから順にお持ちします。"
          />

          {/* 写真ありの品目 */}
          <div className="mt-16 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {meatsWithPhoto.map((m) => (
              <article key={m.name} className="reveal">
                <Image
                  src={m.photo!.src}
                  alt={m.photo!.alt}
                  width={m.photo!.width}
                  height={m.photo!.height}
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="mt-5">
                  <p className="latin flex items-center gap-3 text-[0.7rem] text-gold">
                    <span>{kindLabel[m.kind]}</span>
                    <span className="h-px w-4 bg-gold/40" />
                    <span className="text-gold-dim">{m.latin}</span>
                  </p>
                  <h3 className="mt-3 text-[1.08rem] text-ivory">{m.name}</h3>
                  <p className="mt-3 text-[0.83rem] leading-[1.95] text-ivory-dim">
                    {m.description}
                  </p>
                </div>
              </article>
            ))}
          </div>

          {/* 写真なしの品目は一覧で */}
          {meatsTextOnly.length > 0 && (
            <div className="mt-16 border-t border-ivory/12 pt-12">
              <p className="latin text-[0.7rem] text-gold">ALSO SERVED</p>
              <ul className="mt-7 grid gap-x-12 gap-y-8 md:grid-cols-3">
                {meatsTextOnly.map((m) => (
                  <li key={m.name}>
                    <p className="latin text-[0.7rem] text-gold-dim">
                      {m.latin}
                    </p>
                    <h3 className="mt-2 text-[1rem] text-ivory">
                      {m.name}
                      <span className="ml-3 align-middle text-[0.7rem] tracking-[0.1em] text-gold-dim">
                        {m.kind}
                      </span>
                    </h3>
                    <p className="mt-2.5 text-[0.8rem] leading-[1.9] text-ivory-dim">
                      {m.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <p className="mt-10 text-[0.75rem] leading-relaxed text-ivory-dim">
            ※ 仕入れの状況により、当日ご提供する部位が変わる場合があります。全{meats.length}種のうち、その日にご用意できるものを順にお持ちします。
          </p>

          <div className="mt-8">
            <Link
              href="/churrasco"
              className="latin group inline-flex items-center gap-4 text-[0.74rem] text-gold"
            >
              ABOUT CHURRASCO
              <span className="h-px w-10 bg-gold/60 transition-all duration-500 group-hover:w-16" />
            </Link>
          </div>
        </div>
      </section>

      {/* サラダバー */}
      <section
        id="salad-bar"
        className="scroll-mt-24 bg-ivory py-24 text-brown md:py-32"
      >
        <div className="mx-auto max-w-[86rem] px-5 md:px-9">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center lg:gap-20">
            <div>
              <SectionHeading
                index="03"
                latin="SALAD BAR & BUFFET"
                title={`サラダバービュッフェ 約${site.counts.saladBar}種`}
                lead="葉物や豆のサラダ、クスクスのほか、フェイジョアーダやガーリックライスといったブラジルの家庭料理、温かいスープや副菜まで並びます。すべてのコースに含まれます。"
                tone="light"
              />
            </div>
            <div className="reveal">
              <Image
                src={photos.saladBar.src}
                alt={photos.saladBar.alt}
                width={photos.saladBar.width}
                height={photos.saladBar.height}
                sizes="(min-width: 1024px) 52vw, 92vw"
                className="w-full object-cover"
              />
            </div>
          </div>

          <div className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {buffet.map((b) => (
              <article key={b.name} className="reveal">
                {b.photo && (
                  <Image
                    src={b.photo.src}
                    alt={b.photo.alt}
                    width={b.photo.width}
                    height={b.photo.height}
                    sizes="(min-width: 1024px) 22vw, (min-width: 640px) 46vw, 92vw"
                    className="aspect-[4/3] w-full object-cover"
                  />
                )}
                <h3 className="mt-4 text-[0.98rem] text-brown">{b.name}</h3>
                <p className="mt-2.5 text-[0.8rem] leading-[1.9] text-brown/70">
                  {b.description}
                </p>
              </article>
            ))}
          </div>

          <p className="mt-10 text-[0.75rem] leading-relaxed text-brown/60">
            ※ 掲載しているのは代表的な一例です。内容は日によって変わります。
          </p>
        </div>
      </section>

      {/* デザート */}
      <section id="dessert" className="scroll-mt-24 bg-char py-24 md:py-32">
        <div className="mx-auto max-w-[86rem] px-5 md:px-9">
          <SectionHeading
            index="04"
            latin="DESSERT"
            title="デザートビュッフェ"
            lead="レギュラーディナーコースにはデザートビュッフェが付きます。誕生日・記念日コースでは、メッセージ入りのデザートプレートをご用意します。"
          />

          <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-3">
            {desserts.map((d) => (
              <article key={d.name} className="reveal">
                {d.photo && (
                  <Image
                    src={d.photo.src}
                    alt={d.photo.alt}
                    width={d.photo.width}
                    height={d.photo.height}
                    sizes="(min-width: 640px) 30vw, 92vw"
                    className="aspect-[4/3] w-full object-cover"
                  />
                )}
                <h3 className="mt-4 text-[0.98rem] text-ivory">{d.name}</h3>
                <p className="mt-2.5 text-[0.8rem] leading-[1.9] text-ivory-dim">
                  {d.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ドリンク */}
      <section id="drink" className="scroll-mt-24 bg-ink py-24 md:py-32">
        <div className="mx-auto max-w-[86rem] px-5 md:px-9">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-20">
            <div className="reveal grid grid-cols-2 gap-px">
              <Image
                src={photos.beerTaps.src}
                alt={photos.beerTaps.alt}
                width={photos.beerTaps.width}
                height={photos.beerTaps.height}
                sizes="(min-width: 1024px) 26vw, 46vw"
                className="aspect-square w-full object-cover"
              />
              <Image
                src={photos.cheers.src}
                alt={photos.cheers.alt}
                width={photos.cheers.width}
                height={photos.cheers.height}
                sizes="(min-width: 1024px) 26vw, 46vw"
                className="aspect-square w-full object-cover"
              />
              <Image
                src={photos.lineup.src}
                alt={photos.lineup.alt}
                width={photos.lineup.width}
                height={photos.lineup.height}
                sizes="(min-width: 1024px) 52vw, 92vw"
                className="col-span-2 aspect-[16/9] w-full object-cover"
              />
            </div>

            <div className="reveal">
              <SectionHeading
                index="05"
                latin="DRINK"
                title="すべてのコースに、飲み放題を"
                lead="コースにより120分または150分の飲み放題が付きます。プレミアムディナーコースでは、TOKYO CRAFT を含むビールなど30種以上からお選びいただけます。"
              />
              <ul className="mt-9 space-y-3.5 border-t border-ivory/12 pt-8">
                {[
                  'ビール（TOKYO CRAFT を含むラインナップ／プレミアムディナーコース）',
                  '赤・白ワイン',
                  'ブラジルらしいフルーツを使ったドリンク',
                  'ソフトドリンク',
                ].map((d) => (
                  <li
                    key={d}
                    className="flex gap-4 text-[0.86rem] leading-[1.9] text-ivory-2"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[0.75em] h-px w-3.5 shrink-0 bg-gold/60"
                    />
                    {d}
                  </li>
                ))}
              </ul>
              <p className="mt-7 text-[0.75rem] leading-relaxed text-ivory-dim">
                ※ 飲み放題の内容はコースにより異なります。詳細は TableCheck の各プランをご確認ください。
              </p>
              <div className="mt-9">
                <ReservationLink
                  location="menu"
                  variant="outline"
                  size="md"
                >
                  コースを選んで予約する
                </ReservationLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ReservationCTA
        location="menu"
        photo={photos.skewerTable}
        objectPosition="center 60%"
        label="コースを選んで予約する"
        title={
          <>
            コースを選んで、
            <br />
            あとは席につくだけ。
          </>
        }
        lead="内容・価格は変更になる場合があります。最新のプラン内容と空席状況は、TableCheck の予約ページでご確認ください。"
      />

      <JsonLd data={graph(
          breadcrumbWithId(crumbs, '/menu'),
          webPageSchema({
            path: '/menu',
            name: metadata.title as string,
            description: metadata.description as string,
            primaryImage: '/images/churrasco-lineup.webp',
          })
        )} />
    </>
  );
}
