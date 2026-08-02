import type { Metadata } from 'next';

import { pageMetadata } from '@/lib/seo';
import Image from 'next/image';
import Link from 'next/link';

import { photos } from '@/lib/images';
import { site } from '@/lib/site-config';
import { courses, formatYen } from '@/data/courses';
import { PageHero } from '@/components/ui/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ReservationCTA } from '@/components/sections/ReservationCTA';
import { ReservationLink } from '@/components/ui/ReservationLink';
import { JsonLd } from '@/components/ui/JsonLd';
import {
  breadcrumbWithId,
  graph,
  webPageSchema,
} from '@/lib/structured-data';

export const metadata: Metadata = pageMetadata({
  title: '新宿のシュラスコ宴会・貸切｜40名様から相談可能',
  description:
    '新宿・歌舞伎町で会社宴会、歓送迎会、同窓会を。取り分けはスタッフが行い、コースと飲み放題が組みのためひとりあたりの金額が先に決まります。40名様からの貸切は7,700円〜でご相談いただけます。',
  path: '/party',
});

const crumbs = [
  { name: 'ホーム', href: '/' },
  { name: '宴会・貸切', href: '/party' },
];

const anniversaryCourse = courses.find((c) => c.id === 'anniversary')!;
const privateCourse = courses.find((c) => c.id === 'private-party')!;

const byScale = [
  {
    range: '2〜8名様',
    latin: 'SMALL',
    t: '少人数のお祝い・お食事',
    b: 'ソファー席やラウンドテーブル席をご案内します。誕生日・記念日コースをお選びいただければ、乾杯のスパークリングとメッセージ入りのデザートプレートが付きます。',
  },
  {
    range: '10〜25名様',
    latin: 'MEDIUM',
    t: '部署の宴会・歓送迎会',
    b: 'ソファー席をつなげてご案内できる場合があります。取り分けはスタッフが行うため、幹事の方が席を立ち続ける必要がありません。挨拶や贈呈の進行にあわせて、肉をお持ちするタイミングも調整します。',
  },
  {
    range: '25〜40名様',
    latin: 'LARGE',
    t: '大人数の宴会・同窓会',
    b: '窓沿いのテーブル席を中心にご案内します。サラダバーへ行き来する動線があるため、席が固定されず、テーブルをまたいだ会話が生まれます。',
  },
  {
    range: '40名様〜',
    latin: 'PRIVATE HIRE',
    t: '貸切',
    b: 'コース内容・料理・お飲み物・お時間まで、会の目的にあわせて組み立てます。ご予算からの逆算も承ります。開催時間についてもご相談ください。',
  },
];


