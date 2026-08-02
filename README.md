# シュラスコテーブル FOGO De BRASIA 新宿 公式サイト

新宿・歌舞伎町のシュラスコ専門店の公式サイト。
「新宿 シュラスコ」関連キーワードでの集客と、TableCheck での予約獲得を目的としています。

## 技術構成

| | |
| --- | --- |
| フレームワーク | Next.js 16（App Router） |
| 言語 | TypeScript |
| スタイル | Tailwind CSS v4 |
| 画像 | next/image（AVIF / WebP 自動配信） |
| デプロイ | Vercel 想定・全ページ静的生成 |

クライアント側 JavaScript はヘッダー（スクロール検知とモバイルメニュー）のみ。
その他はすべて Server Component で、アニメーションも CSS で完結しています。

```bash
npm install
npm run dev        # 開発サーバー
npm run build      # 本番ビルド
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
```

## ページ構成

| パス | 内容 |
| --- | --- |
| `/` | トップ |
| `/about` | FOGO De BRASIAについて |
| `/churrasco` | シュラスコについて |
| `/menu` | メニュー・コース |
| `/space` | 店内・個室 |
| `/occasions` | 利用シーン（9シーンのハブ。詳細は下の3ページへ） |
| `/party` | 宴会・貸切 |
| `/anniversary` | 誕生日・記念日 |
| `/family` | 子連れ・ご家族 |
| `/access` | アクセス・店舗情報 |
| `/news` `/news/[slug]` `/news/page/[n]` | お知らせ・コラム |
| `/privacy` | プライバシーポリシー |

## 環境変数

URL をコードへ直接書かず、環境変数から取得しています。**本番（Production）にのみ設定**してください。

| 変数 | 用途 |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | canonical・OG・構造化データ・sitemap の基点。末尾スラッシュなし |
| `LEGACY_HOST` | 旧ドメイン。設定すると新ドメインへ 308 リダイレクト |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Search Console の HTML タグ認証（任意） |

`NEXT_PUBLIC_SITE_URL` が未設定の環境（Preview / Branch デプロイ / ローカル）は、
**自動的に `noindex` になり、robots.txt は全面 disallow、sitemap と RSS は空**になります。
仮ドメインが検索結果に出て本番と重複するのを防ぐためです。設定は `.env.example` を参照してください。

### 独自ドメイン移行の手順

1. Vercel の Production に `NEXT_PUBLIC_SITE_URL` と `LEGACY_HOST` を設定
2. 再デプロイ（canonical・OG・sitemap・構造化データが自動で切り替わります）
3. Search Console にプロパティを追加し、sitemap を送信

## 更新するときに触るファイル

内容の変更は原則としてデータファイルだけで完結します。
コンポーネントに料金や店舗情報を直接書かないでください。

| ファイル | 管理対象 |
| --- | --- |
| `lib/site-config.ts` | 店名・住所・営業時間・電話番号・各種 URL・SEO の基本値 |
| `data/courses.ts` | コース名・料金・内容 |
| `data/menu.ts` | シュラスコ15種、サラダバー、デザート |
| `data/faq.ts` | FAQ（画面表示と構造化データが同一データから生成されます） |
| `data/occasions.ts` | 利用シーン |
| `data/news/` | お知らせ・コラム記事 |
| `lib/images.ts` | 写真のパス・寸法・alt |
| `lib/routes.ts` | 公開ページの一覧（sitemap・パンくずの出典） |
| `lib/env.ts` | 公開URLと index 可否の判定 |

### 記事を追加する

1. `data/news/<slug>.ts` を作成し、`Article` 型のオブジェクトを default export
2. `data/news/index.ts` で import して `articles` 配列に追加

公開日の降順で並び替えられ、一覧・ページネーション・`sitemap.xml`・
`Article` 構造化データへ自動的に反映されます。
1ページあたりの表示件数は `data/news/index.ts` の `PER_PAGE`（既定6件）で変更できます。

