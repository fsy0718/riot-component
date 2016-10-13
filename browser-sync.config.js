module.exports = {
  files: ["dist/riot-component.js", "demo/index.html"],
  server: {
    baseDir: "demo",
    routes: {
      "/dist": "./dist"
    }
  }
}