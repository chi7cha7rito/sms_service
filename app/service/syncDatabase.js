'use strict'
const md5 = require('md5')
module.exports = app => {
  class SyncDatabase extends app.Service {
    constructor (ctx) {
      super(ctx)
      this.smsApi = this.app.config.smsApi
      this.token = md5(this.app.config.hulk_token)
    }

    async create ({type, phoneNo, content, request}) {
      const result = await this.app.curl(this.smsApi.create, {
        // 必须指定 method，支持 POST，PUT 和 DELETE
        method: 'POST',
        // 不需要设置 contentType，HttpClient 会默认以 application/x-www-form-urlencoded 格式发送请求
        contentType: 'json',
        headers: {
          'hulk_token': this.token
        },
        data: {
          type: type,
          phoneNo: phoneNo,
          content: content,
          request: request
        },
        // 明确告诉 HttpClient 以 JSON 格式处理响应 body
        dataType: 'json'
      })
      return result.data
    }

    async success ({id, response}) {
      const result = await this.app.curl(this.smsApi.successful, {
        // 必须指定 method，支持 POST，PUT 和 DELETE
        method: 'POST',
        // 不需要设置 contentType，HttpClient 会默认以 application/x-www-form-urlencoded 格式发送请求
        contentType: 'json',
        headers: {
          'hulk_token': this.token
        },
        data: {
          id: id,
          response: response
        },
        // 明确告诉 HttpClient 以 JSON 格式处理响应 body
        dataType: 'json'
      })
      return result.data
    }

    async failure ({id, response}) {
      const result = await this.app.curl(this.smsApi.failure, {
        // 必须指定 method，支持 POST，PUT 和 DELETE
        method: 'POST',
        // 不需要设置 contentType，HttpClient 会默认以 application/x-www-form-urlencoded 格式发送请求
        contentType: 'json',
        headers: {
          'hulk_token': this.token
        },
        data: {
          id: id,
          response: response
        },
        // 明确告诉 HttpClient 以 JSON 格式处理响应 body
        dataType: 'json'
      })
      return result.data
    }
  }
  return SyncDatabase
}
