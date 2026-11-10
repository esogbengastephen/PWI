import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/pwi-landing-draft/register.html", destination: "/register", permanent: false },
      { source: "/pwi-landing-draft/index.html", destination: "/", permanent: false },
      { source: "/pwi-landing-draft/", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
