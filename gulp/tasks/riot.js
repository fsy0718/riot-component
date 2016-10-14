"use strict";
const gulp = require('gulp');
const inject = require('gulp-inject');
const path = require('path');

const config = require('../config');

gulp.task('riot:copy', function(){
  return gulp.src(config.sourcepath + '/**/*.js')
    .pipe(gulp.dest(config.cachepath));
});


gulp.task('riot:tag',['riot:copy'], function(){
  let transform = function(filepath, file, index, length, targetFile){
    let p1 = path.parse(filepath);
    let p2 = path.parse(targetFile.path);
    if(p1.name === p2.name){
      return file.contents.toString('utf-8');
    }
  }
  let source = gulp.src([config.cachepath + '/**/*.css', config.cachepath + '/**/*.js']);
  return gulp.src(config.sourcepath + '/**/*.tag')
    .pipe(inject(source, {
      removeTags: true,
      transform: transform
    }))
    .pipe(gulp.dest(config.cachepath));
});