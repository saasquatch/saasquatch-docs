import config from '../config';
import gulp from 'gulp';
import sizereport from 'gulp-sizereport';

gulp.task('size-report', function() {
  return gulp.src([config.root.dest + '/**/*', '*!rev-manifest.json'])
    .pipe(sizereport({
      gzip: true
    }));
});
