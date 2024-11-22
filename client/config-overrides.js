const path = require('path');
const { override, addWebpackAlias, useBabelRc, overrideDevServer } = require('customize-cra');

const disableOpenBrowser = () => (config) => {
  config.open = false;
  return config;
};

module.exports = {
  webpack: override(
    addWebpackAlias({
      '@': path.resolve(__dirname, 'src'),
    }),
    useBabelRc()
  ),
  devServer: overrideDevServer(
    disableOpenBrowser()
  ),
};