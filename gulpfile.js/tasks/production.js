var config       = require('../config')
var gulp         = require('gulp')
var gulpSequence = require('gulp-sequence')

var productionTask = function(cb) {
  global.production = true
  gulpSequence('clean', 'images', 'static', 'css', 'javascript', 'size-report', cb);
}

gulp.task('production', productionTask)
module.exports = productionTask
