const { execFileSync } = require("node:child_process");

let lastCommitDate = "";
try {
  lastCommitDate = execFileSync("git", ["show", "-s", "--format=%cI", "HEAD"], {
    cwd: __dirname,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  }).trim();
} catch {
  // Source archives can be built without Git metadata.
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: { SITE_LAST_COMMIT_DATE: lastCommitDate },
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static-cdn.jtvnw.net",
      },
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
      },
      {
        protocol: "https",
        hostname: "i.scdn.co",
      },
      {
        protocol: "https",
        hostname: "discord.com",
      },
    ],
  },
}

module.exports = nextConfig
