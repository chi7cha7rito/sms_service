'use strict'
const TopClient = require('node-taobao-topclient')
module.exports = {
  get alidayu () {
    const client = new TopClient({
      appkey: this.config.alidayu.appkey,
      appsecret: this.config.alidayu.appsecret
    })
    return client
  }
}
