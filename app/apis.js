const Router = require('koa-router')
const apis = new Router()

const spider = require('./spider')

apis.get('/spider', spider.index)
apis.post('/spider', spider.index)
apis.get('/clear', spider.clear)

module.exports = apis
