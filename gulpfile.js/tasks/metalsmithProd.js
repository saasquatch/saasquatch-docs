var prodMetal     = require('../../metalsmith/prod');
var gulp         = require('gulp');

var metalsmithProd = function(cb) {
  prodMetal(cb);
};

gulp.task('metalsmithProd', metalsmithProd);
module.exports = metalsmithProd;
