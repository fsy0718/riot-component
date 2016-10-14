"use strict";

const gulp = require('gulp');
const del = require('del');
const changeCase = require('change-case');
const path = require('path');
const rollup = require('rollup');
const riot = require('rollup-plugin-riot');
const babel = require('rollup-plugin-babel');
const json = require('rollup-plugin-json');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const gulpSequence = require('gulp-sequence');
const Promise = require('bluebird');



const config = require('../config');

const packageJSONpath = path.join(process.cwd(), './package.json');

const packageJSON = require(packageJSONpath);
const packageName = packageJSON.name

gulp.task('build:clean', function(cb){
  del([config.cachepath + '/**'],{
    force: true
  }).then(paths => {
    cb();
  })
})
//后期需要增加版本号显示功能
gulp.task('build:riot', function(){
  let promise = new Promise(function(resolve, reject){
    rollup.rollup({
      entry: `${config.cachepath}/index.js`,
      external: ['riot'],
      plugins: [
        riot(),
        json(),
        nodeResolve({
          jsnext: true
        }),
        babel()
      ]
    }).then( bundle => {
      bundle.write({
        format: 'iife',
        moduleName: changeCase.camelCase(packageName),
        globals: { riot: 'riot' },
        dest: `${ config.destpath}/${ packageName }.js`
      })
      bundle.write({ format: 'es', dest: `${ config.destpath}/${ packageName }.es6.js` })
      bundle.write({ format: 'amd', dest: `${ config.destpath}/${ packageName }.amd.js` })
      bundle.write({ format: 'cjs', dest: `${ config.destpath}/${ packageName }.cjs.js` })
      resolve();
    }).catch(error => {
      console.error(error);
      reject();
    })
  })
  return promise;

});

gulp.task('build:noclean', function(){
  console.log(1);
   gulpSequence('css',['riot:copy', 'riot:tag'], 'build:riot')(function(){
    console.log('build done!');
  }) 
})

gulp.task('build',function(){
  gulpSequence('build:clean','css',['riot:copy', 'riot:tag'], 'build:riot', 'build:clean')(function(){
    console.log('build done!');
  })
})