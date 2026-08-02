import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { photos } from '@/lib/images';
import { pageMetadata } from '@/lib/seo';
import { site, freshnessNote } from '@/lib/site-config';
import { courseById, formatYen } from '@/data/courses';
import { crumbsFor } from '@/lib/routes';
import { PageHero } from '@/components/ui/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Faq } from '@/components/ui/Faq';
import { ReservationCTA } from '@/components/sections/ReservationCTA';
import { ReservationLink } from '@/components/ui/ReservationLink';
import { JsonLd } from '@/components/ui/JsonLd';
import {
  breadcrumbWithId,
  faqSchema,
  graph,
  webPageSchema,
} from '@/lib/structured-data';

const PATH = '/anniversary';

const title = '新宿の誕生日・記念日ディナー｜シュラスコとデザートプレート';
const description =
  '新宿・歌舞伎町で誕生日や記念日のディナーを。旬のフルーツスパークリングでの乾杯と、メッセージ入りデザートプレートが付くコースをご用意しています。窓際のソファー席から新宿の夜景を望めます。';

export const metadata: Metadata = pageMetadata({
  title: '新宿の誕生日・記念日ディナー',
  description,
  path: PATH,
  ogTitle: title,
  image: {
    url: photos.fondant.src,
    width: photos.fondant.width,
    height: photos.fondant.height,
    alt: photos.fondant.alt,
  },
});

const crumbs = crumbsFor(PATH);
const course = courseById('anniversary')!;

const faq = [
  {
    q: 'メッセージ入りのデザートプレートはお願いできますか？',
    a: '誕生日・記念日コースに、メッセージ入りのデザートプレートが含まれます。お入れするお名前やお祝いの言葉を、TableCheck でのご予約時に備考欄へお書き添えください。',
  },
  {
    q: 'サプライズのタイミングは指定できますか？',
    a: '「乾杯のあとすぐ」「デザートの最後に」といったご希望を承ります。ご予約時の備考欄にお書き添えいただくか、ご来店時に受付でお知らせください。',
  },
  {
    q: '窓際の席を希望できますか？',
    a: 'ご希望として承ります。ご予約時の備考欄にお書き添えください。人数と時間帯によってご案内できるお席が変わるため確約はできませんが、可能な範囲で調整いたします。',
  },
  {
    q: '当日でも記念日コースを申し込めますか？',
    a: 'デザートプレートは準備が必要なため、ご予約時にお申し込みいただくのが確実です。当日のご相談は、状況によって対応できない場合があります。',
  },
  {
    q: '何名まで対応できますか？',
    a: '2名様からのお祝いに対応しています。10名様を超える歓送迎会などでも、主役のお席や進行にあわせてお持ちするタイミングを調整いたします。',
  },
  {
    q: '写真を撮ってもらえますか？',
    a: '当日スタッフへお声がけください。照明を落とした店内では、プレートのキャンドルがよく映えます。',
  },
];