情報が不足している記事は `draft: true` にしておくと、一覧・sitemap・RSS に出ず、ページも 404 になります。
記事には要点（`keyPoints`）・トピック（`topics`）・記事固有 FAQ（`faq`）を持たせてください。
`topics` は関連記事の選定に使われます（同一カテゴリではなく検索意図の近さで選びます）。

## 店舗情報の確定状況

営業時間 16:00〜23:00 ／ 定休日なし ／ TEL 03-6233-7165 は店舗様より受領し、
`lib/site-config.ts` で `verified: true` として画面・構造化データへ反映済みです。
変更が生じた場合はこのファイルの値だけを書き換えれば全ページへ反映されます。

電話番号は フッター・アクセス・トップ・当店について の4箇所に `tel:` リンクで掲載しています。
モバイルの画面下部固定バーは、本サイトの主目的である TableCheck 予約に一本化しています
（電話ボタンを併設したい場合は `components/layout/MobileReserveBar.tsx` を分割してください）。

### 【要確認】残っている未確定項目

| 項目 | 対応 |
| --- | --- |
| 緯度・経度 | 未確認のため構造化データの `geo` は出力せず、地図は住所検索の埋め込みを使用 |
| 外観・入口の写真 | お預かりした写真に含まれていませんでした。撮影後 `public/images/` に追加してください |
| 本番ドメイン | `site.url` を実際のドメインに変更してください（canonical・OG・sitemap の基点） |
| ラストオーダー時刻 | 未確認のため掲載していません。判明後 `openingHours.draft.text` に追記できます |

## 画像・ロゴについて

- 配信用の最適化済み WebP は `public/images/`
- 元データは `photos-source/`（`public/` の外にあるため配信されません）
- 変換スクリプト: `scripts/build-images.mjs`（店舗写真）／ `scripts/build-logo.mjs`（ロゴ・ヒーロー）
- 店舗写真の対応表は `photos-source/MANIFEST.txt`

### ロゴ

ご支給いただいたロゴは白背景・150px 角のため、そのままでは暗い背景に置けません。
`scripts/build-logo.mjs` で以下を自動生成しています。

| 生成物 | 内容 | 使用箇所 |
| --- | --- | --- |
| `logo-mark.webp` | エンブレム（牛＋炎）のみ。透過・ダーク背景用 | ヘッダー |
| `logo-full.webp` | 文字を含むロゴ全体。透過・ダーク背景用 | フッター |
| `app/icon.png` | エンブレムから生成した favicon | ブラウザタブ |

白背景を透過に変換したうえで、**炎の赤はブランド色として維持し、黒だった線画と文字を
アイボリーへ置き換えて**います（＝ダークモード用ロゴ）。元の配色のままではチャコール地で
文字が読めなくなるためです。

ヘッダーは文字が潰れないよう、エンブレム＋文字組みの店名という組み合わせにしています。
ロゴを差し替える場合は `photos-source/supplied/logo.jpg` を置き換えて
`node scripts/build-logo.mjs` を実行してください。

### 容量について

`photos-source/` はリポジトリの容量を大きく増やします（約77MB）。
Git で管理する必要がなければ `.gitignore` に追加し、別途保管することをおすすめします。

## SEO

- ページごとに固有の title / description / canonical / OG / X カード
- 構造化データ: トップは `Organization` / `WebSite` / `Restaurant`、下層は `BreadcrumbList` / `WebPage`、記事は `Article`、FAQ 表示ページは `FAQPage`
- `Restaurant` には `potentialAction`（TableCheck への `ReserveAction`）と `areaServed` を設定
- `sitemap.xml`（画像情報つき）、`robots.txt`、`feed.xml`（RSS）、`manifest.webmanifest`、404 ページ、favicon
- 予約リンクは `components/ui/ReservationLink.tsx` に集約。`data-cta="tablecheck"` / `data-location` を付与
- クリック計測は `components/analytics/CtaTracker.tsx` が委譲リスナー 1 つで処理（GA4 の `tablecheck_click`）。
  ボタンごとに `use client` を付けないため、初回 JavaScript が増えません

構造化データは確認できた事実のみで構成しています。
未確認の値を推測で補完しないでください。
