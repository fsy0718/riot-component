const gulp = require('gulp');
const sass = require('gulp-ruby-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const replace = require('gulp-replace');
const config = require('../config');


gulp.task('scss:copy', function(cb){
  return gulp.src(config.sourcepath + '/components/**/*.scss')
    .pipe(
      replace(/\:scope(?:\/\*([^\*]+)\*\/)/, function(a,b){
        return '[data-is="riot-' + b + '"]'
        }
    ))
    .pipe(gulp.dest(config.cachepath + '/components'));
});

gulp.task('css',['scss:copy'], function(){
  return sass(config.cachepath + '/components/**/*.scss')
    .on('error', sass.logError)
    .pipe(
      autoprefixer(config.autoprefixer)
    )
    .pipe(cssnano())
    .pipe(gulp.dest(config.cachepath + '/components'));
})