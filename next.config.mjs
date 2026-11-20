/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: { bodySizeLimit: 4_400_000 },
  },
};

export default nextConfig;