export default function PartyPage() {
  return (
    <>
      <PageHero
        photo={photos.feast}
        latin="PARTY & PRIVATE"
        title="幹事の手間が、少ない宴会を。"
        lead="取り分けはスタッフが行い、料理は順に運ばれます。ひとりあたりの金額が先に決まるので、集金の見積もりもぶれません。"
        crumbs={crumbs}
        objectPosition="center 45%"
      />

      {/* 宴会に向く理由 */}
      <section className="bg-char py-24 md:py-32">
        <div className="mx-auto max-w-[86rem] px-5 md:px-9">
          <SectionHeading
            index="01"
            latin="WHY CHURRASCO"
            title="なぜ、宴会にシュラスコなのか"
            lead="大人数の会でいちばん困るのは、料理が冷めることと、幹事が落ち着いて座れないこと。シュラスコは、その両方が起きにくい形式です。"
          />

          <div className="mt-16 grid gap-x-14 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                n: '01',
                t: '最後まで温かい',
                b: 'スタッフが焼きたての串を持って各テーブルを回るため、後半になっても冷めた料理が残りません。',
              },
              {
                n: '02',
                t: '取り分けが不要',
                b: '切り分けはスタッフが行います。取り分け当番を決める必要も、幹事が席を立ち続ける必要もありません。',
              },
              {
                n: '03',
                t: '金額が先に決まる',
                b: 'コースと飲み放題が組みなので、ひとりあたりの金額が事前に確定します。案内メールに金額を書けます。',
              },
              {
                n: '04',
                t: '席が固定されない',
                b: 'サラダバーへ行き来する動線があるため、自然と席を立ち、話す相手が入れ替わります。',
              },
            ].map((f) => (
              <div key={f.n} className="reveal border-t border-gold/25 pt-7">
                <p className="latin text-[0.72rem] text-gold tabular-nums">
                  {f.n}
                </p>
                <h3 className="mt-4 text-[1.05rem] leading-[1.7] text-ivory">
                  {f.t}
                </h3>
                <p className="mt-4 text-[0.84rem] leading-[2] text-ivory-dim">
                  {f.b}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 人数別 */}
      <section className="bg-ink py-24 md:py-32">
        <div className="mx-auto max-w-[86rem] px-5 md:px-9">
          <SectionHeading
            index="02"
            latin="BY SCALE"
            title="人数別のご案内"
            lead="人数によって、ご案内できるお席と進め方が変わります。確定していない段階でも、おおよその規模をお知らせいただければご相談を承ります。"
          />

          <div className="mt-16 space-y-px">
            {byScale.map((s) => (
              <div
                key={s.range}
                className="reveal grid gap-5 border-l-2 border-gold/40 bg-char-2/40 px-6 py-9 md:grid-cols-[12rem_minmax(0,1fr)] md:gap-12 md:px-10 md:py-11"
              >
                <div>
                  <p className="latin text-[0.7rem] text-gold">{s.latin}</p>
                  <p className="mt-3 font-mincho text-[1.35rem] text-gold">
                    {s.range}
                  </p>
                </div>
                <div>
                  <h3 className="text-[1.08rem] leading-[1.7] text-ivory">
                    {s.t}
                  </h3>
                  <p className="mt-4 text-[0.86rem] leading-[2.05] text-ivory-dim">
                    {s.b}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 誕生日・記念日 */}
      <section className="relative isolate overflow-hidden bg-bordeaux-deep">
        <div className="mx-auto grid max-w-[86rem] items-stretch lg:grid-cols-2">
          <div className="reveal relative min-h-[52vw] lg:min-h-[36rem]">
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
              index="03"
              latin="ANNIVERSARY"
              title="誕生日・記念日のご利用"
            />
            <div className="mt-9 space-y-6 text-[0.92rem] leading-[2.15] text-ivory-2">
              <p>
                旬のフルーツを使ったスパークリングの乾杯ドリンクと、メッセージ入りのデザートプレートが含まれるコースをご用意しています。
              </p>
              <p>
                お持ちするタイミングは、乾杯の直後でも、デザートの最後でも構いません。ご予約時の備考欄に、お祝いの種類・お名前・メッセージ・ご希望のタイミングをお書き添えください。
              </p>
            </div>

            <div className="mt-10 border border-gold/35 px-6 py-7">
              <p className="latin text-[0.7rem] text-gold">
                {anniversaryCourse.duration} MIN COURSE
              </p>
              <h3 className="mt-3 text-[1.15rem] text-ivory">
                {anniversaryCourse.name}
              </h3>
              <p className="mt-3 flex items-baseline gap-3">
                <span className="font-mincho text-[1.9rem] text-gold tabular-nums">
                  {formatYen(anniversaryCourse.salePrice)}
                </span>
                <span className="text-[0.7rem] text-ivory-dim">税込</span>
              </p>
              <ul className="mt-5 space-y-2">
                {anniversaryCourse.features.map((line) => (
                  <li
                    key={line}
                    className="flex gap-3 text-[0.83rem] leading-[1.85] text-ivory-2"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[0.7em] h-px w-3 shrink-0 bg-gold/60"
                    />
                    {line}
                  </li>
                ))}
              </ul>
              <div className="mt-7">
                <ReservationLink
                  location="anniversary"
                  variant="solid"
                  size="md"
                >
                  誕生日・記念日プランを予約する
                </ReservationLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 貸切 */}
      <section className="bg-ivory py-24 text-brown md:py-32">
        <div className="mx-auto max-w-[86rem] px-5 md:px-9">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
            <div>
              <SectionHeading
                index="04"
                latin="PRIVATE HIRE"
                title="40名様からの、貸切"
                lead="コース内容、料理、お飲み物、お時間まで、会の目的にあわせて組み立てます。日程と規模が決まっていない段階でも、まずはご相談ください。"
                tone="light"
              />

              <div className="mt-10 border-t border-brown/15 pt-8">
                <p className="flex items-baseline gap-3">
                  <span className="font-mincho text-[2.2rem] text-bordeaux tabular-nums">
                    {formatYen(privateCourse.salePrice)}
                  </span>
                  <span className="text-[0.8rem] text-brown/60">
                    税込{privateCourse.priceSuffix}
                  </span>
                </p>
                <ul className="mt-6 space-y-2.5">
                  {privateCourse.features.map((line) => (
                    <li
                      key={line}
                      className="flex gap-3 text-[0.86rem] leading-[1.9] text-brown/80"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[0.75em] h-px w-3 shrink-0 bg-bordeaux/50"
                      />
                      {line}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <ReservationLink
                    location="party"
                    variant="solid"
                    size="md"
                    showExternalNote
                  >
                    貸切・宴会を相談する
                  </ReservationLink>
                </div>
              </div>
            </div>

            <div className="reveal">
              <Image
                src={photos.seatTableRow.src}
                alt={photos.seatTableRow.alt}
                width={photos.seatTableRow.width}
                height={photos.seatTableRow.height}
                sizes="(min-width: 1024px) 48vw, 92vw"
                className="aspect-[4/3] w-full object-cover"
              />
              <p className="mt-4 text-[0.75rem] leading-relaxed text-brown/60">
                窓沿いのテーブル席。人数に応じてつなげてご案内できる場合があります。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 幹事の方へ */}
      <section className="bg-char py-24 md:py-32">
        <div className="mx-auto max-w-[86rem] px-5 md:px-9">
          <div className="grid gap-12 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-20">
            <SectionHeading
              index="05"
              latin="FOR ORGANIZERS"
              title="幹事の方へ"
            />

            <div>
              <ol className="space-y-px">
                {[
                  {
                    t: 'まず、人数を「幅」でお知らせください',
                    b: '「25名から35名」といった幅で構いません。確定を待つあいだに希望日が埋まってしまうことのほうが多いためです。',
                  },
                  {
                    t: 'ご予算をお伝えください',
                    b: 'コースは7,700円からを起点にご相談いただけます。ひとりあたりのご予算から逆算して、内容を組み立てます。',
                  },
                  {
                    t: '進行のご希望を共有ください',
                    b: '挨拶、乾杯、贈呈、締めの言葉。進行が決まっていれば、肉をお持ちするタイミングをそれにあわせて調整します。',
                  },
                  {
                    t: '主役のお席をお知らせください',
                    b: '歓送迎会や記念日など主役のいる会では、お席の位置のご希望を承ります。',
                  },
                ].map((s, i) => (
                  <li
                    key={s.t}
                    className="grid gap-4 border-t border-ivory/12 py-7 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-6"
                  >
                    <span className="latin text-[0.74rem] text-gold tabular-nums">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="text-[1rem] leading-[1.7] text-ivory">
                        {s.t}
                      </h3>
                      <p className="mt-3 text-[0.85rem] leading-[2] text-ivory-dim">
                        {s.b}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="mt-10 border-l-2 border-gold/50 bg-char-2/50 px-6 py-6">
                <p className="text-[0.85rem] leading-[2] text-ivory-2">
                  ご相談・ご予約は TableCheck から承っています。
                  {site.name}は新宿駅から徒歩約3分、西武新宿駅から徒歩約4分。複数路線から集まりやすい立地です。
                </p>
                <Link
                  href="/access"
                  className="latin group mt-5 inline-flex items-center gap-3 text-[0.72rem] text-gold"
                >
                  ACCESS
                  <span className="h-px w-8 bg-gold/60 transition-all duration-500 group-hover:w-12" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ReservationCTA
        location="party"
        photo={photos.feast}
        objectPosition="center 40%"
        label="宴会・貸切を相談する"
        title={
          <>
            日程が未定でも、
            <br />
            まずはご相談を。
          </>
        }
        lead="人数や日程が確定していない段階でも構いません。TableCheck の貸切相談プランからお問い合わせください。"
      />

      <JsonLd data={graph(
          breadcrumbWithId(crumbs, '/party'),
          webPageSchema({
            path: '/party',
            name: metadata.title as string,
            description: metadata.description as string,
            primaryImage: '/images/party-feast.webp',
          })
        )} />
    </>
  );
}
