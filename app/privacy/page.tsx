import type { Metadata } from 'next';

import { site } from '@/lib/site-config';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { JsonLd } from '@/components/ui/JsonLd';
import { breadcrumbSchema, graph } from '@/lib/structured-data';

export const metadata: Metadata = {
  title: 'プライバシーポリシー',
  description:
    'シュラスコテーブル FOGO De BRASIA 新宿の個人情報保護方針です。お客様からお預かりした個人情報の取り扱い、利用目的、第三者提供、アクセス解析ツールについてご説明します。',
  alternates: { canonical: '/privacy' },
  robots: { index: true, follow: true },
};

const crumbs = [
  { name: 'ホーム', href: '/' },
  { name: 'プライバシーポリシー', href: '/privacy' },
];

const sections = [
  {
    t: '個人情報の定義',
    body: [
      '本ポリシーにおける「個人情報」とは、個人情報の保護に関する法律に定める個人情報、すなわち生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日その他の記述等により特定の個人を識別することができるもの、および個人識別符号が含まれるものをいいます。',
    ],
  },
  {
    t: '個人情報の取得',
    body: [
      '当店は、適法かつ公正な手段によって個人情報を取得します。当ウェブサイトからのご予約は、外部の予約サービスである TableCheck を通じて行われます。ご予約にあたって入力された情報の取り扱いについては、TableCheck の定めるプライバシーポリシーもあわせてご確認ください。',
    ],
  },
  {
    t: '個人情報の利用目的',
    body: [
      '当店は、取得した個人情報を次の目的の範囲内で利用します。',
    ],
    list: [
      'ご予約の受付、確認、変更およびキャンセルに関するご連絡',
      'ご来店当日のご案内、お席やお料理に関するご相談への対応',
      'アレルギーなど、お食事に関するご要望への対応',
      'お問い合わせへの回答',
      'サービス向上のための分析（個人を特定しない統計的な処理に限ります）',
    ],
  },
  {
    t: '個人情報の第三者提供',
    body: [
      '当店は、次の場合を除き、あらかじめご本人の同意を得ることなく個人情報を第三者へ提供しません。',
    ],
    list: [
      '法令に基づく場合',
      '人の生命、身体または財産の保護のために必要があり、ご本人の同意を得ることが困難である場合',
      '国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合',
    ],
  },
  {
    t: '個人情報の管理',
    body: [
      '当店は、個人情報の漏えい、滅失またはき損の防止その他の個人情報の安全管理のために必要かつ適切な措置を講じます。個人情報の取り扱いを外部に委託する場合は、委託先に対して必要かつ適切な監督を行います。',
    ],
  },
  {
    t: 'アクセス解析ツールについて',
    body: [
      '当ウェブサイトでは、サービス向上のためアクセス解析ツールを利用する場合があります。これらのツールはトラフィックデータの収集のために Cookie を使用することがありますが、収集される情報は匿名で、個人を特定するものではありません。Cookie の利用は、ブラウザの設定により無効にすることができます。',
    ],
  },
  {
    t: '外部サービスへのリンク',
    body: [
      '当ウェブサイトには、TableCheck、Instagram、Google マップなど外部サービスへのリンクが含まれます。リンク先で提供されるサービスおよび個人情報の取り扱いについては、各サービスの定めるところによります。当店は、リンク先における個人情報の取り扱いについて責任を負いかねます。',
    ],
  },
  {
    t: '個人情報の開示・訂正・利用停止',
    body: [
      'ご本人から、個人情報の開示、訂正、追加、削除または利用停止のお申し出があった場合には、ご本人であることを確認のうえ、法令の定めに従い速やかに対応いたします。',
    ],
  },
  {
    t: '本ポリシーの変更',
    body: [
      '当店は、法令の改正やサービス内容の変更等に応じて、本ポリシーを変更することがあります。変更後の内容は、当ウェブサイトに掲載した時点から効力を生じるものとします。',
    ],
  },
  {
    t: 'お問い合わせ',
    body: [
      '本ポリシーおよび個人情報の取り扱いに関するお問い合わせは、ご予約いただいた TableCheck の予約ページ、または当店までご連絡ください。',
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-char pb-24 pt-32 md:pb-32 md:pt-40">
        <div className="mx-auto max-w-[52rem] px-5 md:px-9">
          <Breadcrumbs crumbs={crumbs} />

          <div className="mt-10">
            <SectionHeading
              latin="PRIVACY POLICY"
              title="プライバシーポリシー"
              as="h1"
              lead={`${site.name}（以下「当店」といいます）は、お客様の個人情報の保護を重要な責務と考え、以下の方針に基づいて個人情報を取り扱います。`}
            />
          </div>

          <div className="mt-16 space-y-12">
            {sections.map((s, i) => (
              <section key={s.t}>
                <h2 className="flex items-baseline gap-4 text-[1.05rem] leading-[1.7] text-ivory md:text-[1.15rem]">
                  <span className="latin shrink-0 text-[0.72rem] text-gold tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {s.t}
                </h2>
                <div className="mt-5 space-y-5 pl-0 sm:pl-10">
                  {s.body.map((p) => (
                    <p
                      key={p}
                      className="text-[0.88rem] leading-[2.1] text-ivory-dim"
                    >
                      {p}
                    </p>
                  ))}
                  {s.list && (
                    <ul className="space-y-2.5 border-l border-ivory/15 pl-5">
                      {s.list.map((li) => (
                        <li
                          key={li}
                          className="text-[0.85rem] leading-[1.95] text-ivory-dim"
                        >
                          {li}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-20 border-t border-ivory/12 pt-8">
            <dl className="space-y-2 text-[0.82rem]">
              <div className="flex gap-6">
                <dt className="w-20 shrink-0 text-gold-dim">店名</dt>
                <dd className="text-ivory-2">{site.name}</dd>
              </div>
              <div className="flex gap-6">
                <dt className="w-20 shrink-0 text-gold-dim">所在地</dt>
                <dd className="text-ivory-2">{site.address.full}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <JsonLd data={graph(breadcrumbSchema(crumbs))} />
    </>
  );
}
