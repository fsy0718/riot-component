const
  rollup = require('rollup'),
  babel = require('rollup-plugin-babel'),
  json = require('rollup-plugin-json'),
  nodeResolve = require('rollup-plugin-node-resolve'),
  commonjs = require('rollup-plugin-commonjs'),
  riot = require('rollup-plugin-riot'),
  changeCase = require('change-case'),
  packageName = require('./package.json').name,
  sass  = require('rollup-plugin-sass'),
  autoprefixer = require('autoprefixer'),
  postcss = require('postcss');
  
const  autoprefixerconfig = require('./autoprefixer.config');

rollup
  .rollup({
    entry: 'src/index.js',
    external: ['riot'],
    plugins: [sass({
      insert: true,
      processor: function(css, id){
        return postcss([autoprefixer(autoprefixerconfig)])
          .process(css)
          .then(function(result){
            return result.css
          })
      }
    }), riot(), json(), nodeResolve({ jsnext: true }), babel()]
  })
  .then(bundle => {
    bundle.write({
      format: 'iife',
      moduleName: changeCase.camelCase(packageName),
      globals: { riot: 'riot' },
      dest: `dist/${ packageName }.js`
    })
    bundle.write({ format: 'es', dest: `dist/${ packageName }.es6.js` })
    bundle.write({ format: 'amd', dest: `dist/${ packageName }.amd.js` })
    bundle.write({ format: 'cjs', dest: `dist/${ packageName }.cjs.js` })
  })
  .catch(error => {
    console.error(error)
  })

/*rollup
  .rollup({
    entry: 'demo/index.js',
    external: ['riot'],
    plugins: [riot(), nodeResolve({ jsnext: true }), commonjs(), babel()]
  })
  .then(bundle => {
    bundle.write({
      format: 'iife',
      moduleName: 'app',
      globals: { riot: 'riot' },
      dest: `dist/demo.js`
    })
  })
  .catch(error => {
    console.error(error)
  })*/
