import type { Metadata } from 'next';

import { pageMetadata } from '@/lib/seo';
import Image from 'next/image';
import Link from 'next/link';

import { photos } from '@/lib/images';
import { site } from '@/lib/site-config';
import { meatsWithPhoto } from '@/data/menu';
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
  title: 'シュラスコとは？食べ方と人気部位を解説',
  description:
    'シュラスコとはどんな料理か、店ではどう進むのか。専用ロースターでの焼き方、目の前での切り分け、ピッカーニャをはじめとする部位ごとの違い、おいしく食べる順番まで、ブラジルの食べ方とあわせて解説します。',
  path: '/churrasco',
});

const crumbs = [
  { name: 'ホーム', href: '/' },
  { name: 'シュラスコ', href: '/churrasco' },
];

const steps = [
  {
    n: '01',
    t: '塩をふり、串に刺す',
    b: '味付けは基本的に塩だけです。ピッカーニャのように脂の帯がある部位は、脂を外側にしてC字に曲げ、串に刺します。脂が溶けて赤身へ流れ落ち、内側の水分を守ります。',
  },
  {
    n: '02',
    t: '専用ロースターで焼き上げる',
    b: '常に何本もの串が火のそばで回っています。外側から順に火が入り、焼けた面を削ぎ落とすと、また新しい面が現れる。この繰り返しが、焼きたてを出し続ける仕組みです。',
  },
  {
    n: '03',
    t: '焼きたてのまま、席へ',
    b: '厨房で切り分けてから運ぶと、その数分で肉は変わります。スタッフが串ごと持ってテーブルまで向かうのは、いちばんよい状態でお出しするためです。',
  },
  {
    n: '04',
    t: '目の前で、好みの量を切り分ける',
    b: '厚さも量も、その場でご指定いただけます。串の外側はよく焼け、内側は赤みが残るので、焼き加減のご希望もお伝えください。',
  },
];

