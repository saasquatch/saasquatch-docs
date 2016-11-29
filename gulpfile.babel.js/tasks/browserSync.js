if(global.production) throw new Error("Cannot run in production mode");

import browserSync from 'browser-sync';
import gulp from 'gulp';

// var webpack           = require('webpack')
// var webpackMultiConfig = require('../lib/webpack-multi-config')
import config from '../config';

import pathToUrl from '../lib/pathToUrl';

var browserSyncTask = function() {

  var webpackConfig = webpackMultiConfig('development')
  var compiler = webpack(webpackConfig)
  var proxyConfig = config.tasks.browserSync.proxy || null;

  if (typeof(proxyConfig) === 'string') {
    config.tasks.browserSync.proxy = {
      target : proxyConfig
    }
  }

  var server = config.tasks.browserSync.proxy || config.tasks.browserSync.server;

  // server.middleware = [
  //   require('webpack-dev-middleware')(compiler, {
  //     stats: 'errors-only',
  //     publicPath: pathToUrl('/', webpackConfig.output.publicPath)
  //   }),
  //   require('webpack-hot-middleware')(compiler)
  // ]

  browserSync.init(config.tasks.browserSync)
}

gulp.task('browserSync', browserSyncTask)
export default browserSyncTask;
