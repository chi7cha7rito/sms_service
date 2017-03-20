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
      const params = {
        extend: '',
        sms_type: 'normal',
        sms_free_sign_name: this.config.smsTemplate.sign,
        rec_num: phoneNo,
        sms_template_code: this.config.smsTemplate.templateCode.securityCode,
        sms_param: {code}
      }
      const result = await this.sendMessage({phoneNo, params})
      return result
    }

    /**
    * @description 账户充值
    * @param  {} {phoneNo
    * @param  {} name
    * @param  {} amount}
    */
    async balancePlus ({ phoneNo, name, amount }) {
      const params = {
        extend: '',
        sms_type: 'normal',
        sms_free_sign_name: this.config.smsTemplate.sign,
        rec_num: phoneNo,
        sms_template_code: this.config.smsTemplate.templateCode.balancePlus,
        sms_param: {name, amount: amount.toString()}
      }
      const result = await this.sendMessage({phoneNo, params})
      return result
    }

    /**
     * @description 账户消费
     * @param  {} {phoneNo
     * @param  {} name
     * @param  {} amount}
     */
    async balanceMinus ({ phoneNo, name, amount }) {
      const params = {
        extend: '',
        sms_type: 'normal',
        sms_free_sign_name: this.config.smsTemplate.sign,
        rec_num: phoneNo,
        sms_template_code: this.config.smsTemplate.templateCode.balanceMinus,
        sms_param: {name, amount: amount.toString()}
      }
      const result = await this.sendMessage({phoneNo, params})
      return result
    }

    /**
     * @description 积分获取
     * @param  {} {phoneNo
     * @param  {} name
     * @param  {} points}
     */
    async loyaltyPointPlus ({ phoneNo, name, points }) {
      const params = {
        extend: '',
        sms_type: 'normal',
        sms_free_sign_name: this.config.smsTemplate.sign,
        rec_num: phoneNo,
        sms_template_code: this.config.smsTemplate.templateCode.loyaltyPointPlus,
        sms_param: {name, points: points.toString()}
      }
      const result = await this.sendMessage({phoneNo, params})
      return result
    }

    /**
     * @description 积分扣减
     * @param  {} {phoneNo
     * @param  {} name
     * @param  {} points}
     */
    async loyaltyPointMinus ({ phoneNo, name, points }) {
      const params = {
        extend: '',
        sms_type: 'normal',
        sms_free_sign_name: this.config.smsTemplate.sign,
        rec_num: phoneNo,
        sms_template_code: this.config.smsTemplate.templateCode.loyaltyPointMinus,
        sms_param: {name, points: points.toString()}
      }
      const result = await this.sendMessage({phoneNo, params})
      return result
    }

    /**
     * @description 报名参赛
     * @param  {} {phoneNo
     * @param  {} name
     * @param  {} match}
     */
    async matchAttend ({ phoneNo, name, match }) {
      const params = {
        extend: '',
        sms_type: 'normal',
        sms_free_sign_name: this.config.smsTemplate.sign,
        rec_num: phoneNo,
        sms_template_code: this.config.smsTemplate.templateCode.matchAttend,
        sms_param: {name, match}
      }
      const result = await this.sendMessage({phoneNo, params})
      return result
    }

    async sendMessage ({ phoneNo, params }) {
      let smsRec
      try {
        smsRec = await this.SyncDbSvr.create({
          type: 1, phoneNo: phoneNo, content: JSON.stringify(params.sms_param), request: JSON.stringify(params)
        })
        if (!smsRec || smsRec.status.toString() !== '1') throw new Error('短信创建失败')
        const client = new TopClient({
          appkey: this.config.alidayu.appkey,
          appsecret: this.config.alidayu.appsecret
        })
        const result = await client.execute('alibaba.aliqin.fc.sms.num.send', params)
        this.SyncDbSvr.success({id: smsRec.data.id, response: JSON.stringify(result)})
        return {status: 1, message: '', data: result}
      } catch (error) {
        if (error.data && error.data.error_response && error.data.error_response.sub_msg) {
          this.SyncDbSvr.failure({id: smsRec.data.id, response: JSON.stringify(error)})
          return {status: 0, message: error.data.error_response.sub_msg} // 阿里大于error
        }
        return {status: 0, message: error.message}
      }
    }
  }
  return Alidayu
}
