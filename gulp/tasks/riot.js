"use strict";
const gulp = require('gulp');
const inject = require('gulp-inject-file');
const path = require('path');
const replace = require('gulp-replace');
const config = require('../config');
const rename = require('gulp-rename');
const gulpSequence = require('gulp-sequence');
const injectString = require('gulp-inject-string');
const gulpIf = require('gulp-if');


gulp.task('riot:copy:js:index', function(){
  return gulp.src(config.sourcepath + '/index.js')
    .pipe(gulp.dest(config.cachepath));
})
gulp.task('riot:copy:js', function(){
  return gulp.src([config.sourcepath + '/components/**/*.js'])
    .pipe(gulp.dest(config.cachepath + '/components'));
});

gulp.task('riot:copy:tag', function(){
  return gulp.src([config.sourcepath + '/components/**/*.tag'])
    .pipe(
      gulpIf(
        config.options.withCss, injectString.replace('<!--inject-style-->','<style scoped><!-- inject: ./main.css--></style>')
      )
    )
    .pipe(rename(function(path){
      if(path.basename.indexOf('_') === -1){
        path.basename = 'cache_' + path.basename;
      } 
    }))
    .pipe(gulp.dest(config.cachepath + '/components'));
})

gulp.task('riot:copy', function (cb) {
  gulpSequence('riot:copy:js:index', 'riot:copy:js','riot:copy:tag')(function () {
    console.log('riot:copy done!');
    cb();
  })
})

gulp.task('riot:tag',['riot:copy'], function(){
  return gulp.src(config.cachepath + '/components/**/cache_*.tag')
    .pipe(inject({
      pattern: '<!--\\s*inject:<filename>-->'
    }))
    .pipe(rename(function(path){
      path.basename = path.basename.replace(/cache\_/,'')
    }))
    .pipe(gulp.dest(config.cachepath + '/components'));
});