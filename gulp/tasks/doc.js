"use strict";
const gulp = require('gulp');
const jsdoc = require('gulp-jsdoc3');
const path = require('path');

const configDoc = require('../config.doc');
const config = require('../config')

gulp.task('doc', function () {
  return gulp.src([config.sourcepath + '/components/**/*.js'])
    .pipe(jsdoc(configDoc))
    
})