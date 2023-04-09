/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "static-cdn.jtvnw.net",
      "cdn.discordapp.com",
      "i.scdn.co",
      "discord.com",
    ]
  }
}

module.exports = nextConfig
