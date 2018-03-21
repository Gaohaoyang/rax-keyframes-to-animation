// webpack.config.update.js
const path = require('path');

module.exports = function update(webpackConfigOrigin) {
  const webpackConfig = webpackConfigOrigin;
  webpackConfig.output.filename = 'bundle.min.js';
  webpackConfig.output.publicPath = '.';
  webpackConfig.output.path = path.resolve(__dirname, 'demo');
  return webpackConfig;
};
