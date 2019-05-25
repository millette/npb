const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
  // would be nice to support more webpack-bundle-analyzer options like:
  openAnalyzer: false,
  generateStatsFile: true
})
module.exports = withBundleAnalyzer({})

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
