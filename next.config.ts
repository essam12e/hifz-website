import type { NextConfig } from "next";

// Static export: the site is plain HTML/CSS/JS + local images and fonts.
// Works on Vercel as-is, and the `out/` folder can be hosted anywhere.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
