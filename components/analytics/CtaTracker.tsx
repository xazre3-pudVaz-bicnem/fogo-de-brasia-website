'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * 予約ボタンのクリック計測。
 *
 * ボタンごとに use client を付けると、その数だけ初回 JavaScript が増える。
 * ここでは document への委譲リスナーを 1 つだけ張り、
 * [data-cta="tablecheck"] のクリックをまとめて拾う。
 *
 * GA4（gtag）が読み込まれていない環境では何もしないため、
 * 後から GA4 を追加するだけで計測が始まる。
 *
 * 送信イベント: tablecheck_click
 *   page_path / cta_location / course_name / link_url
 */

type GtagWindow = Window & {
  gtag?: (
    command: 'event',
    eventName: string,
    params: Record<string, string>
  ) => void;
};

export function CtaTracker() {
  const pathname = usePathname();

  // 計測タグ側から参照できるよう、data-page を現在のパスで補完する
  useEffect(() => {
    document
      .querySelectorAll<HTMLAnchorElement>('a[data-cta="tablecheck"]')
      .forEach((el) => {
        el.dataset.page = pathname;
      });
  }, [pathname]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const link = target?.closest<HTMLAnchorElement>('a[data-cta="tablecheck"]');
      if (!link) return;

      const w = window as GtagWindow;
      if (typeof w.gtag !== 'function') return;

      w.gtag('event', 'tablecheck_click', {
        page_path: window.location.pathname,
        cta_location: link.dataset.location ?? '',
        course_name: link.dataset.course ?? '',
        link_url: link.href,
      });
    };

    document.addEventListener('click', onClick, { passive: true });
    return () => document.removeEventListener('click', onClick);
  }, []);

  return null;
}
