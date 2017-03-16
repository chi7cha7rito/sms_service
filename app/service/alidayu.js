'use strict'
const TopClient = require('node-taobao-topclient').default
module.exports = app => {
  class Alidayu extends app.Service {

    /**
     * @description 验证码
     * @param  {} {phoneNo
     * @param  {} code}
     */
    async securityCode ({ phoneNo, code }) {
      const client = new TopClient({
        appkey: this.config.alidayu.appkey,
        appsecret: this.config.alidayu.appsecret
      })
      const result = await client.execute('alibaba.aliqin.fc.sms.num.send', {
        extend: '',
        sms_type: 'normal',
        sms_free_sign_name: '梦剧场',
        rec_num: phoneNo,
        sms_template_code: 'SMS_54675003',
        sms_param: {code: code}
      })
      return result
    }
  }
  return Alidayu
}
