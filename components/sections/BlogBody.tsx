import Link from 'next/link';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';

/**
 * ブログ本文（Markdown）のレンダラー。
 * 既存の記事ページ（/news）と同じ見た目になるよう、要素ごとにクラスを当てる。
 * h2 には目次から飛ぶための id を振る。
 */

/** 目次と同じ規則で h2 に連番の id を振るためのカウンタ */
function createComponents(): Components {
  let h2Index = 0;

  return {
    h2: ({ children }) => {
      h2Index += 1;
      return (
        <h2
          id={`section-${h2Index}`}
          className="!mt-16 scroll-mt-24 border-l-2 border-gold pl-5 text-[1.25rem] leading-[1.7] text-balance-ja text-ivory md:text-[1.5rem]"
        >
          {children}
        </h2>
      );
    },
    h3: ({ children }) => (
      <h3 className="!mt-12 text-[1.02rem] leading-[1.75] text-balance-ja text-gold md:text-[1.15rem]">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="!mt-8 text-[0.95rem] leading-[1.75] text-ivory">
        {children}
      </h4>
    ),
    p: ({ children }) => (
      <p className="text-[0.92rem] leading-[2.15] text-ivory-2">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="!mt-8 space-y-3.5 border-y border-ivory/12 py-7">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="!mt-8 list-decimal space-y-3.5 border-y border-ivory/12 py-7 pl-6 marker:text-gold">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="text-[0.88rem] leading-[1.95] text-ivory-2">{children}</li>
    ),
    strong: ({ children }) => (
      <strong className="font-normal text-gold">{children}</strong>
    ),
    em: ({ children }) => <em className="not-italic text-ivory">{children}</em>,
    blockquote: ({ children }) => (
      <blockquote className="border-l border-gold/40 bg-char-2/60 py-4 pl-5 text-[0.85rem] leading-[1.95] text-ivory-dim">
        {children}
      </blockquote>
    ),
    hr: () => <hr className="!my-12 border-ivory/12" />,
    a: ({ href, children }) => {
      const url = href ?? '#';
      const isExternal = /^https?:\/\//.test(url);

      if (isExternal) {
        const isTableCheck = url.includes('tablecheck.com');
        return (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            {...(isTableCheck
              ? { 'data-cta': 'tablecheck', 'data-location': 'article' }
              : {})}
            className="text-gold link-underline"
          >
            {children}
          </a>
        );
      }

      return (
        <Link href={url} className="text-gold link-underline">
          {children}
        </Link>
      );
    },
    table: ({ children }) => (
      <div className="!mt-8 overflow-x-auto">
        <table className="w-full border-collapse text-[0.85rem]">
          {children}
        </table>
      </div>
    ),
    th: ({ children }) => (
      <th className="border-b border-gold/40 px-3 py-3 text-left font-normal text-gold">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="border-b border-ivory/12 px-3 py-3 align-top leading-[1.9] text-ivory-2">
        {children}
      </td>
    ),
    code: ({ children }) => (
      <code className="bg-char-2 px-1.5 py-0.5 text-[0.85em] text-ivory">
        {children}
      </code>
    ),
  };
}

export function BlogBody({ content }: { content: string }) {
  return (
    <div className="space-y-7">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={createComponents()}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
