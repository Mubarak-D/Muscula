import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pins the workspace root to this folder. Without it Turbopack walks up and
  // finds a stray package-lock.json in the home directory.
  turbopack: { root: __dirname },
};

export default nextConfig;
