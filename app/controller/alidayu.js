'use strict'

module.exports = app => {
  class AlidayuController extends app.Controller {
    async secretCode () {
      const result = await this.service.alidayu.securityCode(this.ctx.request.body)
      if (result.message) return this.error(result.message)
      return this.success(result.data)
    }

    async balancePlus () {
      const result = await this.service.alidayu.balancePlus(this.ctx.request.body)
      if (result.message) return this.error(result.message)
      return this.success(result.data)
    }

    async balanceMinus () {
      const result = await this.service.alidayu.balanceMinus(this.ctx.request.body)
      if (result.message) return this.error(result.message)
      return this.success(result.data)
    }

    async loyaltyPointPlus () {
      const result = await this.service.alidayu.loyaltyPointPlus(this.ctx.request.body)
      if (result.message) return this.error(result.message)
      return this.success(result.data)
    }

    async loyaltyPointMinus () {
      const result = await this.service.alidayu.loyaltyPointMinus(this.ctx.request.body)
      if (result.message) return this.error(result.message)
      return this.success(result.data)
    }

    async matchAttend () {
      const result = await this.service.alidayu.matchAttend(this.ctx.request.body)
      if (result.message) return this.error(result.message)
      return this.success(result.data)
    }
  }
  return AlidayuController
}
