import gulp from 'gulp';
import gulpSequence from 'gulp-sequence';

var defaultTask = function(cb) {
  gulpSequence('images', 'static', 'css', 'javascript', cb);
};

gulp.task('default', defaultTask);
export default defaultTask;