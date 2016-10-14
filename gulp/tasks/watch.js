"use strict";

const gulp = require('gulp');
const config = require('../config');

gulp.task('watch', function(){
  gulp.watch([config.sourcepath + '/**/*.scss', config.sourcepath + '/**/*.js', config.sourcepath + '/**/*.tag'], ['build:noclean']);
})