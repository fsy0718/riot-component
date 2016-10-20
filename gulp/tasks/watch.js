"use strict";

const gulp = require('gulp');
const config = require('../config');

gulp.task('watch', function(){
  gulp.watch([config.sourcepath + '/components/**/*.scss', config.sourcepath + '/components/**/*.js', config.sourcepath + '/components/**/*.tag'], ['build:noclean']);
})