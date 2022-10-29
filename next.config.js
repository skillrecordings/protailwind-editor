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
  eslint: { ignoreDuringBuilds: true },
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/stackblitz",
        headers: securityHeaders,
      },
    ];
  },
  // webpack(config, options) {
  //   config.module.rules.push({
  //     test: /\.worker\.js$/,
  //     loader: "worker-loader",
  //     options: {
  //       inline: true,
  //       name: "static/[hash].worker.js",
  //       publicPath: "/_next/",
  //     },
  //   });
  //   return config;
  // },
  // swcMinify: true,
};

module.exports = withTM(nextConfig);
