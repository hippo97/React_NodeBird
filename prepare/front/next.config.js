const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer')(
  {
    enabled: process.env.ANALYZE === 'true',
  }
);
const withImages = require('next-images');

module.exports = withImages();

module.exports = withPlugins([
  [
    withBundleAnalyzer,
    {
      compress: true,
      webpack(config, { webpack }) {
        const prod = process.env.NODE_ENV === 'production';
        const plugins = [
          ...config.plugins,
          new webpack.ContextReplacementPlugin(
            /moment[/\\]locale$/,
            /^\.\/ko$/
          ),
        ];

        return {
          ...config,
          mode: prod ? 'production' : 'development',
          devtool: prod ? 'hidden-source-map' : 'eval',
          plugins,
        };
      },
    },
  ],
  withImages,
]);
