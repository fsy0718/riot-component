"use strict";
const gulp = require('gulp');
const riotTmpl = require('gulp-riot-only-compiler-template');
const gulpSequence = require('gulp-sequence');
const path = require('path');
const config = require('../config');


gulp.task('riot:copy:tag', function(){
  return gulp.src(config.sourcepath + '/components/**/*.tag')
    .pipe(riotTmpl())
    .pipe(gulp.dest(config.cachepath + '/components'));
});


gulp.task('riot:copy:ts', function(){
  return gulp.src(config.sourcepath + '/**/*.ts')
    .pipe(gulp.dest(config.cachepath));
});


gulp.task('riot:copy', function(cb){
  gulpSequence('riot:copy:tag', 'riot:copy:ts')(function(){
    console.log('riot:copy done!');
    cb();
  })
})