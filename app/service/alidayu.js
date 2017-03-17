'use strict'
const TopClient = require('node-taobao-topclient').default
module.exports = app => {
  class Alidayu extends app.Service {
    constructor (ctx) {
      super(ctx)
      this.SyncDbSvr = this.service.syncDatabase
    }

    /**
     * @description 验证码
     * @param  {} {phoneNo
     * @param  {} code}
     */
    async securityCode ({ phoneNo, code }) {
      const reqData = {
        extend: '',
        sms_type: 'normal',
        sms_free_sign_name: '梦剧场',
        rec_num: phoneNo,
        sms_template_code: 'SMS_54675003',
        sms_param: {code: code}
      }
      try {
        const smsRec = await this.SyncDbSvr.create({
          type: 1, phoneNo: phoneNo, content: code, request: JSON.stringify(reqData)
        })
        try {
          if (smsRec && smsRec.status.toString() === '1') {
            const client = new TopClient({
              appkey: this.config.alidayu.appkey,
              appsecret: this.config.alidayu.appsecret
            })
            const result = await client.execute('alibaba.aliqin.fc.sms.num.send', reqData)
            this.SyncDbSvr.success({id: smsRec.data.id, response: JSON.stringify(result)})
            return result
          }
        } catch (error) {
          this.SyncDbSvr.failure({id: smsRec.data.id, response: JSON.stringify(error)})
          return error
        }
      } catch (error) {
        return error
      }
    }
  }
  return Alidayu
}
