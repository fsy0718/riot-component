"use strict";
const path = require('path');

let basepath = process.cwd();
console.log(path.join(basepath, '../node_modules/marked'))
module.exports = {
    tag: {
        allowUnknowTags: true
    },
    opts:{
        destination: path.join(basepath,'./doc')
    }
}