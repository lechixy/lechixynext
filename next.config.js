/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "static-cdn.jtvnw.net",
      "cdn.discordapp.com",
      "i.scdn.co",
    ]
  }
}

module.exports = nextConfig
