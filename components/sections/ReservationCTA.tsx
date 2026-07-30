import Image from 'next/image';
import { photos, type Photo } from '@/lib/images';
import { site } from '@/lib/site-config';
import { ReservationButton } from '@/components/ui/ReservationButton';

/**
 * ページ末尾の予約導線。
 * 設置箇所ごとに文言と背景写真を差し替えられるようにし、
 * 全ページで同じ絵が続かないようにしている。
 */
export function ReservationCTA({
  location,
  label = 'TableCheckで予約する',
  photo = photos.picanhaSide,
  objectPosition = 'center',
  title = (
    <>
      焼きたてを、
      <br className="sm:hidden" />
      目の前で。
    </>
  ),
  lead = '席数に限りがあるため、ご予約をおすすめしています。空席状況とコース内容は、TableCheck の予約ページからご確認いただけます。',
}: {
  location: string;
  label?: string;
  photo?: Photo;
  objectPosition?: string;
  title?: React.ReactNode;
  lead?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden">
      <Image
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        sizes="100vw"
        style={{ objectPosition }}
        className="absolute inset-0 -z-10 size-full object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-ink/80 mix-blend-multiply"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-bordeaux-deep/70 via-char/60 to-transparent"
      />

      <div className="mx-auto max-w-[86rem] px-5 py-24 md:px-9 md:py-32">
        <div className="max-w-xl">
          <p className="latin flex items-center gap-3 text-[0.74rem] text-gold">
            <span className="h-px w-8 bg-gold/50" />
            RESERVATION
          </p>
          <p className="mt-6 font-mincho text-[1.9rem] leading-[1.5] text-ivory md:text-[2.6rem]">
            {title}
          </p>
          <p className="mt-7 text-[0.9rem] leading-[2.05] text-ivory-2">
            {lead}
          </p>

          <div className="mt-10">
            <ReservationButton
              location={location}
              variant="solid"
              size="lg"
              showExternalNote
            >
              {label}
            </ReservationButton>
          </div>

          <dl className="mt-12 space-y-3 border-t border-ivory/15 pt-8 text-[0.8rem]">
            <div className="flex gap-5">
              <dt className="w-14 shrink-0 text-gold-dim">所在地</dt>
              <dd className="text-ivory-2">{site.address.full}</dd>
            </div>
            <div className="flex gap-5">
              <dt className="w-14 shrink-0 text-gold-dim">アクセス</dt>
              <dd className="text-ivory-2">
                新宿駅 徒歩約3分 / 西武新宿駅 徒歩約4分
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
