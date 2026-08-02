import type { MetadataRoute } from 'next';
import { site } from '@/lib/site-config';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.shortName,
    description:
      '新宿・歌舞伎町のシュラスコ専門店。約15種類の本格シュラスコと約30種類のサラダバーを、飲み放題付きのコースでお楽しみいただけます。',
    lang: 'ja',
    start_url: '/',
    display: 'standalone',
    background_color: '#12100e',
    theme_color: '#12100e',
    icons: [
      {
        src: '/icon.png',
        sizes: '256x256',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}
