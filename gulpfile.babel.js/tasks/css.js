import config from '../config'

if(!config.tasks.css) throw new Error("config.tasks.css not defined!");

import gulp from 'gulp';
import gulpif from 'gulp-if';

// var browserSync  = require('browser-sync')
import sourcemaps from 'gulp-sourcemaps';

import lessChanged from 'gulp-less-changed';
import less from 'gulp-less';
import handleErrors from '../lib/handleErrors';
import autoprefixer from 'gulp-autoprefixer';
import path from 'path';
import cssnano from 'gulp-cssnano';

var paths = {
  src: [
      path.join(config.root.src, config.tasks.css.src, '/**/*.{' + config.tasks.css.extensions + '}'),
      path.join('!' + config.root.src, config.tasks.css.src, '/**/_*.{' + config.tasks.css.extensions + '}')
    ],
  dest: path.join(config.root.dest, config.tasks.css.dest)
};

var cssTask = function () {
  return gulp.src(paths.src)
    .pipe(gulpif(!global.production, sourcemaps.init()))
    .pipe(lessChanged())
    .pipe(less())
    .on('error', handleErrors)
    // .pipe(autoprefixer(config.tasks.css.autoprefixer))
    .pipe(gulpif(global.production, cssnano({autoprefixer: false})))
    .pipe(gulpif(!global.production, sourcemaps.write()))
    .pipe(gulp.dest(paths.dest))
    // .pipe(browserSync.stream())
}

gulp.task('css', cssTask)
export default cssTask;
