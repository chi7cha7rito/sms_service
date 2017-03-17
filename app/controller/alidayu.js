'use strict'

module.exports = app => {
  class AlidayuController extends app.Controller {
    async secretCode () {
      const resp = await this.service.alidayu.securityCode(this.ctx.request.body)
      if (resp.request_id) this.success(resp)
      else this.error((resp.data.error_response && resp.data.error_response.sub_msg) || '短信发送失败')
    }
  }
  return AlidayuController
}
