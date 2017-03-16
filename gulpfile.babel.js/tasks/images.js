import config from '../config';
if(!config.tasks.images) throw new Error("config.tasks.images not defined!");

import gulp from 'gulp';

// var browserSync = require('browser-sync');
import changed from 'gulp-changed';

import imagemin from 'gulp-imagemin';
import path from 'path';

var paths = {
  src: path.join(config.root.src, config.tasks.images.src, '/**/*.{' + config.tasks.images.extensions + '}'),
  dest: path.join(config.root.dest, config.tasks.images.dest)
};

var imagesTask = function() {
  return gulp.src([paths.src, , '*!README.md'])
    // .pipe(changed(paths.dest)) // Ignore unchanged files
    // .pipe(imagemin()) // Optimize
    .pipe(gulp.dest(paths.dest));
    // .pipe(browserSync.stream());
};

gulp.task('images', imagesTask);
export default imagesTask;
