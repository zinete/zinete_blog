/**
 * @ Author: ZhengHui
 * @ Create Time: 2019-11-15 15:50:13
 * @ Modified by: ZhengHui
 * @ Modified time: 2019-12-13 14:28:21
 * @ Description: 统一路由管理
 */

const user = require("./user");
const blog = require("./blog");
const img = require("./img")


module.exports = function(app) {
  app.use(user.routes()).use(user.allowedMethods());
  app.use(blog.routes()).use(blog.allowedMethods());
  app.use(img.routes()).use(img.allowedMethods())
}