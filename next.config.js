/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")();

const securityHeaders = [
  {
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin",
  },
  {
    key: "Cross-Origin-Embedder-Policy",
    value: "require-corp",
  },
];

const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/stackblitz",
        headers: securityHeaders,
      },
    ];
  },
  // swcMinify: true,
};

module.exports = withTM(nextConfig);
