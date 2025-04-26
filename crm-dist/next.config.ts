import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["cadtoner.com.mx"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cadtoner.com.mx",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;