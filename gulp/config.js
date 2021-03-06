"use strict";
const path = require('path');
const minimist = require('minimist');

const defaultOptions = {
  string: ['env', 'platform'],
  boolean: ['withCss'],
  default: {
    env: process.env.NODE_ENV || 'develop',
    platform: 'mobile',
    withCss: true
  }
}
const options = minimist(process.argv.slice(2), defaultOptions);
let result = {
  options: options
}

if(options.env === 'production' || options.env === 'develop'){
  let _path = path.join(__dirname, 'config.' + options.platform + '.' + options.env);
  result = Object.assign({}, result, require(_path));
}
const packageObj = require(path.join(result.basepath, './package.json'));
result.package = packageObj;

module.exports = result;