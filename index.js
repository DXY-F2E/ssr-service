const Koa = require('koa')
const server = new Koa()
const bodyParser = require('koa-bodyparser')
const apis = require('./app/apis')

server.use(bodyParser())

server
  .use(apis.routes())
  .use(apis.allowedMethods())

server.listen(3000)
