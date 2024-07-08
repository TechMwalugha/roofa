/** @type {import('next').NextConfig} */

const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  disable: false,
  workboxOptions: {
    disableDevLogs: true,
  },
  fallbacks: {
    document: "/~offline",
  }
});


const nextConfig = {
      typescript: {
        ignoreBuildErrors: true,
      },
      images: {
        remotePatterns: [
        {
          protocol: "https",
          hostname: "images.unsplash.com",
        },
        {
          protocol: "https",
          hostname: "lh3.googleusercontent.com"
        },
        {
          protocol: "https",
          hostname: "roofa.co.ke"
        },
        {
          protocol: "https",
          hostname: "img.freepik.com"
        },
      ]
    }
}

module.exports = withPWA(nextConfig);
