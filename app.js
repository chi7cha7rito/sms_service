// app.js
module.exports = app => {
  // CustomController
  class CustomController extends app.Controller {
    success (data) {
      this.ctx.body = {
        status: 1,
        message: '',
      data}
    }
    error (message, data) {
      this.ctx.body = {
        status: 0,
        message,
      data}
    }
  }
  app.Controller = CustomController
}
