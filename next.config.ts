import path from 'node:path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // 親ディレクトリにも lockfile があるため、ワークスペースの基点を明示する
  turbopack: { root: path.resolve(import.meta.dirname) },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 480, 640, 828, 1080, 1200, 1600, 1920],
    imageSizes: [64, 96, 128, 200, 256, 320, 420],
  },
  poweredByHeader: false,
};

export default nextConfig;
