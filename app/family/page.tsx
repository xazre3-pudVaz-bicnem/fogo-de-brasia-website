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

const PATH = '/family';

const title = '新宿で子連れシュラスコ｜家族で楽しむ食べ放題ディナー';
const description =
  '新宿・歌舞伎町で子連れシュラスコなら FOGO De BRASIA 新宿。5歳まで無料、6〜10歳は半額。切り分ける量をその場で調整できるため、食べる量に差があるご家族でも同じテーブルで過ごせます。16時開店で早い時間のご利用も。';

export const metadata: Metadata = pageMetadata({
  title: '新宿で子連れシュラスコ',
  description,
  path: PATH,
  ogTitle: title,
  image: {
    url: photos.seatLargeBooth.src,
    width: photos.seatLargeBooth.width,
    height: photos.seatLargeBooth.height,
    alt: photos.seatLargeBooth.alt,
  },
});

const crumbs = crumbsFor(PATH);
const earlyCourse = courseById('early-dinner')!;

const faq = [
  {
    q: '子ども料金はいくらですか？',
    a: '5歳までは無料、6歳から10歳は半額、11歳以上は通常料金です。料金の区分は変更になる場合がありますので、ご予約前に TableCheck の予約ページで最新の内容をご確認ください。',
  },
  {
    q: 'ベビーカーで入店できますか？',
    a: 'ビルの7階にあり、1階からエレベーターでお上がりいただけます。通路に余裕のあるお席をご用意できる場合がありますので、ご予約時の備考欄にベビーカーのご利用をお書き添えください。',
  },
  {
    q: '子どもが食べられるものはありますか？',
    a: '鶏もも肉、ポンデケージョ、焼きパイナップルはお子様に選ばれています。サラダバーにはライスやスープ、温かい副菜も並びますので、肉が進まないときの選択肢もあります。',
  },
  {
    q: '早い時間から利用できますか？',
    a: '16時開店です。16時から17時のご入店であれば早割ディナーコースをお選びいただけます。夕食の時間が早いご家庭に向いています。',
  },
  {
    q: '取り分けは自分でしなければいけませんか？',
    a: 'スタッフが串を持ってテーブルへ伺い、目の前で切り分けます。「少なめに」「厚めに」とお伝えいただければ、そのとおりに調整しますので、大人が取り分ける手間はありません。',
  },
  {
    q: 'アレルギーがある場合はどうすればよいですか？',
    a: '該当する食材を、ご予約時の備考欄にお知らせください。切り分けの際にお声がけできますが、調理場では共通の設備を使用しているため、完全な分離はお約束できません。',
  },
];

