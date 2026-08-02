'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { nav, site } from '@/lib/site-config';
import { Wordmark } from '@/components/ui/Wordmark';
import { ReservationLink } from '@/components/ui/ReservationLink';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // ページ遷移時はメニューを閉じる（レンダー中に state を調整するパターン）
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // メニュー表示中は背面をスクロールさせない
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled || menuOpen
            ? 'bg-char/95 backdrop-blur-sm'
            : 'bg-gradient-to-b from-ink/70 to-transparent'
        }`}
      >
        <div
          className={`absolute inset-x-0 bottom-0 h-px bg-gold/25 transition-opacity duration-500 ${
            scrolled && !menuOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />

        <div className="mx-auto flex max-w-[86rem] items-center justify-between px-5 py-4 md:px-9 md:py-5">
          <Link
            href="/"
            aria-label={`${site.name} トップページ`}
            className="shrink-0 transition-opacity hover:opacity-80"
          >
            {/* Wordmark 自身が display を持つため、表示切替は外側の要素で行う */}
            <span className="block md:hidden">
              <Wordmark size="sm" />
            </span>
            <span className="hidden md:block">
              <Wordmark size="md" />
            </span>
          </Link>

          {/* PC ナビゲーション */}
          <nav aria-label="メインナビゲーション" className="hidden lg:block">
            <ul className="flex items-center gap-7 xl:gap-9">
              {nav.map((item) => {
                const active =
                  pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      className={`text-[0.78rem] tracking-[0.1em] transition-colors ${
                        active ? 'text-gold' : 'text-ivory/85 hover:text-gold'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            {/* ReservationLink 自身が inline-flex を持つため、表示切替は外側で行う */}
            <span className="hidden md:block">
              <ReservationLink location="header" variant="outline" size="sm">
                WEB予約
              </ReservationLink>
            </span>

            {/* ハンバーガー */}
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'メニューを閉じる' : 'メニューを開く'}
              className="relative z-50 flex size-10 flex-col items-center justify-center gap-[5px] border border-ivory/25 transition-colors hover:border-gold lg:hidden"
            >
              <span
                className={`block h-px w-5 bg-ivory transition-transform duration-300 ${
                  menuOpen ? 'translate-y-[6px] rotate-45' : ''
                }`}
              />
              <span
                className={`block h-px w-5 bg-ivory transition-opacity duration-200 ${
                  menuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block h-px w-5 bg-ivory transition-transform duration-300 ${
                  menuOpen ? '-translate-y-[6px] -rotate-45' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/*
        モバイルメニューは <header> の外に置く。
        header に backdrop-filter が掛かると position:fixed の含みブロックになり、
        inset-0 がヘッダーの高さに閉じ込められてしまうため。
      */}
      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="fixed inset-0 top-[4.5rem] z-40 overflow-y-auto bg-char lg:hidden"
      >
        <nav aria-label="モバイルナビゲーション" className="px-6 pt-6 pb-16">
          <ul className="divide-y divide-ivory/10 border-y border-ivory/10">
            {nav.map((item, i) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-baseline gap-4 py-4"
                >
                  <span className="latin w-8 shrink-0 text-[0.7rem] text-gold tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="flex flex-col gap-1">
                    <span className="text-[0.95rem] text-ivory">
                      {item.label}
                    </span>
                    <span className="latin text-[0.7rem] text-ivory-dim">
                      {item.latin}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
            <li>
              <Link href="/privacy" className="flex items-baseline gap-4 py-4">
                <span className="latin w-8 shrink-0 text-[0.7rem] text-gold tabular-nums">
                  {String(nav.length + 1).padStart(2, '0')}
                </span>
                <span className="flex flex-col gap-1">
                  <span className="text-[0.95rem] text-ivory">
                    プライバシーポリシー
                  </span>
                  <span className="latin text-[0.7rem] text-ivory-dim">
                    PRIVACY
                  </span>
                </span>
              </Link>
            </li>
          </ul>

          <div className="mt-9">
            <ReservationLink
              location="mobile-menu"
              variant="solid"
              size="md"
              fullWidth
              showExternalNote
            >
              WEB予約
            </ReservationLink>
          </div>

          <div className="mt-9 space-y-2 text-[0.75rem] leading-loose text-ivory-dim">
            <p>{site.address.full}</p>
            <p>新宿駅 徒歩約3分 / 西武新宿駅 徒歩約4分</p>
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="latin inline-block text-[0.74rem] text-gold"
            >
              INSTAGRAM
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
