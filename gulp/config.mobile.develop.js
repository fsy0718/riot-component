"use strict";

const path = require('path');

const basepath = process.cwd();
const sourcepath = path.join(basepath, 'src');
const cachepath = path.join(basepath, 'cachepath');
const destpath = path.join(basepath, 'dist');


module.exports = {
  basepath: basepath,
  sourcepath: sourcepath,
  cachepath: cachepath,
  destpath: destpath,
  autoprefixer: {
    browsers: [
      'ie_mob >= 10',
      'ff >= 30',
      'chrome >= 34',
      'safari >= 6',
      'opera >= 12.1',
      'ios >= 6',
      'android >= 4.4',
      'and_uc > 9.9'
    ],
    cascade: false
  },
  browsersync: {
    files: ["dist/riot-component.js", "demo/*.html"],
    server: {
      baseDir: "demo",
      routes: {
        "/dist": "./dist"
      }
    }

  }
}