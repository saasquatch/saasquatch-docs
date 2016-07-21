var gulp            = require('gulp');
var gulpSequence    = require('gulp-sequence');

var defaultTask = function(cb) {
  gulpSequence('images', 'static', 'css', 'javascript', cb);
};

gulp.task('default', defaultTask);
module.exports = defaultTask;
