import Koa from "koa"
import consola from "consola"
import { Nuxt, Builder } from "nuxt"
import user from "./api/user"
const app = new Koa()

// Import and Set Nuxt.js options
import config from "../nuxt.config.js"
config.dev = app.env !== 'production'

async function start () {
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
  // 接口路由
  app.use(user.routes(), user.allowedMethods())
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
