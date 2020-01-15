/**
 * @ Author: ZhengHui
 * @ Create Time: 2019-11-15 15:50:13
 * @ Modified by: ZhengHui
 * @ Modified time: 2020-01-15 17:26:01
 * @ Description: 统一路由管理
 */

const user = require("./user");
const blog = require("./blog");
const img = require("./img");
const todo = require("./todo");
const hotreview = require("./hotreview");
const news = require("./new")


module.exports = function (app) {
  app.use(user.routes()).use(user.allowedMethods());
  app.use(blog.routes()).use(blog.allowedMethods());
  app.use(img.routes()).use(img.allowedMethods());
  app.use(todo.routes()).use(todo.allowedMethods());
  app.use(hotreview.routes()).use(hotreview.allowedMethods());
  app.use(news.routes()).use(news.allowedMethods())
}