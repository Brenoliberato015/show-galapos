/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  outputFileTracingIncludes: {
    '/': ['./site/**/*'],
    '/img/[file]': ['./site/img/**/*'],
  },
}

export default nextConfig
