import gulp from 'gulp';
import del from 'del';
import config from '../config';

var cleanTask = function (cb) {
  del([config.root.dest]).then(function (paths) {
    cb()
  })
}

gulp.task('clean', cleanTask)
export default cleanTask;
