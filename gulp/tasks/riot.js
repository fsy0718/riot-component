"use strict";
const gulp = require('gulp');
const inject = require('gulp-inject');
const path = require('path');
const replace = require('gulp-replace');
const config = require('../config');
const gulpSequence = require('gulp-sequence');

gulp.task('riot:copy:js:index', function(){
  return gulp.src(config.sourcepath + '/index.js')
    .pipe(
      replace(/\{\{([^\}]+)\}\}/g, function(a,b){
        if(b === 'version'){
          return config.package.version;
        }
        if(b === 'name'){
          return config.package.name;
        }
        if(b === 'year'){
          return new Date().getFullYear();
        }
        if( b === 'author'){
          return config.package.author;
        }
      })
    )
    .pipe(gulp.dest(config.cachepath));
})
gulp.task('riot:copy:component', function(){
  return gulp.src([config.sourcepath + '/components/**/*.js',config.sourcepath + '/components/**/*.tag'])
    .pipe(gulp.dest(config.cachepath + '/components'));
});

gulp.task('riot:copy', function (cb) {
  gulpSequence('riot:copy:js:index', 'riot:copy:component')(function () {
    console.log('riot:copy done!');
    cb();
  })
})

gulp.task('riot:tag',['riot:copy'], function(){
  let transform = function(filepath, file, index, length, targetFile){
    let p1 = path.parse(filepath);
    let p2 = path.parse(targetFile.path);
    if(p1.name === p2.name){
      return file.contents.toString('utf-8');
    }
  }
  let source = gulp.src([config.cachepath + '/components/**/*.css', config.cachepath + '/components/**/*.js']);
  return gulp.src(config.cachepath + '/components/**/*.tag')
    .pipe(inject(source, {
      removeTags: true,
      transform: transform
    }))
    .pipe(gulp.dest(config.cachepath + '/components'));
});