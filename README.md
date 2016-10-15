#riot-component
基于riot的组件
- [x] calendar
- [ ] popver

### 开始使用

1. 直接在浏览器中使用

  - 引用[riot.js](http://riotjs.com/)
  - 引用[normalize.css](http://necolas.github.io/normalize.css/)，非必须选项
  - 引用[pure.css的grids](http://purecss.io/grids/)
  - 引用需要的`riot-component`js文件,有[amd,commonjs,es6,script标签四个版本]
  - 开始使用riot-component组件

  ```html
  <!DOCTYPE html>
  <html>
    <head>
      <title>riot-component</title>
      <link rel="stylesheet" href="pure.css">
    </head>
    <body>
      <riot-calendar></riot-calendar>
      <script src="riot.js"></script>
      <script src="dist/riot-comonent.js"></script>
      <script>riot.mount('riot-calendar')</script>
    </body>
  </html>
  ```
2. 使用riot-component包

  ```shell
  $ npm install --save riot-component`
  ```

  ```javascript
  //app.js
  import riot from 'riot'
  import 'riot-component'
  riot.mount('riot-calendar')
  ```

  ```html
  <!DOCTYPE html>
    <html>
      <head>
        <title>riot-component</title>
        <link rel="stylesheet" href="pure.css">
      </head>
      <body>
        <riot-calendar></riot-calendar>
        <script src="app.js"></script>
      </body>
    </html>
  ```

### 组件说明
  请看[api文档](https://fsy0718.github.io/riot-component/)


### 开发说明
本项目采用gulp进行项目自动编译工具，rollup进行打包
- `npm install` 下载所有包
- `npm run start:build`  进行打包并进行实时编译、热刷新页面

#### npm script说明
- `build`： 打包
- `watch`： 监听文件修改
- `server`： 基于[browser-sync](https://www.browsersync.io/)进行热刷新
- `start`： `server`与`watch`的复合命令
- `start:build`： `build`、`watch`及`server`的复合命令


### 开发注意事项
  参照[riotComponent开发构建说明](https://github.com/fsy0718/riot-component/wiki/riotComponent%E5%BC%80%E5%8F%91%E6%9E%84%E5%BB%BA%E8%AF%B4%E6%98%8E)
