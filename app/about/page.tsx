import type { Metadata } from 'next';

import { pageMetadata } from '@/lib/seo';
import Image from 'next/image';
import Link from 'next/link';

import { photos } from '@/lib/images';
import { publicOpeningHours, publicPhone, site } from '@/lib/site-config';
import { PageHero } from '@/components/ui/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ReservationCTA } from '@/components/sections/ReservationCTA';
import { JsonLd } from '@/components/ui/JsonLd';
import {
  breadcrumbWithId,
  graph,
  webPageSchema,
} from '@/lib/structured-data';

export const metadata: Metadata = pageMetadata({
  title: '当店について｜新宿・歌舞伎町のシュラスカリア',
  description:
    '新宿・歌舞伎町のシュラスコ専門店 FOGO De BRASIA 新宿のご紹介。専用ロースターでの焼き方、切り分けの考え方、サラダバーへの姿勢など、シュラスコをお出しするうえで大切にしていることをお伝えします。',
  path: '/about',
});

const crumbs = [
  { name: 'ホーム', href: '/' },
  { name: 'FOGO De BRASIAについて', href: '/about' },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        photo={photos.picanhaRoastBeer}
        latin="ABOUT US"
        title="新宿・歌舞伎町の、シュラスカリア"
        lead="ブラジルの炭火焼き文化を、新宿の夜に。FOGO De BRASIA 新宿がどんな店なのかを、あらためてご紹介します。"
        crumbs={crumbs}
        objectPosition="center 40%"
      />

      {/* 名前の由来 */}
      <section className="bg-char py-24 md:py-32">
        <div className="mx-auto max-w-[86rem] px-5 md:px-9">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
            <div className="reveal">
              <SectionHeading
                index="01"
                latin="THE NAME"
                title={
                  <>
                    ブラジルの炎を、
                    <br />
                    新宿へ。
                  </>
                }
              />
              <div className="mt-9 space-y-6 text-[0.92rem] leading-[2.15] text-ivory-2">
                <p>
                  ポルトガル語で「Fogo（フォゴ）」は炎を意味します。シュラスコという料理を成り立たせているのは、突き詰めれば火と時間、そして塩だけです。凝った味付けをするのではなく、火の前に肉を置き、待つ。そこから引き出されるものを、そのままお出しする。
                </p>
                <p>
                  ブラジル南部の牧場で生まれたこの素朴な焼き方を、レストランの形に整えたものがシュラスカリアです。わたしたちも同じ考え方に立ち、歌舞伎町のビルの7階に専用のロースターを据えました。
                </p>
                <p>
                  肉の産地や部位にこだわることはもちろん大切です。ただ、それ以上に大事にしているのは、焼き上がった一本を、いちばんよい状態でテーブルへ運ぶこと。この一点に尽きます。
                </p>
              </div>
            </div>

            <div className="reveal">
              <Image
                src={photos.passador.src}
                alt={photos.passador.alt}
                width={photos.passador.width}
                height={photos.passador.height}
                sizes="(min-width: 1024px) 48vw, 92vw"
                className="w-full object-cover"
              />
              <p className="mt-4 text-[0.72rem] leading-relaxed text-ivory-dim">
                肉を焼き、切り分ける担当者はブラジルで「パサドール」と呼ばれます。串を持ってテーブルを回るこの所作が、シュラスコという食事の中心にあります。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* わたしたちの4つの姿勢 */}
      <section className="bg-ivory py-24 text-brown md:py-32">
        <div className="mx-auto max-w-[86rem] px-5 md:px-9">
          <SectionHeading
            index="02"
            latin="OUR APPROACH"
            title="4つの、当たり前"
            lead="特別なことをしているつもりはありません。シュラスコという料理が本来持っている良さを、そのままお届けするために続けていることです。"
            tone="light"
          />

          <div className="mt-16 space-y-px">
            {[
              {
                n: '01',
                t: '常に、火のそばに肉がある',
                b: '注文を受けてから焼き始めるのでは、間に合いません。専用のロースターでは常に何本かの串が回っていて、焼き上がったものから順にテーブルへ向かいます。だから「焼きたて」が絵空事になりません。',
              },
              {
                n: '02',
                t: '切り分けるのは、お客様の目の前で',
                b: '厨房で切り分けてから運ぶと、その数分のあいだに肉は変わってしまいます。テーブルでナイフを入れるのは演出ではなく、いちばんよい状態でお出しするための手順です。',
              },
              {
                n: '03',
                t: '量は、お客様が決める',
                b: '「少なめで」「厚めに」「今はけっこうです」。そのすべてにお応えします。決まった量を出す料理ではないので、食べる量に差があるグループでも、同じテーブルで無理なく過ごせます。',
              },
              {
                n: '04',
                t: '肉だけの店にはしない',
                b: `約${site.counts.saladBar}種類のサラダバービュッフェを併設しています。酸味のある一皿や温かい副菜を挟むことで、肉が最後までおいしく食べられる。ブラジルでも、肉と野菜は対になっています。`,
              },
            ].map((v) => (
              <div
                key={v.n}
                className="reveal grid gap-5 border-t border-brown/15 py-10 md:grid-cols-[5rem_minmax(0,22rem)_minmax(0,1fr)] md:gap-10"
              >
                <p className="latin text-[0.7rem] text-bordeaux tabular-nums">
                  {v.n}
                </p>
                <h3 className="text-[1.1rem] leading-[1.7] text-brown md:text-[1.25rem]">
                  {v.t}
                </h3>
                <p className="text-[0.88rem] leading-[2.05] text-brown/70">
                  {v.b}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 過ごし方 */}
      <section className="relative isolate overflow-hidden">
        <Image
          src={photos.seatWindowBooth.src}
          alt={photos.seatWindowBooth.alt}
          width={photos.seatWindowBooth.width}
          height={photos.seatWindowBooth.height}
          sizes="100vw"
          className="absolute inset-0 -z-10 size-full object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/92 via-ink/72 to-ink/30"
        />

        <div className="mx-auto max-w-[86rem] px-5 py-28 md:px-9 md:py-36">
          <div className="max-w-lg">
            <SectionHeading
              index="03"
              latin="THE EVENING"
              title="ビルの7階から、新宿の夜を"
            />
            <div className="mt-9 space-y-6 text-[0.92rem] leading-[2.15] text-ivory-2">
              <p>
                歌舞伎町のビルの7階。窓の外には、高層ビルの灯りと街の明かりが広がります。マーブル調のテーブルとソファーを組み合わせた、こもり感のある席をご用意しました。
              </p>
              <p>
                賑やかな街のなかにありながら、席についてしまえば落ち着いて過ごせる。高級店の緊張感ではなく、少し改まった気分で長居できる場所であることを目指しています。
              </p>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
              <Link
                href="/space"
                className="latin group inline-flex items-center gap-4 text-[0.74rem] text-gold"
              >
                VIEW SPACE
                <span className="h-px w-10 bg-gold/60 transition-all duration-500 group-hover:w-16" />
              </Link>
              <Link
                href="/churrasco"
                className="latin group inline-flex items-center gap-4 text-[0.74rem] text-gold"
              >
                ABOUT CHURRASCO
                <span className="h-px w-10 bg-gold/60 transition-all duration-500 group-hover:w-16" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 店舗からのメッセージ・提供方針（E-E-A-T） */}
      <section className="bg-ink py-24 md:py-32">
        <div className="mx-auto max-w-[86rem] px-5 md:px-9">
          <SectionHeading
            index="04"
            latin="OUR COMMITMENT"
            title="シュラスコをお出しするうえで、大切にしていること"
            lead="設備と手順の話です。特別なことではありませんが、これを守らないとシュラスコは成り立ちません。"
          />

          <div className="mt-16 space-y-px">
            {[
              {
                n: '01',
                t: '専用ロースターについて',
                b: '客席とは独立した専用のロースターを備えています。串を回しながら常時複数本を焼いているため、注文を受けてから焼き始めるのではなく、焼き上がったものから順にお持ちできます。ロースターが独立していることで、焼肉店のように煙が客席へ回ることもほとんどありません。',
              },
              {
                n: '02',
                t: '肉の焼き方について',
                b: '味付けは基本的に塩だけです。ピッカーニャのように脂の帯がある部位は、脂を外側にしてC字に曲げて串へ刺します。脂が溶けて赤身へ流れ落ち、内側の水分を守る。外側から順に火が入り、焼けた面を削ぎ落とすとまた新しい面が現れる。この繰り返しが、焼きたてを出し続ける仕組みです。',
              },
              {
                n: '03',
                t: '切り分けについて',
                b: '厨房で切り分けてから運ぶと、その数分のあいだに肉は変わります。テーブルでナイフを入れるのは演出ではなく、いちばんよい状態でお出しするための手順です。厚さも量も、その場でご指定いただけます。',
              },
              {
                n: '04',
                t: 'サラダバーについて',
                b: 'ブラジルのシュラスカリアでは、サラダバーは肉と対になる存在です。塩だけで焼いた肉を続けて食べると、どこかで舌が止まる。酸味や食感の違うものを挟むことで、また肉に戻れる。約30種類をご用意しているのは、量の問題ではなく、この役割を果たすためです。',
              },
            ].map((v) => (
              <div
                key={v.n}
                className="reveal grid gap-5 border-t border-gold/25 bg-char-2/40 px-6 py-9 md:grid-cols-[4rem_minmax(0,20rem)_minmax(0,1fr)] md:gap-10 md:px-10 md:py-11"
              >
                <p className="latin text-[0.72rem] text-gold tabular-nums">
                  {v.n}
                </p>
                <h3 className="text-[1.08rem] leading-[1.7] text-ivory">
                  {v.t}
                </h3>
                <p className="text-[0.87rem] leading-[2.05] text-ivory-dim">
                  {v.b}
                </p>
              </div>
            ))}
          </div>

          {/* 運営・監修について */}
          <div className="mt-16 border border-ivory/15 bg-char-2/30 p-7 md:p-9">
            <h3 className="text-[1.05rem] text-ivory">
              このサイトの運営・記事の監修について
            </h3>
            <dl className="mt-6 space-y-4 text-[0.86rem] leading-[1.95]">
              <div className="flex flex-col gap-1.5 sm:flex-row sm:gap-8">
                <dt className="w-32 shrink-0 text-gold-dim">運営</dt>
                <dd className="text-ivory-2">{site.name}</dd>
              </div>
              <div className="flex flex-col gap-1.5 sm:flex-row sm:gap-8">
                <dt className="w-32 shrink-0 text-gold-dim">記事の執筆・監修</dt>
                <dd className="text-ivory-2">{site.editorialName}</dd>
              </div>
              <div className="flex flex-col gap-1.5 sm:flex-row sm:gap-8">
                <dt className="w-32 shrink-0 text-gold-dim">記事の作成方針</dt>
                <dd className="text-ivory-2">
                  お知らせ・コラムは、当店の店舗情報および TableCheck
                  に掲載しているプラン内容にもとづいて作成しています。確認できない情報は掲載せず、料金や営業時間には最終確認日を記載しています。
                </dd>
              </div>
              <div className="flex flex-col gap-1.5 sm:flex-row sm:gap-8">
                <dt className="w-32 shrink-0 text-gold-dim">情報の更新</dt>
                <dd className="text-ivory-2">
                  料金・コース内容・営業時間は変更になる場合があります。ご来店前に
                  TableCheck の予約ページで最新の情報をご確認ください。
                </dd>
              </div>
            </dl>
            {/*
              【要確認】店舗責任者・料理責任者の氏名／経歴／顔写真が未確認のため、
              担当者個人の紹介は掲載していない。実在が確認できない人物を作らないこと。
              確認できしだい、ここへ責任者情報を追加すると E-E-A-T が強まる。
            */}
          </div>
        </div>
      </section>

      {/* 店舗概要 */}
      <section className="bg-char py-24 md:py-32">
        <div className="mx-auto max-w-[86rem] px-5 md:px-9">
          <div className="grid gap-12 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-20">
            <SectionHeading index="05" latin="INFORMATION" title="店舗概要" />

            <dl className="border-t border-ivory/12 text-[0.88rem]">
              {[
                { t: '店名', d: site.name },
                { t: '所在地', d: site.address.full },
                {
                  t: 'アクセス',
                  d: '新宿駅から徒歩約3分 / 西武新宿駅から徒歩約4分',
                },
                ...(publicOpeningHours
                  ? [
                      {
                        t: '営業時間',
                        d: `${publicOpeningHours.text}（${publicOpeningHours.closedDays}）`,
                      },
                    ]
                  : []),
                ...(publicPhone
                  ? [
                      {
                        t: '電話番号',
                        d: (
                          <a
                            href={`tel:${publicPhone.tel}`}
                            data-cta="tel"
                            data-location="about"
                            className="tabular-nums link-underline"
                          >
                            {publicPhone.value}
                          </a>
                        ),
                      },
                    ]
                  : []),
                { t: '料理', d: 'シュラスコ、ブラジル料理、ステーキ' },
                {
                  t: 'ご予約',
                  d: 'TableCheck にて24時間受付',
                },
                {
                  t: 'ご利用',
                  d: 'デート、誕生日・記念日、女子会、ご家族での食事、会社宴会、歓送迎会、同窓会、貸切（40名様〜）',
                },
              ].map((row) => (
                <div
                  key={row.t}
                  className="flex flex-col gap-2 border-b border-ivory/12 py-6 sm:flex-row sm:gap-10"
                >
                  <dt className="w-24 shrink-0 text-gold-dim">{row.t}</dt>
                  <dd className="leading-[1.95] text-ivory-2">{row.d}</dd>
                </div>
              ))}
            </dl>
          </div>

          <p className="mt-8 text-[0.75rem] leading-relaxed text-ivory-dim">
            空席状況とコース内容は、TableCheck
            の予約ページで24時間ご確認いただけます。お電話でのお問い合わせは営業時間内に承ります。
          </p>
        </div>
      </section>

      <ReservationCTA
        location="about"
        photo={photos.picanhaRoastBeer}
        label="空席を確認する"
        title={
          <>
            まずは一度、
            <br />
            この火を見に。
          </>
        }
      />

      <JsonLd data={graph(
          breadcrumbWithId(crumbs, '/about'),
          webPageSchema({
            path: '/about',
            name: metadata.title as string,
            description: metadata.description as string,
            primaryImage: '/images/passador-skewers.webp',
          })
        )} />
    </>
  );
}