export default function AnniversaryPage() {
  return (
    <>
      <PageHero
        photo={photos.fondant}
        latin="ANNIVERSARY"
        title="新宿で誕生日・記念日ディナーを探している方へ"
        lead="乾杯のスパークリングと、メッセージ入りのデザートプレート。焼きたてのシュラスコを囲みながら、その日だけの時間を過ごしていただけます。"
        crumbs={crumbs}
      />

      {/* コース */}
      <section className="bg-char py-24 md:py-32">
        <div className="mx-auto max-w-[86rem] px-5 md:px-9">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-20">
            <div>
              <SectionHeading
                index="01"
                latin="THE COURSE"
                title="誕生日・記念日コースに含まれるもの"
                lead="お祝いの席で必要になるものを、あらかじめ組み込んだコースです。当日に追加で頼む必要がありません。"
              />

              <div className="mt-10 border border-gold/35 px-6 py-8 md:px-9">
                <p className="latin text-[0.7rem] text-gold">
                  {course.duration} MIN COURSE
                </p>
                <h3 className="mt-3 text-[1.3rem] text-ivory md:text-[1.5rem]">
                  {course.name}
                </h3>
                <p className="mt-4 flex items-baseline gap-3">
                  <span className="font-mincho text-[2.2rem] text-gold tabular-nums">
                    {formatYen(course.salePrice)}
                  </span>
                  <span className="text-[0.75rem] text-ivory-dim">
                    税込 / おひとり様
                  </span>
                </p>

                <ul className="mt-7 space-y-3">
                  {course.features.map((f) => (
                    <li
                      key={f}
                      className="flex gap-3.5 text-[0.88rem] leading-[1.9] text-ivory-2"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[0.75em] h-px w-3.5 shrink-0 bg-gold/70"
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <ReservationLink
                    location="anniversary"
                    courseName={course.name}
                    variant="solid"
                    size="md"
                    showExternalNote
                  >
                    誕生日・記念日プランを予約する
                  </ReservationLink>
                </div>
              </div>

              <p className="mt-6 text-[0.75rem] leading-relaxed text-ivory-dim">
                ※ {freshnessNote(course.lastVerifiedAt)}
              </p>
            </div>

            <div className="reveal">
              <Image
                src={photos.tiramisu.src}
                alt={photos.tiramisu.alt}
                width={photos.tiramisu.width}
                height={photos.tiramisu.height}
                sizes="(min-width: 1024px) 42vw, 92vw"
                className="w-full object-cover"
              />
              <p className="mt-3 text-[0.78rem] leading-relaxed text-ivory-dim">
                デザートビュッフェもご用意しています。プレートとあわせてお楽しみください
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 予約時に伝えること */}
      <section className="bg-ivory py-24 text-brown md:py-32">
        <div className="mx-auto max-w-[86rem] px-5 md:px-9">
          <SectionHeading
            index="02"
            latin="BEFORE YOU BOOK"
            title="ご予約時にお知らせいただきたいこと"
            lead="当日その場でお願いすると、厨房の準備が間に合わないことがあります。次の4点をご予約時の備考欄にお書き添えください。"
            tone="light"
          />

          <ol className="mt-14 space-y-px">
            {[
              {
                t: 'お祝いの種類',
                b: '誕生日、結婚記念日、昇進祝い、送別など。プレートに添える言葉を選ぶ際の手がかりになります。',
              },
              {
                t: 'お名前とメッセージ',
                b: 'デザートプレートにお入れするお名前と、お祝いの言葉をお知らせください。文字数が多い場合は、当日調整させていただくことがあります。',
              },
              {
                t: 'お持ちするタイミング',
                b: '「乾杯のあとすぐ」「デザートの最後に」など。驚きを大きくしたい場合は前者、締めくくりにしたい場合は後者が向きます。',
              },
              {
                t: 'お席のご希望',
                b: '窓側、静かな場所、横並びなど。確約はできませんが、人数と時間帯によって可能な範囲で調整いたします。',
              },
            ].map((s, i) => (
              <li
                key={s.t}
                className="grid gap-4 border-t border-brown/15 py-8 sm:grid-cols-[4rem_minmax(0,1fr)] sm:gap-8"
              >
                <span className="latin text-[0.74rem] text-bordeaux tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-[1.05rem] leading-[1.7] text-brown">
                    {s.t}
                  </h3>
                  <p className="mt-3 text-[0.86rem] leading-[2] text-brown/70">
                    {s.b}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 席と夜景 */}
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
          className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/92 via-ink/72 to-ink/25"
        />

        <div className="mx-auto max-w-[86rem] px-5 py-28 md:px-9 md:py-36">
          <div className="max-w-lg">
            <SectionHeading
              index="03"
              latin="THE SEAT"
              title="窓際の席から、新宿の夜景を"
            />
            <div className="mt-9 space-y-6 text-[0.92rem] leading-[2.15] text-ivory-2">
              <p>
                ビルの7階にあるため、窓際のお席からは歌舞伎町の灯りと高層ビルの夜景が見渡せます。照明を落とした店内では、キャンドルの光がよく映えます。
              </p>
              <p>
                マーブル調のテーブルと革張りのソファーを組み合わせた席は、隣との距離にも余裕があります。完全な個室ではありませんが、こもり感のある造りのため、周囲を気にせずお過ごしいただけます。
              </p>
            </div>
            <div className="mt-10">
              <Link
                href="/space"
                className="group inline-flex items-center gap-4 text-[0.86rem] text-gold"
              >
                店内・お席の写真を見る
                <span
                  aria-hidden="true"
                  className="h-px w-10 bg-gold/60 transition-all duration-500 group-hover:w-16"
                />
              </Link>
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
              title="誕生日・記念日のご利用について"
            />
            <Faq items={faq} />
          </div>

          <div className="mt-16 border-t border-ivory/12 pt-10">
            <p className="latin text-[0.72rem] text-gold">RELATED</p>
            <ul className="mt-6 flex flex-wrap gap-x-10 gap-y-3">
              {[
                {
                  href: '/news/shinjuku-anniversary-dinner',
                  label: '新宿で記念日ディナーを選ぶポイントを読む',
                },
                { href: '/menu', label: 'コースの料金と内容を見る' },
                { href: '/party', label: '歓送迎会・宴会のご案内を見る' },
                { href: '/access', label: '新宿駅東口からのアクセスを見る' },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[0.86rem] text-ivory-2 link-underline"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <ReservationCTA
        location="anniversary"
        photo={photos.cheers}
        label="誕生日・記念日プランを予約する"
        title={
          <>
            その日のための、
            <br />
            ひと皿を。
          </>
        }
        lead={`メッセージやお持ちするタイミングのご希望は、ご予約時の備考欄にお書き添えください。${site.name}でお待ちしております。`}
      />

      <JsonLd
        data={graph(
          breadcrumbWithId(crumbs, PATH),
          webPageSchema({
            path: PATH,
            name: title,
            description,
            primaryImage: photos.fondant.src,
          }),
          faqSchema(faq, PATH)
        )}
      />
    </>
  );
}
