var config  = require('../config');
var changed = require('gulp-changed');
var gulp    = require('gulp');
var path    = require('path');

var paths = {
  src: [
    path.join(config.root.src, config.tasks.js.src, '/**'),
    path.join('!' + config.root.src, config.tasks.js.src, '/README.md')
  ],
  dest: path.join(config.root.dest, config.tasks.js.dest)
};

var javascript = function() {
  return gulp.src(paths.src)
    .pipe(changed(paths.dest)) // Ignore unchanged files
    .pipe(gulp.dest(paths.dest));
};

gulp.task('javascript', javascript);
module.exports = javascript;
