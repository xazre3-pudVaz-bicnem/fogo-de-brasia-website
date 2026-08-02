import {
  courses,
  featuredCourses,
  otherCourses,
  formatYen,
  priceNotice,
  type Course,
} from '@/data/courses';
import { freshnessNote, LAST_VERIFIED_AT } from '@/lib/site-config';
import { ReservationLink } from '@/components/ui/ReservationLink';

function PriceBlock({ course, big }: { course: Course; big?: boolean }) {
  return (
    <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
      {course.regularPrice && (
        <span className="text-[0.8rem] text-ivory-dim line-through decoration-bordeaux decoration-1">
          {formatYen(course.regularPrice)}
        </span>
      )}
      <span
        className={`font-mincho tabular-nums text-gold ${
          big ? 'text-[2rem] md:text-[2.4rem]' : 'text-[1.5rem]'
        }`}
      >
        {formatYen(course.salePrice)}
        {course.priceSuffix}
      </span>
      <span className="text-[0.75rem] text-ivory-dim">税込</span>
    </p>
  );
}

/** 代表コースを大きく、その他を一覧で見せる（すべて同じ大きさのカードにしない） */
export function CourseList() {
  return (
    <div>
      {/* 代表コース */}
      <div className="space-y-px">
        {featuredCourses.map((course, i) => (
          <article
            key={course.id}
            id={course.id}
            className="reveal grid scroll-mt-24 gap-8 border-l-2 border-gold/50 bg-char-2 px-6 py-10 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-14 md:px-12 md:py-14"
          >
            <div>
              <p className="latin flex flex-wrap items-center gap-3 text-[0.7rem] text-gold">
                <span className="tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="h-px w-6 bg-gold/50" />
                <span>{course.duration} MIN</span>
                {course.condition && (
                  <span className="border border-gold/40 px-2 py-0.5 text-[0.7rem] tracking-[0.14em] text-gold">
                    {course.condition}
                  </span>
                )}
              </p>

              <h3 className="mt-5 text-[1.4rem] leading-snug text-ivory md:text-[1.8rem]">
                {course.name}
              </h3>
              <p className="mt-3 text-[0.88rem] leading-[1.95] text-ivory-dim">
                {course.description}
              </p>

              <ul className="mt-7 space-y-2.5">
                {course.features.map((line) => (
                  <li
                    key={line}
                    className="flex gap-3 text-[0.85rem] leading-[1.85] text-ivory-2"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[0.7em] h-px w-3 shrink-0 bg-gold/60"
                    />
                    {line}
                  </li>
                ))}
              </ul>

              <div className="mt-7 border-t border-ivory/12 pt-5">
                <p className="text-[0.75rem] tracking-[0.08em] text-gold-dim">
                  こんな方に
                </p>
                <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                  {course.recommendedFor.map((r) => (
                    <li
                      key={r}
                      className="text-[0.8rem] leading-relaxed text-ivory-dim"
                    >
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="shrink-0 md:text-right">
              <PriceBlock course={course} big />
              <div className="mt-6">
                <ReservationLink
                  location="course"
                  courseName={course.name}
                  href={course.tableCheckUrl}
                  variant="outline"
                  size="md"
                >
                  このコースで予約する
                </ReservationLink>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* その他のコース：一覧形式 */}
      <div className="mt-16">
        <p className="latin text-[0.72rem] text-gold">OTHER PLANS</p>
        <ul className="mt-6 border-t border-ivory/12">
          {otherCourses.map((course) => (
            <li
              key={course.id}
              id={course.id}
              className="grid scroll-mt-24 gap-5 border-b border-ivory/12 py-8 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)_auto] md:items-center md:gap-10"
            >
              <div>
                <h3 className="text-[1.05rem] text-ivory">{course.name}</h3>
                <p className="mt-2 text-[0.82rem] leading-[1.9] text-ivory-dim">
                  {course.description}
                </p>
                {course.condition && (
                  <p className="latin mt-3 inline-block border border-gold/35 px-2 py-0.5 text-[0.7rem] tracking-[0.14em] text-gold">
                    {course.condition}
                  </p>
                )}
              </div>

              <ul className="space-y-1.5">
                {course.features.map((line) => (
                  <li
                    key={line}
                    className="text-[0.78rem] leading-[1.8] text-ivory-2"
                  >
                    {line}
                  </li>
                ))}
              </ul>

              <div className="md:text-right">
                <PriceBlock course={course} />
                <p className="latin mt-1.5 text-[0.7rem] text-ivory-dim">
                  {course.duration} MIN
                </p>
                <div className="mt-4">
                  <ReservationLink
                    location="course"
                    courseName={course.name}
                    href={course.tableCheckUrl}
                    variant="ghost"
                    size="sm"
                  >
                    予約する
                  </ReservationLink>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <ul className="mt-9 space-y-1.5">
        {priceNotice.map((n) => (
          <li key={n} className="text-[0.75rem] leading-relaxed text-ivory-dim">
            ※ {n}
          </li>
        ))}
        <li className="text-[0.75rem] leading-relaxed text-ivory-dim">
          ※ {freshnessNote(LAST_VERIFIED_AT)}
        </li>
      </ul>
    </div>
  );
}

/** トップページ用の抜粋（代表コースのみ） */
export function CoursePreview() {
  return (
    <ul className="space-y-px">
      {featuredCourses.map((course, i) => (
        <li
          key={course.id}
          className="group grid gap-5 border-l border-gold/30 bg-char-2/70 px-6 py-8 transition-colors hover:bg-char-2 md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-center md:gap-10 md:px-10"
        >
          <span className="latin text-[0.7rem] text-gold tabular-nums">
            {String(i + 1).padStart(2, '0')}
          </span>
          <div>
            <h3 className="text-[1.1rem] text-ivory md:text-[1.25rem]">
              {course.name}
            </h3>
            <p className="mt-2 text-[0.82rem] leading-[1.9] text-ivory-dim">
              {course.description}
            </p>
          </div>
          <div className="md:text-right">
            <PriceBlock course={course} />
            <p className="latin mt-1.5 text-[0.7rem] text-ivory-dim">
              {course.duration} MIN
            </p>
          </div>
        </li>
      ))}
      <li className="pt-8">
        <ReservationLink location="course" variant="outline" size="md">
          コースを選んで予約する
        </ReservationLink>
      </li>
    </ul>
  );
}

export { courses };
