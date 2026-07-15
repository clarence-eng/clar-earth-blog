import type { NextConfig } from "next";
import redirectsData from "./redirects.json";

const securityHeaders = [
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    // redirects.json: add entries when a post slug is renamed to preserve old URLs
    // Format: [{ "source": "/old-slug", "destination": "/new-slug", "permanent": true }]
    return redirectsData as { source: string; destination: string; permanent: boolean }[];
  },
};

export default nextConfig;
