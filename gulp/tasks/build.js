"use strict";

const gulp = require('gulp');
const del = require('del');
const changeCase = require('change-case');
const path = require('path');
const rollup = require('rollup');
const riot = require('rollup-plugin-riot');
const babel = require('rollup-plugin-babel');
const json = require('rollup-plugin-json');
const typescript = require('rollup-plugin-typescript');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const string  = require('rollup-plugin-string');
const gulpSequence = require('gulp-sequence');
const Promise = require('bluebird');

const config = require('../config');

gulp.task('build:clean', function (cb) {
  del([config.cachepath + '/**'], {
    force: true
  }).then(paths => {
    cb();
  })
})

let rollupPluginList = [
  riot(),
  json(),
  nodeResolve({
    jsnext: true
  }),
  babel()
]
if (config.strip) {
  let strip = require('rollup-plugin-strip');
  rollupPluginList.splice(1,0,strip(config.strip))
}
let dest = `${config.destpath}/${config.package.name}`
if(!config.options.withCss){
  dest = dest + '-no-css';
}

//后期需要增加版本号显示功能
gulp.task('build:riot', function () {
  let promise = new Promise(function (resolve, reject) {
    rollup.rollup({
      entry: `${config.cachepath}/index.js`,
      external: ['riot'],
      plugins: rollupPluginList
    }).then(bundle => {
      let banner = `/**
 * @file ${config.package.name}.js |基于riot的组件
 * @version ${config.package.version}
 * @author ${config.package.author}
 * @license ${config.package.license}
 * @copyright fsy0718 ${new Date().getFullYear()}
 */`
      bundle.write({
        format: 'iife',
        moduleName: changeCase.camelCase(config.package.name),
        globals: { riot: 'riot' },
        dest: `${dest}.js`,
        banner: banner
      })
      bundle.write({ format: 'es', banner: banner, dest: `${dest}.es6.js` })
      bundle.write({ format: 'amd', banner: banner, dest: `${dest}.amd.js` })
      bundle.write({ format: 'cjs', banner: banner, dest: `${dest}.cjs.js` })
      resolve();
    }).catch(error => {
      console.error(error);
      reject();
    })
  })
  return promise;

});

gulp.task('build:noclean', function () {
  gulpSequence('css', ['riot:copy', 'riot:tag'], 'build:riot')(function () {
    console.log('build done!');
  })
})
gulp.task('build:noCss', function(){
  gulpSequence('build:clean', 'css:noCss', ['riot:copy', 'riot:tag'], 'build:riot', 'build:clean')(function () {
    console.log('build done!');
  })
})
gulp.task('build:uglify', function(){
  var uglify = require('gulp-uglify');
  var rename = require('gulp-rename');
  return gulp.src([`${config.destpath}/riot-component.js`, `${config.destpath}/riot-component-no-css.js`])
    .pipe(uglify({
      preserveComments: 'license'
    }))
    .pipe(rename({
      suffix: '-min'
    }))
    .pipe(gulp.dest(config.destpath));
})
gulp.task('build', function () {
  gulpSequence('build:clean', 'css', ['riot:copy', 'riot:tag'], 'build:riot', 'build:clean')(function () {
    console.log('build done!');
  })
});


gulp.task('build:ts', function(){
  rollup.rollup({
      entry: `${config.sourcepath}/index.ts`,
      plugins: [
        typescript(),
        string({
          include: [`${config.sourcepath}/components/**/*.tag`,`${config.sourcepath}/components/**/*.css`]
        })
      ]
    }).then(bundle => {
      bundle.write({
        format: 'iife',
        dest: `${dest}.js`,
        globals: { riot: 'riot' },
        moduleName: changeCase.camelCase(config.package.name)
      })
      bundle.write({ format: 'es', dest: `${dest}.es6.js` })
      bundle.write({ format: 'amd', dest: `${dest}.amd.js` })
      bundle.write({ format: 'cjs', dest: `${dest}.cjs.js` })
    }).catch(error => {
      console.error(error);
      reject();
    });
})
