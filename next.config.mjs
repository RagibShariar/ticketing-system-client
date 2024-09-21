/** @type {import('next').NextConfig} */
const nextConfig = {
  // all image allow
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
