"use strict";

const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const config = require('../config');
const gulpSequence = require('gulp-sequence');

gulp.task('server', function(){
  browserSync.init(config.browsersync)
})


gulp.task('server:watch',['server', 'watch']);
gulp.task('server:watch:ts', ['server', 'watch:ts']);
gulp.task('server:watch:build', function(){
  gulpSequence('build', 'server', 'watch')();
})

