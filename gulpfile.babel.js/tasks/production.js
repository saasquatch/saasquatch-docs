import config from '../config';
import gulp from 'gulp';
import gulpSequence from 'gulp-sequence';

var productionTask = function(cb) {
  global.production = true
  gulpSequence('clean', ['images', 'static', 'css', 'javascript', 'metalsmithProd'] , 'size-report', cb);
}

gulp.task('production', productionTask)
export default productionTask;
