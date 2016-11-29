import devMetal from '../../metalsmith/dev';
import gulp from 'gulp';

var metalsmithDev = function(cb) {
  devMetal(cb);
};

gulp.task('metalsmithDev', metalsmithDev);
export default metalsmithDev;
