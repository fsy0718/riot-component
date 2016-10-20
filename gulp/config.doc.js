"use strict";
const path = require('path');
let basepath = process.cwd();

module.exports = {
    tag: {
        allowUnknowTags: true
    },
    opts:{
        destination: path.join(basepath,'./doc')
    }
}