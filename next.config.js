// core
const { join } = require("path")

// npm
const Dotenv = require("dotenv-webpack")
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
  // would be nice to support more webpack-bundle-analyzer options like:
  openAnalyzer: false,
  generateStatsFile: true,
})

const path = join(__dirname, ".env")

module.exports = withBundleAnalyzer({
  webpack: (config) => {
    const dots = new Dotenv({
      path,
      systemvars: true,
      safe: true,
      defaults: true,
    })
    if (config.plugins) {
      config.plugins.push(dots)
    } else {
      config.plugins = [dots]
    }
    return config
  },
})
