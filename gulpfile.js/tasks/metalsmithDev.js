var devMetal     = require('../../metalsmith/dev');
var gulp         = require('gulp');

var metalsmithDev = function(cb) {
  devMetal(cb);
};

gulp.task('metalsmithDev', metalsmithDev);
module.exports = metalsmithDev;
