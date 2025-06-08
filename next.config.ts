import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: isProd ? "export" : "standalone",
  distDir: "docs",
  trailingSlash: true,
  images: {
    unoptimized: true
  }
};

export default nextConfig;
