import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // …
    serverComponentsExternalPackages: ['@react-pdf/renderer'],
  },
};

export default nextConfig;
