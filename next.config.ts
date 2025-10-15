import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Disable symlinks to fix Windows build issues
  experimental: {
    // @ts-ignore - This option exists but may not be in types
    disableSymlinks: true,
  },
};

export default nextConfig;
