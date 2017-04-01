'use strict'

module.exports = app => {
  app.post('/alidayu/secretCode', 'alidayu.secretCode')
  app.post('/alidayu/balancePlus', 'alidayu.balancePlus')
  app.post('/alidayu/balanceMinus', 'alidayu.balanceMinus')
  app.post('/alidayu/loyaltyPointPlus', 'alidayu.loyaltyPointPlus')
  app.post('/alidayu/loyaltyPointMinus', 'alidayu.loyaltyPointMinus')
}
