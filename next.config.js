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

/*
// @next/bundle-analyzer would be something like:

module.exports = (pluginConfig = {}) => (nextConfig = {}) => {
  const { enabled = true } = pluginConfig
  return Object.assign({}, nextConfig, {
    webpack (config, options) {
      if (enabled) {
        const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
        config.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            reportFilename: options.isServer ? '../analyze/server.html' : './analyze/client.html',
            ...pluginConfig
          })
        )
      }

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }
      return config
    }
  })
}
*/
