import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.tacotok.lol",
      },
      {
        protocol: "https",
        hostname: "pub-33766de5d75644b89a82ac58a4fb5181.r2.dev",
      },
      {
        protocol: "https",
        hostname: "*.cdninstagram.com",
      },
      {
        protocol: "https",
        hostname: "*.tiktokcdn-us.com",
      },
    ],
  },
};

export default nextConfig;
