/**
 * 構造化データの出力。
 * 値は lib/structured-data.ts で組み立て、確認できない項目は出力しない。
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // 構造化データは静的に組み立てたオブジェクトのみを渡す
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
