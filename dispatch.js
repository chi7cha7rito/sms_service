// dispatch.js
const egg = require('egg')
const workers = Number(process.argv[2] || require('os').cpus().length)
egg.startCluster({
  workers,
  baseDir: __dirname,
  port: process.env.PORT || 7002, // default to 7002
})
