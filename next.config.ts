import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['github.com', 'images.unsplash.com'], // Add both domains we're using for images
  },
};

export default nextConfig;
