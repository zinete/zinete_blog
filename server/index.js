

const Koa = require('koa')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const bodyParser = require('koa-bodyparser')
const router = require('./api/index')
const session = require("koa-session")
const Utils = require("./config/index")
const app = new Koa()

app.keys = ['session@&'];
const config = require("../nuxt.config.js")
config.dev = app.env !== 'production'

app.use(session({
  key: 'zinete',
  maxAge: 86400000,
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: false
}, app))

app.use(async (ctx, next) => {
  let { url = '' } = ctx;
  if (url.indexOf('/oa/user') > -1) {//需要校验登录态
    let check = Utils.checkLogin(ctx);
    if (check.code != 0) return ctx.body = check;
  }
  await next();
});

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    // eslint-disable-next-line no-undef
    host = process.env.HOST || '127.0.0.1',
    // eslint-disable-next-line no-undef
    port = process.env.PORT || 3000
  } = nuxt.options.server

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }
  // 中间件获取前端传递的参数
  app.use(bodyParser({
    extendTypes: ['json', 'from', 'text']
  }))
  // 接口路由
  router(app)
  app.use((ctx) => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
