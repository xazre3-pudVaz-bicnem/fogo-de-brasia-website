import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { photos } from '@/lib/images';
import { publicOpeningHours, publicPhone, site } from '@/lib/site-config';
import { meats } from '@/data/menu';
import { occasions } from '@/data/occasions';
import { faqGeneral } from '@/data/faq';
import { articles } from '@/data/news';

import { Hero } from '@/components/sections/Hero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CoursePreview } from '@/components/sections/CourseList';
import { NewsPreview } from '@/components/sections/NewsList';
import { ReservationCTA } from '@/components/sections/ReservationCTA';
import { ReservationButton } from '@/components/ui/ReservationButton';
import { Faq } from '@/components/ui/Faq';
import { JsonLd } from '@/components/ui/JsonLd';
import { faqSchema, graph } from '@/lib/structured-data';

export const metadata: Metadata = {
  // レイアウトの default タイトルをそのまま使う
  alternates: { canonical: '/' },
};

/** 見出し脇に添える縦組みの英字ラベル */
function VerticalLabel({ text }: { text: string }) {
  return (
    <span
      aria-hidden="true"
      className="vertical-label hidden text-[0.7rem] text-gold-dim lg:block"
    >
      {text}
    </span>
  );
}

function MoreLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="latin group inline-flex items-center gap-4 text-[0.74rem] text-gold"
    >
      {children}
      <span className="h-px w-10 bg-gold/60 transition-all duration-500 group-hover:w-16" />
    </Link>
  );
}

