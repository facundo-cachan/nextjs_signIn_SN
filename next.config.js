const withPWA = require("next-pwa")
const runtimeCaching = require("next-pwa/cache")
const withTM = require("next-transpile-modules")([])
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})
const config = withTM({
  compress: true,
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    GOOGLE_ID: process.env.GOOGLE_ID,
    GOOGLE_SECRET: process.env.GOOGLE_SECRET,
    FACEBOOK_ID: process.env.FACEBOOK_ID,
    FACEBOOK_SECRET: process.env.FACEBOOK_SECRET,
  },
  eslint: {
    dirs: ["pages", "component"],
  },
  images: {
    formats: ["image/webp"],
    minimumCacheTTL: 60,
    disableStaticImages: true,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: [],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      react: require.resolve("react").replace("index.js", ""),
    }
    return config
  },
})
if (process.env.NODE_ENV === "production") {
  module.exports = withPWA({
    pwa: {
      dest: "public",
      register: true,
      skipWaiting: true,
      runtimeCaching,
      disable: false,
      buildExcludes: [/middleware-manifest.json$/],
    },
    ...config,
  })
} else {
  module.exports = module.exports = withBundleAnalyzer(config)
}
