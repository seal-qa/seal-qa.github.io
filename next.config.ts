import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: isProd ? "export" : "standalone", // Export only for production
  distDir: "docs",                          // GitHub Pages expects this folder
  trailingSlash: true,                     // Required for static routing
  images: {
    unoptimized: true                      // Required for export mode (no server-side image optimization)
  }
};

export default nextConfig;