export default function ChurrascoPage() {
  return (
    <>
      <PageHero
        photo={photos.picanhaTop}
        latin="CHURRASCO"
        title="炎と、塩と、時間だけ。"
        lead="新宿でシュラスコを召し上がるのが初めての方へ。どんな料理で、店ではどう進むのかを、順を追ってご説明します。"
        crumbs={crumbs}
        objectPosition="30% center"
      />

      {/* シュラスコとは */}
      <section className="bg-char py-24 md:py-32">
        <div className="mx-auto max-w-[86rem] px-5 md:px-9">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-20">
            <div className="reveal">
              <SectionHeading
                index="01"
                latin="ORIGIN"
                title="ブラジル南部の牧場から始まった"
              />
              <div className="mt-9 space-y-6 text-[0.92rem] leading-[2.15] text-ivory-2">
                <p>
                  シュラスコ（Churrasco）は、ブラジル南部・リオグランデ・ド・スル州を中心とした地域で生まれた炭火焼き料理です。もとは牧場で働く人々が、大きな塊肉に岩塩をふって串に刺し、火のそばに立てて焼いたもの。調味料は塩だけで、あとは火加減と時間で仕上げます。
                </p>
                <p>
                  この焼き方をレストランの形にしたものが「シュラスカリア」です。店内には専用のロースターが据えられ、常に何本かの串が火のそばで回っています。焼き上がったものから順に、スタッフがテーブルへ運ぶ。この流れが、シュラスコという食事の骨格です。
                </p>
                <p>
                  凝ったソースも複雑な下ごしらえもありません。だからこそ、肉そのものの質と、焼き手の判断がそのまま味に出ます。
                </p>
              </div>
            </div>

            <div className="reveal">
              <Image
                src={photos.picanhaRoastBeer.src}
                alt={photos.picanhaRoastBeer.alt}
                width={photos.picanhaRoastBeer.width}
                height={photos.picanhaRoastBeer.height}
                sizes="(min-width: 1024px) 42vw, 92vw"
                className="w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4つのステップ */}
      <section className="bg-ink py-24 md:py-32">
        <div className="mx-auto max-w-[86rem] px-5 md:px-9">
          <SectionHeading
            index="02"
            latin="THE PROCESS"
            title="焼き上がるまでの、4つの手順"
          />

          <div className="mt-16 grid gap-px md:grid-cols-2">
            {steps.map((s) => (
              <div
                key={s.n}
                className="reveal border-t border-gold/25 bg-char-2/40 px-6 py-10 md:px-10 md:py-12"
              >
                <p className="latin text-[0.75rem] text-gold tabular-nums">
                  {s.n}
                </p>
                <h3 className="mt-5 text-[1.1rem] leading-[1.7] text-ivory md:text-[1.25rem]">
                  {s.t}
                </h3>
                <p className="mt-5 text-[0.87rem] leading-[2.05] text-ivory-dim">
                  {s.b}
                </p>
              </div>
            ))}
          </div>

          <div className="reveal mt-14">
            <Image
              src={photos.heroCarving.src}
              alt={photos.heroCarving.alt}
              width={photos.heroCarving.width}
              height={photos.heroCarving.height}
              sizes="100vw"
              className="aspect-[21/9] w-full object-cover object-[center_45%]"
            />
          </div>
        </div>
      </section>

      {/* 部位ごとの違い */}
      <section className="bg-char py-24 md:py-32">
        <div className="mx-auto max-w-[86rem] px-5 md:px-9">
          <SectionHeading
            index="03"
            latin="THE CUTS"
            title="一本ごとに、味わいが変わる"
            lead={`当店では約${site.counts.churrasco}種類をご用意しています。同じ牛でも、脂の付き方と繊維の向きが変わるだけで、印象はまったく違うものになります。`}
          />

          <div className="mt-16 space-y-px">
            {meatsWithPhoto.slice(0, 6).map((m, i) => (
              <article
                key={m.name}
                className={`reveal grid items-center gap-8 bg-char-2/40 md:gap-14 ${
                  i % 2 === 0
                    ? 'md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]'
                    : 'md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]'
                }`}
              >
                <div className={i % 2 === 0 ? '' : 'md:order-2'}>
                  <Image
                    src={m.photo!.src}
                    alt={m.photo!.alt}
                    width={m.photo!.width}
                    height={m.photo!.height}
                    sizes="(min-width: 768px) 46vw, 100vw"
                    className="aspect-[16/10] w-full object-cover md:aspect-[4/3]"
                  />
                </div>

                <div
                  className={`px-6 pb-10 md:px-10 md:py-12 ${
                    i % 2 === 0 ? '' : 'md:order-1'
                  }`}
                >
                  <p className="latin flex items-center gap-3 text-[0.7rem] text-gold">
                    <span className="tabular-nums">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="h-px w-5 bg-gold/40" />
                    <span>{m.latin}</span>
                  </p>
                  <h3 className="mt-4 text-[1.25rem] text-ivory md:text-[1.5rem]">
                    {m.name}
                    <span className="ml-3 align-middle text-[0.72rem] tracking-[0.1em] text-gold-dim">
                      {m.kind}
                    </span>
                  </h3>
                  <p className="mt-5 text-[0.88rem] leading-[2.05] text-ivory-dim">
                    {m.description}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-14">
            <Link
              href="/menu"
              className="latin group inline-flex items-center gap-4 text-[0.74rem] text-gold"
            >
              VIEW ALL {site.counts.churrasco} ITEMS
              <span className="h-px w-10 bg-gold/60 transition-all duration-500 group-hover:w-16" />
            </Link>
          </div>
        </div>
      </section>

      {/* 食べる順番 */}
      <section className="bg-ivory py-24 text-brown md:py-32">
        <div className="mx-auto max-w-[86rem] px-5 md:px-9">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
            <div>
              <SectionHeading
                index="04"
                latin="HOW TO ENJOY"
                title="順番で、満足度が変わる"
                lead="部位の数が多いぶん、食べる順番を少し意識すると、後半まで気持ちよく食べ進められます。あくまで目安ですが、迷ったときの参考にしてください。"
                tone="light"
              />
            </div>

            <ol className="space-y-px">
              {[
                {
                  t: 'はじめに、ピッカーニャ',
                  b: '空腹のうちに、いちばん味わいたい部位を。舌が疲れていない状態のほうが、赤身の甘みと脂の香りの差がはっきり分かります。',
                },
                {
                  t: '味の方向が違うものを挟む',
                  b: '鶏もも肉やリングイッサなど、牛とは違う味わいを一枚。続けて同じ系統を食べると、そこで手が止まりやすくなります。',
                },
                {
                  t: '中盤に、焼きチーズ',
                  b: '塩気と乳のコクで、口の中がいったん切り替わります。ポンデケージョもこのあたりで。',
                },
                {
                  t: 'サラダバーへ立つ',
                  b: 'ヴィナグレッチのような酸味のあるものを少し。脂が続いて止まりかけた食欲が戻ってきます。',
                },
                {
                  t: '後半は、変化球の部位へ',
                  b: 'ガーリックやペッパーで香りを立てた串を。同じピッカーニャでも、別の料理のように感じられます。',
                },
                {
                  t: '締めくくりに、焼きパイナップル',
                  b: 'シナモンをまとわせた甘みと酸味で、後口が整います。ここまでたどり着くために、序盤で取りすぎないことが大切です。',
                },
              ].map((s, i) => (
                <li
                  key={s.t}
                  className="reveal grid gap-4 border-t border-brown/15 py-7 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-6"
                >
                  <span className="latin text-[0.75rem] text-bordeaux tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-[1rem] leading-[1.7] text-brown">
                      {s.t}
                    </h3>
                    <p className="mt-3 text-[0.85rem] leading-[2] text-brown/70">
                      {s.b}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <p className="mt-14 border-l-2 border-bordeaux pl-6 text-[0.87rem] leading-[2.05] text-brown/80">
            肉が回ってきたときに断っても、その部位がもう来ないわけではありません。何度も回りますので、そのときに食べたいものだけを受けてください。
          </p>
        </div>
      </section>

      {/* サラダバーへの導線 */}
      <section className="bg-char py-24 md:py-32">
        <div className="mx-auto max-w-[86rem] px-5 md:px-9">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
            <div className="reveal">
              <Image
                src={photos.saladBar.src}
                alt={photos.saladBar.alt}
                width={photos.saladBar.width}
                height={photos.saladBar.height}
                sizes="(min-width: 1024px) 48vw, 92vw"
                className="w-full object-cover"
              />
            </div>
            <div className="reveal">
              <SectionHeading
                index="05"
                latin="WITH SALAD BAR"
                title="肉と野菜は、対になっている"
                lead={`ブラジルのシュラスカリアでは、サラダバーは肉と同じ重みを持つ存在です。当店にも約${site.counts.saladBar}種類のサラダとビュッフェ料理をご用意しています。`}
              />
              <div className="mt-9 space-y-6 text-[0.9rem] leading-[2.1] text-ivory-dim">
                <p>
                  塩だけで焼いた肉を続けて食べると、どこかで舌が止まります。酸味、甘み、食感の違うものを挟むことで、また肉に戻れる。サラダバーは箸休めではなく、肉を最後まで楽しむための装置です。
                </p>
              </div>
              <div className="mt-9">
                <Link
                  href="/menu#salad-bar"
                  className="latin group inline-flex items-center gap-4 text-[0.74rem] text-gold"
                >
                  VIEW SALAD BAR
                  <span className="h-px w-10 bg-gold/60 transition-all duration-500 group-hover:w-16" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ReservationCTA
        location="churrasco"
        photo={photos.picanhaTop}
        label="シュラスコを予約する"
        title={
          <>
            肉を味わう時間を、
            <br />
            特別な体験へ。
          </>
        }
      />

      <JsonLd data={graph(
          breadcrumbWithId(crumbs, '/churrasco'),
          webPageSchema({
            path: '/churrasco',
            name: metadata.title as string,
            description: metadata.description as string,
            primaryImage: '/images/picanha-skewers-top.webp',
          })
        )} />
    </>
  );
}
