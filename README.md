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
| `/occasions` | 利用シーン（デート／誕生日／女子会／家族／宴会など9シーン） |
| `/party` | 宴会・貸切・記念日 |
| `/access` | アクセス・店舗情報 |
| `/news` `/news/[slug]` `/news/page/[n]` | お知らせ・コラム |
| `/privacy` | プライバシーポリシー |

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

### 記事を追加する

1. `data/news/<slug>.ts` を作成し、`Article` 型のオブジェクトを default export
2. `data/news/index.ts` で import して `articles` 配列に追加

公開日の降順で並び替えられ、一覧・ページネーション・`sitemap.xml`・
`Article` 構造化データへ自動的に反映されます。
1ページあたりの表示件数は `data/news/index.ts` の `PER_PAGE`（既定6件）で変更できます。

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

## 写真について

- 配信用の最適化済み WebP は `public/images/`（40点・計約4.9MB）
- 元データは `photos-source/`（84点・計約75MB）。`public/` の外にあるため配信されません
- 変換スクリプトは `scripts/build-images.mjs`、対応表は `photos-source/MANIFEST.txt`

`photos-source/` はリポジトリの容量を大きく増やします。
Git で管理する必要がなければ `.gitignore` に追加し、別途保管することをおすすめします。

## SEO

- ページごとに固有の title / description / canonical / OG / X カード
- 構造化データ: `Restaurant`（`hasMenu` 付き）、`WebSite`、`BreadcrumbList`、`FAQPage`、`Article`
- `sitemap.xml`、`robots.txt`、404 ページ、favicon
- 予約ボタンには計測用の `data-cta="tablecheck"` / `data-location="..."` を付与

構造化データは確認できた事実のみで構成しています。
未確認の値を推測で補完しないでください。