export default function HomePage() {
  const featuredMeats = [
    meats[0], // ピッカーニャ
    meats[6], // コステラ・デ・ボイ
    meats[12], // 焼きチーズ
    meats[10], // リングイッサ
    meats[8], // 鶏もも肉
    meats[13], // 焼きパイナップル
  ];

  return (
    <>
      <Hero />

      {/* ── 02 コンセプト ─────────────────────────── */}
      <section className="bg-char py-24 md:py-32">
        <div className="mx-auto max-w-[86rem] px-5 md:px-9">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center lg:gap-20">
            <div className="reveal order-2 lg:order-1">
              <SectionHeading
                index="01"
                latin="CONCEPT"
                title={
                  <>
                    炎が引き出す、
                    <br />
                    肉本来の旨さ。
                  </>
                }
              />
              <div className="mt-9 space-y-6 text-[0.92rem] leading-[2.15] text-ivory-2">
                <p>
                  ブラジル南部の牧場で生まれたシュラスコは、塩だけを頼りに、火と時間で肉を仕上げる料理です。わたしたちは専用のロースターでじっくりと焼き上げ、その一本を、焼きたてのまま席までお持ちします。
                </p>
                <p>
                  お客様の目の前で、お好みの量だけを切り分ける。切り分けられた一枚が皿に落ちる、その瞬間からがごちそうです。歌舞伎町のビルの7階で、新宿の夜景とともにお楽しみください。
                </p>
              </div>

              <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-ivory/12 pt-9 sm:grid-cols-3">
                {[
                  { n: `約${site.counts.churrasco}`, u: '種', l: 'シュラスコ' },
                  { n: `約${site.counts.saladBar}`, u: '種', l: 'サラダバー' },
                  { n: '3', u: '分', l: '新宿駅から徒歩' },
                ].map((s) => (
                  <div key={s.l}>
                    <p className="font-mincho text-[2.1rem] leading-none text-gold tabular-nums">
                      {s.n}
                      <span className="ml-1 text-[0.9rem]">{s.u}</span>
                    </p>
                    <p className="mt-3 text-[0.72rem] tracking-[0.08em] text-ivory-dim">
                      {s.l}
                    </p>
                  </div>
                ))}
              </dl>
            </div>

            <div className="reveal relative order-1 lg:order-2">
              <Image
                src={photos.seatWindowBooth.src}
                alt={photos.seatWindowBooth.alt}
                width={photos.seatWindowBooth.width}
                height={photos.seatWindowBooth.height}
                sizes="(min-width: 1024px) 48vw, 92vw"
                className="h-full w-full object-cover"
              />
              {/* 重ねた小さな写真で非対称にする */}
              <div className="absolute -bottom-10 -left-6 hidden w-44 border-4 border-char lg:block xl:w-56">
                <Image
                  src={photos.flambeCheese.src}
                  alt={photos.flambeCheese.alt}
                  width={photos.flambeCheese.width}
                  height={photos.flambeCheese.height}
                  sizes="14rem"
                  className="w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 03 シュラスコとは（全面写真バンド） ───────── */}
      <section className="relative isolate overflow-hidden">
        <Image
          src={photos.passador.src}
          alt={photos.passador.alt}
          width={photos.passador.width}
          height={photos.passador.height}
          sizes="100vw"
          className="absolute inset-0 -z-10 size-full object-cover object-[70%_center] md:object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/92 via-ink/70 to-ink/25"
        />

        <div className="mx-auto max-w-[86rem] px-5 py-28 md:px-9 md:py-36">
          <div className="max-w-lg">
            <SectionHeading
              index="02"
              latin="WHAT IS CHURRASCO"
              title={
                <>
                  焼きたてを、
                  <br />
                  目の前で。
                </>
              }
            />
            <div className="mt-9 space-y-6 text-[0.92rem] leading-[2.15] text-ivory-2">
              <p>
                スタッフが長い串を持ってテーブルを回り、焼き上がったばかりの肉を切り分けます。欲しいときに受け、いらないときは断る。それだけで食事が進んでいきます。
              </p>
              <p>
                部位ごとに脂の付き方も繊維の向きも違うため、一本ごとに味わいが変わります。厚さや焼き加減のご希望も、その場でお伝えください。
              </p>
            </div>
            <div className="mt-10">
              <MoreLink href="/churrasco">ABOUT CHURRASCO</MoreLink>
            </div>
          </div>
        </div>
      </section>

      {/* ── 04 FOGO De BRASIA の特徴 ───────────────── */}
      <section className="bg-ivory py-24 text-brown md:py-32">
        <div className="mx-auto max-w-[86rem] px-5 md:px-9">
          <div className="flex items-start gap-10">
            <VerticalLabel text="FEATURES" />
            <div className="min-w-0 flex-1">
              <SectionHeading
                index="03"
                latin="FEATURES"
                title="わたしたちが大切にしていること"
                tone="light"
              />

              <div className="mt-14 grid gap-x-14 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    n: '01',
                    t: '専用ロースターで焼き上げる',
                    b: '注文を受けてから焼くのではなく、常に火のそばで肉が回っています。だからこそ、焼き上がった瞬間の一枚が席に届きます。',
                  },
                  {
                    n: '02',
                    t: 'スタッフが席まで運ぶ',
                    b: '取り分けの当番も、料理を待つ時間もいりません。焼きたての串を持ったスタッフが、テーブルを順に回ります。',
                  },
                  {
                    n: '03',
                    t: '目の前で、好みの量を',
                    b: '切り分ける厚さも量も、その場で調整します。食べる量に差があるグループでも、それぞれのペースを保てます。',
                  },
                  {
                    n: '04',
                    t: `厳選牛を中心に約${site.counts.churrasco}種`,
                    b: '牛の各部位に加え、豚肉、鶏肉、ソーセージ。焼きチーズや焼きパイナップル、ポンデケージョも串で焼き上げます。',
                  },
                  {
                    n: '05',
                    t: `約${site.counts.saladBar}種のサラダバー`,
                    b: '葉物や豆のサラダ、ヴィナグレッチ、フェイジョアーダなどのブラジル家庭料理まで。肉の合間を整える一皿が並びます。',
                  },
                  {
                    n: '06',
                    t: '飲み放題付きのコース',
                    b: '各コースに飲み放題が付きます。プレミアムディナーコースでは、TOKYO CRAFT を含む30種以上からお選びいただけます。',
                  },
                ].map((f) => (
                  <div key={f.n} className="reveal">
                    <p className="latin text-[0.72rem] text-bordeaux tabular-nums">
                      {f.n}
                    </p>
                    <h3 className="mt-4 text-[1.05rem] leading-[1.7] text-brown">
                      {f.t}
                    </h3>
                    <p className="mt-4 text-[0.85rem] leading-[2] text-brown/70">
                      {f.b}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-16">
                <Link
                  href="/about"
                  className="latin group inline-flex items-center gap-4 text-[0.74rem] text-bordeaux"
                >
                  ABOUT US
                  <span className="h-px w-10 bg-bordeaux/50 transition-all duration-500 group-hover:w-16" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 05 シュラスコのラインナップ ───────────────── */}
      <section className="bg-char py-24 md:py-32">
        <div className="mx-auto max-w-[86rem] px-5 md:px-9">
          <div className="grid gap-x-12 gap-y-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
            <SectionHeading
              index="04"
              latin="CHURRASCO LINE-UP"
              title={
                <>
                  厳選牛から、
                  <br className="sm:hidden" />
                  焼きチーズまで。
                </>
              }
              lead={`ピッカーニャをはじめとする牛の各部位に、豚肉、鶏肉、ソーセージ。焼きチーズや焼きパイナップル、ポンデケージョも加えた約${site.counts.churrasco}種類を、順にお持ちします。`}
            />
            <div className="lg:pt-2">
              <MoreLink href="/menu">
                VIEW ALL {site.counts.churrasco} ITEMS
              </MoreLink>
            </div>
          </div>

          {/* 大きな1枚 + グリッド の非対称構成 */}
          <div className="mt-16 grid gap-px lg:grid-cols-3">
            <div className="reveal relative lg:col-span-2 lg:row-span-2">
              <Image
                src={photos.lineup.src}
                alt={photos.lineup.alt}
                width={photos.lineup.width}
                height={photos.lineup.height}
                sizes="(min-width: 1024px) 62vw, 92vw"
                /* 右上のロゴが途中で切れないよう、左寄せでトリミングする */
                className="h-full w-full object-cover object-center lg:object-left"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/65 to-transparent p-6 pt-16 md:p-9 md:pt-20">
                <p className="latin text-[0.7rem] text-gold">SIGNATURE</p>
                <p className="mt-2 font-mincho text-[1.1rem] text-ivory md:text-[1.35rem]">
                  一本ずつ、味わいが変わる
                </p>
              </div>
            </div>

            {featuredMeats.slice(0, 2).map((m) => (
              <figure key={m.name} className="reveal relative">
                <Image
                  src={m.photo!.src}
                  alt={m.photo!.alt}
                  width={m.photo!.width}
                  height={m.photo!.height}
                  sizes="(min-width: 1024px) 31vw, 46vw"
                  className="aspect-4/3 w-full object-cover"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/70 to-transparent px-5 pb-4 pt-14">
                  <p className="text-[0.86rem] text-ivory">{m.name}</p>
                  <p className="latin text-[0.7rem] text-gold-dim">{m.latin}</p>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-px grid grid-cols-2 gap-px lg:grid-cols-4">
            {featuredMeats.slice(2).map((m) => (
              <figure key={m.name} className="reveal relative">
                <Image
                  src={m.photo!.src}
                  alt={m.photo!.alt}
                  width={m.photo!.width}
                  height={m.photo!.height}
                  sizes="(min-width: 1024px) 23vw, 46vw"
                  className="aspect-square w-full object-cover"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/70 to-transparent px-5 pb-4 pt-14">
                  <p className="text-[0.86rem] text-ivory">{m.name}</p>
                  <p className="latin text-[0.7rem] text-gold-dim">{m.latin}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── 06 サラダバー・ブラジル料理 ───────────────── */}
      <section className="bg-brown/25 py-24 md:py-32">
        <div className="mx-auto max-w-[86rem] px-5 md:px-9">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-20">
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

            <div className="reveal">
              <SectionHeading
                index="05"
                latin="SALAD BAR & BUFFET"
                title={
                  <>
                    肉を、
                    <br className="sm:hidden" />
                    最後までおいしく。
                  </>
                }
                lead={`約${site.counts.saladBar}種類のサラダとビュッフェ料理。葉物や豆のサラダ、クスクスのほか、フェイジョアーダやガーリックライスなどブラジルの家庭料理も並びます。`}
              />

              <div className="mt-10 grid grid-cols-3 gap-px">
                {[photos.vinagrete, photos.feijoada, photos.saladGreen].map(
                  (ph) => (
                    <Image
                      key={ph.src}
                      src={ph.src}
                      alt={ph.alt}
                      width={ph.width}
                      height={ph.height}
                      sizes="(min-width: 1024px) 15vw, 30vw"
                      className="aspect-square w-full object-cover"
                    />
                  )
                )}
              </div>

              <p className="mt-8 text-[0.85rem] leading-[2] text-ivory-dim">
                肉の合間に酸味のある一皿を挟むと、また食べ進められます。サラダバーは箸休めではなく、シュラスコを最後まで楽しむための仕掛けです。
              </p>

              <div className="mt-9">
                <MoreLink href="/menu#salad-bar">VIEW SALAD BAR</MoreLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 07 コース ─────────────────────────────── */}
      <section className="bg-char py-24 md:py-32">
        <div className="mx-auto max-w-[86rem] px-5 md:px-9">
          <SectionHeading
            index="06"
            latin="COURSE"
            title="コースを選んで、あとは席につくだけ"
            lead="シュラスコ食べ放題・サラダバービュッフェ・飲み放題を組みにしたコースをご用意しています。ひとりあたりの金額が先に決まるので、幹事の方にも選びやすい構成です。"
          />

          <div className="mt-14">
            <CoursePreview location="home-course" />
          </div>

          <p className="mt-8 text-[0.72rem] leading-relaxed text-ivory-dim">
            ※
            表示価格はすべて税込です。内容・価格は変更になる場合があります。最新情報は
            TableCheck 予約ページをご確認ください。
          </p>
        </div>
      </section>

      {/* ── 08 店内・個室 ─────────────────────────── */}
      <section className="bg-ink py-24 md:py-32">
        <div className="mx-auto max-w-[86rem] px-5 md:px-9">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
            <div className="reveal lg:pt-16">
              <SectionHeading
                index="07"
                latin="SPACE"
                title={
                  <>
                    新宿の夜景と、
                    <br />
                    落ち着いたソファー席。
                  </>
                }
                lead="ビルの7階から見えるのは、歌舞伎町の灯りと高層ビルの夜景。マーブル調のテーブルとソファーを組み合わせた、こもり感のあるお席をご用意しています。"
              />
              <div className="mt-10">
                <MoreLink href="/space">VIEW SPACE</MoreLink>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-px">
              <Image
                src={photos.seatLargeBooth.src}
                alt={photos.seatLargeBooth.alt}
                width={photos.seatLargeBooth.width}
                height={photos.seatLargeBooth.height}
                sizes="(min-width: 1024px) 30vw, 46vw"
                className="reveal aspect-square w-full object-cover"
              />
              <Image
                src={photos.seatMarbleRound.src}
                alt={photos.seatMarbleRound.alt}
                width={photos.seatMarbleRound.width}
                height={photos.seatMarbleRound.height}
                sizes="(min-width: 1024px) 30vw, 46vw"
                className="reveal aspect-square w-full object-cover"
              />
              <Image
                src={photos.viewNight.src}
                alt={photos.viewNight.alt}
                width={photos.viewNight.width}
                height={photos.viewNight.height}
                sizes="(min-width: 1024px) 60vw, 92vw"
                className="reveal col-span-2 aspect-[16/9] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 09 利用シーン ─────────────────────────── */}
      <section className="bg-char py-24 md:py-32">
        <div className="mx-auto max-w-[86rem] px-5 md:px-9">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <SectionHeading
              index="08"
              latin="OCCASIONS"
              title="どんな日に、使われているか"
              lead="デートや誕生日から、会社の宴会や同窓会まで。切り分ける量を調整できるシュラスコは、人数と目的が変わっても対応しやすい食事です。"
            />
            <MoreLink href="/occasions">ALL OCCASIONS</MoreLink>
          </div>

          <ul className="mt-14 grid gap-px sm:grid-cols-2 lg:grid-cols-3">
            {occasions.slice(0, 6).map((o, i) => (
              <li key={o.id} className="reveal">
                <Link
                  href={`/occasions#${o.id}`}
                  className="group flex h-full flex-col justify-between gap-8 border-t border-ivory/12 bg-char-2/40 px-6 py-9 transition-colors hover:bg-char-2 md:px-8 md:py-11"
                >
                  <div>
                    <p className="latin flex items-center gap-3 text-[0.7rem] text-gold">
                      <span className="tabular-nums">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="h-px w-5 bg-gold/40" />
                      <span>{o.latin}</span>
                    </p>
                    <h3 className="mt-5 text-[1.15rem] text-ivory transition-colors group-hover:text-gold">
                      {o.label}
                    </h3>
                    <p className="mt-4 line-clamp-3 text-[0.82rem] leading-[1.95] text-ivory-dim">
                      {o.lead}
                    </p>
                  </div>
                  <p className="text-[0.75rem] tracking-[0.08em] text-gold-dim">
                    目安 {o.people}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 10 誕生日・記念日 ─────────────────────── */}
      <section className="relative isolate overflow-hidden bg-bordeaux-deep">
        <div className="mx-auto grid max-w-[86rem] items-stretch gap-0 lg:grid-cols-2">
          <div className="reveal relative min-h-[52vw] lg:min-h-[34rem]">
            <Image
              src={photos.fondant.src}
              alt={photos.fondant.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col justify-center px-5 py-20 md:px-14 md:py-24">
            <SectionHeading
              index="09"
              latin="ANNIVERSARY"
              title={
                <>
                  大切な人と囲む、
                  <br />
                  焼きたてのごちそう。
                </>
              }
            />
            <div className="mt-9 space-y-6 text-[0.92rem] leading-[2.15] text-ivory-2">
              <p>
                誕生日・記念日コースには、旬のフルーツを使ったスパークリングの乾杯ドリンクと、メッセージ入りのデザートプレートが含まれます。
              </p>
              <p>
                お持ちするタイミングやメッセージの内容は、ご予約時の備考欄にお書き添えください。照明を落とした店内では、プレートのキャンドルがよく映えます。
              </p>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
              <ReservationButton
                location="home-anniversary"
                variant="solid"
                size="md"
              >
                誕生日・記念日プランを予約する
              </ReservationButton>
              <MoreLink href="/party">PARTY & ANNIVERSARY</MoreLink>
            </div>
          </div>
        </div>
      </section>

      {/* ── 11 宴会・貸切 ─────────────────────────── */}
      <section className="bg-char py-24 md:py-32">
        <div className="mx-auto max-w-[86rem] px-5 md:px-9">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-20">
            <div className="reveal order-2 lg:order-1">
              <Image
                src={photos.feast.src}
                alt={photos.feast.alt}
                width={photos.feast.width}
                height={photos.feast.height}
                sizes="(min-width: 1024px) 52vw, 92vw"
                className="w-full object-cover"
              />
            </div>

            <div className="reveal order-1 lg:order-2">
              <SectionHeading
                index="10"
                latin="PARTY & PRIVATE"
                title="幹事の手間が、少ない宴会を"
                lead="取り分けはスタッフが行い、料理は順に運ばれます。コースと飲み放題が組みになっているので、ひとりあたりの金額が先に決まります。"
              />

              <dl className="mt-10 space-y-5 border-t border-ivory/12 pt-8">
                {[
                  {
                    t: '10〜40名様',
                    d: '会社宴会・歓送迎会・同窓会に。ソファー席をつなげてご案内できる場合があります。',
                  },
                  {
                    t: '40名様〜',
                    d: '貸切のご相談を承ります。料理・お飲み物・お時間まであわせて組み立てます。',
                  },
                ].map((r) => (
                  <div
                    key={r.t}
                    className="flex flex-col gap-2 sm:flex-row sm:gap-8"
                  >
                    <dt className="w-28 shrink-0 font-mincho text-[0.95rem] text-gold">
                      {r.t}
                    </dt>
                    <dd className="text-[0.85rem] leading-[1.95] text-ivory-dim">
                      {r.d}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-10">
                <MoreLink href="/party">PARTY & PRIVATE HIRE</MoreLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 12 ギャラリー ─────────────────────────── */}
      <section className="bg-ink py-24 md:py-32">
        <div className="mx-auto max-w-[86rem] px-5 md:px-9">
          <SectionHeading index="11" latin="GALLERY" title="店内と料理" />

          <div className="mt-14 grid grid-cols-2 gap-px md:grid-cols-4">
            {[
              photos.picanhaRoastBeer,
              photos.grilledPineapple,
              photos.seatTableRow,
              photos.beerTaps,
              photos.paoDeQueijo,
              photos.skewerTable,
              photos.garlicBread,
              photos.tiramisu,
            ].map((ph) => (
              <Image
                key={ph.src}
                src={ph.src}
                alt={ph.alt}
                width={ph.width}
                height={ph.height}
                sizes="(min-width: 768px) 24vw, 48vw"
                className="reveal aspect-square w-full object-cover"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── 13 お知らせ・コラム ───────────────────── */}
      <section className="bg-char py-24 md:py-32">
        <div className="mx-auto max-w-[86rem] px-5 md:px-9">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <SectionHeading
              index="12"
              latin="NEWS & COLUMN"
              title="お知らせ・コラム"
              lead="シュラスコの楽しみ方や、新宿でのお店選びに役立つ話題をお届けしています。"
            />
            <MoreLink href="/news">ALL ARTICLES</MoreLink>
          </div>

          <div className="mt-12">
            <NewsPreview items={articles.slice(0, 4)} />
          </div>
        </div>
      </section>

      {/* ── 14 アクセス ───────────────────────────── */}
      <section className="bg-ivory py-24 text-brown md:py-32">
        <div className="mx-auto max-w-[86rem] px-5 md:px-9">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
            <div>
              <SectionHeading
                index="13"
                latin="ACCESS"
                title={
                  <>
                    新宿駅から徒歩約3分、
                    <br />
                    歌舞伎町のビル7階。
                  </>
                }
                tone="light"
              />

              <dl className="mt-10 space-y-5 border-t border-brown/15 pt-8 text-[0.88rem]">
                <div className="flex gap-6">
                  <dt className="w-20 shrink-0 text-bordeaux">店名</dt>
                  <dd>{site.name}</dd>
                </div>
                <div className="flex gap-6">
                  <dt className="w-20 shrink-0 text-bordeaux">所在地</dt>
                  <dd>{site.address.full}</dd>
                </div>
                <div className="flex gap-6">
                  <dt className="w-20 shrink-0 text-bordeaux">アクセス</dt>
                  <dd>
                    新宿駅から徒歩約3分
                    <br />
                    西武新宿駅から徒歩約4分
                  </dd>
                </div>
                {publicOpeningHours && (
                  <div className="flex gap-6">
                    <dt className="w-20 shrink-0 text-bordeaux">営業時間</dt>
                    <dd>
                      {publicOpeningHours.text}
                      <br />
                      {publicOpeningHours.closed}
                    </dd>
                  </div>
                )}
                {publicPhone && (
                  <div className="flex gap-6">
                    <dt className="w-20 shrink-0 text-bordeaux">電話番号</dt>
                    <dd>
                      <a
                        href={`tel:${publicPhone.tel}`}
                        data-cta="tel"
                        data-location="home-access"
                        className="tabular-nums link-underline"
                      >
                        {publicPhone.value}
                      </a>
                    </dd>
                  </div>
                )}
                <div className="flex gap-6">
                  <dt className="w-20 shrink-0 text-bordeaux">ご予約</dt>
                  <dd>TableCheck にて24時間受付</dd>
                </div>
              </dl>

              <div className="mt-10">
                <Link
                  href="/access"
                  className="latin group inline-flex items-center gap-4 text-[0.74rem] text-bordeaux"
                >
                  ACCESS & MAP
                  <span className="h-px w-10 bg-bordeaux/50 transition-all duration-500 group-hover:w-16" />
                </Link>
              </div>
            </div>

            <div className="reveal">
              <div className="aspect-[4/3] w-full bg-brown/10 md:aspect-[16/10]">
                <iframe
                  src={site.googleMapsEmbedUrl}
                  title={`${site.name}の地図`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="size-full"
                />
              </div>
              <a
                href={site.googleMapsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-[0.75rem] text-bordeaux link-underline"
              >
                Googleマップで開く
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────── */}
      <section className="bg-char py-24 md:py-32">
        <div className="mx-auto max-w-[86rem] px-5 md:px-9">
          <div className="grid gap-12 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-20">
            <SectionHeading index="14" latin="FAQ" title="よくあるご質問" />
            <Faq items={faqGeneral.slice(0, 8)} />
          </div>
        </div>
      </section>

      {/* ── 15 予約導線 ───────────────────────────── */}
      <ReservationCTA location="home-footer" label="空席を確認する" />

      <JsonLd data={graph(faqSchema(faqGeneral.slice(0, 8)))} />
    </>
  );
}
