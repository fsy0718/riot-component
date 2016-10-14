const gulp = require('gulp');
const sass = require('gulp-ruby-sass');
const autoprefixer = require('gulp-autoprefixer');

const config = require('../config');


gulp.task('css', function(){
  return sass(config.sourcepath + '/**/*.scss')
    .on('error', sass.logError)
    .pipe(
      autoprefixer(config.autoprefixer)
    )
    .pipe(gulp.dest(config.cachepath));

})