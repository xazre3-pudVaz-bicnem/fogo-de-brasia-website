/**
 * 一時公開停止（メンテナンスモード）。
 *
 * このファイルがある間、サイトの全URL（画像・sitemap・robots.txt を含む）に
 * 503 + Retry-After を返し、メンテナンス画面だけを表示する。
 * 503 は「一時的な停止」として扱われるため、短期間であれば検索順位への影響を抑えられる。
 *
 * 公開を再開するときは、このファイルを削除して main へ push する。
 */
const MAINTENANCE_HTML = `<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>メンテナンス中</title>
<style>
  html, body { height: 100%; margin: 0; }
  body {
    display: grid; place-items: center; padding: 24px; box-sizing: border-box;
    background: #faf8f5; color: #1c1917;
    font-family: "Hiragino Sans", "Noto Sans JP", system-ui, sans-serif;
    text-align: center; line-height: 1.9;
  }
  h1 { font-size: 1.25rem; font-weight: 600; letter-spacing: 0.08em; margin: 0 0 12px; }
  p { font-size: 0.9375rem; color: #57534e; margin: 0; }
  @media (prefers-color-scheme: dark) {
    body { background: #1c1917; color: #f5f5f4; }
    p { color: #a8a29e; }
  }
</style>
</head>
<body>
  <main>
    <h1>ただいまメンテナンス中です</h1>
    <p>ご不便をおかけして申し訳ございません。<br>再開まで今しばらくお待ちください。</p>
  </main>
</body>
</html>`;

export function proxy() {
  return new Response(MAINTENANCE_HTML, {
    status: 503,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
      'Retry-After': '3600',
    },
  });
}