export default function FamilyPage() {
  return (
    <>
      <PageHero
        photo={photos.seatLargeBooth}
        latin="FAMILY"
        title="新宿で子連れシュラスコを探している方へ"
        lead="切り分ける量をその場で調整できるので、食べる量に差があるご家族でも、同じテーブルで無理なく過ごせます。"
        crumbs={crumbs}
        objectPosition="center 55%"
      />

      {/* 子ども料金 */}
      <section className="bg-char py-24 md:py-32">
        <div className="mx-auto max-w-[86rem] px-5 md:px-9">
          <SectionHeading
            index="01"
            latin="CHILD PRICING"
            title="お子様料金は年齢で3つに分かれます"
            lead="人数に一律でコース料金を掛けるのではなく、年齢で分けて計算できるため、ご家族の総額が読みやすくなります。"
          />

          <dl className="mt-14 grid gap-px sm:grid-cols-3">
            {site.childPolicy.rules.map((r) => (
              <div
                key={r.age}
                className="border-t-2 border-gold/50 bg-char-2/50 px-6 py-9 md:px-8 md:py-11"
              >
                <dt className="text-[0.9rem] tracking-[0.06em] text-ivory-dim">
                  {r.age}
                </dt>
                <dd className="mt-4 font-mincho text-[1.9rem] text-gold md:text-[2.2rem]">
                  {r.price}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-8 text-[0.86rem] leading-[2] text-ivory-2">
            たとえば大人2名、6歳のお子様1名、3歳のお子様1名でお越しの場合、大人2名分と半額1名分が目安になります。
          </p>
          <p className="mt-3 text-[0.75rem] leading-relaxed text-ivory-dim">
            ※ 料金の区分は変更になる場合があります。{' '}
            {freshnessNote(site.childPolicy.lastVerifiedAt)}
          </p>
        </div>
      </section>

      {/* なぜ子連れに向くか */}
      <section className="bg-ivory py-24 text-brown md:py-32">
        <div className="mx-auto max-w-[86rem] px-5 md:px-9">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:items-center lg:gap-20">
            <div>
              <SectionHeading
                index="02"
                latin="WHY IT WORKS"
                title="食べる量に差があっても困らない"
                tone="light"
              />
              <div className="mt-9 space-y-6 text-[0.92rem] leading-[2.15] text-brown/80">
                <p>
                  シュラスコは、あらかじめ盛り付けた皿が出てくる料理ではありません。スタッフが焼きたての串を持ってテーブルへ伺い、その場でナイフを入れます。
                </p>
                <p>
                  「この子には少なめに」「厚めに」とお伝えいただければ、そのとおりに切り分けます。取り分けの手間がないので、大人が自分の食事を中断せずに済みます。残してしまう心配も減ります。
                </p>
                <p>
                  肉が進まないときは、サラダバーにライス、スープ、温かい副菜が並びます。ご飯ものだけでも食事になりますので、お子様のその日の食欲に合わせられます。
                </p>
              </div>
            </div>

            <div className="reveal">
              <Image
                src={photos.chickenThigh.src}
                alt={photos.chickenThigh.alt}
                width={photos.chickenThigh.width}
                height={photos.chickenThigh.height}
                sizes="(min-width: 1024px) 44vw, 92vw"
                className="w-full object-cover"
              />
              <p className="mt-3 text-[0.78rem] leading-relaxed text-brown/60">
                鶏もも肉。牛より食べやすく、お子様に選ばれています
              </p>
            </div>
          </div>

          <div className="mt-16 grid gap-x-12 gap-y-10 md:grid-cols-3">
            {[
              {
                photo: photos.paoDeQueijo,
                t: 'ポンデケージョ',
                b: 'もちりとした食感のブラジル定番チーズパン。焼きたてのタイミングでお持ちします。',
              },
              {
                photo: photos.grilledPineapple,
                t: '焼きパイナップル',
                b: 'シナモンをまとわせた甘みのある一品。デザート代わりにもなります。',
              },
              {
                photo: photos.garlicRice,
                t: 'サラダバーのライス・スープ',
                b: '温かい副菜も並びます。肉が進まないときの選択肢としてお使いください。',
              },
            ].map((c) => (
              <div key={c.t} className="reveal">
                <Image
                  src={c.photo.src}
                  alt={c.photo.alt}
                  width={c.photo.width}
                  height={c.photo.height}
                  sizes="(min-width: 768px) 30vw, 92vw"
                  className="aspect-[4/3] w-full object-cover"
                />
                <h3 className="mt-4 text-[1rem] text-brown">{c.t}</h3>
                <p className="mt-2.5 text-[0.83rem] leading-[1.95] text-brown/70">
                  {c.b}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 席と時間 */}
      <section className="bg-ink py-24 md:py-32">
        <div className="mx-auto max-w-[86rem] px-5 md:px-9">
          <SectionHeading
            index="03"
            latin="SEAT & TIME"
            title="お席と、ご来店の時間"
          />

          <div className="mt-14 grid gap-px md:grid-cols-2">
            <div className="border-t border-gold/25 bg-char-2/40 px-6 py-10 md:px-10 md:py-12">
              <h3 className="text-[1.15rem] text-ivory">お席のご相談</h3>
              <p className="mt-5 text-[0.88rem] leading-[2.05] text-ivory-dim">
                両側をソファーで囲んだボックス席は、荷物を置いても窮屈になりにくく、周囲の視線も気になりません。ベビーカーをご利用の場合や、通路に余裕がほしい場合は、ご予約時の備考欄にお書き添えください。
              </p>
              <p className="mt-4 text-[0.88rem] leading-[2.05] text-ivory-dim">
                ビルの7階ですので、1階からエレベーターでお上がりいただけます。
              </p>
              <Link
                href="/space"
                className="group mt-7 inline-flex items-center gap-3 text-[0.86rem] text-gold"
              >
                店内のお席を写真で見る
                <span
                  aria-hidden="true"
                  className="h-px w-8 bg-gold/60 transition-all duration-500 group-hover:w-12"
                />
              </Link>
            </div>

            <div className="border-t border-gold/25 bg-char-2/40 px-6 py-10 md:px-10 md:py-12">
              <h3 className="text-[1.15rem] text-ivory">
                早い時間のご来店がお得です
              </h3>
              <p className="mt-5 text-[0.88rem] leading-[2.05] text-ivory-dim">
                当店は16時開店です。16時から17時のご入店であれば、
                {earlyCourse.name}をお選びいただけます。シュラスコ食べ放題・サラダバー・120分飲み放題という構成は変わらず、価格が下がります。
              </p>
              <p className="mt-6 flex items-baseline gap-3">
                <span className="font-mincho text-[1.9rem] text-gold tabular-nums">
                  {formatYen(earlyCourse.salePrice)}
                </span>
                {earlyCourse.regularPrice && (
                  <span className="text-[0.8rem] text-ivory-dim line-through">
                    {formatYen(earlyCourse.regularPrice)}
                  </span>
                )}
                <span className="text-[0.75rem] text-ivory-dim">税込</span>
              </p>
              <div className="mt-7">
                <ReservationLink
                  location="family"
                  courseName={earlyCourse.name}
                  variant="outline"
                  size="md"
                >
                  早割ディナーコースを予約する
                </ReservationLink>
              </div>
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
              title="お子様連れのご利用について"
            />
            <Faq items={faq} />
          </div>

          <div className="mt-16 border-t border-ivory/12 pt-10">
            <p className="latin text-[0.72rem] text-gold">RELATED</p>
            <ul className="mt-6 flex flex-wrap gap-x-10 gap-y-3">
              {[
                {
                  href: '/news/shinjuku-family-churrasco',
                  label: '子連れシュラスコで確認したいことを読む',
                },
                { href: '/menu#early-dinner', label: '早割ディナーコースを見る' },
                {
                  href: '/news/churrasco-price-time-guide',
                  label: '料金と時間の見方を読む',
                },
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
        location="family"
        photo={photos.seatLargeBooth}
        objectPosition="center 55%"
        label="空席を確認する"
        title={
          <>
            ご家族の人数と、
            <br />
            お子様の年齢を添えて。
          </>
        }
        lead="ご予約時の備考欄に、お子様の人数と年齢、ベビーカーのご利用をお書き添えください。お席のご案内に反映いたします。"
      />

      <JsonLd
        data={graph(
          breadcrumbWithId(crumbs, PATH),
          webPageSchema({
            path: PATH,
            name: title,
            description,
            primaryImage: photos.seatLargeBooth.src,
          }),
          faqSchema(faq, PATH)
        )}
      />
    </>
  );
}
