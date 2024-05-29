/** @type {import('next').NextConfig} */
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

module.exports = nextConfig
