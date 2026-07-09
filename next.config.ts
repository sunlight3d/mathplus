import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "toan.vn",
        pathname: "/wp-content/**",
      },
    ],
  },
};

export default nextConfig;
