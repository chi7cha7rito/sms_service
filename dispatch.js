// dispatch.js
const egg = require('egg')
egg.startCluster({
  baseDir: __dirname,
  port: process.env.PORT || 7002 // default to 7002
})
