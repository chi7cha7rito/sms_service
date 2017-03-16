'use strict'

module.exports = app => {
  class AlidayuController extends app.Controller {
    async secretCode () {
      const result = await this.service.alidayu.securityCode(this.ctx.request.body)
      this.success(result)
    }
  }
  return AlidayuController
}
