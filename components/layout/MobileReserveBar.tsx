import { ReservationLink } from '@/components/ui/ReservationLink';

/**
 * スマートフォン用の画面下部固定予約ボタン。
 * 本文・フッターが隠れないよう、body 側に pb-fixed-cta で同じ高さの余白を確保している。
 *
 * 電話番号は確定していますが、本サイトの主目的が TableCheck での予約獲得のため、
 * 固定バーは予約導線に一本化しています（電話番号はフッター・アクセス・
 * トップ・当店についてページに tel: リンクで掲載）。
 * 固定バーに電話ボタンを併設したい場合は、ここを 2 分割してください。
 */
export function MobileReserveBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 pb-[env(safe-area-inset-bottom)] md:hidden">
      <ReservationLink location="mobile-fixed" variant="bar" size="md">
        WEB予約 / 空席を確認する
      </ReservationLink>
    </div>
  );
}
