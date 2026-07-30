import Image from 'next/image';
import type { Photo } from '@/lib/images';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import type { Crumb } from '@/lib/structured-data';

/**
 * 下層ページ共通のヘッダー。
 * 写真を背景に敷き、パンくず・英字ラベル・H1・リードを重ねる。
 */
export function PageHero({
  photo,
  latin,
  title,
  lead,
  crumbs,
  objectPosition = 'center',
}: {
  photo: Photo;
  latin: string;
  title: string;
  lead?: string;
  crumbs: Crumb[];
  objectPosition?: string;
}) {
  return (
    <section className="relative isolate flex min-h-[62svh] flex-col justify-end overflow-hidden pt-28 md:min-h-[66svh]">
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        priority
        sizes="100vw"
        style={{ objectPosition }}
        className="-z-10 object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-char via-char/75 to-ink/55"
      />

      <div className="mx-auto w-full max-w-[86rem] px-5 pb-14 md:px-9 md:pb-20">
        <Breadcrumbs crumbs={crumbs} />

        <p className="latin mt-8 flex items-center gap-3 text-[0.74rem] text-gold">
          <span className="h-px w-8 bg-gold/50" />
          {latin}
        </p>
        <h1 className="mt-5 max-w-4xl text-[1.8rem] leading-[1.55] text-balance-ja text-ivory md:text-[2.6rem]">
          {title}
        </h1>
        {lead && (
          <p className="mt-6 max-w-2xl text-[0.92rem] leading-[2.05] text-ivory-2">
            {lead}
          </p>
        )}
      </div>
    </section>
  );
}
