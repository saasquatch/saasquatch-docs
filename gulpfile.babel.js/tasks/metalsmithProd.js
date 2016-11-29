import prodMetal from '../../metalsmith/prod';
import gulp from 'gulp';

var metalsmithProd = function(cb) {
  prodMetal(cb);
};

gulp.task('metalsmithProd', metalsmithProd);
export default metalsmithProd;
