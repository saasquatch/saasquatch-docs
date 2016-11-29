import config from '../config';

if(!config.tasks.js) throw new Error("config.tasks.js not defined!");

var config  = require('../lib/webpack-multi-config')('production')
import gulp from 'gulp';
import logger from '../lib/compileLogger';
import webpack from 'webpack';

var webpackProductionTask = function(callback) {
  webpack(config, function(err, stats) {
    logger(err, stats)
    callback()
  })
}

gulp.task('webpack:production', webpackProductionTask)
export default webpackProductionTask;
