import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["i.ytimg.com"],
  },

  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", // ou mais, conforme necessário
    },
  },

 
};

export default nextConfig;
