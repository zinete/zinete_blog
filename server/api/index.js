/**
 * @ Author: ZhengHui
 * @ Create Time: 2019-11-15 15:50:13
 * @ Modified by: ZhengHui
 * @ Modified time: 2019-11-26 11:09:25
 * @ Description: 统一路由管理
 */

import user from "./user";
import blog from "./blog";

export default function (app) {
  app.use(user.routes()).use(user.allowedMethods());
  app.use(blog.routes()).use(blog.allowedMethods());
}
