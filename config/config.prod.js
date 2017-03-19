'use strict'

module.exports = appInfo => {
  const config = {}
  // should change to your own
  config.keys = appInfo.name + 'hulkclub'

  // service调用token
  config.hulk_token = 'abcd1234'

  // 阿里大于配置
  config.alidayu = {
    appkey: '23665335',
    appsecret: '96059005171c300eb6ec0c1c1de99912'
  }

  config.smsApi = {
    create: 'http://115.159.94.198:7001/sms/create',
    successful: 'http://115.159.94.198:7001/sms/successful',
    failure: 'http://115.159.94.198:7001/sms/failure'
  }

  // 中间件配置
  config.middleware = ['authentication', 'notFoundHandler', 'errorHandler']
  config.authentication = {
    enable: false
  }
  config.security = {
    csrf: {
      ignoreJSON: true // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
    }
  }

  return config
}
