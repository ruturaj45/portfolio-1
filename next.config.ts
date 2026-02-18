import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // Vercel handles deployment automatically
    // No static export needed for serverless deployment
    async headers() {
        return [
            {
                source: "/_next/:path*",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=31536000, immutable",
                    },
                ],
            },
            {
                source: "/:path*",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=0, must-revalidate",
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
